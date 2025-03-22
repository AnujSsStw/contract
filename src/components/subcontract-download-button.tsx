"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
export function SubcontractDownloadButton({
  subcontractId,
}: {
  subcontractId: string;
}) {
  const action = useAction(api.download.download);

  const handleDownload = async () => {
    const response = await action({
      subcontractId: subcontractId as Id<"subcontracts">,
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  return (
    <Button variant="outline" onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
}
