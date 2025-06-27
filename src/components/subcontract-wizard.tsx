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
import { useRouter } from "next/navigation";

import { Attachment } from "@/components/wizard-steps/attachments-step";
import { api } from "@cvx/_generated/api";
import { DataModel, Id } from "@cvx/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { ExtraInfoStep } from "./wizard-steps/extra-info-step";
import { useCallback } from "react";
const steps = [
  { id: "project-info", title: "Project Information", icon: Building2 },
  { id: "subcontractor-info", title: "Subcontractor Quote", icon: FileText },
  { id: "cost-code", title: "Cost Code", icon: FileText },
  { id: "contract-value", title: "Contract Value", icon: FileText },
  { id: "scope-of-work", title: "Scope of Work", icon: FileText },
  { id: "extra-info", title: "Extra Information", icon: FileText },
  { id: "attachments", title: "Upload Attachments", icon: Upload },
  { id: "preview", title: "Preview & Generate", icon: Check },
];

export type FormData = {
  projectName: string | undefined;
  projectId: string | undefined;
  subcontractorName: string | undefined;
  subcontractorAddress: string | undefined;
  subcontractorContact: string | undefined;
  subcontractorPhone: string | undefined;
  subcontractorEmail: string | undefined;
  costCodes: DataModel["subcontracts"]["document"]["costCodes"] | undefined;
  contractValue: number | undefined;
  contractValueText: string | undefined;
  scopes:
    | {
        type: "manual" | "suggested" | "ai";
        text: string;
        cost_code: string;
      }[]
    | undefined;
  attachments: Attachment[] | undefined;

  aiResponse: string | undefined;
  aiScopeOfWork: unknown | undefined;

  isDraft: boolean;
  docusignSent: boolean;

  exclusions: string[] | undefined;
  costBreakdown: string[] | undefined;
  costCodeData:
    | DataModel["subcontracts"]["document"]["costCodeData"]
    | undefined;
};

