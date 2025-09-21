 
 

import { createBrowserRouter, Navigate } from "react-router";

import Login from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import RideBook from "@/pages/Ride/RideBook";
import generateRoute from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSliderItems";
import { driverSidebarItems } from "./driverSliderItems";
import DriverApplications from "@/components/modules/Admin/DriverApplication";
import RideDetails from "@/pages/Ride/RideDetails";
import Home from "@/pages/Home/Home";
import App from "@/App";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import AboutPage from "@/pages/About/About";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        path: "/ride-book",
        Component: RideBook,
      },
            {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/drivers/driver-application",
        Component: DriverApplications,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      // { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    path: "/drivers",
    Component: DashboardLayout,
    children: [
      // { index: true, element: <Navigate to="/drivers/:driverId/availability" /> },
      ...generateRoute(driverSidebarItems),
    ],
  },
  {
    path: "/dashboard/rideDetails/:rideId",
    Component: RideDetails,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
