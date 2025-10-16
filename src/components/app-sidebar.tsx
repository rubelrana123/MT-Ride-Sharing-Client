import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Link } from "react-router";
import { getSildeBarItems } from "@/utils/getSildeBarItems";

import { Logo } from "@/assets/icons/Logo";
 
import type { IUser, TRole } from "@/types";
import SidebarUser from "./SidebarUser";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userProfile: IUser | undefined;
}
export function AppSidebar({ userProfile, ...props }: AppSidebarProps) {
  const { data : userInfo } = useGetUserProfileQuery(undefined);
  // console.log(data, "data from sidebar");
  const role = userInfo?.role;
  const NavItems = {
    navMain: getSildeBarItems(role as TRole),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {NavItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <SidebarUser user={userProfile as IUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
