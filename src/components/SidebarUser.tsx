"use client";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
 
import type { IUser } from "@/types";
import { User } from "lucide-react";
import { Link } from "react-router";
 
import { useAppDispatch } from "@/redux/hook";
 
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { userApi } from "@/redux/features/user/user.api";
import { toast } from "sonner";
 

interface ISidebarUserProps {
  user: IUser;
}

export default function SidebarUser({ user }: ISidebarUserProps) {
  // const { isMobile } = useSidebar();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(userApi.util.resetApiState());
      toast.success("Logout Successfully");
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn("data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground")}
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={
                     
                    "https://image.winudf.com/p/aHR0cHM6Ly9wbGF5LWxoLmdvb2dsZXVzZXJjb250ZW50LmNvbS9FOVE3WEdaeDNZVVFzcGxwZDRsSnZLT2xDNWx4ejNnaUszajJpdUV4TlpTYnFWcldzUkQtbW0wTG9BYTJORWY5UFE9aDgwMA?k=66f508aaa629d46d3d843b54633e0c0468e25b12&.jpg"
                  }
                  alt={user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 z-[9999] rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                     
                      "https://image.winudf.com/p/aHR0cHM6Ly9wbGF5LWxoLmdvb2dsZXVzZXJjb250ZW50LmNvbS9FOVE3WEdaeDNZVVFzcGxwZDRsSnZLT2xDNWx4ejNnaUszajJpdUV4TlpTYnFWcldzUkQtbW0wTG9BYTJORWY5UFE9aDgwMA?k=66f508aaa629d46d3d843b54633e0c0468e25b12&.jpg"
                    }
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User />
                  My Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
