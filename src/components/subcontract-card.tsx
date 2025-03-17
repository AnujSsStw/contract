import Link from "next/link";
import {
  Building2,
  Download,
  FileCodeIcon as FileContract,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubcontractCardProps {
  title: string;
  projectName: string;
  subcontractor: string;
  value: number;
  status: "draft" | "exported" | "signed";
  className?: string;
}

export function SubcontractCard({
  title,
  projectName,
  subcontractor,
  value,
  status,
  className,
}: SubcontractCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileContract className="h-5 w-5 text-primary" />
            <span className="truncate">{title}</span>
          </div>
          <Badge
            variant={
              status === "draft"
                ? "outline"
                : status === "exported"
                  ? "secondary"
                  : "default"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{projectName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subcontractor:</span>
            <span className="font-medium">{subcontractor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contract Value:</span>
            <span className="font-medium">${value.toLocaleString()}.00</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href={`/subcontracts/123`}>View Details</Link>
        </Button>
        {status !== "draft" && (
          <Button asChild size="sm">
            <Link href={`/subcontracts/123/download`}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button>
        )}
        {status === "draft" && (
          <Button asChild size="sm">
            <Link href={`/subcontracts/123/edit`}>Continue Editing</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
