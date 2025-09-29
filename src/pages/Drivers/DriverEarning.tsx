 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Route,
  CheckCircle,
  XCircle,
  Truck,
  Play,
  Flag
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useGetDriverEarningsQuery } from "@/redux/features/ride/ride.api";
import { getStatusColor } from "@/constants";
import Loading from "@/components/modules/shared/Loading";
import type { IDriverEarningHistory } from "@/types/driver.type";
import { formatDateTime } from "@/utils/dateFormater";
 
 
export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "cancelled":
      return <XCircle className="h-4 w-4" />;
    case "in-transit":
      return <Truck className="h-4 w-4" />;
    case "accepted":
      return <Play className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function DriverEarnings() {
const { data , isLoading } = useGetDriverEarningsQuery(undefined);
  const earningHistory: IDriverEarningHistory[] = data || [];

  const formatCoordinates = (coordinates: [number, number]) => {
    return `${coordinates[0]?.toFixed(4)}, ${coordinates[1]?.toFixed(4)}`;
  };


 
  const calculateTotalEarnings = () => {
    return earningHistory
      .filter(ride => ride.rideStatus === 'completed')
      .reduce((total, ride) => {
        const fareAmount = parseFloat(ride.fare.replace(/[^\d.-]/g, ''));
        return total + fareAmount;
      }, 0);
  };

 

  if (!earningHistory || earningHistory.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-semibold text-gray-900">No earning history</h3>
            <p className="mt-1 text-gray-500">
              Your completed rides and earnings will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) return <Loading />;
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Earnings Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {calculateTotalEarnings()} BDT
              </div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {earningHistory.length}
              </div>
              <div className="text-sm text-gray-600">Total Rides</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {earningHistory.filter(r => r.rideStatus === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed Rides</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ride History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Ride Details</TableHead>
                  <TableHead className="font-semibold">Route</TableHead>
                  <TableHead className="font-semibold">Distance</TableHead>
                  <TableHead className="font-semibold">Fare</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Timeline</TableHead>
 
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningHistory.map((ride) => (
                  <TableRow key={ride._id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {format(new Date(ride.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ID: {ride._id.slice(-8)}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 text-xs">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span className="font-mono">
                            {formatCoordinates(ride.pickupLoc.coordinates)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <Flag className="h-3 w-3 text-red-600" />
                          <span className="font-mono">
                            {formatCoordinates(ride.destLoc.coordinates)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Route className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-600">
                          {ride.distance}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          {ride.fare}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`flex items-center space-x-1 ${getStatusColor(ride.rideStatus)}`}
                      >
                        {getStatusIcon(ride.rideStatus)}
                        <span>
                          {ride.rideStatus.charAt(0).toUpperCase() + ride.rideStatus.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="font-medium">Requested:</span> {formatDateTime(ride.requestedAt)}
                        </div>
                        {ride.acceptedAt && (
                          <div>
                            <span className="font-medium">Accepted:</span> {formatDateTime(ride.acceptedAt)}
                          </div>
                        )}
                        {ride.pickedupAt && (
                          <div>
                            <span className="font-medium">Picked up:</span> {formatDateTime(ride.pickedupAt)}
                          </div>
                        )}
                        {ride.completedAt && (
                          <div>
                            <span className="font-medium">Completed:</span> {formatDateTime(ride.completedAt)}
                          </div>
                        )}
                        {ride.cancelledAt && (
                          <div className="text-red-600">
                            <span className="font-medium">Cancelled:</span> {formatDateTime(ride.cancelledAt)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        {ride.completedAt && ride.requestedAt ? (
                          <span>
                            {formatDistanceToNow(
                              new Date(ride.requestedAt), 
                              { 
                                addSuffix: false 
                              }
                            )}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}