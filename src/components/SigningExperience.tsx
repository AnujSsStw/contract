"use client";

import { useCallback, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PDFViewer } from "./PDFViewer";
import { SignatureCapture } from "./SignatureCapture";
import { blobToURL, convertPdfUrlToBase64 } from "@/lib/utils";
import { rgb } from "pdf-lib";
import { PDFDocument } from "pdf-lib";

interface SignatureData {
  pageNumber: number;
  type: "signature" | "text" | "date";
  data: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

interface Signer {
  _id: Id<"signers">;
  email: string;
  name?: string;
  status: "pending" | "signed";
}

interface SigningExperienceProps {
  pdfUrl: string;
  existingSignatures: SignatureData[];
  documentId: Id<"documents">;
  token: string;
  signer: Signer;
}

export function SigningExperience({
  pdfUrl,
  existingSignatures,
  documentId,
  token,
}: SigningExperienceProps) {
  const [signatures, setSignatures] =
    useState<SignatureData[]>(existingSignatures);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveSignature = useMutation(api.documents.saveSignature);
  const [pdf, setPdf] = useState<string | null>(null);
  const [originalPdfBase64, setOriginalPdfBase64] = useState<string | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  // Function to regenerate PDF with current signatures
  const regeneratePdf = useCallback(
    async (currentSignatures: SignatureData[]) => {
      if (!originalPdfBase64) return;

      const pdfDoc = await PDFDocument.load(originalPdfBase64);
      const pages = pdfDoc.getPages();
      const firstPage = pages[currentPage - 1];

      // Clear the page by redrawing it (this is a simple approach)
      // For a more sophisticated approach, you might want to store the original page content

      // Re-add all signatures
      for (const signature of currentSignatures) {
        if (signature.type === "signature") {
          const pngImage = await pdfDoc.embedPng(signature.data);
          const pngDims = pngImage.scale(scale * 0.3);
          firstPage.drawImage(pngImage, {
            x: signature.positionX,
            y: signature.positionY,
            width: pngDims.width,
            height: pngDims.height,
          });
        } else if (signature.type === "text") {
          firstPage.drawText(signature.data, {
            x: signature.positionX,
            y: signature.positionY,
            size: 20 * scale,
            color: rgb(0.074, 0.545, 0.262),
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)]);
      const URL = await blobToURL(blob);
      return URL as string;
    },
    [currentPage, originalPdfBase64, scale],
  );

  // Initialize PDF data when component mounts
  useEffect(() => {
    const initializePdf = async () => {
      try {
        const base64Data = await convertPdfUrlToBase64(pdfUrl);
        setOriginalPdfBase64(base64Data);
        const newPdfUrl = await regeneratePdf(existingSignatures);
        if (newPdfUrl) {
          setPdf(newPdfUrl);
        }
      } catch (error) {
        console.error("Failed to initialize PDF:", error);
      }
    };

    initializePdf();
  }, [existingSignatures, pdfUrl, regeneratePdf]);

  const handleSignatureAdd = async (signature: {
    type: "signature" | "text" | "date";
    data: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
  }) => {
    if (!pdf) {
      toast.error("Please initialize the PDF first");
      return;
    }

    const newSignature: SignatureData = {
      pageNumber: currentPage,
      ...signature,
    };

    const updatedSignatures = [...signatures, newSignature];
    setSignatures(updatedSignatures);

    // Regenerate PDF with all signatures
    const newPdfUrl = await regeneratePdf(updatedSignatures);
    if (newPdfUrl) {
      setPdf(newPdfUrl);
    }

    // toast.success("Signature added successfully!");
  };

  const removeSignature = async (index: number) => {
    const updatedSignatures = signatures.filter((_, i) => i !== index);
    setSignatures(updatedSignatures);

    // Regenerate PDF without the removed signature
    const newPdfUrl = await regeneratePdf(updatedSignatures);
    if (newPdfUrl) {
      setPdf(newPdfUrl);
    }

    toast.success("Signature removed");
  };

  const handleSubmit = async () => {
    if (signatures.length === 0) {
      toast.error("Please add at least one signature");
      return;
    }

    setIsSubmitting(true);
    try {
      await saveSignature({
        documentId,
        token,
        signatureData: signatures,
      });

      toast.success("Document signed successfully!");
    } catch (error) {
      console.error("Error saving signature:", error);
      toast.error("Failed to save signature");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* PDF Viewer */}
      <div className="lg:col-span-2">
        <div>
          {pdf && (
            <PDFViewer
              pdfUrl={pdf}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              scale={scale}
              setScale={setScale}
            />
          )}
        </div>
      </div>

      {/* Signature Panel */}
      <div className="space-y-6">
        {/* Signature Creation */}
        <SignatureCapture onSignatureAdd={handleSignatureAdd} />

        {/* Current Signatures */}
        {signatures.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {signatures.map((sig, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {sig.type === "signature"
                        ? "✍️ Signature"
                        : sig.type === "text"
                          ? "📝 Text"
                          : "📅 Date"}
                    </Badge>
                    <span className="text-sm font-medium">
                      {sig.type === "signature" ? "Drawn signature" : sig.data}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSignature(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || signatures.length === 0}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Sign Document
                </>
              )}
            </Button>
            {signatures.length === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Add at least one signature to continue
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
