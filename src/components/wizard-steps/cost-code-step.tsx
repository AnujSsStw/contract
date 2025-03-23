"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { useQuery } from "convex/react";
import { FormData } from "../subcontract-wizard";
import { useEffect } from "react";

interface CostCodeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export function CostCodeStep({ formData, updateFormData }: CostCodeStepProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const costCodes = useQuery(api.subcontract.getCostCodes);
  const [selectedCostCode, setSelectedCostCode] = React.useState(
    formData.costCode?._id,
  );

  useEffect(() => {
    if (formData.costCode) {
      setSelectedCostCode(formData.costCode._id);
    }
  }, [formData.costCode]);

  const filteredCostCodes =
    costCodes?.filter(
      (code) =>
        code.code.includes(searchTerm) ||
        code.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleCostCodeSelect = (costCode: string) => {
    setSelectedCostCode(costCode as Id<"costCodes">);
    updateFormData({
      costCode: costCodes?.find((code) => code._id === costCode),
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
        <Label>Select a Cost Code</Label>
        <ScrollArea className="h-[400px] rounded-md border">
          <RadioGroup
            value={selectedCostCode}
            onValueChange={handleCostCodeSelect}
            className="p-4"
          >
            {filteredCostCodes.map((code) => (
              <div key={code._id} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={code._id} id={code._id} />
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
          </RadioGroup>
        </ScrollArea>
      </div>
    </div>
  );
}
