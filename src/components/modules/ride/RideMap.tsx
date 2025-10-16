// components/RideMap.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { destinationIcon, pickupIcon } from "@/constants";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

interface RideMapProps {
  pickupLocation: [number, number];
  destinationLocation: [number, number];
}

export default function RideMap({
  pickupLocation,
  destinationLocation,
}: RideMapProps) {
  const center: [number, number] = [
    (pickupLocation[0] + destinationLocation[0]) / 2,
    (pickupLocation[1] + destinationLocation[1]) / 2,
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full rounded-lg overflow-hidden">
          <MapContainer center={center} zoom={12} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={pickupLocation} icon={pickupIcon as any} />

            <Marker
              position={destinationLocation}
              icon={destinationIcon as any}
            />

            <Polyline
              positions={[pickupLocation, destinationLocation]}
              color="blue"
              weight={3}
            />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
