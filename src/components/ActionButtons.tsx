 
// components/ActionButtons.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, RotateCcw, AlertTriangle, CheckCircle, XCircle, Truck } from "lucide-react";
import { useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";
 
export default function ActionButtons({ rideStatus, userRole, rideId }: any) {
  const [updateRideStatus] = useUpdateRideStatusMutation();

  const handleUpdateStatus = async (status: string) => {
    try {
      const res = await updateRideStatus({ rideId, status }).unwrap();
      if (res.success) {
        toast.success(res.message || `Ride ${status} successfully`);
      } else {
        toast.error(res.message || `Failed to update ride to ${status}`);
      }
    } catch (error){
        const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage);
    }
  };

  const renderDriverActions = () => {
    switch (rideStatus) {
      case "requested":
        return (
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => handleUpdateStatus("accepted")} className="flex-1 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accept
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleUpdateStatus("cancelled")}
              className="flex-1 flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </div>
        );
      case "accepted":
        return (
          <Button onClick={() => handleUpdateStatus("picked_up")} className="w-full flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Picked Up
          </Button>
        );
      case "picked_up":
        return (
          <Button onClick={() => handleUpdateStatus("in_transit")} className="w-full flex items-center gap-2">
            <Truck className="h-4 w-4" />
            In Transit
          </Button>
        );
      case "in_transit":
        return (
          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={() => handleUpdateStatus("completed")} className="flex-1 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Complete
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderRiderActions = () => {
    if (rideStatus === "requested") {
      return (
        <Button
          variant="destructive"
          onClick={() => handleUpdateStatus("cancelled")}
          className="w-full flex items-center gap-2"
        >
          <XCircle className="h-4 w-4" />
          Cancel Ride
        </Button>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {userRole === "DRIVER" && renderDriverActions()}
        {userRole === "RIDER" && renderRiderActions()}

        {/* Completed ride common actions */}
        {rideStatus === "completed" && (
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Book Again
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share Receipt
            </Button>
          </div>
        )}

        {/* Report Issue (always available) */}
        <Button variant="outline" className="w-full flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Issue
        </Button>
      </CardContent>
    </Card>
  );
}
 
