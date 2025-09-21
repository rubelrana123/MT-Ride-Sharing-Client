// components/UserStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import type { IUser } from "@/types";

interface UserStatsProps {
  users: IUser[];
}

export default function UserStats({ users }: UserStatsProps) {
  const stats = {
    total: users.length,
    active: users.filter(user => !user.isDeleted && user.isActive).length,
    blocked: users.filter(user => !user.isDeleted && !user.isActive).length,
    riders: users.filter(user => user.role === "rider").length,
    drivers: users.filter(user => user.role === "driver").length,
    admins: users.filter(user => user.role === "admin").length,
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Active Users",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Blocked Users",
      value: stats.blocked,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      title: "Drivers",
      value: stats.drivers,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
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