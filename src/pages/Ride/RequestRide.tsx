 
 
import { useGetRiderActiveRideQuery } from "@/redux/features/ride/ride.api";
import RideBook from "../../components/modules/ride/RideBook";
import ActiveRideNotice from "@/components/modules/ride/ActiveRide";
import Loading from "@/components/modules/shared/Loading";
 
 

const RideRequest  = () => {
  const { data: activeRide, isLoading, error } = useGetRiderActiveRideQuery(undefined);
 console.log(activeRide, "here active ride")
  if (isLoading) return <Loading/>;
  if (error) return <p>Something went wrong!</p>;

  // Conditional rendering
  if (activeRide) {
    return  <ActiveRideNotice ride={activeRide}/>
  }

  return <RideBook />;
};

export default RideRequest;
