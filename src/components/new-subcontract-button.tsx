"use client";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { createNewSubcontract } from "@/app/(main_app)/action";

export function NewSubcontractButton({
  title,
  projectId,
}: {
  title: string;
  projectId?: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await createNewSubcontract(projectId);
        setLoading(false);
      }}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      {title}
    </Button>
  );
}
