
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDriverAnalyticsQuery } from "@/redux/features/driver/driver.api";
 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
 

export default function DriverAnalytics() {
  const {data, isLoading, isError} = useGetDriverAnalyticsQuery(undefined);
  const [filter, setFilter] = useState("7"); // default: 7 days
console.log(data, "here ana data")
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="text-center text-red-500">Failed to load dashboard data.</p>;
  }

  const stats = data || [];

  // Transform daily earnings for recharts
  let dailyEarnings = stats.driverDailyEarnings.map((d: any) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    earnings: d.totalDriverEarnings,
  }));

  // Apply filter
  if (filter === "7") {
    dailyEarnings = dailyEarnings.slice(-7);
  } else if (filter === "30") {
    dailyEarnings = dailyEarnings.slice(-30);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Earnings */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{stats.totalEarnings}</p>
        </CardContent>
      </Card>

      {/* Total Completed Rides */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Completed Rides</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalCompletedRides}</p>
        </CardContent>
      </Card>

      {/* Chart with Filter */}
{stats.driverDailyEarnings && stats.driverDailyEarnings.length > 0 ? (
  <Card className="md:col-span-2 lg:col-span-3 shadow-md">
    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
      <CardTitle>Daily Earnings</CardTitle>
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(val) => val && setFilter(val)}
        className="mt-2 md:mt-0"
      >
        <ToggleGroupItem value="7">Last 7 days</ToggleGroupItem>
        <ToggleGroupItem value="30">Last 30 days</ToggleGroupItem>
        <ToggleGroupItem value="all">All</ToggleGroupItem>
      </ToggleGroup>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dailyEarnings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="earnings" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
) : (
  <div className="col-span-2 lg:col-span-3 flex items-center justify-center h-64 text-gray-500">
    You Are a New Driver! Enjoy Your Day 🚗
  </div>
)}

    </div>
  );
}
