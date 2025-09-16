import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import About from "@/pages/Home/About";
 
import { createBrowserRouter} from "react-router";
 
import Login from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import RideBook from "@/pages/RideBook/RideBook";

 

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    path: "/admin",
    Component: DashBoardLayout,
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
    path: "/ride",
    Component: RideBook,
  }
]);
