 
import AllDriverApplications from "@/components/modules/Admin/DriverApplications";
import { AllRides } from "@/pages/Admin/AllRides";
import Analytics from "@/pages/Admin/AnalyticsStats";
 
import type { ISliderItem } from "@/types";
 

export const adminSidebarItems: ISliderItem[] = [
  {
    title : "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
      },
    ],
  },
 
  {
    title: "Ride Management",
    items: [
      { title: "All Rides", url: "/admin/rides", Component: AllRides },
      { title: "All Rides", url: "/admin/rides", Component: AllRides },

    ],
  },
  {
    title: "Driver Management",
    items: [
      { title: "Driver Applications", url: "/admin/driver-application", Component: AllDriverApplications },
    ],
  }
];
