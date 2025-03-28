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
  // const gen = useMutation(api.storage.generateUploadUrl);
  // const addSubcontractUrl = useMutation(api.download.addSubcontractUrl);

  const handleDownload = async () => {
    setIsDownloading(true);
    const res = await fetch(`/api/pdf`, {
      method: "POST",
      body: JSON.stringify({ subcontractId }),
    });
    // Create a blob from the response
    const blob = await res.blob();

    // Create a URL for immediate download
    const downloadUrl = URL.createObjectURL(blob);

    // create a an anchor tag and click it to download the file
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "subcontract.pdf";
    a.click();

    toast.warning("Uploading to storage is disabled for now");
    // In parallel, upload the PDF to storage for future use
    // try {
    //   const generateUploadUrl = await gen();
    //   const result = await fetch(generateUploadUrl, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/pdf" },
    //     body: blob,
    //   });

    //   if (result.ok) {
    //     const { storageId } = await result.json();
    //     const storageUrl = new URL(
    //       `${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`,
    //     );
    //     storageUrl.searchParams.set("storageId", storageId as Id<"_storage">);

    //     await addSubcontractUrl({
    //       subcontractId: subcontractId as Id<"subcontracts">,
    //       url: storageUrl.href,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Failed to store PDF for future use:", error);
    //   // Continue with download even if storage fails
    // }

    setIsDownloading(false);
  };
  return (
    <Button variant="outline" disabled={isDownloading} onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? "Downloading..." : "Download"}
    </Button>
  );
}
