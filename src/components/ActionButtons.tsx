// components/ActionButtons.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, RotateCcw, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";
 

interface ActionButtonsProps {
  rideStatus: string;
  userRole?: string;
  rideId: string;
}

export default function ActionButtons({ rideStatus, userRole, rideId }: ActionButtonsProps) {
  const isRequestedRide = rideStatus === "requested";
  const isCompletedRide = rideStatus === "completed";
  const [updateRideStatus] = useUpdateRideStatusMutation();
 
  const handleAccept = async (rideId: string) => {
    try {
 
      const res = await updateRideStatus({ rideId, status: "accepted" }).unwrap();
      if (res.success) {
        // You can add a toast notification here for success
        toast.success(res.message || "Ride accepted successfully");
        console.log(res.message);
      } else {
        toast.error(res.message || "Failed to accept the ride");
      }
    } catch (error) {
      console.log(error , "error in accept ride");
      toast.error("An unexpected error occurred");
  
      toast.error("An unexpected error occurred");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isRequestedRide && userRole === "DRIVER" && (
          <>
            <Button onClick={()=> handleAccept(rideId)} className="w-full flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accept Ride
            </Button>
            {/* <Button 
              variant="destructive" 
              className="w-full flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject Ride
            </Button> */}
          </>
        )}
        
        {isCompletedRide && (
          <>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Book Again
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share Receipt
            </Button>
          </>
        )}
        
        <Button variant="outline" className="w-full flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Issue
        </Button>
      </CardContent>
    </Card>
  );
};