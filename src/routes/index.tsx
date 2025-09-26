 
 

import { createBrowserRouter, Navigate } from "react-router";

import Login from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import RideBook from "@/components/modules/ride/RideBook";
import generateRoute from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSliderItems";
import { driverSidebarItems } from "./driverSliderItems";
import DriverApplications from "@/components/modules/ride/DriverApplication";
import RideDetails from "@/pages/Ride/RideDetails";
import Home from "@/pages/public/Home";
import App from "@/App";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import AboutPage from "@/pages/About/About";
import { riderSidebarItems } from "./riderSliderItems";
 
import { withAuth } from "@/utils/withAuth";
import UpdateProfile from "@/components/modules/user/UpdateProfile";
import UserProfile from "@/pages/user/UserProfile";
import Unauthorized from "@/components/modules/shared/Unauthorized";
import Features from "@/pages/public/FeaturesPage";
import ContactPage from "@/pages/public/ContactPage";
import FaqPage from "@/pages/public/FaqPage";
 

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
      {
        path :"/features",
        Component : Features
      },
      {
        path : "/faq",
        Component : FaqPage
      },
      {
        path : "/contact",
        Component : ContactPage
      }
    ],
  },

    {
    path: "/dashboard",
    Component: withAuth(DashboardLayout, ["RIDER", "DRIVER", "ADMIN", "SUPER_ADMIN"]),
    children: [
      { index: true, element: <Navigate to="/dashboard/profile" /> },
      {
        path: "/dashboard/rideDetails/:rideId",
        Component: RideDetails,
      },
            {
        path: "/dashboard/profile",
        Component: UserProfile,
      },
     {
        path: "/dashboard/updateProfile",
        Component: UpdateProfile,
      },
    ],
  },



  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    path: "/drivers",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/drivers/earning-analytics" /> },
      ...generateRoute(driverSidebarItems),
    ],
  },
    {
    path: "/riders",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/riders/history" /> },
      ...generateRoute(riderSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
    {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
