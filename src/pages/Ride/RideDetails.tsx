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
  
  // Extract nested data structure
  const rideDetails = rideDetailsResponse?.data;
  
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
              pickupCoordinates={rideDetails.pickupCoordinates}
              destinationCoordinates={rideDetails.destinationCoordinates}
              distance={processedRideData?.distance || 0}
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
              rideId={rideDetails._id}
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
 
// import DriverInformation from "@/components/modules/driver/DriverInformation";
// import FareBreakDown from "@/components/modules/ride/FareBreakDown";
// import RiderInformation from "@/components/modules/ride/RiderInformation";
// import RideStatus from "@/components/modules/ride/RideStatus";
// import RouteInformation from "@/components/modules/ride/RouteInformation";
 
 
 
// import Loading from "@/components/modules/shared/Loading";
// import { Button } from "@/components/ui/button";
// import { useRideDetailsQuery } from "@/redux/features/ride/ride.api";
 
// import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
 
// import { dateFormater } from "@/utils/dateFormater";
// import L from "leaflet";
// import { lazy, useMemo } from "react";
// import { useParams } from "react-router";



// // const LocationPickerMap =  lazy(() => import("@/components/modules/ride/LocationPickerMap"));


// export default function RideDetails() {
//   const { rideId } = useParams();
//   console.log(rideId, "rideId");
//   const { data: rideDetailsData, isLoading,isError } = useRideDetailsQuery(
//     rideId as string
//   );
//   const rideDetails = rideDetailsData?.data || [];
//   console.log(rideDetails, "rideDetails");
//   console.log(rideDetails?.driver, "driverDetails", rideDetails?.rider,"rider details", isError," isError");
//   const { data: userProfile } = useGetUserProfileQuery(undefined);
//   console.log("usrerProfile", userProfile);
//   const formattedLocations = useMemo(() => {
//     if (!rideDetails) {
//       return { pickup: null, destination: null };
//     }

//     // formating pickup location
//     // const pickup = {
//     //   address: rideDetails?.pickupAddress,
//     //   latlng: new L.LatLng(
//     //     rideDetails?.pickupCoordinates?.coordinates[0], // latitude
//     //     rideDetails?.pickupCoordinates?.coordinates[1] // longitude
//     //   ),
//     // };

//     // formating destinaiton
//     // const destination = {
//     //   address: rideDetails?.destinationAddress,
//     //   latlng: new L.LatLng(
//     //     rideDetails?.destinationCoordinates?.coordinates[0], // latitude
//     //     rideDetails?.destinationCoordinates?.coordinates[1] // longitude
//     //   ),
//     // };

//     // return { pickup, destination };
//   }, [rideDetails]);

//   if (isLoading) return <Loading />;

//   if (!rideDetails) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-2xl font-ride-title font-bold">
//           No Ride Details Found
//         </p>
//       </div>
//     );
//   }

//   const riderTitle =
//     userProfile?.role === "RIDER" &&
//     `your trip ${dateFormater(new Date(rideDetails?.createdAt))}`;
//   const adminTitle =
//     userProfile?.role === "ADMIN" && `Ride Details: #${rideDetails?._id}`;
//   const driverTitle =
//     userProfile?.role === "ADMIN" && `Trip with ${rideDetails?.rider?.name}`;

//   return (
//     <div className="lg:px-6">
//       <h1 className="text-3xl capitalize font-ride-title font-bold mb-12">
//         {riderTitle || driverTitle || adminTitle}
//       </h1>

//       <div>
//         <div className="flex items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">Ride Details</h1>
//             <p className="text-muted-foreground"> 
//               {dateFormater(new Date(rideDetails.createdAt))}
//             </p>
//           </div>

//           {rideDetails?.rideStatus === "requested" && (
//             <div className="flex items-center gap-2">
//               <Button className="cursor-pointer">Accept</Button>
//               <Button
//                 variant="default"
//                 className="cursor-pointer bg-red-600 hover:bg-red-500"
//               >
//                 Reject
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className="grid gap-6 lg:grid-cols-5">
//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Status & Timeline */}
//             {/* <RideStatus
//               rideStatus={rideDetails.rideStatus}
//               statusLogs={rideDetails.statusLogs}
//             /> */}

//             {/* Route Information */}
//             {/* <RouteInformation
//               // pickupAddress={rideDetails?.pickupAddress}
//               // destinationAddress={rideDetails?.destinationAddress}
//               pickupCoordinates={rideDetails?.pickupCoordinates}
//               destinationCoordinates={rideDetails?.destinationCoordinates}
//             /> */}

//             {/* Fare Breakdown */}
//             <FareBreakDown
//               fare={rideDetails?.fare}
//               // platformEarnings={rideDetails?.platformEarnings}
//               // commisionRate={rideDetails?.commisionRate}
//             />
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Driver Information */}
//             <DriverInformation driver={rideDetails?.driver} />

//             {/* Rider Information */}
//             <RiderInformation rider={rideDetails?.rider} />

//             {/* Quick Actions */}
//             {/* <Card>
//               <CardHeader>
//                 <CardTitle>Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <Button variant="outline" className="w-full">
//                   Book Again
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   Share Receipt
//                 </Button>
//                 <Button variant="outline" className="w-full">
//                   Report Issue
//                 </Button>
//               </CardContent>
//             </Card> */}
//           </div>
//         </div>

//         <div className="my-20">
//           {/* <LocationPickerMap
//             pickup={formattedLocations.pickup}
//             destination={formattedLocations.destination}
//             isInteractive={false}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// }
