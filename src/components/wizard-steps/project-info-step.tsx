"use client";

import * as React from "react";
import { Building2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@cvx/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { FormData } from "../subcontract-wizard";
import { useEffect } from "react";

export function ProjectInfoStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (data: FormData) => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    formData.projectId,
  );
  const projects = useQuery(api.projects.getAll);

  useEffect(() => {
    setSelectedProject(formData.projectId);
  }, [formData.projectId]);

  const filteredProjects =
    projects?.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.number.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    updateFormData({ ...formData, projectId: projectId });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-search">Search Projects</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="project-search"
            placeholder="Search by project name or number"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Select a Project</Label>
        <RadioGroup
          value={selectedProject || ""}
          onValueChange={handleProjectSelect}
        >
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <Card
                key={project._id}
                className={
                  selectedProject === project._id ? "border-primary" : ""
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value={project._id}
                      id={project._id}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <Label
                          htmlFor={project._id}
                          className="font-medium cursor-pointer"
                        >
                          {project.name}
                        </Label>
                      </div>
                      <div className="mt-2 text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Project Number:
                          </span>
                          <span>{project.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span>{project.clientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Address:
                          </span>
                          <span>{project.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredProjects.length === 0 && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">
                  No projects found. Try a different search term or create a new
                  project.
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/projects/new">Create New Project</Link>
                </Button>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
