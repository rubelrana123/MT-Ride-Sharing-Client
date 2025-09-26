// Main RideDetails Component
import { useMemo } from "react";
import { useParams } from "react-router";
 
import { useRideDetailsQuery } from "@/redux/features/ride/ride.api";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
 
import { calculateDistance } from "@/utils/calculateDistance";
import Loading from "@/components/modules/shared/Loading";
 

import { formatCurrency } from "@/utils/formateCurrency";
import RideHeader from "@/components/modules/ride/RideHeader";
import RideStatus from "@/components/modules/ride/RideStatus";
import RouteInformation from "@/components/modules/ride/RouteInformation";
import FareBreakDown from "@/components/modules/ride/FareBreakDown";
import DriverInformation from "@/components/modules/driver/DriverInformation";
import RiderInformation from "@/components/modules/ride/RiderInformation";
import RideMap from "@/components/modules/ride/RideMap";
import ActionButtons from "@/components/ActionButtons";

export default function RideDetails() {
  const { rideId } = useParams<{ rideId: string }>();
  
  const { 
    data: rideDetailsResponse, 
    isLoading, 
    isError 
  } = useRideDetailsQuery(rideId as string);
  
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  console.log(rideDetailsResponse, "ride details respomse")
  console.log(userProfile,"user profile in user details")
  // Extract nested data structure
  const rideDetails = rideDetailsResponse?.data;
  console.log(rideDetails, "Here Ride Details")
  const processedRideData = useMemo(() => {
    if (!rideDetails) return null;
    
    const pickup = rideDetails.pickupCoordinates?.coordinates;
    const destination = rideDetails.destinationCoordinates?.coordinates;
    
    return {
      ...rideDetails,
      distance: pickup && destination ? 
        calculateDistance([pickup[0], pickup[1]], [destination[0], destination[1]]) : 0,
      formattedFare: formatCurrency(parseFloat(rideDetails.fare?.replace(' BDT', '') || '0')),
      pickupLocation: pickup ? [pickup[1], pickup[0]] as [number, number] : null,
      destinationLocation: destination ? [destination[1], destination[0]] as [number, number] : null
    };
  }, [rideDetails]);

  if (isLoading) return <Loading />;
  
  if (isError || !rideDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ride Details Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The requested ride information could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <RideHeader 
          rideDetails={processedRideData}
          userProfile={userProfile}
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <RideStatus 
              rideStatus={rideDetails.rideStatus}
              createdAt={rideDetails.createdAt}
            />
            
      <RouteInformation
        pickupCoordinates={rideDetails.pickupLoc}
        destinationCoordinates={rideDetails.destLoc}
        distance={calculateDistance(
          rideDetails.pickupLoc.coordinates,
          rideDetails.destLoc.coordinates
        )}
      />
            
            <FareBreakDown
              fare={rideDetails.fare}
              distance={processedRideData?.distance || 0}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {rideDetails.driver && (
              <DriverInformation driver={rideDetails.driver} />
            )}
            
            <RiderInformation rider={rideDetails.rider} />
            
            <ActionButtons 
              rideStatus={rideDetails.rideStatus}
              userRole={userProfile?.role}
              rideId={rideDetails?._id}
            />
          </div>
        </div>

        {processedRideData?.pickupLocation && processedRideData?.destinationLocation && (
          <div className="mt-8">
            <RideMap
              pickupLocation={processedRideData.pickupLocation}
              destinationLocation={processedRideData.destinationLocation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
