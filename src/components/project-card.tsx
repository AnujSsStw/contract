import Link from "next/link";
import { Building2, FileCodeIcon as FileContract } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  name: string;
  number: string;
  address: string;
  client: string;
  subcontractCount: number;
  className?: string;
}

export function ProjectCard({
  name,
  number,
  address,
  client,
  subcontractCount,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="truncate">{name}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project Number:</span>
            <span className="font-medium">{number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Client:</span>
            <span className="font-medium">{client}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-medium">{address}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FileContract className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {subcontractCount} Subcontracts
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href={`/projects/${number}`}>View Details</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/subcontracts/new?project=${number}`}>
            <FileContract className="mr-2 h-4 w-4" />
            New Subcontract
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
