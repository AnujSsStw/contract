"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@cvx/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Id } from "@cvx/_generated/dataModel";
import { useEffect } from "react";

const projectSchema = z.object({
  projectNumber: z.string().min(1, { message: "Project number is required" }),
  projectName: z.string().min(1, { message: "Project name is required" }),
  projectAddress: z.string().min(1, { message: "Project address is required" }),
  clientName: z.string().min(1, { message: "Client name is required" }),
  clientLegalEntity: z.string().min(1, {
    message: "Client legal entity is required",
  }),
  architect: z.string().min(1, { message: "Architect is required" }),
  bondsRequired: z.boolean(),
  description: z.string().min(1, { message: "Description is required" }),
  status: z
    .union([z.literal("planning"), z.literal("active"), z.literal("completed")])
    .default("planning"),
});

export default function NewProjectPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const projectData = useQuery(api.projects.getById, {
    id: (projectId as Id<"projects">) ?? undefined,
  });
  const router = useRouter();
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectNumber: "",
      projectName: "",
      projectAddress: "",
      clientName: "",
      clientLegalEntity: "",
      architect: "",
      bondsRequired: false,
      description: "",
    },
  });

  useEffect(() => {
    if (projectData) {
      form.setValue("projectNumber", projectData.number);
      form.setValue("projectName", projectData.name);
      form.setValue("projectAddress", projectData.address);
      form.setValue("clientName", projectData.clientName);
      form.setValue("clientLegalEntity", projectData.clientLegalEntity);
      form.setValue("architect", projectData.architect);
      form.setValue("bondsRequired", projectData.bondsRequired);
      form.setValue("description", projectData.description);
      form.setValue("status", projectData.status ?? "planning");
    }
  }, [projectData, form]);

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      if (projectId) {
        await updateProject({
          id: projectId as Id<"projects">,
          data: {
            number: values.projectNumber,
            name: values.projectName,
            address: values.projectAddress,
            clientName: values.clientName,
            clientLegalEntity: values.clientLegalEntity,
            architect: values.architect,
            bondsRequired: values.bondsRequired,
            description: values.description,
            subcontractCount: projectData?.subcontractCount ?? 0,
            status: values.status,
          },
        });
      } else {
        await createProject({
          data: {
            number: values.projectNumber,
            name: values.projectName,
            address: values.projectAddress,
            clientName: values.clientName,
            clientLegalEntity: values.clientLegalEntity,
            architect: values.architect,
            bondsRequired: values.bondsRequired,
            description: values.description,
            subcontractCount: 0,
          },
        });
      }

      toast.success(
        projectId
          ? "Project updated successfully"
          : "Project created successfully",
      );
      router.push(projectId ? `/projects/${projectId}` : "/");
    } catch (error) {
      console.error(error);
      toast.error(
        projectId ? "Failed to update project" : "Failed to create project",
      );
    }
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
          Create New Project
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Enter the details of your new construction project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Commercial Office Building"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, Anytown, USA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientLegalEntity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client&apos;s Legal Entity</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Corp. LLC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="architect"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Architect</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith & Associates" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bondsRequired"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Bonds Required</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "yes")
                        }
                        defaultValue={field.value ? "yes" : "no"}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="bonds-yes" />
                          <Label htmlFor="bonds-yes" className="cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="bonds-no" />
                          <Label htmlFor="bonds-no" className="cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the project scope and objectives"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {projectId && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit">
                {projectId ? "Update Project" : "Create Project"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
