import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProjectDetailsCardProps {
  project: {
    id: string;
    name: string;
    address: string;
    client: string;
    clientLegalEntity: string;
    architect: string;
    bonds: boolean;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export function ProjectDetailsCard({ project }: ProjectDetailsCardProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Complete information about this project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="font-medium">Project Number</div>
              <div>{project.id}</div>
            </div>
            <div>
              <div className="font-medium">Status</div>
              <div className="capitalize">{project.status}</div>
            </div>
            <div>
              <div className="font-medium">Start Date</div>
              <div>{formatDate(project.startDate)}</div>
            </div>
            <div>
              <div className="font-medium">End Date</div>
              <div>{formatDate(project.endDate)}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Location
          </h3>
          <div className="text-sm">
            <div className="font-medium">Address</div>
            <div>{project.address}</div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Client Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="font-medium">Client Name</div>
              <div>{project.client}</div>
            </div>
            <div>
              <div className="font-medium">Legal Entity</div>
              <div>{project.clientLegalEntity}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Project Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="font-medium">Architect</div>
              <div>{project.architect}</div>
            </div>
            <div>
              <div className="font-medium">Bonds Required</div>
              <div>{project.bonds ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Description
          </h3>
          <div className="text-sm">
            <p>{project.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
