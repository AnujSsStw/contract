"use client";

import { Button } from "@/components/ui/button";
// import { api } from "@cvx/_generated/api";
// import { Id } from "@cvx/_generated/dataModel";
// import { useMutation } from "convex/react";

import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SubcontractDownloadButton({
  subcontractId,
}: {
  subcontractId: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  // const gen = useMutation(api.storage.generateUploadUrl);
  // const addSubcontractUrl = useMutation(api.download.addSubcontractUrl);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(`/api/pdf`, {
        method: "POST",
        body: JSON.stringify({ subcontractId }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      let pdfBase64: string | null = null;
      let accumulatedChunk = "";
      let fileName: string | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Accumulate the chunks
        accumulatedChunk += new TextDecoder().decode(value);

        // Try to process complete JSON objects
        while (accumulatedChunk.includes("\n")) {
          const newlineIndex = accumulatedChunk.indexOf("\n");
          const line = accumulatedChunk.slice(0, newlineIndex);
          accumulatedChunk = accumulatedChunk.slice(newlineIndex + 1);

          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.status === "processing") {
                fileName = data.fileName;
                setProgress(data.part);
              } else if (data.status === "done") {
                pdfBase64 = data.data;
              } else if (data.status === "error") {
                throw new Error(data.message);
              }
            } catch (e) {
              console.error("Error parsing chunk:", e);
              // If we hit a parsing error, clear the accumulated chunk to avoid cascading errors
              accumulatedChunk = "";
            }
          }
        }
      }

      // Process any remaining data
      if (accumulatedChunk.trim()) {
        try {
          const data = JSON.parse(accumulatedChunk);
          if (data.status === "done") {
            pdfBase64 = data.data;
          }
        } catch (e) {
          console.error("Error parsing final chunk:", e);
        }
      }

      if (!pdfBase64) {
        throw new Error("No PDF data received");
      }

      // Convert base64 to blob
      const pdfBlob = new Blob([Buffer.from(pdfBase64, "base64")], {
        type: "application/pdf",
      });

      // Create a URL for immediate download
      const downloadUrl = URL.createObjectURL(pdfBlob);

      // Create an anchor tag and click it to download the file
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName || "subcontract.pdf";
      a.click();

      // Cleanup
      URL.revokeObjectURL(downloadUrl);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to download PDF",
      );
    } finally {
      setIsDownloading(false);
      setProgress("");
    }
  };

  return (
    <Button variant="outline" disabled={isDownloading} onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? progress || "Starting download..." : "Download"}
    </Button>
  );
}
