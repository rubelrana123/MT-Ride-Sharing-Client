// components/RideOptions.tsx
import { rideTypes } from "@/constants";
import { Car } from "lucide-react";

interface RideOptionsProps {
  selectedRideType: string;
  onRideTypeChange: (rideType: string) => void;
}

export default function RideOptions({
  selectedRideType,
  onRideTypeChange,
}: RideOptionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Car className="h-5 w-5 mr-2" />
        Choose Ride Type
      </h2>

      <div className="grid grid-cols-4 gap-3">
        {rideTypes?.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={`relative p-3 border-2 rounded-xl cursor-pointer transition-all ${
                selectedRideType === type.id
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
              }`}
              onClick={() => onRideTypeChange(type.id)}
            >
              <div
                className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${
                  selectedRideType === type.id
                    ? "bg-yellow-400"
                    : "bg-yellow-400"
                }`}
              />

              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-lg ${type.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {type.price}x
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {type.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
