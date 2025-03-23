import { FormData } from "../subcontract-wizard";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

export function ExtraInfoStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}) {
  const [exclusions, setExclusions] = React.useState<string[]>(
    formData.exclusions || [""],
  );

  const [costBreakdown, setCostBreakdown] = React.useState<string[]>(
    formData.costBreakdown || [""],
  );

  const handleExclusionChange = (index: number, value: string) => {
    const newExclusions = [...exclusions];
    newExclusions[index] = value;
    setExclusions(newExclusions);
    updateFormData({ exclusions: newExclusions });
  };

  const handleCostBreakdownChange = (index: number, value: string) => {
    const newCostBreakdown = [...costBreakdown];
    newCostBreakdown[index] = value;
    setCostBreakdown(newCostBreakdown);
    updateFormData({ costBreakdown: newCostBreakdown });
  };

  const addExclusion = () => {
    setExclusions([...exclusions, ""]);
  };

  const removeExclusion = (index: number) => {
    const newExclusions = exclusions.filter((_, i) => i !== index);
    setExclusions(newExclusions);
    updateFormData({ exclusions: newExclusions });
  };

  const addCostBreakdown = () => {
    setCostBreakdown([...costBreakdown, ""]);
  };

  const removeCostBreakdown = (index: number) => {
    const newCostBreakdown = costBreakdown.filter((_, i) => i !== index);
    setCostBreakdown(newCostBreakdown);
    updateFormData({ costBreakdown: newCostBreakdown });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label className="text-lg font-semibold">Exclusions</Label>
        <p className="text-sm text-muted-foreground mb-4">
          List any items that are excluded from the scope of work.
        </p>
        <div className="space-y-4">
          {exclusions.map((exclusion, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={exclusion}
                onChange={(e) => handleExclusionChange(index, e.target.value)}
                placeholder={`Exclusion #${index + 1}`}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeExclusion(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addExclusion} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Exclusion
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-lg font-semibold">Cost Breakdown</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Break down the contract value into specific line items.
        </p>
        <div className="space-y-4">
          {costBreakdown.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={item}
                onChange={(e) =>
                  handleCostBreakdownChange(index, e.target.value)
                }
                placeholder={`Cost Item #${index + 1}`}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCostBreakdown(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={addCostBreakdown}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Cost Item
          </Button>
        </div>
      </div>
    </div>
  );
}
