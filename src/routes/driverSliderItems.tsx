import type { ISliderItem } from "@/types";
 
import IncomingRequest from "@/pages/Drivers/IncomingRequest";
import DriverEarnings from "@/pages/Drivers/DriverEarning";
import DriverAnalytics from "@/pages/Drivers/DriverAnalytics";
 

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
        Component: IncomingRequest,
      },
      { title: "My Earnings", url: "/drivers/earning-analytics", Component: DriverEarnings },

     
    ],
  } 
];
