import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
 
  useGetDriverProfileQuery,
  useUpdateAvailabilityMutation,
} from "@/redux/features/driver/driver.api"; 
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserAvailabilityToggle({
  userRole,
}: {
  userRole: string;
}) {
  //user the construction rider activity status
  // const { data: userProfile } = useGetUserProfileQuery(
  //   undefined,
  //   { skip: userRole == "DRIVER" }
  // );
    const { data: driverProfile, isLoading } = useGetDriverProfileQuery(
    undefined,
    { skip: userRole !== "DRIVER" }
  );
  // console.log(driverProfile, "driver profile here");
  const [updateAvailability] = useUpdateAvailabilityMutation();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (driverProfile) {
      setIsOnline(driverProfile.availability === "online");
    }
  }, [driverProfile]);

  // console.log(driverProfile?._id, "here id paiche");
  const handleToggle = async (checked: boolean) => {
    setIsOnline(checked);
    try {
      const res = await updateAvailability({
        driverId: driverProfile?.driver, // 👈 not "id", must match your mutation
        availability: checked ? "online" : "offline",
      }).unwrap();

      // console.log(res, "res from toggler");
      toast.success("availability successfully update");
    } catch (error) {
      // console.log(error , "error from toggler")
      setIsOnline(!checked);
    }
  };

  if (isLoading || !driverProfile) {
    return null;
  }

  return (
    <div className="flex  items-center space-x-2 tour-step-2-availability">
      <Switch
        id="availability-mode"
        checked={isOnline}
        onCheckedChange={handleToggle}
        className="cursor-pointer tour-step-2-availability"
      />
      <Label htmlFor="availability-mode" className="capitalize">
        {driverProfile.availability}
      </Label>
    </div>
  );
}
