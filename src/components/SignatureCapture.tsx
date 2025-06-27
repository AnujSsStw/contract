"use client";

import { useRef, useCallback, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import {
  SIGNATURE_AREAS,
  getSignatureAreaCoordinates,
} from "@/lib/signatureAreas";

interface SignatureCaptureProps {
  onSignatureAdd: (signature: {
    type: "signature" | "text" | "date";
    data: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    pageNumber: number;
  }) => void;
  isParyani: boolean;
  currentPage: number;
  onPageChange?: (pageNumber: number) => void;
}

export function SignatureCapture({
  onSignatureAdd,
  isParyani,
  currentPage,
  onPageChange,
}: SignatureCaptureProps) {
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [signatureText, setSignatureText] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("draw");

  // Get all signature areas for the dropdown
  const allAreas = SIGNATURE_AREAS;

  const handleAreaSelection = useCallback(
    (areaId: string) => {
      setSelectedArea(areaId);

      // Navigate to the page of the selected area
      if (areaId !== "custom") {
        const selectedAreaData = SIGNATURE_AREAS.find(
          (area) => area.id === areaId,
        );
        if (
          selectedAreaData &&
          selectedAreaData.pageNumber !== currentPage &&
          onPageChange
        ) {
          onPageChange(selectedAreaData.pageNumber);
        }

        // Auto-select tab based on area type
        if (selectedAreaData) {
          switch (selectedAreaData.type) {
            case "signature":
              setCurrentTab("draw");
              break;
            case "text":
              setCurrentTab("type");
              break;
            case "date":
              // For date type, we don't need to change tabs as it has its own button
              break;
          }
        }
      }
    },
    [currentPage, onPageChange],
  );

  const clearSignature = useCallback(() => {
    signaturePadRef.current?.clear();
  }, []);

  const addDrawnSignature = useCallback(() => {
    if (signaturePadRef.current?.isEmpty()) {
      return false;
    }

    const sigURL = signaturePadRef.current?.toDataURL();
    if (!sigURL) {
      return false;
    }

    if (!selectedArea) {
      // Fallback to default coordinates if no area selected
      onSignatureAdd({
        type: "signature",
        data: sigURL,
        positionX: 100,
        positionY: 100,
        width: 200,
        height: 100,
        pageNumber: currentPage,
      });
    } else {
      const coordinates = getSignatureAreaCoordinates(selectedArea, isParyani);
      if (coordinates) {
        onSignatureAdd({
          type: "signature",
          data: sigURL,
          positionX: coordinates.x,
          positionY: coordinates.y,
          width: coordinates.width,
          height: coordinates.height,
          pageNumber: currentPage,
        });
      }
    }

    clearSignature();
    return true;
  }, [onSignatureAdd, clearSignature, selectedArea, isParyani, currentPage]);

  const addTextSignature = useCallback(() => {
    if (!signatureText.trim()) {
      return false;
    }

    if (!selectedArea) {
      // Fallback to default coordinates if no area selected
      onSignatureAdd({
        type: "text",
        data: signatureText,
        positionX: 100,
        positionY: 100,
        width: 200,
        height: 50,
        pageNumber: currentPage,
      });
    } else {
      const coordinates = getSignatureAreaCoordinates(selectedArea, isParyani);
      if (coordinates) {
        onSignatureAdd({
          type: "text",
          data: signatureText,
          positionX: coordinates.x,
          positionY: coordinates.y,
          width: coordinates.width,
          height: coordinates.height,
          pageNumber: currentPage,
        });
      }
    }

    setSignatureText("");
    return true;
  }, [signatureText, onSignatureAdd, selectedArea, isParyani, currentPage]);

  const addDate = useCallback(() => {
    const today = new Date().toLocaleDateString();

    if (!selectedArea) {
      // Fallback to default coordinates if no area selected
      onSignatureAdd({
        type: "date",
        data: today,
        positionX: 100,
        positionY: 150,
        width: 150,
        height: 30,
        pageNumber: currentPage,
      });
    } else {
      const coordinates = getSignatureAreaCoordinates(selectedArea, isParyani);
      if (coordinates) {
        onSignatureAdd({
          type: "date",
          data: today,
          positionX: coordinates.x,
          positionY: coordinates.y,
          width: coordinates.width,
          height: coordinates.height,
          pageNumber: currentPage,
        });
      }
    }
  }, [onSignatureAdd, selectedArea, isParyani, currentPage]);

  // Filter areas available on the current page
  const currentPageAreas = SIGNATURE_AREAS.filter(
    (area) => area.pageNumber === currentPage,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Signature</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Signature Area Selection */}
        <div>
          <Label htmlFor="signature-area">Signature Area</Label>
          <Select value={selectedArea} onValueChange={handleAreaSelection}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select signature area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">Custom Position</SelectItem>
              {allAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.label} (Page {area.pageNumber})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedArea && (
            <p className="text-xs text-muted-foreground mt-1">
              Selected: {allAreas.find((a) => a.id === selectedArea)?.label}
              {selectedArea !== "custom" &&
                allAreas.find((a) => a.id === selectedArea) &&
                ` (Page ${allAreas.find((a) => a.id === selectedArea)?.pageNumber})`}
            </p>
          )}
        </div>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
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
          <p>• Select a signature area from the dropdown above</p>
          <p>• Draw: Use your mouse or touch to draw your signature</p>
          <p>• Type: Enter your name as text</p>
          <p>• Date: Automatically adds today&apos;s date</p>

          {/* Show available areas for current page */}
          {currentPageAreas.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <p className="font-medium">Available on Page {currentPage}:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {currentPageAreas.map((area) => (
                  <li key={area.id} className="text-xs">
                    {area.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
