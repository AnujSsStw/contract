"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Paperclip } from "lucide-react";
import { DataModel, Id } from "@cvx/_generated/dataModel";
interface SubcontractAttachmentsCardProps {
  attachments: DataModel["subcontracts"]["document"]["attachments"] | undefined;
}

export function SubcontractAttachmentsCard({
  attachments,
}: SubcontractAttachmentsCardProps) {
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else if (type.includes("spreadsheet") || type.includes("excel")) {
      return <FileText className="h-4 w-4 text-green-500" />;
    } else if (type.includes("word") || type.includes("document")) {
      return <FileText className="h-4 w-4 text-blue-500" />;
    } else {
      return <Paperclip className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attachments</CardTitle>
        <CardDescription>Files attached to this subcontract</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attachments?.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.type)}
                <div>
                  <p className="text-sm font-medium">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const getImageUrl = new URL(
                      `${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`,
                    );
                    getImageUrl.searchParams.set(
                      "storageId",
                      attachment.url as Id<"_storage">,
                    );

                    const url = getImageUrl.href;
                    window.open(url, "_blank");
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const getImageUrl = new URL(
                      `${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`,
                    );
                    getImageUrl.searchParams.set(
                      "storageId",
                      attachment.url as Id<"_storage">,
                    );

                    const url = getImageUrl.href;
                    const a = document.createElement("a");
                    a.setAttribute("target", "_blank");
                    a.href = url;
                    a.download = attachment.name;
                    a.click();
                  }}
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          ))}

          {attachments?.length === 0 && (
            <div className="text-center p-8 border rounded-md">
              <p className="text-muted-foreground">
                No attachments added to this subcontract
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
