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
  distance,
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
            <p className="font-medium text-gray-900 dark:text-white">
              Pickup Location
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {pickupCoordinates.coordinates[1].toFixed(6)},{" "}
              {pickupCoordinates.coordinates[0].toFixed(6)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Navigation className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Destination
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {destinationCoordinates.coordinates[1].toFixed(6)},{" "}
              {destinationCoordinates.coordinates[0].toFixed(6)}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Total Distance:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {distance.toFixed(1)} km
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
