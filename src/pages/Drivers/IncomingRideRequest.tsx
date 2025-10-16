import ActiveRideNotice from "@/components/modules/ride/ActiveRide";
import Loading from "@/components/modules/shared/Loading";
import IncomingRequest from "../../components/modules/driver/IncomingRequest";
import { useGetActiveRideQuery } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types/ride.type";

const IncomingRideRequest = () => {
  const { data, isLoading } = useGetActiveRideQuery(undefined);

  if (isLoading) return <Loading />;

  const activeRide: IRide | undefined = data ?? undefined;

  if (activeRide && activeRide.rideStatus !== "completed") {
    return <ActiveRideNotice {...activeRide} />;
  }

  // Case 3: Fallback when activeRide exists but is completed
  return <IncomingRequest />;
};

export default IncomingRideRequest;
