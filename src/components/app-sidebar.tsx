import * as React from "react"
 
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
} from "@/components/ui/sidebar"
 
import { Link } from "react-router"
import { getSildeBarItems } from "@/utils/getSildeBarItems"
 
import { Logo } from "@/assets/icons/Logo"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { IUser } from "@/types"
import SidebarUser from "./SidebarUser"
 
 interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userProfile: IUser | undefined;
}
export function AppSidebar({ userProfile, ...props }: AppSidebarProps) {
  const {data} = useUserInfoQuery(undefined)
  console.log(data, "data from sidebar");
const role = data?.data?.role;
const NavItems = {
  navMain: getSildeBarItems(role),

}
  return (
    <Sidebar {...props}>
      <SidebarHeader>
      <Link to="/">
      
        <Logo/>
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
                    <SidebarMenuButton asChild >
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
  )
}
