"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Copy, Users } from "lucide-react";
import { api } from "@cvx/_generated/api";
import { useQuery } from "convex/react";
import { Id, Doc } from "@cvx/_generated/dataModel";
import { toast } from "sonner";

// Separate component for each document to handle signers query
function DocumentItem({ doc }: { doc: Doc<"documents"> }) {
  const signers = useQuery(api.documents.getSignersByDocument, {
    documentId: doc._id,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const generateSigningLink = (documentId: string, signingToken: string) => {
    return `${window.location.origin}/sign/${documentId}?token=${signingToken}`;
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium">{doc.title}</h4>
        <p className="text-sm text-muted-foreground">{doc.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={doc.status === "completed" ? "default" : "secondary"}>
            {doc.status === "completed" ? "Completed" : "Pending"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(doc._creationTime).toLocaleDateString()}
          </span>
        </div>

        {/* Show signer links for pending documents */}
        {doc.status === "pending" && signers && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Signing Links</span>
            </div>
            <div className="space-y-2">
              {signers.map((signer) => (
                <div key={signer._id} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {signer.name || signer.email}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {signer.email}
                    </div>
                  </div>
                  <Badge
                    variant={signer.status === "signed" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {signer.status === "signed" ? "Signed" : "Pending"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        generateSigningLink(doc._id, signer.signingToken),
                      )
                    }
                    className="h-6 px-2"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        {doc.status === "completed" && (
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const response = await fetch(
                `/api/documents/${doc._id}/download`,
              );
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function SubcontractDocumentsCard({
  subcontractId,
}: {
  subcontractId: string;
}) {
  const documents = useQuery(api.documents.getDocumentsBySubcontractId, {
    subcontractId: subcontractId as Id<"subcontracts">,
  });

  if (!documents) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No documents yet</h3>
        <p className="text-muted-foreground mb-4">
          Create a signing session to send this subcontract for signature
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Related Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocumentItem key={doc._id} doc={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
