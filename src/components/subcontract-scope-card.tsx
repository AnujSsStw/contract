import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubcontractScopeCardProps {
  scopes:
    | Array<{
        type: string;
        text: string;
      }>
    | undefined;
}

export function SubcontractScopeCard({ scopes }: SubcontractScopeCardProps) {
  // Get icon based on scope type
  const getScopeTypeLabel = (type: string) => {
    switch (type) {
      case "manual":
        return "Manually Added";
      case "suggested":
        return "From Template";
      case "ai":
        return "AI Generated";
      default:
        return "Scope Item";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scope of Work</CardTitle>
        <CardDescription>
          Detailed scope of work for this subcontract
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 space-y-4">
          {scopes && scopes.length > 0
            ? scopes.map((scope, index) => (
                <li key={index} className="pl-2">
                  <div className="space-y-1">
                    <p>{scope.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {getScopeTypeLabel(scope.type)}
                    </p>
                  </div>
                </li>
              ))
            : "No scope of work added"}
        </ol>
      </CardContent>
    </Card>
  );
}
