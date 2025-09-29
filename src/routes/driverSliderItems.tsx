import IncomingRideRequest from "@/pages/Drivers/IncomingRideRequest";
import type { ISliderItem } from "@/types";
import { lazy } from "react";
 
// Lazy load driver & ride pages
// const IncomingRequest = lazy(() => import("@/components/modules/driver/IncomingRequest"));
const DriverEarnings = lazy(() => import("@/pages/Drivers/DriverEarning"));
const DriverAnalytics = lazy(() => import("@/pages/Drivers/DriverAnalytics"));
const RideHistory = lazy(() => import("@/pages/Ride/RideHistory"));

export const driverSidebarItems: ISliderItem[] = [
    {
    title: "DashBoard",
    items: [
           {
        title: "Analytics",
        url: "/drivers/analytics",
        Component: DriverAnalytics
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
            {
        title: "Incoming Request",
        url: "/drivers/incoming-request",
        Component: IncomingRideRequest,
      },
      { title: "My Earnings", url: "/drivers/earning-analytics", Component: DriverEarnings },
      {
        title: "Ride History",
        url: "/drivers/ride-history",
        Component: RideHistory, 
      },
     
    ],
  } 
];
