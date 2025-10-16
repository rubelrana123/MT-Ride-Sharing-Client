import { useGetActiveRideQuery } from "@/redux/features/ride/ride.api";
import RideBook from "../../components/modules/ride/RideBook";
import ActiveRideNotice from "@/components/modules/ride/ActiveRide";
import Loading from "@/components/modules/shared/Loading";
import type { IRide } from "@/types/ride.type";

const RideRequest = () => {
  const { data, isLoading } = useGetActiveRideQuery();

  const activeRide: IRide | undefined = data ?? undefined;
  console.log(activeRide, "here active ride");

  if (isLoading) return <Loading />;

  // Case 1: Active ride exists and not completed
  if (activeRide && activeRide.rideStatus !== "completed") {
    return <ActiveRideNotice {...activeRide} />;
  }

  // Case 2: No active ride
  if (!activeRide) {
    return <RideBook />;
  }

  // Case 3: Fallback
  return <RideBook />;
};

export default RideRequest;
