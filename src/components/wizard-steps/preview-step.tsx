"use client"
import { Download, FileText, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PreviewStepProps {
  formData: any
}

// Mock project data based on project ID
const getProjectData = (projectId: string) => {
  const projects = {
    "PRJ-2023-001": {
      name: "Commercial Office Building",
      address: "123 Main St, Anytown, USA",
      client: "ABC Corporation",
      clientLegalEntity: "ABC Corp. LLC",
      architect: "Smith & Associates Architecture",
      bonds: false,
    },
    "PRJ-2023-002": {
      name: "Residential Complex",
      address: "456 Oak Ave, Somewhere, USA",
      client: "XYZ Developers",
      clientLegalEntity: "XYZ Development LLC",
      architect: "Modern Design Group",
      bonds: true,
    },
    "PRJ-2023-003": {
      name: "Hospital Renovation",
      address: "789 Medical Dr, Healthtown, USA",
      client: "Healthcare Systems Inc.",
      clientLegalEntity: "Healthcare Systems Corporation",
      architect: "Medical Architecture Partners",
      bonds: true,
    },
  }

  return projects[projectId as keyof typeof projects] || null
}

export function PreviewStep({ formData }: PreviewStepProps) {
  const projectData = formData.projectId ? getProjectData(formData.projectId) : null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="attachments">Attachments ({formData.attachments?.length || 0})</TabsTrigger>
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
                  <h3 className="text-lg font-semibold border-b pb-2">Project Information</h3>
                  {projectData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Project Name:</p>
                        <p>{projectData.name}</p>
                      </div>
                      <div>
                        <p className="font-medium">Project Address:</p>
                        <p>{projectData.address}</p>
                      </div>
                      <div>
                        <p className="font-medium">Client:</p>
                        <p>{projectData.client}</p>
                      </div>
                      <div>
                        <p className="font-medium">Client Legal Entity:</p>
                        <p>{projectData.clientLegalEntity}</p>
                      </div>
                      <div>
                        <p className="font-medium">Architect:</p>
                        <p>{projectData.architect}</p>
                      </div>
                      <div>
                        <p className="font-medium">Bonds Required:</p>
                        <p>{projectData.bonds ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No project selected</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Subcontractor Information</h3>
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
                  <h3 className="text-lg font-semibold border-b pb-2">Contract Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Cost Code:</p>
                      <p>{formData.costCode || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Contract Value:</p>
                      <p>
                        {formData.contractValue ? `$${formData.contractValue.toLocaleString()}.00` : "Not specified"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Contract Value in Words:</p>
                      <p>{formData.contractValueText || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Scope of Work</h3>
                  {formData.scopes && formData.scopes.length > 0 ? (
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      {formData.scopes.map((scope: any, index: number) => (
                        <li key={index}>{scope.text}</li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-muted-foreground">No scope of work defined</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Preview
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4 pt-4">
          {formData.attachments && formData.attachments.length > 0 ? (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-4 space-y-2">
                {formData.attachments.map((attachment: any) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
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
          <input type="checkbox" id="send-docusign" className="rounded" />
          <label htmlFor="send-docusign">Send to DocuSign for signature</label>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="save-draft" className="rounded" />
          <label htmlFor="save-draft">Save as draft for later editing</label>
        </div>
      </div>
    </div>
  )
}

