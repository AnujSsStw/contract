"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Copy, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Id } from "@cvx/_generated/dataModel";

interface SendForSignatureButtonProps {
  projectName?: string;
  subcontractorName?: string;
  subcontractorEmail?: string;
  pdfUrl?: string;
  subcontractId: string;
}

export function SendForSignatureButton({
  projectName,
  subcontractorName,
  subcontractorEmail,
  pdfUrl,
  subcontractId,
}: SendForSignatureButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [signingLinks, setSigningLinks] = useState<
    Array<{
      email: string;
      name?: string;
      url: string;
    }>
  >([]);
  const [formData, setFormData] = useState({
    title: `${projectName || "Subcontract"} - ${subcontractorName || "Contractor"}`,
    description: `Please review and sign the subcontract for ${projectName || "this project"}`,
    signers: [
      {
        email: subcontractorEmail || "",
        name: subcontractorName || "",
      },
      {
        email: "",
        name: "",
      },
    ],
  });

  const createDocument = useMutation(api.documents.create);

  const addSigner = () => {
    setFormData({
      ...formData,
      signers: [...formData.signers, { email: "", name: "" }],
    });
  };

  const removeSigner = (index: number) => {
    if (formData.signers.length > 1) {
      setFormData({
        ...formData,
        signers: formData.signers.filter((_, i) => i !== index),
      });
    }
  };

  const updateSigner = (
    index: number,
    field: "email" | "name",
    value: string,
  ) => {
    const newSigners = [...formData.signers];
    newSigners[index][field] = value;
    setFormData({
      ...formData,
      signers: newSigners,
    });
  };

  const handleSendForSignature = async () => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Please enter a document title");
      return;
    }
    if (formData.signers.some((s) => !s.email.trim())) {
      toast.error("Please enter email addresses for all signers");
      return;
    }

    setIsCreating(true);
    try {
      // First, we need to get the PDF URL for the subcontract
      // For now, we'll use a placeholder URL - in a real implementation,
      // you'd generate the PDF and get its URL
      if (!pdfUrl) {
        toast.error("Failed to get PDF URL");
        return;
      }

      const result = await createDocument({
        originalPdfUrl: pdfUrl,
        signers: formData.signers,
        title: formData.title,
        description: formData.description,
        subcontractId: subcontractId as Id<"subcontracts">,
      });

      setSigningLinks(result.signingLinks);
      toast.success(
        "Document created successfully! Share the signing links below.",
      );
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document for signing");
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Send for Signature
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send for Signature</DialogTitle>
          <DialogDescription>
            Create a signing session for this subcontract. All parties will
            receive unique signing links.
          </DialogDescription>
        </DialogHeader>

        {signingLinks.length === 0 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter document title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter document description"
              />
            </div>
            <div>
              <Label>Signers</Label>
              <div className="space-y-2">
                {formData.signers.map((signer, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Email"
                      value={signer.email}
                      onChange={(e) =>
                        updateSigner(index, "email", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Name (optional)"
                      value={signer.name}
                      onChange={(e) =>
                        updateSigner(index, "name", e.target.value)
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSigner(index)}
                      disabled={formData.signers.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addSigner}
                  className="w-full"
                >
                  Add Signer
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendForSignature} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Create Signing Session
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Signing session created successfully!
              </span>
            </div>

            <div>
              <Label>Signing Links</Label>
              <div className="space-y-3 mt-2">
                {signingLinks.map((link, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">
                          {link.name || "Unnamed"}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({link.email})
                        </span>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Input value={link.url} readOnly className="text-sm" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> Share these signing links with the
                respective parties. Each person will receive a unique link to
                sign the document. You&apos;ll be notified when all parties have
                completed their signatures.
              </p>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
