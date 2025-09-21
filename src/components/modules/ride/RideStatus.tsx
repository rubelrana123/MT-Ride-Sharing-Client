import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormater } from "@/utils/dateFormater";
import { Clock, CheckCircle, XCircle, Car } from "lucide-react";

interface RideStatusProps {
  rideStatus: string;
  createdAt: string;
}

export default function RideStatus({ rideStatus, createdAt }: RideStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "requested":
        return {
          color: "bg-yellow-500",
          icon: Clock,
          label: "Requested",
          description: "Looking for a driver"
        };
      case "accepted":
        return {
          color: "bg-blue-500",
          icon: Car,
          label: "Accepted",
          description: "Driver is on the way"
        };
      case "completed":
        return {
          color: "bg-green-500",
          icon: CheckCircle,
          label: "Completed",
          description: "Trip completed successfully"
        };
      case "cancelled":
        return {
          color: "bg-red-500",
          icon: XCircle,
          label: "Cancelled",
          description: "Trip was cancelled"
        };
      default:
        return {
          color: "bg-gray-500",
          icon: Clock,
          label: status,
          description: "Status unknown"
        };
    }
  };

  const config = getStatusConfig(rideStatus);
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          Trip Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Badge className={`${config.color} text-white`}>
            {config.label}
          </Badge>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {config.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dateFormater(new Date(createdAt))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { IStatusLog } from "@/types/ride.type";
// import { CheckCircle, Clock, XCircle } from "lucide-react";

// export default function RideStatus( { rideStatus, statusLogs }: { rideStatus: string, statusLogs: IStatusLog[] } ) {
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500 text-accent-foreground";
//       case "in_transit":
//         return "bg-primary text-primary-foreground";
//       case "picked_up":
//         return "bg-primary text-primary-foreground";
//       case "accepted":
//         return "bg-secondary text-secondary-foreground";
//       case "rejected":
//         return "bg-destructive text-destructive-foreground";
//       case "requested":
//         return "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4" />;
//       default:
//         return <Clock className="w-4 h-4" />;
//     }
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle>Ride Status</CardTitle>
//           <Badge className={getStatusColor(rideStatus)}>
//             {getStatusIcon(rideStatus)}
//             {/* {rideStatus.replace("_", " ").toUpperCase()} */}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {statusLogs.map((log, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <div
//                 className={`w-3 h-3 rounded-full ${
//                   index < statusLogs.length - 1
//                     ? "bg-accent"
//                     : "bg-primary"
//                 }`}
//               />
//               <div className="flex-1">
//                 <p className="font-medium capitalize">
//                   {/* {log.status.replace("_", " ")} */}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {formatTime(new Date(log.timestamp))}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
