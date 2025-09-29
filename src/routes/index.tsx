import { lazy } from "react";
 
 

import { createBrowserRouter, Navigate } from "react-router";

const Login = lazy(() => import("@/pages/Auth/Login"));
const UpdateProfile = lazy(() => import("@/components/modules/user/UpdateProfile"));
const UserProfile = lazy(() => import("@/pages/user/UserProfile"));
const Unauthorized = lazy(() => import("@/components/modules/shared/Unauthorized"));
const RideDetails = lazy(() => import("@/pages/Ride/RideDetails"));

import generateRoute from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSliderItems";
import { driverSidebarItems } from "./driverSliderItems";
import Home from "@/pages/public/Home";
import App from "@/App";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import AboutPage from "@/pages/About/About";
import { riderSidebarItems } from "./riderSliderItems";
 
import { withAuth } from "@/utils/withAuth";
import Features from "@/pages/public/FeaturesPage";
import ContactPage from "@/pages/public/ContactPage";
import FaqPage from "@/pages/public/FaqPage";
import { Register } from "@/pages/Auth/Register";
 

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
        path: "/about",
        Component: AboutPage,
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
    Component: withAuth(DashboardLayout ,["ADMIN", "SUPER_ADMIN"]),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    path: "/drivers",
    Component: withAuth(DashboardLayout ,["DRIVER"]),
    children: [
      { index: true, element: <Navigate to="/drivers/analytics" /> },
      ...generateRoute(driverSidebarItems),
    ],
  },
    {
    path: "/riders",
    Component: withAuth(DashboardLayout ,["RIDER"]),
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
