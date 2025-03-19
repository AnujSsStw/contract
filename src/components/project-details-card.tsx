import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataModel } from "@cvx/_generated/dataModel";

export function ProjectDetailsCard({
  project,
}: {
  project: DataModel["projects"]["document"];
}) {
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
              <div>{project.name}</div>
            </div>
            <div>
              <div className="font-medium">Status</div>
              <div className="capitalize">{project.status}</div>
            </div>
            <div>
              <div className="font-medium">Created at</div>
              <div className="capitalize">
                {new Date(project._creationTime).toLocaleDateString()}
              </div>
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
              <div>{project.clientName}</div>
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
              <div>{project.bondsRequired ? "Yes" : "No"}</div>
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
