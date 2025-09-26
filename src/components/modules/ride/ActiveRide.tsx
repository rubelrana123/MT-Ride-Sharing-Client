// components/ActiveRideNotice.tsx
import { formatDateTime } from "@/utils/dateFormater";
import React, { useMemo } from "react";
import RideMap from "./RideMap";
import { calculateDistance } from "@/utils/calculateDistance";
import { formatCurrency } from "@/utils/formateCurrency";

interface Location {
  type: string;
  coordinates: [number, number];
}

interface RideData {
  _id: string;
  rider: string;
  pickupLoc: Location;
  destLoc: Location;
  distance: string;
  fare: string;
  rideStatus: string;
  requestedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ActiveRideNoticeProps {
  ride: RideData;
}

const ActiveRideNotice: React.FC<ActiveRideNoticeProps> = ({ ride }) => {
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

  return (
    <div className=" m-12 p-3.5 rounded-2xl shadow-lg border bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2 mb-4">
        🚗 You Have already request  a ride
      </h2>

      {/* Ride Status */}
      <p className="mb-4 text-sm font-medium">
        Status: <span className="font-semibold capitalize">{ride.rideStatus}</span>
      </p>

      {/* Ride Map */}
      {processedRideData.pickupLocation && processedRideData.destinationLocation && (
        <div className="mb-6  rounded-lg overflow-hidden shadow-sm">
          <RideMap
            pickupLocation={processedRideData.pickupLocation}
            destinationLocation={processedRideData.destinationLocation}
          />
        </div>
      )}

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Pickup Location</h3>
          <p>Lat: {ride.pickupLoc.coordinates[0]}</p>
          <p>Lng: {ride.pickupLoc.coordinates[1]}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Destination</h3>
          <p>Lat: {ride.destLoc.coordinates[0]}</p>
          <p>Lng: {ride.destLoc.coordinates[1]}</p>
        </div>
      </div>

      {/* Fare & Distance */}
      <div className="flex justify-between mb-4">
        <p>
          Distance: <span className="font-semibold">{processedRideData.distance}</span>
        </p>
        <p>
          Fare: <span className="font-semibold">{processedRideData.formattedFare}</span>
        </p>
      </div>

      {/* Requested At */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Requested At: {formatDateTime(ride.requestedAt)}
      </p>
    </div>
  );
};

export default ActiveRideNotice;
