"use client";

import * as React from "react";
import { FileUp, Paperclip, Trash, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormData } from "@/components/subcontract-wizard";
import { useMutation } from "convex/react";
import { api } from "@cvx/_generated/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Id } from "@cvx/_generated/dataModel";
interface AttachmentsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface Attachment {
  id: string;
  order: number;
  name: string;
  size: number;
  type: string;
  url: string | null;
  file?: File;
}

export function AttachmentsStep({
  formData,
  updateFormData,
}: AttachmentsStepProps) {
  const [attachments, setAttachments] = React.useState<Attachment[]>(
    formData.attachments || [],
  );
  const [isUploading, setIsUploading] = React.useState(false);
  const removeFile = useMutation(api.storage.removeFile);
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map((file, index) => ({
        id: Math.random().toString(36).substring(2, 9),
        order: index,
        name: file.name,
        size: file.size,
        type: file.type,
        url: null,
        file,
      }));

      const updatedAttachments = [...attachments, ...newAttachments];
      setAttachments(updatedAttachments);
      updateFormData({
        ...formData,
        attachments: updatedAttachments,
      });
    }
  };

  const uploadAttachment = async (attachment: Attachment) => {
    if (!attachment.file || attachment.url) return null;

    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": attachment.type },
        body: attachment.file,
      });

      if (result.ok) {
        const { storageId } = await result.json();
        return {
          id: attachment.id,
          storageId,
        };
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast.error(`Failed to upload ${attachment.name}`);
    }
    return null;
  };

  const uploadAllPending = async () => {
    setIsUploading(true);
    const pendingAttachments = attachments.filter((a) => !a.url);
    try {
      const results = await Promise.all(
        pendingAttachments.map(uploadAttachment),
      );

      // Filter out null results and update all attachments at once
      const successfulUploads = results.filter(
        (r): r is { id: string; storageId: string } => r !== null,
      );

      if (successfulUploads.length > 0) {
        const updatedAttachments = attachments.map((attachment) => {
          const upload = successfulUploads.find((u) => u.id === attachment.id);
          if (upload) {
            return { ...attachment, url: upload.storageId };
          }
          return attachment;
        });

        setAttachments(updatedAttachments);
        updateFormData({
          ...formData,
          attachments: updatedAttachments,
        });

        if (successfulUploads.length === pendingAttachments.length) {
          toast.success("All files uploaded successfully");
        } else {
          toast.success(
            `${successfulUploads.length} of ${pendingAttachments.length} files uploaded successfully`,
          );
        }
      }
    } catch (error) {
      console.error("Failed to upload files:", error);
      toast.error("Failed to upload some files");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachment = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this attachment?")) {
      const attachment = attachments.find((a) => a.id === id);
      console.log("Attachments", attachments);

      console.log("Removing file", attachment);
      if (!attachment) return;
      if (attachment.url) {
        console.log("Removing file", attachment.url);
        await removeFile({
          fileId: attachment.url as Id<"_storage">,
        });
      }
      const updatedAttachments = attachments.filter(
        (attachment) => attachment.id !== id,
      );
      setAttachments(updatedAttachments);
      updateFormData({
        ...formData,
        attachments: updatedAttachments,
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Upload Attachments</Label>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Upload project schedules, drawings, specifications, or other
                relevant files
              </p>
              <div className="flex items-center justify-center">
                <Label
                  htmlFor="attachment-upload"
                  className="relative cursor-pointer rounded-md bg-background px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/5"
                >
                  <span>Choose files</span>
                  <Input
                    id="attachment-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Uploaded Attachments</Label>
            {attachments.some((a) => !a.url) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={uploadAllPending}
                className="flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                <FileUp className="h-4 w-4" />
                Upload Selected Files
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className={cn(
                  "flex items-center justify-between p-3 border rounded-md",
                  attachment.url && "border-green-500",
                  isUploading && "opacity-50",
                )}
              >
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                      {!attachment.url && " (Pending Upload)"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={async () => {
                    await removeAttachment(attachment.id);
                  }}
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
