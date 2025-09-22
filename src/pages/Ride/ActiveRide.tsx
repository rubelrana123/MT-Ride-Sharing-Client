 
import RiderInfo from "@/components/modules/activeride/RiderInfo";
import RideStatus from "@/components/modules/activeride/RideStatus";
import SOSButton from "@/components/modules/activeride/SOSButton";
import StatusControl from "@/components/modules/activeride/StatusControl";
import Loading from "@/components/modules/shared/Loading";
import { useMyActiveRideQuery } from "@/redux/features/ride/ride.api";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
 
import { socketConnection } from "@/utils/socketConnection";
import L from "leaflet";
import { lazy, useEffect, useMemo } from "react";
 
import { useNavigate } from "react-router";

const LocationPickerMap = lazy(
  () => import("@/components/modules/ride/LocationPickerMap")
);

export default function ActiveRide() {
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const { data: activeRide, isLoading } = useMyActiveRideQuery(undefined, {
    pollingInterval: 15000,
  });
  const navigate = useNavigate();

  //   formating the location
  const formattedLocations = useMemo(() => {
    if (!activeRide) {
      return { pickup: null, destination: null };
    }

    // formating pickup location
    const pickup = {
      address: activeRide?.pickupAddress,
      latlng: new L.LatLng(
        activeRide?.pickupCoordinates.coordinates[0], // latitude
        activeRide?.pickupCoordinates.coordinates[1] // longitude
      ),
    };

    // formating destinaiton
    const destination = {
      address: activeRide?.destinationAddress,
      latlng: new L.LatLng(
        activeRide?.destinationCoordinates.coordinates[0], // latitude
        activeRide?.destinationCoordinates.coordinates[1] // longitude
      ),
    };

    return { pickup, destination };
  }, [activeRide]);

  useEffect(() => {
    if (userProfile?.role === "rider" && activeRide?._id) {
      socketConnection.on("connect", () => {
        socketConnection.emit("join_ride_room", activeRide._id);
      });

      socketConnection.on("ride_Status_updated", (data) => {
        if (data.newStatus === "completed") {
          navigate("/ride/history");
          toast.success("Your Trip is successfull!");
        }

        if (data.newStatus === "cancelled") {
          navigate("/ride/history");
          toast.success("Your trip was cancelled by the driver!");
        }
      });

      socketConnection.connect();

      return () => {
        socketConnection.off("connect");
        socketConnection.off("ride_Status_updated");
        socketConnection.disconnect();
      };
    }
  }, [userProfile?.role, activeRide?._id, navigate]);

  if (isLoading) return <Loading />;

  if (!activeRide) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-ride-title font-bold">
          You have not any active ride
        </p>
      </div>
    );
  }

  const riderTitle =
    userProfile?.role === "rider" &&
    `On your way to ${activeRide?.destinationAddress}`;
  const isDriver = userProfile?.role === "driver";

  const driverTitle =
    isDriver && activeRide?.rideStatus === "accepted"
      ? `Head to Pick "${activeRide?.rider?.name}"`
      : activeRide?.rideStatus === "picked_up" && `Drive to your Destination`;

  const tripData = {
    pickupAddress: activeRide.pickupAddress,
    destinationAddress: activeRide.destinationAddress,
    fare: activeRide.fare,
  };

  return (
    <div className="lg:px-6 relative">
      <h1 className="text-3xl capitalize font-ride-title font-bold mb-12">
        {riderTitle || driverTitle}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        <div className="md:col-span-7 h-auto">
          <LocationPickerMap
            pickup={formattedLocations.pickup}
            destination={formattedLocations.destination}
            isInteractive={false}
          />
        </div>

        {/* Side Panel */}
        {userProfile?.role === "driver" && (
          <div className="md:col-span-5 border-l border-border bg-muted/30 p-4 space-y-4 overflow-y-auto">
            <RiderInfo rider={activeRide?.rider} trip={tripData} />
            <StatusControl
              rideId={activeRide._id}
              currentStatus={activeRide.rideStatus}
            />
          </div>
        )}

        {/* ============== for rider ============= */}
        {userProfile?.role === "rider" && (
          <div className="md:col-span-5 border-l border-border bg-muted/30 p-4 space-y-4 overflow-y-auto">
            <RideStatus
              rideId={activeRide._id}
              fare={activeRide.fare}
              rideStatus={activeRide.rideStatus}
              driver={activeRide.driver}
              pickupAddress={activeRide.pickupAddress}
              destinationAddress={activeRide.destinationAddress}
            />
          </div>
        )}
      </div>

      {/* SOS Button positioned in bottom right of sidebar */}
      {userProfile?.role === "rider" && (
        <div className="fixed bottom-6 right-6">
          <SOSButton />
        </div>
      )}
    </div>
  );
}
