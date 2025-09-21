import type { RideType } from "@/types/ride.type";
import { BikeIcon, Car, LucideBike } from "lucide-react";

export const rideTypes: RideType[] = [
  { id: "scooter", name: "Scooter", icon: LucideBike, price: 1, color: "bg-blue-500" },
  { id: "bike", name: "Bike", icon: BikeIcon, price: 2, color: "bg-green-500" },
  { id: "nac", name: "N/A Car", icon: Car, price: 3, color: "bg-blue-600" },
  { id: "ac", name: "AC Car", icon: Car, price: 4, color: "bg-orange-500" },
];

import L from "leaflet";

export const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const destinationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});