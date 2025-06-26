import { Button } from "@/components/ui/button";
import {
  Building2,
  FileCodeIcon as FileContract,
  Plus,
  FileText,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { NewSubcontractButton } from "@/components/new-subcontract-button";
import { ProjectCard } from "@/components/project-card";
import { SubcontractCard } from "@/components/subcontract-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@cvx/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { createNewSubcontract } from "./action";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "Dashboard | Construction Contract Generator",
  description: "View your projects and subcontracts",
};

export default async function Home() {
  const data = await fetchQuery(api.projects.getAll, {});
  const subcontractsData = await fetchQuery(api.subcontract.getAll, {});
  const documentsData = await fetchQuery(
    api.documents.getMyDocuments,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );

  return (
    <>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects, subcontracts, and documents
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <NewSubcontractButton title="New Subcontract" />
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="subcontracts"
              className="flex items-center gap-2"
            >
              <FileContract className="h-4 w-4" />
              Subcontracts
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.reverse().map((project) => (
                <ProjectCard
                  key={project._id}
                  name={project.name}
                  number={project.number}
                  address={project.address}
                  client={project.clientName}
                  subcontractCount={project.subcontractCount}
                  projectId={project._id}
                />
              ))}
              <Card className="flex flex-col items-center justify-center h-full min-h-[220px] border-dashed">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <Button asChild variant="secondary">
                    <Link href="/projects/new">Create New Project</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subcontracts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcontractsData.reverse().map((subcontract) => (
                <SubcontractCard
                  key={subcontract._id}
                  id={subcontract._id}
                  title={subcontract.projectName || ""}
                  projectName={
                    data.find((p) => p._id === subcontract.projectId)?.name ||
                    ""
                  }
                  subcontractor={subcontract.companyName || ""}
                  value={subcontract.contractValue || 0}
                  status={subcontract.isDraft ? "draft" : "exported"}
                  projectId={subcontract.projectId ?? ""}
                />
              ))}
              <Card className="flex flex-col items-center justify-center h-full min-h-[220px] border-dashed">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>

                  <Button
                    onClick={createNewSubcontract.bind(null, undefined)}
                    variant="secondary"
                  >
                    Generate New Subcontract
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentsData && documentsData.length > 0 ? (
                documentsData.map((doc) => (
                  <Card
                    key={doc._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">
                            {doc.title || "Untitled Document"}
                          </h3>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            doc.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </div>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground mb-4">
                          {doc.description}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <Link href={`/documents`}>View Details</Link>
                        </Button>
                        {doc.status === "completed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/api/documents/${doc._id}/download`}>
                              Download
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="flex flex-col items-center justify-center h-full min-h-[220px] border-dashed">
                  <CardContent className="flex flex-col items-center justify-center pt-6">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No documents yet
                    </p>
                    <Button asChild variant="secondary">
                      <Link href="/documents">Manage Documents</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
