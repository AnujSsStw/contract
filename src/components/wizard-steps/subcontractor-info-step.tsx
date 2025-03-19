"use client";

import * as React from "react";
import { FileUp, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../subcontract-wizard";
import { useAction } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { toast } from "sonner";

interface SubcontractorInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  subId: string;
}

export async function convertPdfToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function SubcontractorInfoStep({
  formData,
  updateFormData,
  subId,
}: SubcontractorInfoStepProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isExtracted, setIsExtracted] = React.useState(false);
  const extractSubcontractorInfo = useAction(
    api.serve.generateSubcontractorQuoteDetails,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const base64Pdf = await convertPdfToBase64(file);
      console.log(base64Pdf);

      // Call the Convex action with the base64 PDF
      const extractedData = await extractSubcontractorInfo({
        base64Pdf,
        subId: subId as Id<"subcontracts">,
      });

      console.log(extractedData);

      // setting the ai response and scope of work
      updateFormData({
        subcontractorName: extractedData.companyName,
        subcontractorAddress: extractedData.companyAddress,
        subcontractorContact: extractedData.contactName,
        subcontractorPhone: extractedData.contactPhone,
        subcontractorEmail: extractedData.contactEmail,
        aiResponse: JSON.stringify(extractedData),
        aiScopeOfWork: extractedData.scopeOfWork,
      });
      setIsExtracted(true);
      toast.success("Subcontractor information extracted successfully");
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error("Error processing PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Upload Subcontractor Quote</Label>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Upload a PDF of the subcontractor quote to automatically extract
                information
              </p>
              <div className="flex items-center justify-center">
                <Label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-background px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/5"
                >
                  <span>Choose file</span>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
              {file && (
                <div className="text-sm">
                  Selected file:{" "}
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {file && !isExtracted && (
          <Button
            onClick={handleUpload}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Extract Information"}
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Label>Subcontractor Information</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subcontractor-name">Company Name</Label>
            <Input
              id="subcontractor-name"
              value={formData.subcontractorName}
              onChange={(e) =>
                handleInputChange("subcontractorName", e.target.value)
              }
              placeholder="Subcontractor Company Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcontractor-contact">Contact Name</Label>
            <Input
              id="subcontractor-contact"
              value={formData.subcontractorContact}
              onChange={(e) =>
                handleInputChange("subcontractorContact", e.target.value)
              }
              placeholder="Contact Person"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcontractor-address">Address</Label>
          <Textarea
            id="subcontractor-address"
            value={formData.subcontractorAddress}
            onChange={(e) =>
              handleInputChange("subcontractorAddress", e.target.value)
            }
            placeholder="Subcontractor Address"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subcontractor-phone">Phone</Label>
            <Input
              id="subcontractor-phone"
              value={formData.subcontractorPhone}
              onChange={(e) =>
                handleInputChange("subcontractorPhone", e.target.value)
              }
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcontractor-email">Email</Label>
            <Input
              id="subcontractor-email"
              value={formData.subcontractorEmail}
              onChange={(e) =>
                handleInputChange("subcontractorEmail", e.target.value)
              }
              placeholder="contact@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
