 
import  { useMemo } from "react";
import RideMap from "./RideMap";
import { calculateDistance } from "@/utils/calculateDistance";
import { formatCurrency } from "@/utils/formateCurrency";
import RiderInformation from "./RiderInformation";
import ActionButtons from "@/components/ActionButtons";
import type { IRide } from "@/types/ride.type";
import type { IRider } from "@/types";


 

const ActiveRideNotice  = ( ride  : IRide) => {
  const processedRideData = useMemo(() => {
    if (!ride) return null;

    const pickup = ride.pickupLoc?.coordinates;
    const destination = ride.destLoc?.coordinates;

    if (!pickup || !destination) return null;

    return {
      ...ride,
      distance: calculateDistance([pickup[1], pickup[0]], [destination[1], destination[0]]),
      formattedFare: formatCurrency(parseFloat(ride.fare?.replace(" BDT", "") || "0")),
      pickupLocation: [pickup[1], pickup[0]] as [number, number],
      destinationLocation: [destination[1], destination[0]] as [number, number],
    };
  }, [ride]);

  if (!processedRideData) return null;
   console.log(ride, "here active  ride")
  return (
    <div className="mx-4 md:mx-12 my-6 p-4 md:p-6 rounded-2xl shadow-lg border bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <h2 className="text-lg md:text-2xl font-bold text-amber-500 flex items-center gap-2 mb-3 md:mb-4">
        🚗 You already requested a ride
      </h2>

      {/* Ride Status */}
      <p className="mb-3 text-sm md:text-base font-medium">
        Status: <span className="font-semibold capitalize">{ride?.rideStatus}</span>
      </p>

      <div className="space-y-4">
        {/* Rider Info */}
      <RiderInformation rider={ride?.rider as IRider} />


        {/* Action Buttons */}
        <ActionButtons rideId={ride?._id} rideStatus={ride?.rideStatus} userRole={ride?.driver?.role? ride?.driver?.role : ride?.rider?.role} />

        {/* Ride Map */}
        {processedRideData?.pickupLocation && processedRideData?.destinationLocation && (
          <div className="rounded-lg overflow-hidden shadow-sm">
            <RideMap
              pickupLocation={processedRideData?.pickupLocation}
              destinationLocation={processedRideData?.destinationLocation}
            />
          </div>
        )}

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 md:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Pickup Location</h3>
            <p className="text-sm break-all">Lat: {ride?.pickupLoc?.coordinates[0]}</p>
            <p className="text-sm break-all">Lng: {ride?.pickupLoc?.coordinates[1]}</p>
          </div>
          <div className="p-3 md:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Destination</h3>
            <p className="text-sm break-all">Lat: {ride?.destLoc?.coordinates[0]}</p>
            <p className="text-sm break-all">Lng: {ride?.destLoc?.coordinates[1]}</p>
          </div>
        </div>

        {/* Fare & Distance */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 md:gap-4">
          <p className="text-sm md:text-base">
            Distance: <span className="font-semibold">{processedRideData.distance}</span>
          </p>
          <p className="text-sm md:text-base">
            Fare: <span className="font-semibold">{processedRideData.formattedFare}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ActiveRideNotice;
 
