// components/FareBreakDown.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
 

interface FareBreakDownProps {
  fare: string;
  distance: number;
}

export default function FareBreakDown({ fare, distance }: FareBreakDownProps) {
const fareAmount = parseFloat(fare.replace(' BDT', '') || '0');
  const basePrice = 50;
  const pricePerKm = 15;
  const distanceCost = distance * pricePerKm;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Fare Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
          <span className="font-medium">৳{basePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Distance Cost ({distance.toFixed(1)} km):
          </span>
          <span className="font-medium">৳{distanceCost.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Service Fee:</span>
          <span className="font-medium">৳{Math.max(0, fareAmount - basePrice - distanceCost).toFixed(0)}</span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total Fare:</span>
          <span className="text-blue-600">{fare}</span>
        </div>
      </CardContent>
    </Card>
  );
}

 