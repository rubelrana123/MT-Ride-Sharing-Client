import { lazy } from "react";
import type { ISliderItem } from "@/types";

const Analytics = lazy(() => import("@/pages/Admin/AnalyticsStats"));
const AllRides = lazy(() => import("@/pages/Admin/AllRides"));
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));
const AllDriverApplications = lazy(
  () => import("@/pages/Admin/AllDriverApplications")
);

export const adminSidebarItems: ISliderItem[] = [
  {
    title: "Dashboard",
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
      {
        title: "Driver Applications",
        url: "/admin/driver-application",
        Component: AllDriverApplications,
      },
    ],
  },
];
