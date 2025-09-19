import RideHistory from "@/pages/Rider/RideHistory";
import RequestRide from "@/pages/Rider/RequestRide";
import CancelRide from "@/pages/Rider/CancelRide";
import Profile from "@/pages/Rider/Profile";

import type { ISliderItem } from "@/types";

export const riderSidebarItems: ISliderItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/rider/profile",
        Component: Profile,
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
      { title: "Request Ride", url: "/rider/request-ride", Component: RequestRide },
      { title: "Ride History", url: "/rider/ride-history", Component: RideHistory },
      { title: "Cancel Ride", url: "/rider/cancel-ride", Component: CancelRide },
    ],
  },
];
