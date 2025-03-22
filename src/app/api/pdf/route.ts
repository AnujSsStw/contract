import chromium from "@sparticuz/chromium-min";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer-core";
import { Subcontract } from "@/app/(pdf)/latest/types";
const isDev = process.env.NODE_ENV === "development";
import { api } from "@cvx/_generated/api";
import { fetchQuery } from "convex/nextjs";

const chromiumPack =
  "https://github.com/Sparticuz/chromium/releases/download/v126.0.0/chromium-v126.0.0-pack.tar";
const localChromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function captureLatestPdfForDevice(updateState: Subcontract) {
  const browser = await puppeteer.launch({
    args: isDev
      ? [
          ...puppeteer.defaultArgs(),
          "--hide-scrollbars",
          "--disable-web-security",
        ]
      : chromium.args,
    // See https://www.npmjs.com/package/@sparticuz/chromium#running-locally--headlessheadful-mode for local executable path
    executablePath: isDev
      ? localChromePath
      : await chromium.executablePath(chromiumPack),
    headless: true,
  });

  console.log("browser launched");

  // TODO: setup page dimensions based on device model

  const jsonStr = JSON.stringify(updateState);
  const base64State = Buffer.from(jsonStr).toString("base64");

  const serverUrl = isDev
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL}`;

  const finalUrls = [
    {
      url: `${serverUrl}/latest?state=${base64State}&page=1`,
      page: 1,
    },
    {
      url: `${serverUrl}/latest?state=${base64State}&page=3`,
      page: 3,
    },
    {
      url: `${serverUrl}/latest?state=${base64State}&page=5`,
      page: 5,
    },
    {
      url: `${serverUrl}/latest?state=${base64State}&page=7`,
      page: 7,
    },
    {
      url: `${serverUrl}/latest?state=${base64State}&page=8`,
      page: 8,
    },
    {
      url: `${serverUrl}/latest?state=${base64State}&page=9`,
      page: 9,
    },
  ];
  console.log("finalUrls", finalUrls);

  // Add emulation of print media
  // await page.emulateMediaType("print");

  const pdfs = await Promise.all(
    finalUrls.map(async (url) => {
      const page = await browser.newPage();
      await page.goto(url.url, {
        waitUntil: "networkidle0",
      });

      const pdf = await page.pdf({
        format: "LETTER",
        printBackground: true,
        margin: {
          top: "50px",
          right: "50px",
          bottom: "50px",
          left: "50px",
        },
      });
      await page.close();
      return {
        page: url.page,
        pdf: pdf,
      };
    }),
  );

  console.log("browser pdf captured");

  await browser.close();

  return pdfs;
}

export async function POST(req: Request) {
  const { subcontractId } = await req.json();
  const subcontract = await fetchQuery(api.download.getSubcontractDetails, {
    subcontractId,
  });

  if (!subcontract) {
    return new Response("Subcontract not found", { status: 404 });
  }
  const date = new Date(
    subcontract.subcontract._creationTime,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const data: Subcontract = {
    architect_name: subcontract.project.architect,
    bond_needed: subcontract.project.bondsRequired === true ? "Yes" : "No",
    date,
    subcontractor_name: subcontract.subcontract.contactName || "",
    subcontractor_address_line_1: subcontract.subcontract.companyAddress || "",
    subcontractor_address_line_2: "",
    subcontractor_phone: subcontract.subcontract.contactPhone || "",
    contract_value: subcontract.subcontract.contractValueText || "",
    cost_breakdown: [],
    cost_code: subcontract.subcontract.costCodeData?.map((c) => c.code) || [],
    exclusion: [],
    project_name: subcontract.project.name,
    project_address: subcontract.project.address,
    project_generated_user: subcontract.user.name || "",
    project_generated_user_email: subcontract.user.email || "",
    project_number: `${subcontract.project.number}-${subcontract.subcontract.costCodeData?.map((c) => c.code).join("-")}`,
    scope_of_work:
      subcontract.subcontract.scopeOfWork?.map((s) => s.text) || [],
    subcontract_number: subcontract.subcontract._id.toString() || "",
    project_owner_client_legal_name: subcontract.project.clientLegalEntity,
  };

  const pdf = await captureLatestPdfForDevice(data);
  const uploadedPdfUrls = [
    {
      url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtvzjUqmCRWPagytV5M3p6rbcwz4GYL0OfZUJj",
      page: 2,
    },
    {
      url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtz2INElf3uENDHWOCkmc9AjTYPgQdRrZBvMLq",
      page: 4,
    },
    {
      url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtlkeAm4l1ryQSKePf4a9GuRjtACY1bsziVNO3",
      page: 6,
    },
    {
      url: "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZt5BSnmc4t2uKknqM0lwPgOBV3YpRQcvGDiSzE",
      page: 10,
    },
  ];

  const uploadedPdf = await Promise.all(
    uploadedPdfUrls.map(async (url) => {
      const uploadedPdf = await fetch(url.url).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(uploadedPdf);
      return {
        page: url.page,
        pdf: pdfDoc,
      };
    }),
  );

  // Create a new PDF document to merge all pages
  const mergedDoc = await PDFDocument.create();

  // Create an array of all PDFs with their page numbers
  const allPdfs = [
    ...pdf.map((p) => ({
      page: p.page,
      pdf: Buffer.from(p.pdf),
      type: "puppeteer" as const,
    })),
    ...uploadedPdf.map((p) => ({
      page: p.page,
      pdf: p.pdf,
      type: "uploaded" as const,
    })),
  ].sort((a, b) => a.page - b.page); // Sort by page number

  // Merge PDFs in order
  for (const pdfItem of allPdfs) {
    if (pdfItem.type === "puppeteer") {
      // For puppeteer-generated PDFs (they're already in Buffer format)
      const tempDoc = await PDFDocument.load(pdfItem.pdf);
      const pageCount = tempDoc.getPageCount();
      const pages = await mergedDoc.copyPages(
        tempDoc,
        Array.from(Array(pageCount).keys()),
      );
      pages.forEach((page) => mergedDoc.addPage(page));
    } else {
      // For uploaded PDFs (they're already PDFDocument instances)
      const pageCount = pdfItem.pdf.getPageCount();
      const pages = await mergedDoc.copyPages(
        pdfItem.pdf,
        Array.from(Array(pageCount).keys()),
      );
      pages.forEach((page) => mergedDoc.addPage(page));
    }
  }

  // Save the final merged PDF
  const mergedPdf = await mergedDoc.save();

  return new Response(mergedPdf);
}

// page 1 - form puppeteer - 1
// page 2 - from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtvzjUqmCRWPagytV5M3p6rbcwz4GYL0OfZUJj
// page 3 - from puppeteer - 1
// page 4 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtz2INElf3uENDHWOCkmc9AjTYPgQdRrZBvMLq
// page 5 = from puppeteer - 1, 2(can be expanded depending on the data)
// page 6 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZtlkeAm4l1ryQSKePf4a9GuRjtACY1bsziVNO3
// page 7 = from puppeteer - 1, 2
// page 8 = from puppeteer - 1, 2,
// page 9 = from puppeteer - 1
// page 10 = from pdf-lib - https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZt5BSnmc4t2uKknqM0lwPgOBV3YpRQcvGDiSzE
// remamin from attacment
