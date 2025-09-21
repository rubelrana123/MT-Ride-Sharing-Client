import { useGetAnalyticsQuery } from "@/redux/features/analytics/analytics.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import Loading from "@/components/modules/shared/Loading";
import ViewAllRides from "./AllRides";

export default function Analytics() {
  const { data, isLoading, isError } = useGetAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <div className="p-6">Failed to load analytics</div>;

  const stats = data;

  // Pie data for users
  const userPieData = [
    { name: "Admins", value: stats.totalUsers.totalAdmins },
    { name: "Riders", value: stats.totalUsers.totalRiders },
    { name: "Drivers", value: stats.totalUsers.totalDrivers },
  ];

  // Pie data for rides
  const ridePieData = [
    { name: "Completed", value: stats.completedRides },
    { name: "Cancelled", value: stats.cancelledRides },
    { name: "Total", value: stats.totalRides },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard Analytics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalUsers.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalRides}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.completedRides}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalEarnings} BDT</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Users Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={userPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {userPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rides Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rides Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ridePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {ridePieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
   
     <div className="mt-10">
     <ViewAllRides/>
     </div>
    </div>
  );
}
