 

import type { ISliderItem } from "@/types";
import RideBook from "@/components/modules/ride/RideBook";
import DriverApplications from "@/components/modules/ride/DriverApplication";
import RideHistory from "@/pages/Ride/RideHistory";
import RideRequest from "@/pages/Ride/RequestRide";
 
export const riderSidebarItems: ISliderItem[] = [
  {
    title: "Dashboard",
    items: [
            {
        title: "Ride History",
        url: "/riders/history",
        Component: RideHistory
      },
    
    ],
  },
  {
    title: "Ride Management",
    items: [
          {
        title: "Request Ride",
        url: "/riders/ride-book",
        Component: RideRequest,
      },

      { title: "Driver Applications", url: "/riders/driver-application", Component: DriverApplications },
    ],
  },
];
