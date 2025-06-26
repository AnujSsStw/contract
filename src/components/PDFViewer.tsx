"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// @import url("react-pdf/dist/esm/Page/AnnotationLayer.css");
// @import url("react-pdf/dist/esm/Page/TextLayer.css");

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
  pdfUrl: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number) => void;
}

export function PDFViewer({
  pdfUrl,
  currentPage,
  setCurrentPage,
  scale,
  setScale,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const documentRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error loading PDF:", error);
  }, []);

  const onPageLoadSuccess = useCallback(
    (page: { originalWidth: number; originalHeight: number }) => {
      if (page && documentRef.current) {
        // TODO: add the signatures to the page
      }
    },
    [],
  );

  const goToPreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, numPages));
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.5));
  };

  // const generateSignedPdf = async () => {
  //   if (!pageDetails || !documentRef.current || !pdf) return;

  //   setIsGenerating(true);
  //   try {
  //     // Convert base64 back to array buffer
  //     const base64String = pdf.replace(/^data:application\/pdf;base64,/, "");
  //     const byteCharacters = atob(base64String);
  //     const byteNumbers = new Array(byteCharacters.length);

  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }

  //     const pdfArrayBuffer = new Uint8Array(byteNumbers).buffer;

  //     // Load the PDF document
  //     const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
  //     const pages = pdfDoc.getPages();

  //     // Combine all signatures
  //     const allSignatures = [...existingSignatures, ...currentSignatures];

  //     // Process each signature
  //     for (const signature of allSignatures) {
  //       const pageIndex = signature.pageNumber - 1; // Convert to 0-based index
  //       if (pageIndex >= 0 && pageIndex < pages.length) {
  //         const page = pages[pageIndex];

  //         if (signature.type === "signature") {
  //           // Draw signature as text or simple graphics
  //           page.drawText("✍️", {
  //             x: signature.positionX,
  //             y: page.getHeight() - signature.positionY - 20,
  //             size: 16,
  //             color: rgb(0, 0, 0),
  //           });

  //           // Add a border around the signature area
  //           page.drawRectangle({
  //             x: signature.positionX - 2,
  //             y: page.getHeight() - signature.positionY - signature.height - 2,
  //             width: signature.width + 4,
  //             height: signature.height + 4,
  //             borderWidth: 1,
  //             borderColor: rgb(0, 0, 0),
  //             color: rgb(1, 1, 1), // White fill
  //           });
  //         } else if (signature.type === "text" || signature.type === "date") {
  //           // Draw text
  //           page.drawText(signature.data, {
  //             x: signature.positionX,
  //             y: page.getHeight() - signature.positionY,
  //             size: 12,
  //             color: rgb(0, 0, 0),
  //           });

  //           // Add a border around text areas
  //           page.drawRectangle({
  //             x: signature.positionX - 2,
  //             y: page.getHeight() - signature.positionY - signature.height - 2,
  //             width: signature.width + 4,
  //             height: signature.height + 4,
  //             borderWidth: 1,
  //             borderColor: rgb(0, 0, 0),
  //             color: rgb(1, 1, 1), // White fill
  //           });
  //         }
  //       }
  //     }

  //     // Save the PDF
  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: "application/pdf" });
  //     const url = URL.createObjectURL(blob);

  //     setGeneratedPdfUrl(url);
  //     onPdfGenerated?.(url);
  //   } catch (error) {
  //     console.error("Error generating signed PDF:", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const downloadSignedPdf = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "signed-document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Document Preview</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Page {currentPage} of {numPages}
            </Badge>
            <Badge variant="secondary">{Math.round(scale * 100)}%</Badge>

            {pdfUrl && (
              <Button variant="outline" size="sm" onClick={downloadSignedPdf}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* PDF Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div
            ref={documentRef}
            className="border rounded-lg overflow-auto bg-gray-50 flex justify-center"
          >
            <div className="relative">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center py-8 text-red-600">
                    <p>Failed to load PDF. Please check the URL.</p>
                  </div>
                }
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  onLoadSuccess={onPageLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  }
                />
              </Document>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Existing signatures</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Your signatures</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
