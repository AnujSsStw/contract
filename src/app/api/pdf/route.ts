import { Subcontract } from "@/app/(pdf)/latest/types";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import chromium from "@sparticuz/chromium-min";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { PDFDocument } from "pdf-lib";
import puppeteer, { Browser } from "puppeteer-core";
import superjson from "superjson";

const isDev = process.env.NODE_ENV === "development";
const chromiumPack =
  "https://github.com/Sparticuz/chromium/releases/download/v126.0.0/chromium-v126.0.0-pack.tar";
const localChromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface PdfResult {
  page: number;
  pdf: Buffer | PDFDocument;
  type: "puppeteer" | "uploaded";
}

async function captureLatestPdfForDevice(
  updateState: Subcontract,
): Promise<PdfResult[]> {
  let browser: Browser | undefined;
  let retries = 3;

  while (retries > 0) {
    try {
      browser = await puppeteer.launch({
        args: isDev
          ? [
              ...puppeteer.defaultArgs(),
              "--hide-scrollbars",
              "--disable-web-security",
              "--no-sandbox",
              "--disable-setuid-sandbox",
            ]
          : chromium.args,
        executablePath: isDev
          ? localChromePath
          : await chromium.executablePath(chromiumPack),
        headless: true,
      });
      break;
    } catch (error: unknown) {
      retries--;
      if (retries === 0) {
        throw new Error(
          `Failed to launch browser after 3 attempts: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      // Wait for 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  if (!browser) {
    throw new Error("Failed to initialize browser");
  }

  try {
    const jsonStr = superjson.stringify(updateState);
    console.log(jsonStr);

    // const encodedJson = encodeURIComponent(jsonStr);
    const base64State = Buffer.from(jsonStr).toString("base64");
    const serverUrl = isDev
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

    const pages = [1, 3, 5].map((page) => ({
      url: `${serverUrl}/latest?state=${base64State}&page=${page}`,
      page,
    }));

    const pdfs = await Promise.all(
      pages.map(async ({ url, page }) => {
        const browserPage = await browser.newPage();
        try {
          await browserPage.goto(url);
          const pdf = await browserPage.pdf({
            format: "LETTER",
            printBackground: true,
            margin: {
              top: "50px",
              right: "50px",
              bottom: "50px",
              left: "50px",
            },
          });
          return { page, pdf: Buffer.from(pdf), type: "puppeteer" as const };
        } catch (error) {
          console.error("Error capturing PDF:", error);
          return { page, pdf: Buffer.from([]), type: "puppeteer" as const };
        } finally {
          await browserPage.close();
        }
      }),
    );

    return pdfs;
  } finally {
    await browser.close();
  }
}

function getAttachmentUrl(storageId: Id<"_storage">): string {
  const url = new URL(`${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`);
  url.searchParams.set("storageId", storageId);
  return url.href;
}

async function fetchAndLoadAttachments(
  attachments: Array<{ url: string }> = [],
): Promise<PdfResult[]> {
  return Promise.all(
    attachments.map(async (attachment, index) => {
      const response = await fetch(
        getAttachmentUrl(attachment.url as Id<"_storage">),
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch attachment ${index}: ${response.statusText}`,
        );
      }
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      return { index, pdf: pdfDoc, type: "uploaded" as const, page: index + 7 };
    }),
  );
}

const STATIC_PDF_URLS = [
  {
    url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtvzjUqmCRWPagytV5M3p6rbcwz4GYL0OfZUJj",
    page: 2,
  },
  {
    url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtz2INElf3uENDHWOCkmc9AjTYPgQdRrZBvMLq",
    page: 4,
  },
  {
    url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtiMihI4bCA5IVl78jptQBGOhuTJDERswFczXv",
    page: 6,
  },
];

