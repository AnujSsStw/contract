import { ArrowLeft, Download, Edit, FileText, Trash } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SubcontractAttachmentsCard } from "@/components/subcontract-attachments-card";
import { SubcontractDetailsCard } from "@/components/subcontract-details-card";
import { SubcontractScopeCard } from "@/components/subcontract-scope-card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { SubcontractDownloadButton } from "@/components/subcontract-download-button";
export const metadata: Metadata = {
  title: "Subcontract Details | Construction Contract Generator",
  description: "View and manage subcontract details",
};

async function getSubcontractData(id: string) {
  const subcontract = await fetchQuery(
    api.subcontract.get,
    {
      subId: id as Id<"subcontracts">,
    },
    { token: await convexAuthNextjsToken() },
  );
  return subcontract;
}

export default async function SubcontractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const subcontract = await getSubcontractData(id);

  if (!subcontract) {
    return (
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" size="sm" className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold mb-4">Subcontract Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The subcontract you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Button asChild>
            <Link href="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm" className="mr-4">
            <Link href={`/projects/${subcontract.projectId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {subcontract.projectName}
              </h1>
            </div>
            <p className="text-muted-foreground">{subcontract.project?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Trash className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Subcontract</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this subcontract?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form
                  action={async () => {
                    "use server";

                    await fetchMutation(api.subcontract.deleteSubcontract, {
                      subId: id as Id<"subcontracts">,
                    });
                    redirect(`/`);
                  }}
                >
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {
            <Button asChild variant="outline">
              {/* /subcontracts/new?subId=${d}&step=0&projectId=${projectId} */}
              <Link
                href={`/subcontracts/new?subId=${id}&step=0&projectId=${subcontract.projectId}&fromEdit=true`}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          }
          {/* TODO: add download */}
          <SubcontractDownloadButton subcontractId={id} />
          {/* {subcontract.isDraft && (
            <Button asChild>
              <Link href={`/subcontracts/${id}/send`}>
                <Send className="mr-2 h-4 w-4" />
                Send for Signature
              </Link>
            </Button>
          )} */}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Subcontract Details
            </TabsTrigger>
            <TabsTrigger value="scope" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Scope of Work
            </TabsTrigger>
            <TabsTrigger
              value="attachments"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Attachments ({subcontract.attachments?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <SubcontractDetailsCard {...subcontract} />
          </TabsContent>

          <TabsContent value="scope">
            <SubcontractScopeCard scopes={subcontract.scopeOfWork} />
          </TabsContent>

          <TabsContent value="attachments">
            <SubcontractAttachmentsCard attachments={subcontract.attachments} />
          </TabsContent>
        </Tabs>
      </div>

      {/* <div className="space-y-6">
          <SubcontractHistoryCard subcontractId={params.id} />
        </div> */}
    </div>
  );
}
