"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractValueStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

// Function to convert number to words
function numberToWords(num: number): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const numToWord = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + ones[n % 10] : "")
      );
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " " + numToWord(n % 100) : "")
      );
    if (n < 1000000)
      return (
        numToWord(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0 ? " " + numToWord(n % 1000) : "")
      );
    if (n < 1000000000)
      return (
        numToWord(Math.floor(n / 1000000)) +
        " Million" +
        (n % 1000000 !== 0 ? " " + numToWord(n % 1000000) : "")
      );
    return (
      numToWord(Math.floor(n / 1000000000)) +
      " Billion" +
      (n % 1000000000 !== 0 ? " " + numToWord(n % 1000000000) : "")
    );
  };

  const dollars = Math.floor(num);
  const cents = Math.round((num - dollars) * 100);

  let result = "";

  if (dollars === 0) {
    result = "Zero Dollars";
  } else {
    result = numToWord(dollars) + " Dollars";
  }

  if (cents > 0) {
    result += " and " + numToWord(cents) + " Cents";
  } else {
    result += " and Zero Cents";
  }

  return result;
}

export function ContractValueStep({
  formData,
  updateFormData,
}: ContractValueStepProps) {
  const [value, setValue] = React.useState<string>(
    formData.contractValue ? formData.contractValue.toString() : "",
  );
  const [valueInWords, setValueInWords] = React.useState<string>(
    formData.contractValueText || "",
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");
    setValue(inputValue);

    const numValue = Number.parseFloat(inputValue) || 0;
    const words = numberToWords(numValue);
    setValueInWords(words);

    updateFormData({
      contractValue: numValue,
      contractValueText: words,
    });
  };

  const formatCurrency = (value: string): string => {
    const num = Number.parseFloat(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contract-value">Contract Value</Label>
        <Input
          id="contract-value"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract-value-formatted">Formatted Value</Label>
        <Input
          id="contract-value-formatted"
          value={formatCurrency(value)}
          readOnly
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract-value-words">Value in Words</Label>
        <div className="p-3 border rounded-md bg-muted/30 min-h-[60px]">
          {valueInWords || "Zero Dollars and Zero Cents"}
        </div>
      </div>
    </div>
  );
}
