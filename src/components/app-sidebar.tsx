import * as React from "react"
 
import {
  Sidebar,
  SidebarContent,
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
 
 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data} = useUserInfoQuery(undefined)
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
    </Sidebar>
  )
}
