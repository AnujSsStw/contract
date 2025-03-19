import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SubcontractWizard } from "@/components/subcontract-wizard";

export const metadata: Metadata = {
  title: "Generate New Subcontract | Construction Contract Generator",
  description: "Create a new subcontract agreement",
};

export default async function NewSubcontractPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const step = (await searchParams).step as string | undefined;
  const subId = (await searchParams).subId as string | undefined;
  const projectId = (await searchParams).projectId as string | undefined;
  const fromEdit = (await searchParams).fromEdit as string | undefined;

  if (!subId && !projectId) {
    redirect("/");
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="sm" className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Generate New Subcontract
        </h1>
      </div>

      <SubcontractWizard
        step={step}
        subId={subId}
        projectId={projectId}
        fromEdit={fromEdit}
      />
    </div>
  );
}
