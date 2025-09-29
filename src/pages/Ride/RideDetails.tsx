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
    isError,
  } = useRideDetailsQuery(rideId as string);

  const { data: userProfile } = useGetUserProfileQuery(undefined);
  console.log(rideDetailsResponse, "ride details respomse");
  console.log(userProfile, "user profile in user details");
  // Extract nested data structure
  const ride = rideDetailsResponse?.data;
  console.log(ride, "Here Ride Details");
 
  const processedRideData = useMemo(() => {
    if (!ride) return null;

    const pickup = ride.pickupLoc?.coordinates;
    const destination = ride.destLoc?.coordinates;

    if (!pickup || !destination) return null;

    return {
      ...ride,
      distance: calculateDistance([pickup[1], pickup[0]], [destination[1], destination[0]]),
     formattedFare: formatCurrency(parseFloat(ride.fare?.replace(' BDT', '') || '0')),
      pickupLocation: [pickup[1], pickup[0]] as [number, number],
      destinationLocation: [destination[1], destination[0]] as [number, number],
    };
  }, [ride]);

  if (isLoading) return <Loading />;

  if (isError || !ride) {
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
        <RideHeader rideDetails={processedRideData} userProfile={userProfile} />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <RideStatus
              rideStatus={ride.rideStatus}
              createdAt={ride.createdAt}
            />

            <RouteInformation
              pickupCoordinates={ride.pickupLoc}
              destinationCoordinates={ride.destLoc}
              distance={calculateDistance(
                ride.pickupLoc.coordinates,
                ride.destLoc.coordinates
              )}
            />

            <FareBreakDown
              fare={ride.fare}
              distance={processedRideData?.distance || 0}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {ride.driver && (
              <DriverInformation driver={ride.driver} />
            )}

            <RiderInformation rider={ride.rider} />

            <ActionButtons
              rideStatus={ride.rideStatus}
              userRole={userProfile?.role}
              rideId={ride?._id}
            />
          </div>
        </div>

        {processedRideData?.pickupLoc && processedRideData?.destLoc && (
          <div className="mt-8">
          <RideMap
            pickupLocation={processedRideData?.pickupLocation}
            destinationLocation={processedRideData?.destinationLocation}
          />
          </div>
        )}
      </div>
    </div>
  );
}
