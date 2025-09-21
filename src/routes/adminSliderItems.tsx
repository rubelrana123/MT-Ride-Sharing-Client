 
import AllDriverApplications from "@/pages/Admin/AllDriverApplications";
import AllRides from "@/pages/Admin/AllRides";
import AllUsers from "@/pages/Admin/AllUsers";
 
 
 
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
            {
        title: "Users",
        url: "/admin/all-users",
        Component: AllUsers,
       
      },
  

    ],
  },
  {
    title: "Driver Management",
    items: [
      { title: "Driver Applications", url: "/admin/driver-application", Component: AllDriverApplications },
    ],
  }
];
