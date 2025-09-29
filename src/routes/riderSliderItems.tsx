import RideRequest from "@/pages/Ride/RequestRide";
// import DriverApplications from "@/components/modules/ride/DriverApplication";

import type { ISliderItem } from "@/types";
import RideHistory from "@/pages/Ride/RideHistory";
import DriverApplications from "@/components/modules/ride/DriverApplication";

export const riderSidebarItems: ISliderItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Ride History",
        url: "/riders/history",
        Component: RideHistory,
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

      {
        title: "Driver Application",
        url: "/riders/driver-application",
        Component: DriverApplications,
      },
    ],
  },
];
