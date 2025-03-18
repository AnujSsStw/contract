import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Edit,
  FileCodeIcon as FileContract,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SubcontractCard } from "@/components/subcontract-card";
import { ProjectDetailsCard } from "@/components/project-details-card";
import { ProjectActivityCard } from "@/components/project-activity-card";
import { fetchMutation, preloadedQueryResult } from "convex/nextjs";
import { api } from "@cvx/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { Id } from "@cvx/_generated/dataModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Project Details | Construction Contract Generator",
  description: "View and manage project details",
};

// Mock function to get project data
async function getProjectData(id: Id<"projects">) {
  const preloaded = await preloadQuery(api.projects.getById, { id });

  const data = preloadedQueryResult(preloaded);

  return data;
}

// Mock function to get subcontracts for a project
function getProjectSubcontracts() {
  const subcontracts = {
    "PRJ-2023-001": [
      {
        id: "SUB-2023-001",
        title: "Electrical Work",
        subcontractor: "Elite Electrical Services",
        value: 41250,
        status: "signed",
        date: "2023-04-10",
      },
      {
        id: "SUB-2023-002",
        title: "Plumbing Installation",
        subcontractor: "Quality Plumbing Co.",
        value: 35750,
        status: "exported",
        date: "2023-04-15",
      },
      {
        id: "SUB-2023-003",
        title: "HVAC Systems",
        subcontractor: "Climate Control Inc.",
        value: 52800,
        status: "draft",
        date: "2023-04-20",
      },
      {
        id: "SUB-2023-004",
        title: "Structural Steel",
        subcontractor: "Steel Fabricators LLC",
        value: 128500,
        status: "signed",
        date: "2023-03-25",
      },
      {
        id: "SUB-2023-005",
        title: "Concrete Work",
        subcontractor: "Solid Foundations Co.",
        value: 87250,
        status: "signed",
        date: "2023-03-20",
      },
    ],
    "PRJ-2023-002": [
      {
        id: "SUB-2023-006",
        title: "Framing & Drywall",
        subcontractor: "Framework Specialists",
        value: 68500,
        status: "signed",
        date: "2023-06-05",
      },
      {
        id: "SUB-2023-007",
        title: "Roofing",
        subcontractor: "Top Notch Roofing",
        value: 42750,
        status: "exported",
        date: "2023-06-10",
      },
      {
        id: "SUB-2023-008",
        title: "Landscaping",
        subcontractor: "Green Spaces Design",
        value: 28900,
        status: "draft",
        date: "2023-06-15",
      },
    ],
    "PRJ-2023-003": [
      {
        id: "SUB-2023-009",
        title: "Medical Equipment Installation",
        subcontractor: "Healthcare Equipment Pros",
        value: 215000,
        status: "draft",
        date: "2023-08-20",
      },
      {
        id: "SUB-2023-010",
        title: "Interior Finishes",
        subcontractor: "Premier Interiors",
        value: 78500,
        status: "draft",
        date: "2023-08-25",
      },
    ],
  };

  return subcontracts["PRJ-2023-001"] || [];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: Id<"projects"> }>;
}) {
  const project = await getProjectData((await params).id);
  const subcontracts = getProjectSubcontracts();

  if (!project) {
    return (
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" size="sm" className="mr-4">
            <Link href="/dashboard">
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

  const createSubcontract = async () => {
    "use server";

    const d = await fetchMutation(api.subcontract.create);
    redirect(`/subcontracts/new?subId=${d}`);
  };

  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  };

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
              <Badge
                className={
                  statusColors[project.status as keyof typeof statusColors]
                }
              >
                {(project.status?.charAt(0).toUpperCase() || "Unknown") +
                  (project.status?.slice(1) || "")}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {project.number} • {project.clientName}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href={`/projects/${project._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Link>
          </Button>
          <Button onClick={createSubcontract}>
            <Plus className="mr-2 h-4 w-4" />
            New Subcontract
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      key={subcontract.id}
                      title={subcontract.title}
                      projectName={project.name}
                      subcontractor={subcontract.subcontractor}
                      value={subcontract.value}
                      status={subcontract.status as any}
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
                      This project doesn&apos;t have any subcontracts yet.
                      Create your first subcontract to get started.
                    </p>
                    <Button asChild>
                      <Link href={`/subcontracts/new?project=${project._id}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Subcontract
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="details">
              <ProjectDetailsCard project={project} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ProjectActivityCard projectId={project._id} />
        </div>
      </div>
    </div>
  );
}
