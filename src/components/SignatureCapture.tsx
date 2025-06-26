"use client";

import { useRef, useCallback, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw } from "lucide-react";

interface SignatureCaptureProps {
  onSignatureAdd: (signature: {
    type: "signature" | "text" | "date";
    data: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
  }) => void;
}

export function SignatureCapture({ onSignatureAdd }: SignatureCaptureProps) {
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [signatureText, setSignatureText] = useState("");

  const clearSignature = useCallback(() => {
    signaturePadRef.current?.clear();
  }, []);

  const addDrawnSignature = useCallback(() => {
    if (signaturePadRef.current?.isEmpty()) {
      return false;
    }

    // const dataUrl = signaturePadRef.current
    //   ?.getTrimmedCanvas()
    //   .toDataURL("image/png");
    const sigURL = signaturePadRef.current?.toDataURL();
    if (!sigURL) {
      return false;
    }

    onSignatureAdd({
      type: "signature",
      data: sigURL,
      positionX: 100,
      positionY: 100,
      width: 200,
      height: 100,
    });

    clearSignature();
    return true;
  }, [onSignatureAdd, clearSignature]);

  const addTextSignature = useCallback(() => {
    if (!signatureText.trim()) {
      return false;
    }

    onSignatureAdd({
      type: "text",
      data: signatureText,
      positionX: 100,
      positionY: 100,
      width: 200,
      height: 50,
    });

    setSignatureText("");
    return true;
  }, [signatureText, onSignatureAdd]);

  const addDate = useCallback(() => {
    const today = new Date().toLocaleDateString();
    onSignatureAdd({
      type: "date",
      data: today,
      positionX: 100,
      positionY: 150,
      width: 150,
      height: 30,
    });
  }, [onSignatureAdd]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Signature</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="draw" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="draw">Draw</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="space-y-4">
            <div className="border rounded-lg">
              <div className="p-2  border-b">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Draw your signature
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSignature}
                      className="h-8 px-2"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <SignatureCanvas
                  ref={signaturePadRef}
                  canvasProps={{
                    className:
                      "w-full h-[150px] border rounded cursor-crosshair bg-gray-50",
                  }}
                  // backgroundColor="white"
                  penColor="black"
                  minWidth={2}
                  maxWidth={3}
                  velocityFilterWeight={1}
                />
              </div>
              <div className="p-2 border-t">
                <Button
                  onClick={addDrawnSignature}
                  className="w-full"
                  variant="outline"
                >
                  Add Drawn Signature
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="type" className="space-y-4">
            <div>
              <Label htmlFor="signature-text">Signature Text</Label>
              <Input
                id="signature-text"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>
            <Button
              onClick={addTextSignature}
              className="w-full"
              variant="outline"
            >
              Add Text Signature
            </Button>
          </TabsContent>
        </Tabs>

        <div className="pt-2 border-t">
          <Button onClick={addDate} className="w-full" variant="outline">
            Add Date
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• Draw: Use your mouse or touch to draw your signature</p>
          <p>• Type: Enter your name as text</p>
          <p>• Date: Automatically adds today&apos;s date</p>
        </div>
      </CardContent>
    </Card>
  );
}
