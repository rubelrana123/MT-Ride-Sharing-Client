
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Route } from "lucide-react";

interface RouteInformationProps {
  pickupCoordinates: {
    type: string;
    coordinates: [number, number];
  };
  destinationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
  distance: number;
}

export default function RouteInformation({ 
  pickupCoordinates, 
  destinationCoordinates, 
  distance 
}: RouteInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          Route Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Pickup Location</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {pickupCoordinates.coordinates[1].toFixed(6)}, {pickupCoordinates.coordinates[0].toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Navigation className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Destination</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {destinationCoordinates.coordinates[1].toFixed(6)}, {destinationCoordinates.coordinates[0].toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Total Distance:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {distance.toFixed(1)} km
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { IDestinationCoordinates, IPickedupCoordinates } from "@/types/ride.type";
 
// import { MapPin, Navigation } from "lucide-react";

// export default function RouteInformation
// ( { 
//     // pickupAddress, destinationAddress, 
//     pickupCoordinates, destinationCoordinates }: { 
//         // pickupAddress: string, destinationAddress: string,
//          pickupCoordinates: IPickedupCoordinates, destinationCoordinates: IDestinationCoordinates } ) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Navigation className="w-5 h-5" />
//           Route Details
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex items-start gap-3">
//           <div className="w-3 h-3 rounded-full bg-accent mt-2" />
//           <div>
//             <p className="font-medium">Pickup Location</p>
//             {/* <p className="text-muted-foreground">{pickupAddress}</p> */}
//             <p className="text-xs text-muted-foreground">
//               {pickupCoordinates.coordinates[0]},{" "}
//               {pickupCoordinates.coordinates[1]}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-center">
//           <div className="w-px h-8 bg-border" />
//         </div>

//         <div className="flex items-start gap-3">
//           <MapPin className="w-4 h-4 text-destructive mt-1" />
//           <div>
//             <p className="font-medium">Destination</p>
//             {/* <p className="text-muted-foreground">
//               {destinationAddress}
//             </p> */}
//             <p className="text-xs text-muted-foreground">
//               {destinationCoordinates.coordinates[0]},{" "}
//               {destinationCoordinates.coordinates[1]}
//             </p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
