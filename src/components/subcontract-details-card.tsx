"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@cvx/_generated/api";
import { FunctionReturnType } from "convex/server";
import { numberToWords } from "./wizard-steps/contract-value-step";

export function SubcontractDetailsCard(
  subcontract: FunctionReturnType<typeof api.subcontract.get>,
) {
  // Format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toDateString();
    // const date = new Date(dateString);
    // return date.toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // });
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subcontract Details</CardTitle>
        <CardDescription>
          Complete information about this subcontract
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {/* <div>
              <div className="font-medium">Status</div>
              <div className="capitalize">
                {subcontract?.isDraft ? "draft" : "signed"}
              </div>
            </div> */}
            <div>
              <div className="font-medium">Project</div>
              <div>{subcontract?.projectName}</div>
            </div>
            <div>
              <div className="font-medium">Cost Code</div>
              <div>{subcontract?.costCode?.code}</div>
            </div>
            <div>
              <div className="font-medium">Created Date</div>
              <div>
                {/* {formatDate(subcontract?._creationTime.toString() ?? "")} */}
                {new Date(subcontract?._creationTime ?? 0).toDateString()}
              </div>
            </div>
            {/* {subcontract?.docusignSent && (
              <div>
                <div className="font-medium">Signed Date</div>
                <div>
                  {formatDate(subcontract?.docusignSent.toString() ?? "")}
                </div>
              </div>
            )} */}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Subcontractor Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="font-medium">Company Name</div>
              <div>{subcontract?.contactName}</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">Address</div>
              <div>{subcontract?.companyAddress}</div>
            </div>
            <div>
              <div className="font-medium">Phone</div>
              <div>{subcontract?.contactPhone}</div>
            </div>
            <div>
              <div className="font-medium">Email</div>
              <div>{subcontract?.contactEmail}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Contract Value
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium">Amount</div>
              <div className="text-lg font-bold">
                {formatCurrency(subcontract?.contractValue ?? 0)}
              </div>
            </div>
            <div>
              <div className="font-medium">Amount in Words</div>
              <div>{numberToWords(subcontract?.contractValue ?? 0)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
