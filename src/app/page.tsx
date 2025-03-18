import { Button } from "@/components/ui/button";
import { Building2, FileCodeIcon as FileContract, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { SubcontractCard } from "@/components/subcontract-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchMutation, preloadedQueryResult } from "convex/nextjs";
import { api } from "@cvx/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export const metadata: Metadata = {
  title: "Dashboard | Construction Contract Generator",
  description: "View your projects and subcontracts",
};

export default async function Home() {
  const preloaded = await preloadQuery(api.projects.getAll, {});

  const data = preloadedQueryResult(preloaded);

  const createSubcontract = async () => {
    "use server";

    const d = await fetchMutation(
      api.subcontract.create,
      {},
      { token: await convexAuthNextjsToken() },
    );
    redirect(`/subcontracts/new?subId=${d}&step=0`);
  };

  return (
    <>
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects and subcontracts
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <Button onClick={createSubcontract}>
              <Plus className="mr-2 h-4 w-4" />
              New Subcontract
            </Button>
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
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((project) => (
                <ProjectCard
                  key={project._id}
                  name={project.name}
                  number={project.number}
                  address={project.address}
                  client={project.clientName}
                  subcontractCount={0}
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
              <SubcontractCard
                title="Electrical Work"
                projectName="Commercial Office Building"
                subcontractor="Elite Electrical Services"
                value={41250}
                status="draft"
              />
              <SubcontractCard
                title="Plumbing Installation"
                projectName="Residential Complex"
                subcontractor="Premier Plumbing Co."
                value={28750}
                status="exported"
              />
              <SubcontractCard
                title="HVAC Systems"
                projectName="Hospital Renovation"
                subcontractor="Advanced Air Solutions"
                value={67500}
                status="signed"
              />
              <Card className="flex flex-col items-center justify-center h-full min-h-[220px] border-dashed">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <Button asChild variant="secondary">
                    <Link href="/subcontracts/new">
                      Generate New Subcontract
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// function Content() {
//   const { viewer, numbers } =
//     useQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     }) ?? {};
//   const addNumber = useMutation(api.myFunctions.addNumber);

//   if (viewer === undefined || numbers === undefined) {
//     return (
//       <div className="mx-auto">
//         <p>loading... (consider a loading skeleton)</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8 max-w-lg mx-auto">
//       <p>Welcome {viewer ?? "Anonymous"}!</p>
//       <p>
//         Click the button below and open this page in another window - this data
//         is persisted in the Convex cloud database!
//       </p>
//       <p>
//         <button
//           className="bg-foreground text-background text-sm px-4 py-2 rounded-md"
//           onClick={() => {
//             void addNumber({ value: Math.floor(Math.random() * 10) });
//           }}
//         >
//           Add a random number
//         </button>
//       </p>
//       <p>
//         Numbers:{" "}
//         {numbers?.length === 0
//           ? "Click the button!"
//           : (numbers?.join(", ") ?? "...")}
//       </p>
//       <p>
//         Edit{" "}
//         <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
//           convex/myFunctions.ts
//         </code>{" "}
//         to change your backend
//       </p>
//       <p>
//         Edit{" "}
//         <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
//           app/page.tsx
//         </code>{" "}
//         to change your frontend
//       </p>
//       <p>
//         See the{" "}
//         <Link href="/server" className="underline hover:no-underline">
//           /server route
//         </Link>{" "}
//         for an example of loading data in a server component
//       </p>
//       <div className="flex flex-col">
//         <p className="text-lg font-bold">Useful resources:</p>
//         <div className="flex gap-2">
//           <div className="flex flex-col gap-2 w-1/2">
//             <ResourceCard
//               title="Convex docs"
//               description="Read comprehensive documentation for all Convex features."
//               href="https://docs.convex.dev/home"
//             />
//             <ResourceCard
//               title="Stack articles"
//               description="Learn about best practices, use cases, and more from a growing
//             collection of articles, videos, and walkthroughs."
//               href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
//             />
//           </div>
//           <div className="flex flex-col gap-2 w-1/2">
//             <ResourceCard
//               title="Templates"
//               description="Browse our collection of templates to get started quickly."
//               href="https://www.convex.dev/templates"
//             />
//             <ResourceCard
//               title="Discord"
//               description="Join our developer community to ask questions, trade tips & tricks,
//             and show off your projects."
//               href="https://www.convex.dev/community"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ResourceCard({
//   title,
//   description,
//   href,
// }: {
//   title: string;
//   description: string;
//   href: string;
// }) {
//   return (
//     <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
//       <a href={href} className="text-sm underline hover:no-underline">
//         {title}
//       </a>
//       <p className="text-xs">{description}</p>
//     </div>
//   );
// }
