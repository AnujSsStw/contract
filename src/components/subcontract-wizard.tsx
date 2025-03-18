"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  FileText,
  Upload,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AttachmentsStep } from "@/components/wizard-steps/attachments-step";
import { ContractValueStep } from "@/components/wizard-steps/contract-value-step";
import { CostCodeStep } from "@/components/wizard-steps/cost-code-step";
import { PreviewStep } from "@/components/wizard-steps/preview-step";
import { ProjectInfoStep } from "@/components/wizard-steps/project-info-step";
import { ScopeOfWorkStep } from "@/components/wizard-steps/scope-of-work-step";
import { SubcontractorInfoStep } from "@/components/wizard-steps/subcontractor-info-step";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { api } from "@cvx/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@cvx/_generated/dataModel";

const steps = [
  { id: "project-info", title: "Project Information", icon: Building2 },
  { id: "subcontractor-info", title: "Subcontractor Quote", icon: FileText },
  { id: "cost-code", title: "Cost Code", icon: FileText },
  { id: "contract-value", title: "Contract Value", icon: FileText },
  { id: "scope-of-work", title: "Scope of Work", icon: FileText },
  { id: "attachments", title: "Upload Attachments", icon: Upload },
  { id: "preview", title: "Preview & Generate", icon: Check },
];

function parseStep(step: string | undefined) {
  if (!step) return 0;
  const parsedStep = parseInt(step);
  if (isNaN(parsedStep)) return 0;
  if (parsedStep > steps.length) return steps.length - 1;
  return parsedStep;
}

