"use client";
import { FileText, Paperclip } from "lucide-react";

import { SubcontractDownloadButton } from "@/components/subcontract-download-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { useQuery } from "convex/react";
import { FormData } from "../subcontract-wizard";
interface PreviewStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  subcontractId: Id<"subcontracts">;
}

export function PreviewStep({
  formData,
  updateFormData,
  subcontractId,
}: PreviewStepProps) {
  const projectData = formData.projectId ? formData.projectId : null;
  const project = useQuery(api.projects.getById, {
    id: projectData ? (projectData as Id<"projects">) : undefined,
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="attachments">
            Attachments ({formData.attachments?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">SUBCONTRACT AGREEMENT</h2>
                  <p className="text-sm text-muted-foreground">
                    This agreement made on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Project Information
                  </h3>
                  {project ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Project Name:</p>
                        <p>{project.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Project Address:</p>
                        <p>{project.address}</p>
                      </div>
                      <div>
                        <p className="font-medium">Client:</p>
                        <p>{project.clientName}</p>
                      </div>
                      <div>
                        <p className="font-medium">Client Legal Entity:</p>
                        <p>{project.clientLegalEntity}</p>
                      </div>
                      <div>
                        <p className="font-medium">Architect:</p>
                        <p>{project.architect}</p>
                      </div>
                      <div>
                        <p className="font-medium">Bonds Required:</p>
                        <p>{project.bondsRequired ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No project selected</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Subcontractor Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Company Name:</p>
                      <p>{formData.subcontractorName || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Contact Name:</p>
                      <p>{formData.subcontractorContact || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Address:</p>
                      <p>{formData.subcontractorAddress || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p>{formData.subcontractorPhone || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p>{formData.subcontractorEmail || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Contract Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Cost Code:</p>
                      <p>
                        {formData.costCodeData
                          ?.map((costCode) => costCode.code)
                          .join(", ") || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Contract Value:</p>
                      <p>
                        {formData.contractValue
                          ? `$${formData.contractValue.toLocaleString()}.00`
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Contract Value in Words:</p>
                      <p>{formData.contractValueText || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Scope of Work
                  </h3>
                  {formData.scopes && formData.scopes.length > 0 ? (
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      {formData.scopes.map((scope, index) => (
                        <li key={index}>{scope.text}</li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-muted-foreground">
                      No scope of work defined
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Preview */}
          <div className="flex justify-center">
            <SubcontractDownloadButton subcontractId={subcontractId} />
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4 pt-4">
          {formData.attachments && formData.attachments.length > 0 ? (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-4 space-y-2">
                {formData.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const getImageUrl = new URL(
                          `${process.env.NEXT_PUBLIC_CONVEX_URL_SITE}/getImage`,
                        );
                        getImageUrl.searchParams.set(
                          "storageId",
                          attachment.url as Id<"_storage">,
                        );

                        const url = getImageUrl.href;
                        window.open(url, "_blank");
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center p-8 border rounded-md">
              <p className="text-muted-foreground">No attachments added</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-2">
        <Label>After generating the subcontract:</Label>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="send-docusign"
            className="rounded"
            checked={formData.docusignSent}
            onChange={() => {
              updateFormData({
                docusignSent: !formData.docusignSent,
              });
            }}
          />
          <label htmlFor="send-docusign">Send to DocuSign for signature</label>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="save-draft"
            className="rounded"
            checked={formData.isDraft}
            onChange={() =>
              updateFormData({
                isDraft: !formData.isDraft,
              })
            }
          />
          <label htmlFor="save-draft">Save as draft for later editing</label>
        </div>
      </div>
    </div>
  );
}
