"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@cvx/_generated/api";
import { DataModel, Id } from "@cvx/_generated/dataModel";
import { useQuery } from "convex/react";
import { FormData } from "../subcontract-wizard";
import { useEffect } from "react";
import { Badge } from "../ui/badge";
interface CostCodeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function CostCodeStep({ formData, updateFormData }: CostCodeStepProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const costCodes = useQuery(api.subcontract.getCostCodes);
  const [selectedCostCodes, setSelectedCostCodes] = React.useState<
    DataModel["costCodes"]["document"]["_id"][]
  >(formData.costCodes || []);

  useEffect(() => {
    if (formData.costCodes) {
      setSelectedCostCodes(formData.costCodes);
    }
  }, [formData.costCodes]);

  const filteredCostCodes =
    costCodes?.filter(
      (code) =>
        code.code.includes(searchTerm) ||
        code.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleCostCodeToggle = (
    costCodeId: Id<"costCodes">,
    checked: boolean,
  ) => {
    setSelectedCostCodes((prev) => {
      const newSelection = checked
        ? [...prev, costCodeId]
        : prev.filter((id) => id !== costCodeId);
      updateFormData({
        costCodes: newSelection,
        costCodeData: costCodes?.filter((code) =>
          newSelection.includes(code._id),
        ),
      });

      return newSelection;
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cost-code-search">Search Cost Codes</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="cost-code-search"
            placeholder="Search by code or name"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Select Cost Codes{" "}
          {formData.costCodeData?.map((code) => (
            <Badge className="mr-2" key={code.code}>
              {code.code}
            </Badge>
          ))}
        </Label>
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="p-4">
            {filteredCostCodes.map((code) => (
              <div key={code._id} className="flex items-center space-x-2 py-2">
                <Checkbox
                  id={code._id}
                  checked={selectedCostCodes.includes(code._id)}
                  onCheckedChange={(checked) =>
                    handleCostCodeToggle(code._id, checked as boolean)
                  }
                />
                <Label htmlFor={code._id} className="flex-1 cursor-pointer">
                  <span className="font-medium">{code.code}</span> -{" "}
                  {code.description}
                </Label>
              </div>
            ))}
            {filteredCostCodes.length === 0 && (
              <div className="py-4 text-center text-muted-foreground">
                No cost codes found. Try a different search term.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
