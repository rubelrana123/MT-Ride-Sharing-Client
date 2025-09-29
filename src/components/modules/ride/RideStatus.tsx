import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormater } from "@/utils/dateFormater";
import { Clock, CheckCircle, XCircle, UserCheck, Navigation, MapPin } from "lucide-react";
 

interface RideStatusProps {
  rideStatus: string;
  createdAt: string;
}

export default function RideStatus({ rideStatus, createdAt }: RideStatusProps) {
  const statusFlow = [
    {
      id: "requested",
      label: "Requested",
      icon: Clock,
      color: "bg-yellow-500",
      description: "Looking for a driver"
    },
    {
      id: "rejected",
      label: "Rejected",
      icon: XCircle,
      color: "bg-red-500",
      description: "Request was rejected"
    },
    {
      id: "accepted",
      label: "Accepted",
      icon: CheckCircle,
      color: "bg-blue-500",
      description: "Driver accepted the ride"
    },
    {
      id: "picked_up",
      label: "Picked Up",
      icon: UserCheck,
      color: "bg-indigo-500",
      description: "Passenger has been picked up"
    },
    {
      id: "in_transit",
      label: "In Transit",
      icon: Navigation,
      color: "bg-purple-500",
      description: "Trip is in progress"
    },
    {
      id: "completed",
      label: "Completed",
      icon: MapPin,
      color: "bg-green-500",
      description: "Trip completed successfully"
    }
  ];

  const getStatusConfig = (status: string) => {
    const foundStatus = statusFlow.find(s => s.id === status.toLowerCase());
    if (foundStatus) return foundStatus;
    
    // Fallback for unknown status
    return {
      color: "bg-gray-500",
      icon: Clock,
      label: status,
      description: "Status unknown"
    };
  };

  const getCurrentStatusIndex = () => {
    return statusFlow.findIndex(s => s.id === rideStatus.toLowerCase());
  };

  const config = getStatusConfig(rideStatus);
  const Icon = config.icon;
  const currentIndex = getCurrentStatusIndex();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          Trip Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Status Badge */}
        <div className="flex items-center gap-3 mb-6">
          <Badge className={`${config.color} text-white px-3 py-1`}>
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

        {/* Status Flow Timeline */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Status Timeline
          </h4>
          <div className="relative">
            {statusFlow.map((status, index) => {
              const StatusIcon = status.icon;
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const isCompleted = index < currentIndex;
              
              return (
                <div key={status.id} className="flex items-center gap-3 relative">
                  {/* Timeline Line */}
                  {index !== statusFlow.length - 1 && (
                    <div 
                      className={`absolute left-4 top-8 w-0.5 h-8 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                  
                  {/* Status Icon */}
                  <div 
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCurrent 
                        ? status.color + ' text-white' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  
                  {/* Status Label */}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isActive 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {status.label}
                    </p>
                    <p className={`text-xs ${
                      isActive 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {status.description}
                    </p>
                  </div>
                  
                  {/* Active/Completed Indicator */}
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                  {isCompleted && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}