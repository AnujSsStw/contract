import {
  ArrowLeft,
  Building2,
  Edit,
  FileCodeIcon as FileContract,
  Plus,
  Trash,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { NewSubcontractButton } from "@/components/new-subcontract-button";
import { deleteProject } from "@/components/project-card";
import { ProjectDetailsCard } from "@/components/project-details-card";
import { SubcontractCard } from "@/components/subcontract-card";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";

export const metadata: Metadata = {
  title: "Project Details | Construction Contract Generator",
  description: "View and manage project details",
};

async function getProjectData(id: Id<"projects">) {
  const preloaded = await preloadQuery(api.projects.getById, { id });

  const data = preloadedQueryResult(preloaded);

  return data;
}

async function getProjectSubcontracts(projectId: Id<"projects">) {
  const preloaded = await preloadQuery(api.subcontract.getByProjectId, {
    projectId,
  });

  const data = preloadedQueryResult(preloaded);

  return data;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: Id<"projects"> }>;
}) {
  const projectId = (await params).id;
  const project = await getProjectData(projectId);
  const subcontracts = await getProjectSubcontracts(projectId);

  if (!project) {
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
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // const statusColors = {
  //   active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  //   planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  //   completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  // };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm" className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h1>
              {/* <Badge
                className={
                  statusColors[project.status as keyof typeof statusColors]
                }
              >
                {(project.status?.charAt(0).toUpperCase() || "Unknown") +
                  (project.status?.slice(1) || "")}
              </Badge> */}
            </div>
            <p className="text-muted-foreground">
              {project.number} • {project.clientName}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this project?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form
                  action={async () => {
                    "use server";
                    await deleteProject(projectId);
                  }}
                >
                  <Button type="submit" variant="destructive">
                    Delete Project
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button asChild variant="outline">
            <Link href={`/projects/new?id=${project._id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Link>
          </Button>
          <NewSubcontractButton
            title="New Subcontract"
            projectId={project._id}
          />
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="subcontracts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger
              value="subcontracts"
              className="flex items-center gap-2"
            >
              <FileContract className="h-4 w-4" />
              Subcontracts ({subcontracts.length})
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Project Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subcontracts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Subcontracts</h2>
              <Button asChild size="sm">
                <Link href={`/subcontracts/new?project=${project._id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Subcontract
                </Link>
              </Button>
            </div>

            {subcontracts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcontracts.map((subcontract) => (
                  <SubcontractCard
                    key={subcontract._id}
                    id={subcontract._id}
                    title={subcontract.projectName || ""}
                    projectName={project.name}
                    subcontractor={subcontract.contactName || ""}
                    value={subcontract.contractValue || 0}
                    status={subcontract.isDraft ? "draft" : "exported"}
                    projectId={subcontract.projectId ?? project._id}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileContract className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Subcontracts Yet
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    This project doesn&apos;t have any subcontracts yet. Create
                    your first subcontract to get started.
                  </p>
                  <NewSubcontractButton
                    title="Create Subcontract"
                    projectId={project._id}
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="details">
            <ProjectDetailsCard project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
