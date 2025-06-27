"use client";

//TODO: what this page should do?
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function DocumentsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdfUrl: "",
    signers: [{ email: "", name: "" }],
  });

  const documents = useQuery(api.documents.getMyDocuments);
  const documentCreation = useMutation(api.documents.create);

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

  const handleCreateDocument = async () => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Please enter a document title");
      return;
    }
    if (!formData.pdfUrl.trim()) {
      toast.error("Please enter a PDF URL");
      return;
    }
    if (formData.signers.some((s) => !s.email.trim())) {
      toast.error("Please enter email addresses for all signers");
      return;
    }

    await documentCreation({
      title: formData.title,
      description: formData.description,
      originalPdfUrl: formData.pdfUrl,
      signers: formData.signers,
      subcontractId: undefined,
    });

    toast.success("Document created successfully");
    setIsCreateDialogOpen(false);
  };

  if (documents === undefined) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading documents...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage your documents and signing sessions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
            </DialogHeader>
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
                <Label htmlFor="pdfUrl">PDF URL</Label>
                <Input
                  id="pdfUrl"
                  value={formData.pdfUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, pdfUrl: e.target.value })
                  }
                  placeholder="Enter PDF URL"
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
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateDocument}>Create Document</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {documents && documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">
                      {doc.title || "Untitled Document"}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={
                      doc.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {doc.status === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {doc.description && (
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created {new Date(doc._creationTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  {doc.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first document to get started with digital signing
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
