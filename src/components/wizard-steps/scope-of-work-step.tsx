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

interface ScopeOfWorkStepProps {
  formData: FormData;
  updateFormData: (data: FormData) => void;
  subId: string;
}

type Scope = {
  type: "manual" | "suggested" | "ai";
  text: string;
};

export function ScopeOfWorkStep({
  formData,
  updateFormData,
  subId,
}: ScopeOfWorkStepProps) {
  // manual scopes
  const [manualScopes, setManualScopes] = React.useState<string[]>(
    formData.scopes?.filter((s) => s.type === "manual").map((s) => s.text) || [
      "",
    ],
  );

  // suggested scopes
  const [selectedSuggested, setSelectedSuggested] = React.useState<string[]>(
    formData.scopes?.filter((s) => s.type === "suggested").map((s) => s.text) ||
      [],
  );
  const suggestedScopes = useQuery(api.subcontract.getSuggestedScopes, {
    costCode: formData.costCode
      ? (formData.costCode as Id<"costCodes">)
      : undefined,
    subId: subId as Id<"subcontracts">,
  });

  // ai generated scopes
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [fileAiScopes, setFileAiScopes] = React.useState<string[]>(
    formData.scopes
      ?.filter(
        (s) =>
          s.type === "ai" &&
          !suggestedScopes?.aiSuggestedScopes?.includes(s.text),
      )
      .map((s) => s.text) || [],
  );
  const [selectedAiSuggested, setSelectedAiSuggested] = React.useState<
    string[]
  >(
    formData.scopes
      ?.filter(
        (s) =>
          s.type === "ai" &&
          suggestedScopes?.aiSuggestedScopes?.includes(s.text),
      )
      .map((s) => s.text) || [],
  );
  const aiGeneratedScopesAction = useAction(api.serve.generateScopeOfWork);

  // Manual Scopes
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

  const toggleSuggestedScope = (scope: string) => {
    if (selectedSuggested.includes(scope)) {
      setSelectedSuggested(selectedSuggested.filter((s) => s !== scope));
    } else {
      setSelectedSuggested([...selectedSuggested, scope]);
    }
    updateScopes();
  };

  const toggleFileAiScope = (scope: string) => {
    if (fileAiScopes.includes(scope)) {
      setFileAiScopes(fileAiScopes.filter((s) => s !== scope));
    } else {
      setFileAiScopes([...fileAiScopes, scope]);
    }
    updateScopes();
  };

  const toggleSuggestedAiScope = (scope: string) => {
    if (selectedAiSuggested.includes(scope)) {
      setSelectedAiSuggested(selectedAiSuggested.filter((s) => s !== scope));
    } else {
      setSelectedAiSuggested([...selectedAiSuggested, scope]);
    }
    updateScopes();
  };

  // AI Scopes
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

    setFileAiScopes(newAiScopes);
    setIsProcessing(false);
    updateScopes();
  };

  const updateScopes = () => {
    const allScopes: Scope[] = [
      ...manualScopes
        .filter((s) => s.trim())
        .map((text) => ({ type: "manual" as const, text })),
      ...selectedSuggested.map((text) => ({
        type: "suggested" as const,
        text,
      })),
      ...fileAiScopes.map((text) => ({ type: "ai" as const, text })),
      ...selectedAiSuggested.map((text) => ({ type: "ai" as const, text })),
    ];

    updateFormData({ ...formData, scopes: allScopes });
  };

  React.useEffect(() => {
    updateScopes();
  }, [manualScopes, selectedSuggested, fileAiScopes, selectedAiSuggested]);

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
          {suggestedScopes?.suggestedScopes.length &&
          suggestedScopes?.suggestedScopes.length > 0
            ? suggestedScopes?.suggestedScopes.map((scope, index) => (
                <div key={index} className="flex items-start space-x-2 py-2">
                  <Checkbox
                    id={`suggested-${index}`}
                    checked={selectedSuggested.includes(scope.scope_of_work)}
                    onCheckedChange={() =>
                      toggleSuggestedScope(scope.scope_of_work)
                    }
                    disabled={
                      manualScopes.includes(scope.scope_of_work) ||
                      fileAiScopes.includes(scope.scope_of_work) ||
                      selectedAiSuggested.includes(scope.scope_of_work)
                    }
                  />
                  <Label
                    htmlFor={`suggested-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {scope.scope_of_work}
                    <p className="text-xs text-muted-foreground">
                      {scope.type}
                    </p>
                  </Label>
                </div>
              ))
            : "No suggested scopes found"}
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
          {file && fileAiScopes.length === 0 && (
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

        {(fileAiScopes.length > 0 ||
          (suggestedScopes?.aiSuggestedScopes &&
            suggestedScopes.aiSuggestedScopes.length > 0)) && (
          <div className="space-y-4">
            <Label>AI Generated Scopes</Label>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {/* Show scopes from file upload */}
              {fileAiScopes.map((scope: string, index: number) => (
                <div
                  key={`file-${index}`}
                  className="flex items-start space-x-2 py-2"
                >
                  <Checkbox
                    id={`ai-file-${index}`}
                    checked={fileAiScopes.includes(scope)}
                    onCheckedChange={() => toggleFileAiScope(scope)}
                  />
                  <Label
                    htmlFor={`ai-file-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {scope}
                  </Label>
                </div>
              ))}

              {/* Show scopes from suggestedScopes.aiSuggestedScopes */}
              {suggestedScopes?.aiSuggestedScopes?.map(
                (scope: string, index: number) => (
                  <div
                    key={`suggested-${index}`}
                    className="flex items-start space-x-2 py-2"
                  >
                    <Checkbox
                      id={`ai-suggested-${index}`}
                      checked={selectedAiSuggested.includes(scope)}
                      onCheckedChange={() => toggleSuggestedAiScope(scope)}
                    />
                    <Label
                      htmlFor={`ai-suggested-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {scope}
                    </Label>
                  </div>
                ),
              )}
            </ScrollArea>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
