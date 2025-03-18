import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileCodeIcon as FileContract,
  FileEdit,
  FilePlus,
  UserPlus,
} from "lucide-react";

interface ProjectActivityCardProps {
  projectId: string;
}

export function ProjectActivityCard({ projectId }: ProjectActivityCardProps) {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "subcontract_created",
      title: "Electrical Work",
      user: "John Smith",
      date: "2023-04-10T14:30:00Z",
      icon: FilePlus,
    },
    {
      id: 2,
      type: "subcontract_signed",
      title: "Structural Steel",
      user: "Sarah Johnson",
      date: "2023-03-25T10:15:00Z",
      icon: FileContract,
    },
    {
      id: 3,
      type: "project_edited",
      title: "Project details updated",
      user: "Michael Brown",
      date: "2023-03-20T09:45:00Z",
      icon: FileEdit,
    },
    {
      id: 4,
      type: "member_added",
      title: "Team member added",
      user: "Emily Davis",
      date: "2023-03-18T16:20:00Z",
      icon: UserPlus,
    },
    {
      id: 5,
      type: "subcontract_created",
      title: "Concrete Work",
      user: "John Smith",
      date: "2023-03-15T11:30:00Z",
      icon: FilePlus,
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <activity.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">{activity.user}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(activity.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
