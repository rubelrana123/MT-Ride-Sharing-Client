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

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign } from "lucide-react";

// export default function FareBreakDown( { fare, platformEarnings, commisionRate }: { fare: number, platformEarnings: number, commisionRate: number } ) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <DollarSign className="w-5 h-5" />
//           Fare Breakdown
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span>Base Fare</span>
//             <span>
//               ৳
//               {(
//                 (fare as number) - platformEarnings
//               ).toFixed(2) || 0}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span>Platform Fee</span>
//             <span>৳{platformEarnings || 0}</span>
//           </div>
//           <div className="border-t pt-2">
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total Fare</span>
//               <span>৳{fare || 0}</span>
//             </div>
//           </div>
//           <p className="text-xs text-muted-foreground">
//             Commission Rate: {(commisionRate as number) * 100}%
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
