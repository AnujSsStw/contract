"use client"

import * as React from "react"
import { FileUp, Paperclip, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AttachmentsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

interface Attachment {
  id: string
  name: string
  size: number
  type: string
}

export function AttachmentsStep({ formData, updateFormData }: AttachmentsStepProps) {
  const [attachments, setAttachments] = React.useState<Attachment[]>(formData.attachments || [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      const updatedAttachments = [...attachments, ...newAttachments]
      setAttachments(updatedAttachments)
      updateFormData({ attachments: updatedAttachments })
    }
  }

  const removeAttachment = (id: string) => {
    const updatedAttachments = attachments.filter((attachment) => attachment.id !== id)
    setAttachments(updatedAttachments)
    updateFormData({ attachments: updatedAttachments })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Upload Attachments</Label>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Upload project schedules, drawings, specifications, or other relevant files
              </p>
              <div className="flex items-center justify-center">
                <Label
                  htmlFor="attachment-upload"
                  className="relative cursor-pointer rounded-md bg-background px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/5"
                >
                  <span>Choose files</span>
                  <Input
                    id="attachment-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-4">
          <Label>Uploaded Attachments</Label>
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeAttachment(attachment.id)}>
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

