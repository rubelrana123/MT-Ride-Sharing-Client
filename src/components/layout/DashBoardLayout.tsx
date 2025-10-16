import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
import { Outlet } from "react-router";
import UserAvailabilityToggle from "../modules/driver/DriverAvailabilityToggle";

export default function DashboardLayout() {
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  console.log(userProfile, "userprofile");
  return (
    <SidebarProvider>
      <AppSidebar userProfile={userProfile} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {userProfile?.role === "DRIVER" && (
            <UserAvailabilityToggle userRole={userProfile?.role} />
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