export function SubcontractWizard({
  subId,
  projectId,
  fromEdit = "false",
  dataFromDb,
}: {
  subId: string | undefined;
  projectId: string | undefined;
  fromEdit: string | undefined;
  dataFromDb: DataModel["subcontracts"]["document"] | undefined | null;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<FormData>({
    projectId: projectId,
    projectName: "",
    subcontractorName: "",
    subcontractorAddress: "",
    subcontractorContact: "",
    subcontractorPhone: "",
    subcontractorEmail: "",
    costCodes: [],
    contractValue: 0,
    contractValueText: "",
    scopes: [],
    attachments: [],
    aiResponse: undefined,
    aiScopeOfWork: undefined,
    isDraft: false,
    docusignSent: false,
    exclusions: [],
    costBreakdown: [],
    costCodeData: [],
  });

  // Populate form data from db
  React.useEffect(() => {
    if (dataFromDb) {
      console.log("update form data from db");

      setFormData({
        projectId: dataFromDb.projectId as Id<"projects">,
        projectName: dataFromDb.projectName,
        subcontractorName: dataFromDb.companyName,
        subcontractorAddress: dataFromDb.companyAddress,
        subcontractorContact: dataFromDb.contactName,
        subcontractorPhone: dataFromDb.contactPhone,
        subcontractorEmail: dataFromDb.contactEmail,
        costCodes: dataFromDb.costCodes || [],
        contractValue: dataFromDb.contractValue,
        contractValueText: dataFromDb.contractValueText,
        scopes: dataFromDb.scopeOfWork?.map((s) => ({
          type: s.type as "manual" | "suggested" | "ai",
          text: s.text,
          cost_code: s.cost_code,
        })),
        attachments: dataFromDb.attachments,
        aiResponse: dataFromDb.aiResponse || undefined,
        aiScopeOfWork: dataFromDb.aiScopeOfWork || undefined,
        isDraft: dataFromDb.isDraft ?? false,
        docusignSent: dataFromDb.docusignSent ?? false,
        exclusions: dataFromDb.exclusions,
        costBreakdown: dataFromDb.costBreakdown,
        costCodeData: dataFromDb.costCodeData ?? [],
      });
    }
  }, [dataFromDb]);

  const createSubcontract = useMutation(api.subcontract.bulkUpdateOrCreate);
  const addScopeOfWork = useMutation(api.subcontract.addScopeOfWork);

  // TODO: add error handling
  const nextStep = async () => {
    const id = subId as Id<"subcontracts">;
    if (currentStep === 0) {
      if (!formData.projectId || !formData.projectName) {
        toast.error("Project ID and Name are required");
        return;
      }
      await createSubcontract({
        subId: id,
        step: "project-info",
        data: {
          projectId: formData.projectId as Id<"projects">,
          projectName: formData.projectName,
        },
      });
    } else if (currentStep === 1) {
      if (
        !formData.subcontractorName ||
        !formData.subcontractorAddress ||
        !formData.subcontractorContact ||
        !formData.subcontractorPhone ||
        !formData.subcontractorEmail
      ) {
        toast.error(
          "Subcontractor name, address, contact, phone, and email are required",
        );
        return;
      }
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
      if (formData.costCodes?.length === 0) {
        toast.error("Cost code is required");
        return;
      }

      await createSubcontract({
        subId: id,
        step: "cost-code",
        data: {
          costCodes: formData.costCodes,
          costCodeData: formData.costCodeData?.map((c) => ({
            code: c.code,
            description: c.description,
          })),
          scopeOfWork:
            fromEdit === "true" && dataFromDb?.costCodes !== formData.costCodes
              ? []
              : formData.scopes,
        },
      });
    } else if (currentStep === 3) {
      if (!formData.contractValue) {
        toast.error("Contract value is required");
        return;
      }
      await createSubcontract({
        subId: id,
        step: "contract-value",
        data: {
          contractValue: formData.contractValue,
          contractValueText: formData.contractValueText,
        },
      });
    } else if (currentStep === 4) {
      if (!formData.scopes || formData.scopes.length === 0) {
        toast.error("Scopes are required");
        return;
      }
      // also add ai and manual scopes to the db
      if (formData.scopes.some((s) => s.type === "ai" || s.type === "manual")) {
        console.log("adding scope of work to db");

        await addScopeOfWork({
          scopeOfWork: formData.scopes,
        });
      }
      await createSubcontract({
        subId: id,
        step: "scope-of-work",
        data: { scopeOfWork: formData.scopes },
      });
    } else if (currentStep === 5) {
      if (
        formData.exclusions?.length === 0 ||
        formData.costBreakdown?.length === 0
      ) {
        toast.warning(
          "Moving on to the next step without exclusions or cost breakdown",
        );
      }
      await createSubcontract({
        subId: id,
        step: "extra-info",
        data: {
          exclusions: formData.exclusions,
          costBreakdown: formData.costBreakdown,
        },
      });
    } else if (currentStep === 6) {
      if (formData.attachments?.length === 0) {
        toast.warning("Moving on to the next step without attachments");
      }
      await createSubcontract({
        subId: id,
        step: "attachments",
        data: {
          attachments: formData.attachments?.map((a) => ({
            id: a.id,
            name: a.name,
            type: a.type,
            size: a.size,
            url: a.url as string,
            order: a.order,
          })),
        },
      });
    } else if (currentStep === 7) {
      await createSubcontract({
        subId: id,
        step: "preview",
        data: {
          isDraft: formData.isDraft,
          docusignSent: formData.docusignSent,
        },
      });

      if (formData.isDraft) {
        toast.success("Subcontract saved as draft");
      } else {
        toast.success("Subcontract generated");
      }

      router.push(`/subcontracts/${id}`);
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = useCallback((data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <nav aria-label="Progress" className="md:w-64 md:shrink-0">
          <ol className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={cn(
                  "shrink-0",
                  index === currentStep
                    ? "text-primary"
                    : "text-muted-foreground",
                  !subId && index > 0 ? "opacity-50" : "",
                )}
              >
                <button
                  type="button"
                  disabled={!subId && index > 0}
                  className={cn(
                    "flex items-center p-2 rounded-md text-left min-w-[200px] md:min-w-0",
                    index === currentStep && "bg-accent",
                    !subId && index > 0
                      ? "cursor-not-allowed"
                      : "hover:bg-accent",
                  )}
                  onClick={() => {
                    if (!subId && index > 0) {
                      return;
                    }
                    setCurrentStep(index);
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-sm font-medium whitespace-nowrap">
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {currentStep === 0 &&
                  "Select a project or enter project details"}
                {currentStep === 1 &&
                  "Upload subcontractor quote to extract information"}
                {currentStep === 2 &&
                  "Select the appropriate cost code for this subcontract"}
                {currentStep === 3 && "Enter the contract value"}
                {currentStep === 4 &&
                  "Define the scope of work for this subcontract"}
                {/* {currentStep === 5 && "Enter extra information"} */}
                {currentStep === 6 &&
                  "Upload additional attachments for the subcontract"}
                {currentStep === 7 && "Review and generate the subcontract"}
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
                <CostCodeStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 3 && subId && (
                <ContractValueStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 4 && subId && (
                // TODO: work on this step
                <ScopeOfWorkStep
                  formData={formData}
                  updateFormData={updateFormData}
                  subId={subId}
                />
              )}
              {currentStep === 5 && (
                <ExtraInfoStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 6 && subId && (
                <AttachmentsStep
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 7 && subId && formData.projectId && (
                <PreviewStep
                  formData={formData}
                  updateFormData={updateFormData}
                  subcontractId={subId as Id<"subcontracts">}
                />
              )}
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
                <Button
                  disabled={!subId || !canGenerateSubcontract(formData)}
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Generate Subcontract {formData.isDraft ? "(Draft)" : ""}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function canGenerateSubcontract(formData: FormData) {
  return (
    formData.projectId &&
    formData.projectName &&
    formData.subcontractorName &&
    formData.subcontractorAddress &&
    formData.subcontractorContact &&
    formData.subcontractorPhone &&
    formData.subcontractorEmail &&
    (formData.costCodes ? formData.costCodes.length > 0 : false)
  );
}