export type FormData = {
  projectId: string;
  subcontractorName: string | undefined;
  subcontractorAddress: string | undefined;
  subcontractorContact: string | undefined;
  subcontractorPhone: string | undefined;
  subcontractorEmail: string | undefined;
  costCode: string | undefined;
  contractValue: number | undefined;
  contractValueText: string | undefined;
  scopes: { type: "manual" | "suggested" | "ai"; text: string }[] | undefined;
  attachments: string[] | undefined;

  aiResponse: string | undefined;
  aiScopeOfWork: string | undefined;
};
export function SubcontractWizard({
  step,
  subId,
}: {
  step: string | undefined;
  subId: string | undefined;
}) {
  const [currentStep, setCurrentStep] = React.useState(parseStep(step));
  const [formData, setFormData] = React.useState<FormData>({
    projectId: "",
    subcontractorName: "",
    subcontractorAddress: "",
    subcontractorContact: "",
    subcontractorPhone: "",
    subcontractorEmail: "",
    costCode: "",
    contractValue: 0,
    contractValueText: "",
    scopes: [],
    attachments: [],
    aiResponse: undefined,
    aiScopeOfWork: undefined,
  });
  const dataFromDb = useQuery(api.subcontract.get, {
    subId: subId as Id<"subcontracts">,
  });

  // Populate form data from db
  React.useEffect(() => {
    if (dataFromDb) {
      setFormData({
        projectId: dataFromDb.projectId as Id<"projects">,
        subcontractorName: dataFromDb.companyName,
        subcontractorAddress: dataFromDb.companyAddress,
        subcontractorContact: dataFromDb.contactName,
        subcontractorPhone: dataFromDb.contactPhone,
        subcontractorEmail: dataFromDb.contactEmail,
        costCode: dataFromDb.costCode as Id<"costCodes">,
        contractValue: dataFromDb.contractValue,
        scopes: dataFromDb.scopeOfWork?.map((s) => ({
          type: s.type as "manual" | "suggested" | "ai",
          text: s.text,
        })),
        attachments: dataFromDb.attachments,
        contractValueText: undefined,
        aiResponse: undefined,
        aiScopeOfWork: undefined,
      });
    }
  }, [dataFromDb]);

  const createSubcontract = useMutation(api.subcontract.bulkUpdateOrCreate);
  const addScopeOfWork = useMutation(api.subcontract.addScopeOfWork);

  React.useEffect(() => {
    setCurrentStep(parseStep(step));
  }, [step]);

  // TODO: add error handling
  const nextStep = async () => {
    const id = subId as Id<"subcontracts">;
    if (currentStep === 0) {
      await createSubcontract({
        subId: id,
        step: "project-info",
        data: { projectId: formData.projectId as Id<"projects"> },
      });
    } else if (currentStep === 1) {
      await createSubcontract({
        subId: id,
        step: "subcontractor-info",
        data: {
          companyName: formData.subcontractorName,
          companyAddress: formData.subcontractorAddress,
          contactName: formData.subcontractorContact,
          contactPhone: formData.subcontractorPhone,
          contactEmail: formData.subcontractorEmail,
        },
      });
    } else if (currentStep === 2) {
      await createSubcontract({
        subId: id,
        step: "cost-code",
        data: { costCode: formData.costCode as Id<"costCodes"> },
      });
    } else if (currentStep === 3) {
      await createSubcontract({
        subId: id,
        step: "contract-value",
        data: { contractValue: formData.contractValue },
      });
    } else if (currentStep === 4) {
      if (!formData.scopes) {
        throw new Error("Scopes are required");
      }
      // also add ai and manual scopes to the db
      await addScopeOfWork({
        scopeOfWork: formData.scopes,
        costCode: formData.costCode as Id<"costCodes">,
      });
      await createSubcontract({
        subId: id,
        step: "scope-of-work",
        data: { scopeOfWork: formData.scopes },
      });
    } else if (currentStep === 5) {
      await createSubcontract({
        subId: id,
        step: "attachments",
        data: { attachments: formData.attachments },
      });
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="space-y-8">
      <nav aria-label="Progress">
        <ol className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                index === currentStep
                  ? "text-primary"
                  : "text-muted-foreground",
                !subId && index > 0 ? "opacity-50" : "",
              )}
            >
              <Link
                href={
                  subId
                    ? `/subcontracts/new?subId=${subId}&step=${index}`
                    : index === 0
                      ? `/subcontracts/new?step=${index}`
                      : "#"
                }
                className={cn(
                  "flex flex-col items-center justify-center w-full p-2 rounded-md",
                  index === currentStep && "bg-accent",
                  !subId && index > 0
                    ? "cursor-not-allowed"
                    : "hover:bg-accent",
                )}
                onClick={(e) => {
                  if (!subId && index > 0) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="mt-2 text-xs font-medium text-center hidden md:block">
                  {step.title}
                </span>
                <span className="mt-2 text-xs font-medium text-center md:hidden">
                  {index + 1}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Select a project or enter project details"}
            {currentStep === 1 &&
              "Upload subcontractor quote to extract information"}
            {currentStep === 2 &&
              "Select the appropriate cost code for this subcontract"}
            {currentStep === 3 && "Enter the contract value"}
            {currentStep === 4 &&
              "Define the scope of work for this subcontract"}
            {currentStep === 5 &&
              "Upload additional attachments for the subcontract"}
            {currentStep === 6 && "Review and generate the subcontract"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <ProjectInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 1 && subId && (
            <SubcontractorInfoStep
              formData={formData}
              updateFormData={updateFormData}
              subId={subId}
            />
          )}
          {currentStep === 2 && subId && (
            <CostCodeStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && subId && (
            <ContractValueStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 4 && subId && (
            <ScopeOfWorkStep
              formData={formData}
              updateFormData={updateFormData}
              subId={subId}
            />
          )}
          {currentStep === 5 && subId && (
            <AttachmentsStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 6 && subId && <PreviewStep formData={formData} />}
          {currentStep > 0 && !subId && (
            <div className="text-center py-8 text-muted-foreground">
              Please select a project first to continue with the subcontract
              creation.
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} disabled={!subId}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button disabled={!subId}>Generate Subcontract</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
