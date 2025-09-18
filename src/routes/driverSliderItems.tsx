import type { ISliderItem } from "@/types";
 
import { DriverEarnings } from "@/pages/Drivers/DriverEarning";
import { DriverAvailability } from "@/pages/Drivers/DriverAvailability";

export const driverSidebarItems: ISliderItem[] = [
  {
    title: "Ride Management",
    items: [
      { title: "My Earnings", url: "rides/earnings", Component: DriverEarnings },
     
    ],
  },
  {
    title: "Driver Management",
    items: [
      { title: "Availability", url: ":driverId/availability", Component: DriverAvailability },
    ],
  },
];
