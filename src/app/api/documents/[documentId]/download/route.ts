import { NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { PDFDocument, rgb } from "pdf-lib";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> },
) {
  try {
    const { documentId } = await params;
    const documentIdTyped = documentId as Id<"documents">;

    // Get document details
    const document = await fetchQuery(api.documents.getById, {
      documentId: documentIdTyped,
    });
    if (!document) {
      return new Response("Document not found", { status: 404 });
    }

    if (document.status !== "completed") {
      return new Response("Document is not fully signed", { status: 400 });
    }

    // Get all signature data for the document
    const signatureData = await fetchQuery(
      api.documents.getSignatureDataByDocument,
      { documentId: documentIdTyped },
    );
    if (!signatureData) {
      return new Response("Failed to fetch signature data", { status: 500 });
    }

    // Download the original PDF
    const pdfResponse = await fetch(document.originalPdfUrl);
    if (!pdfResponse.ok) {
      return new Response("Failed to fetch original PDF", { status: 500 });
    }

    const pdfBytes = await pdfResponse.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get all pages
    const pages = pdfDoc.getPages();

    // Add signatures to the PDF
    for (const signerData of signatureData) {
      for (const signature of signerData.signatureData) {
        const pageIndex = signature.pageNumber - 1; // Convert to 0-based index
        if (pageIndex >= 0 && pageIndex < pages.length) {
          const page = pages[pageIndex];

          if (signature.type === "signature") {
            // Handle drawn signature (base64 image)
            try {
              const imageBytes = Buffer.from(
                signature.data.split(",")[1],
                "base64",
              );
              const image = await pdfDoc.embedPng(imageBytes);

              page.drawImage(image, {
                x: signature.positionX,
                y: signature.positionY,
                width: signature.width,
                height: signature.height,
              });
            } catch (error) {
              console.error("Error embedding signature image:", error);
            }
          } else if (signature.type === "text" || signature.type === "date") {
            // Handle text signatures
            page.drawText(signature.data, {
              x: signature.positionX,
              y: signature.positionY,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
        }
      }
    }

    // Save the PDF
    const signedPdfBytes = await pdfDoc.save();

    // Return the signed PDF
    return new Response(signedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="signed-${document.title || "document"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating signed PDF:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
