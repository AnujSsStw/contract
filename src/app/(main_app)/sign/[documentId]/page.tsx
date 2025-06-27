"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { SigningExperience } from "@/components/SigningExperience";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function SignPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const documentId = params.documentId as Id<"documents">;
  const token = searchParams.get("token");
  const user = useQuery(api.user.getUser);

  // Get document details
  const document = useQuery(api.documents.getById, { documentId });

  // Get signer details
  const signer = useQuery(api.documents.getSignerByToken, {
    documentId,
    token: token || "",
  });

  // Get all signature data for the document
  const signatureData = useQuery(api.documents.getSignatureDataByDocument, {
    documentId,
  });

  if (!token) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Invalid Signing Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This signing link is invalid. Please check the URL and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (
    document === undefined ||
    signer === undefined ||
    signatureData === undefined
  ) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading document...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!document || !signer) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Document Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The document or signing link could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (signer.status === "signed") {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Document Already Signed
              <Badge variant="secondary">Completed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>This document has already been signed by {signer.email}.</p>
            {document.title && (
              <p className="mt-2 text-sm text-muted-foreground">
                Document: {document.title}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter out current signer's data to show only other signers' signatures
  const existingSignatures =
    signatureData
      // ?.filter((item) => item.signer._id !== signer._id)
      .flatMap((item) => item.signatureData) || [];
  console.log("existingSignatures", existingSignatures);

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Sign Document</span>
            <Badge variant="outline">
              {document.status === "completed" ? "Completed" : "Pending"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {document.title && (
            <p className="text-lg font-medium">{document.title}</p>
          )}
          {document.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {document.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            Signing as: {signer.name || signer.email}
          </p>
        </CardContent>
      </Card>

      <SigningExperience
        pdfUrl={document.originalPdfUrl}
        existingSignatures={existingSignatures}
        documentId={documentId}
        token={token}
        signer={signer}
        isParyani={user?.email === signer.email}
      />
    </div>
  );
}