async function fetchAndLoadStaticPdfs(): Promise<PdfResult[]> {
  return Promise.all(
    STATIC_PDF_URLS.map(async ({ url, page }) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch static PDF ${page}: ${response.statusText}`,
        );
      }
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      return { page, pdf: pdfDoc, type: "uploaded" as const };
    }),
  );
}

export async function POST(req: Request) {
  return createStreamingResponse(async (sendStatusUpdate) => {
    try {
      // Validate request
      if (!req.body) {
        throw new Error("Request body is required");
      }

      await sendStatusUpdate("Validating request data");
      const body = await req.json();
      const subcontractId = body.subcontractId;
      if (!subcontractId) {
        throw new Error("Invalid request body");
      }

      await sendStatusUpdate("Checking PDF cache status");
      // Check if we need to regenerate the PDF based on data hash
      const hashCheck = await fetchQuery(api.download.getSubcontractDataHash, {
        subcontractId,
      });

      if (!hashCheck) {
        throw new Error("Failed to check PDF cache status");
      }

      // If hash matches and PDF exists, return existing PDF
      if (!hashCheck.needsRegeneration) {
        await sendStatusUpdate("Fetching subcontract details");
        const subcontract = await fetchQuery(
          api.download.getSubcontractDetails,
          {
            subcontractId,
          },
        );
        if (!subcontract) {
          throw new Error("Subcontract not found");
        }

        // Return existing PDF if available
        if (subcontract.subcontract.fileUrl) {
          await sendStatusUpdate("Retrieving existing PDF");
          const response = await fetch(subcontract.subcontract.fileUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch existing PDF");
          }
          const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
          return await pdfDoc.save();
        }
      }

      await sendStatusUpdate("Fetching subcontract details");
      // const subcontract = await fetchQuery(api.download.getSubcontractDetails, {
      //   subcontractId,
      // });
      // if (!subcontract) {
      //   throw new Error("Subcontract not found");
      // }

      await sendStatusUpdate("Preparing contract data");
      // Prepare subcontract data using the data from hash check
      // const data: Subcontract = {
      //   ...hashCheck.pdfData,
      //   // Parse the address properly for the PDF template
      //   // subcontractor_address_line_1:
      //   //   hashCheck.pdfData.subcontractor_address_line_1,
      //   // subcontractor_address_line_2: "", // This will be empty as we don't have separate fields
      // };

      // Generate all PDFs in parallel
      await sendStatusUpdate("Generating PDFs");
      const [puppeteerPdfs, staticPdfs, attachmentPdfs] = await Promise.all([
        captureLatestPdfForDevice(hashCheck.pdfData),
        fetchAndLoadStaticPdfs(),
        fetchAndLoadAttachments(hashCheck.pdfData.attachments),
      ]);

      // Merge PDFs with progress updates
      await sendStatusUpdate("Merging PDF pages");
      const mergedDoc = await PDFDocument.create();

      const allPdfs = [...puppeteerPdfs, ...staticPdfs, ...attachmentPdfs].sort(
        (a, b) => a.page - b.page,
      );

      for (const pdfItem of allPdfs) {
        if (pdfItem.type === "puppeteer") {
          const tempDoc = await PDFDocument.load(pdfItem.pdf as Buffer);
          const pages = await mergedDoc.copyPages(
            tempDoc,
            Array.from(Array(tempDoc.getPageCount()).keys()),
          );
          pages.forEach((page) => mergedDoc.addPage(page));
        } else {
          const pages = await mergedDoc.copyPages(
            pdfItem.pdf as PDFDocument,
            Array.from(
              Array((pdfItem.pdf as PDFDocument).getPageCount()).keys(),
            ),
          );
          pages.forEach((page) => mergedDoc.addPage(page));
        }
      }

      const fileName = `${hashCheck.pdfData.subcontract_number}.pdf`;
      await sendStatusUpdate("Finalizing PDF document", fileName);

      // Generate the PDF
      const pdfBytes = await mergedDoc.save();

      // Upload the PDF to storage
      await sendStatusUpdate("Uploading PDF to storage");
      const uploadUrl = await fetchMutation(api.storage.generateUploadUrl);

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: pdfBytes,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload PDF to storage");
      }

      const { storageId } = await uploadResponse.json();

      // Get the file URL using the storage API
      const fileUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage?storageId=${storageId}`;

      // Update the hash and file URL in the database
      await fetchMutation(api.download.updateSubcontractPdfHash, {
        subcontractId,
        dataHash: hashCheck.currentHash,
        fileUrl,
      });

      return pdfBytes;
    } catch (error) {
      console.error("PDF generation error:", error);
      throw error;
    }
  });
}

function createStreamingResponse(
  processFunction: (
    sendStatusUpdate: (part: string, fileName?: string) => Promise<void>,
  ) => Promise<Uint8Array>,
): Response {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const sendStatusUpdate = async (part: string, fileName?: string) => {
    await writer.write(
      encoder.encode(
        JSON.stringify({
          status: "processing",
          part: part,
          fileName: fileName,
        }) + "\n",
      ),
    );
  };

  (async () => {
    try {
      const binaryData = await processFunction(sendStatusUpdate);
      if (!(binaryData instanceof Uint8Array)) {
        throw new Error("Invalid PDF data format");
      }

      const base64Data = Buffer.from(binaryData).toString("base64");
      await writer.write(
        encoder.encode(
          JSON.stringify({
            status: "done",
            data: base64Data,
          }) + "\n",
        ),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      await writer.write(
        encoder.encode(
          JSON.stringify({
            status: "error",
            message: errorMessage,
          }) + "\n",
        ),
      );
      console.error("Processing error:", error);
    } finally {
      await writer.close();
    }
  })().catch((error) => {
    console.error("Streaming error:", error);
    writer.abort(error);
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// page 1 - form puppeteer - 1
// page 2 - from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtvzjUqmCRWPagytV5M3p6rbcwz4GYL0OfZUJj
// page 3 - from puppeteer - 1
// page 4 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtz2INElf3uENDHWOCkmc9AjTYPgQdRrZBvMLq
// page 5 = from puppeteer - 1, 2(can be expanded depending on the data)
// https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtiMihI4bCA5IVl78jptQBGOhuTJDERswFczXv

// page 6 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtlkeAm4l1ryQSKePf4a9GuRjtACY1bsziVNO3
// page 7 = from puppeteer - 1, 2
// page 8 = from puppeteer - 1, 2,
// page 9 = from puppeteer - 1
// page 10 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZt5BSnmc4t2uKknqM0lwPgOBV3YpRQcvGDiSzE
// remamin from attacment
