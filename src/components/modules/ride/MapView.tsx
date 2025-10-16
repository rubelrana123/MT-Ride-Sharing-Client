// components/MapView.tsx
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Polyline,
} from "react-leaflet";
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

function LocationPicker({
  onSelect,
}: {
  onSelect: (coords: [number, number]) => void;
}) {
  useMapEvents({
    click(e: any) {
      onSelect([e.latlng.lng, e.latlng.lat]);
    },
  });
  return null;
}

interface MapViewProps {
  pickupLoc: [number, number] | null;
  destLoc: [number, number] | null;
  selectingPickup: boolean;
  onLocationSelect: (coords: [number, number]) => void;
}

export default function MapView({
  pickupLoc,
  destLoc,
  selectingPickup,
  onLocationSelect,
}: MapViewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Select on Map
      </h2>
      <div className="h-[600px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[23.8103, 90.4125] as [number, number]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker onSelect={onLocationSelect} />

          {pickupLoc && (
            <Marker
              position={[pickupLoc[1], pickupLoc[0]] as [number, number]}
              icon={pickupIcon as any}
            />
          )}

          {destLoc && (
            <Marker
              position={[destLoc[1], destLoc[0]] as [number, number]}
              icon={destinationIcon as any}
            />
          )}

          {pickupLoc && destLoc && (
            <Polyline
              positions={
                [
                  [pickupLoc[1], pickupLoc[0]],
                  [destLoc[1], destLoc[0]],
                ] as [number, number][]
              }
              color="blue"
              weight={3}
            />
          )}
        </MapContainer>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Instructions:</strong> Click on the map to select your{" "}
          {selectingPickup ? "pickup" : "destination"} location. Use the buttons
          above to switch between selecting pickup and destination.
        </p>
      </div>
    </div>
  );
}
