import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import About from "@/pages/Home/About";
 
import { createBrowserRouter, Navigate} from "react-router";
 
import Login from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import RideBook from "@/pages/RideBook/RideBook";
import generateRoute from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSliderItems";
import { driverSidebarItems } from "./driverSliderItems";
import DriverApplications from "@/pages/Admin/DriverApplications";

 

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
      {
        path: "/ride-book",
        Component: RideBook,
      },
      {
        path: "/drivers/driver-application",
        Component: DriverApplications,
      }
    ],
  },
  {
    path: "/admin",
    Component:  DashBoardLayout,
    children: [
      // { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    path: "/drivers",
    Component:  DashBoardLayout,
    children: [
      // { index: true, element: <Navigate to="/drivers/:driverId/availability" /> },
      ...generateRoute(driverSidebarItems),
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

]);
