import { useGetActiveRideQuery } from "@/redux/features/ride/ride.api";
import RideBook from "../../components/modules/ride/RideBook";
import ActiveRideNotice from "@/components/modules/ride/ActiveRide";
import Loading from "@/components/modules/shared/Loading";

const RideRequest = () => {
  const {
    data: activeRide,
    isLoading, 
  } = useGetActiveRideQuery(undefined);
  console.log(activeRide, "here active ride");
  if (isLoading) return <Loading />; 

  // Conditional rendering
  if (activeRide) {
    return <ActiveRideNotice ride={activeRide} />;
  }

  return <RideBook />;
};

export default RideRequest;
