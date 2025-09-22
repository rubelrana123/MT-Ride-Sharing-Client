 
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
import { type TRole } from "@/types";
import type { ComponentType } from "react";
 
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRoles?: TRole | TRole[]) => {
  return function AuthWrapper() {
    const { data : info, isLoading } = useGetUserProfileQuery(undefined);

    const userInfo = info;
    console.log("auth indise",userInfo);
    if (!isLoading && !userInfo?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRoles && !isLoading) {
      const userRole = userInfo?.role;
      const isActive = userInfo?.isActive;
 

      if (isActive === "blocked") {
        return (
          <Navigate
            to="/account-status"
            state={{ status: "blocked" }}
            replace
          />
        );
      }
      

      if (Array.isArray(requiredRoles)) {
        if (!requiredRoles.includes(userRole)) {
          return <Navigate to="/unauthorized" />;
        }
      } else {
        if (requiredRoles !== userRole) {
          return <Navigate to="/unauthorized" />;
        }
      }
    }

    // return <Navigate to="/unauthorized" />

    return <Component />;
  };
};
