"use client";

import * as React from "react";
import { FileUp, Plus, Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "../subcontract-wizard";
import { useAction, useQuery } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { convertPdfToBase64 } from "./subcontractor-info-step";
import { useCallback, useEffect } from "react";

interface ScopeOfWorkStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  subId: string;
}

type Scope = {
  type: "manual" | "suggested" | "ai";
  text: string;
};

interface SuggestedScope {
  _id: string;
  scope_of_work: string;
  type: string;
}

export function ScopeOfWorkStep({
  formData,
  updateFormData,
  subId,
}: ScopeOfWorkStepProps) {
  // Track all selected scopes locally to handle disabling in suggested tab
  const [localSelectedScopes, setLocalSelectedScopes] = React.useState<Scope[]>(
    formData.scopes || [],
  );

  // Manual scopes from formData.scopes
  const [manualScopes, setManualScopes] = React.useState<string[]>(
    formData.scopes?.filter((s) => s.type === "manual").map((s) => s.text) || [
      "",
    ],
  );

  // AI scopes combined from both sources
  const [selectedAiScopes, setSelectedAiScopes] = React.useState<string[]>(
    formData.scopes?.filter((s) => s.type === "ai").map((s) => s.text) || [],
  );

  // Suggested scopes from formData.scopes
  const [selectedSuggested, setSelectedSuggested] = React.useState<string[]>(
    formData.scopes?.filter((s) => s.type === "suggested").map((s) => s.text) ||
      [],
  );

  // Get all suggested scopes from query
  const suggestedScopes = useQuery(api.subcontract.getSuggestedScopes, {
    costCode: formData.costCode?._id as Id<"costCodes">,
    subId: subId as Id<"subcontracts">,
  });

  // File upload state
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadedAiScopes, setUploadedAiScopes] = React.useState<string[]>([]);

  const aiGeneratedScopesAction = useAction(api.serve.generateScopeOfWork);

  useEffect(() => {
    if (formData.aiScopeOfWork) {
      setUploadedAiScopes(formData.aiScopeOfWork as string[]);
      // setSelectedAiScopes(formData.aiScopeOfWork);
    }

    // if (formData.scopes) {
    //   setSelectedAiScopes(
    //     formData.scopes.filter((s) => s.type === "ai").map((s) => s.text),
    //   );
    //   setSelectedSuggested(
    //     formData.scopes
    //       .filter((s) => s.type === "suggested")
    //       .map((s) => s.text),
    //   );
    //   setManualScopes(
    //     formData.scopes.filter((s) => s.type === "manual").map((s) => s.text),
    //   );
    // }
  }, [formData.aiScopeOfWork]);

  // Manual Scopes handlers
  const handleManualScopeChange = (index: number, value: string) => {
    const newScopes = [...manualScopes];
    newScopes[index] = value;
    setManualScopes(newScopes);
    updateScopes();
  };

  const addManualScope = () => {
    setManualScopes([...manualScopes, ""]);
  };

  const removeManualScope = (index: number) => {
    const newScopes = manualScopes.filter((_, i) => i !== index);
    setManualScopes(newScopes);
    updateScopes();
  };

  // Toggle handlers for different scope types
  const toggleSuggestedScope = (scope: string) => {
    setSelectedSuggested((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope],
    );
    updateScopes();
  };

  const toggleAiScope = (scope: string) => {
    setSelectedAiScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope],
    );
    updateScopes();
  };
  console.log("selectedAiScopes", uploadedAiScopes, selectedAiScopes);

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);

    const base64Pdf = await convertPdfToBase64(file);
    const newAiScopes = await aiGeneratedScopesAction({
      subId: subId as Id<"subcontracts">,
      base64Pdf,
    });

    setUploadedAiScopes(newAiScopes);
    setSelectedAiScopes((prev) => [...new Set([...prev, ...newAiScopes])]);
    setIsProcessing(false);
    updateScopes();
  };

  // Update formData with all selected scopes
  const updateScopes = useCallback(() => {
    const allScopes: Scope[] = [
      ...manualScopes
        .filter((s) => s.trim())
        .map((text) => ({ type: "manual" as const, text })),
      ...selectedSuggested.map((text) => ({
        type: "suggested" as const,
        text,
      })),
      ...selectedAiScopes.map((text) => ({ type: "ai" as const, text })),
    ];

    setLocalSelectedScopes(allScopes);
    updateFormData({
      scopes: allScopes,
      aiScopeOfWork: uploadedAiScopes,
    });
  }, [
    manualScopes,
    selectedSuggested,
    selectedAiScopes,
    uploadedAiScopes,
    updateFormData,
  ]);

  React.useEffect(() => {
    updateScopes();
  }, [manualScopes, selectedSuggested, selectedAiScopes]);

  return (
    <Tabs defaultValue="suggested" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="suggested">Suggested Scopes</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        <TabsTrigger value="ai">AI Assisted</TabsTrigger>
      </TabsList>

      <TabsContent value="manual" className="space-y-4 pt-4">
        <div className="space-y-4">
          {manualScopes.map((scope, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={scope}
                onChange={(e) => handleManualScopeChange(index, e.target.value)}
                placeholder={`Scope #${index + 1}`}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeManualScope(index)}
                disabled={manualScopes.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addManualScope} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Scope
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="suggested" className="space-y-4 pt-4">
        <Label>
          Select from suggested scopes for{" "}
          {suggestedScopes?.costCode.code || "this cost code"}
        </Label>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {suggestedScopes?.suggestedScopes.map((scope: SuggestedScope) => {
            // Check if this scope is already selected as manual or AI scope
            const isSelectedAsOtherType = localSelectedScopes.some(
              (s) =>
                s.text === scope.scope_of_work &&
                (s.type === "manual" || s.type === "ai"),
            );

            return (
              <div key={scope._id} className="flex items-start space-x-2 py-2">
                <Checkbox
                  id={`suggested-${scope._id}`}
                  checked={selectedSuggested.includes(scope.scope_of_work)}
                  onCheckedChange={() =>
                    toggleSuggestedScope(scope.scope_of_work)
                  }
                  disabled={isSelectedAsOtherType}
                />
                <Label
                  htmlFor={`suggested-${scope._id}`}
                  className={`text-sm cursor-pointer ${isSelectedAsOtherType ? "text-muted-foreground" : ""}`}
                >
                  {scope.scope_of_work} ({scope.type})
                  {isSelectedAsOtherType &&
                    " - Already selected as " +
                      localSelectedScopes.find(
                        (s) => s.text === scope.scope_of_work,
                      )?.type}
                </Label>
              </div>
            );
          })}
        </ScrollArea>
      </TabsContent>

      <TabsContent value="ai" className="space-y-6 pt-4">
        <div className="space-y-4">
          <Label>Upload Subcontractor Quote for AI Analysis</Label>
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload a PDF of the subcontractor quote to extract and format
                  scopes of work
                </p>
                <div className="flex items-center justify-center">
                  <Label
                    htmlFor="ai-file-upload"
                    className="relative cursor-pointer rounded-md bg-background px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/5"
                  >
                    <span>Choose file</span>
                    <Input
                      id="ai-file-upload"
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
          {file && uploadedAiScopes.length === 0 && (
            <Button
              onClick={handleUpload}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing..." : "Analyze Quote"}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {(uploadedAiScopes.length > 0 || selectedAiScopes.length > 0) && (
          <div className="space-y-4">
            <Label>AI Generated Scopes</Label>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {uploadedAiScopes.map((scope, index) => (
                <div
                  key={`ai-${index}`}
                  className="flex items-start space-x-2 py-2"
                >
                  <Checkbox
                    id={`ai-${index}`}
                    checked={selectedAiScopes.includes(scope)}
                    onCheckedChange={() => toggleAiScope(scope)}
                  />
                  <Label
                    htmlFor={`ai-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {scope}
                  </Label>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
