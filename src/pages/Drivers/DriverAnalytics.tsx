import { useGetDriverAnalyticsQuery } from "@/redux/features/driver/driver.api";

 
export default function DriverAnalytics() {
  const {data} = useGetDriverAnalyticsQuery(undefined);
  console.log(data, 'driver analytics data');
  return (
    <div>
    <p>DriverAnalytics</p>
    </div>
  )
}
