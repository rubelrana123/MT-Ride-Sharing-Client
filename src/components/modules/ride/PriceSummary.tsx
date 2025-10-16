// components/PriceSummary.tsx
import { CreditCard } from "lucide-react";
import { calculateDistance } from "../../../utils/calculateDistance";
import { calculateFare } from "@/utils/fareCalculator";
import { rideTypes } from "@/constants";

interface PriceSummaryProps {
  pickupLoc: [number, number];
  destLoc: [number, number];
  rideType: string;
}

export default function PriceSummary({
  pickupLoc,
  destLoc,
  rideType,
}: PriceSummaryProps) {
  const distance = calculateDistance(pickupLoc, destLoc);
  const { basePrice, distanceCost, total } = calculateFare(distance, rideType);
  const selectedRideType = rideTypes.find((t) => t.id === rideType);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <CreditCard className="h-5 w-5 mr-2" />
        Price Estimate
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Distance:</span>
          <span className="font-medium">{distance.toFixed(1)} km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
          <span className="font-medium">৳{basePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Distance Cost:
          </span>
          <span className="font-medium">৳{distanceCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Ride Type:</span>
          <span className="font-medium">
            {selectedRideType?.name} ({selectedRideType?.price}x)
          </span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-600">৳{total} BDT</span>
        </div>
      </div>
    </div>
  );
}
