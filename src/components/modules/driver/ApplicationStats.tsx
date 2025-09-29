// components/ApplicationStats.tsx
import { Card, CardContent} from "@/components/ui/card";
import type { DriverApplication } from "@/types/driver.type";
import { Users, Clock, CheckCircle, XCircle} from "lucide-react";
 

interface ApplicationStatsProps {
  applications: DriverApplication[];
}

export default function ApplicationStats({ applications }: ApplicationStatsProps) {
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.driverStatus === "pending").length,
    approved: applications.filter(app => app.driverStatus === "approved").length,
    rejected: applications.filter(app => app.driverStatus === "rejected").length,
    suspended: applications.filter(app => app.driverStatus === "suspend").length,
  };

  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}