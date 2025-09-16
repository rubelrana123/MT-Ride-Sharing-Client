import Analytics from "@/pages/Admin/Analytics";
import DriverApplications from "@/pages/Admin/DriverApplications";
import type { ISliderItem } from "@/types";

 
export const adminSidebarItems : ISliderItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/analytics",
        Component: Analytics,
      },
    ],
  },
  {
    title: "Driver Management",
    items: [
      {
        title: "Driver Applications",
        url: "/admin/driver-applications",
        Component: DriverApplications,
      },
 
 
    ],
  },
];
