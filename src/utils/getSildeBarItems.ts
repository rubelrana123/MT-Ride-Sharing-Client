import { adminSidebarItems } from "@/routes/adminSliderItems";
import { driverSidebarItems } from "@/routes/driverSliderItems";
import type { TRole } from "@/types";

export const getSildeBarItems = (role: TRole) => {
    switch (role) {
      case 'ADMIN':
      case 'Super_ADMIN':
        return adminSidebarItems;
      case 'DRIVER':
        return driverSidebarItems;
      default:
        return adminSidebarItems;
    }
  }