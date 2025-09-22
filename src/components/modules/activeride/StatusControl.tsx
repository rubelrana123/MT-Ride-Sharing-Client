import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateRideStatusMutation } from "@/redux/feature/ride/ride.api";
import { getStatusInfo } from "@/utils/getStatusInfo";
import toast from "react-hot-toast";

const StatusControl = ({
  currentStatus,
  rideId,
}: {
  currentStatus: string;
  rideId: string;
}) => {
  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();

  const statusInfo = getStatusInfo(currentStatus);
  const StatusIcon = statusInfo.icon;

  const handleUpdateStatus = async (nextStatus: string | null) => {
    if (!nextStatus) return;

    try {
      const rideStatus = { rideStatus: nextStatus };

      const res = await updateRideStatus({ rideId, rideStatus }).unwrap();

      if (res.success && nextStatus === "completed") {
        toast.success("Trip completed successfully!");
      }
    } catch (error: unknown) {
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

  return (
    <Card className="shadow-medium border-0 bg-gradient-surface">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                currentStatus === "completed"
                  ? "bg-success/10"
                  : currentStatus === "picked-up"
                  ? "bg-success/10"
                  : currentStatus === "arrived"
                  ? "bg-warning/10"
                  : "bg-primary/10"
              }`}
            >
              <StatusIcon
                className={`h-5 w-5 ${
                  currentStatus === "completed"
                    ? "text-success"
                    : currentStatus === "picked-up"
                    ? "text-success"
                    : currentStatus === "arrived"
                    ? "text-warning"
                    : "text-primary"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{statusInfo.label}</h3>
              <p className="text-sm text-muted-foreground">
                {currentStatus === "completed"
                  ? "Rate your passenger and collect payment"
                  : currentStatus === "picked-up"
                  ? "Navigate to destination"
                  : currentStatus === "arrived"
                  ? "Contact passenger for pickup"
                  : currentStatus === "on-route"
                  ? "Following GPS to pickup location"
                  : "Trip confirmed, prepare for pickup"}
              </p>
            </div>
          </div>

          {/* Action Button */}
          {statusInfo.nextAction && statusInfo.nextStatus && (
            <Button
              size="lg"
              className="w-full font-semibold cursor-pointer text-white"
              disabled={isLoading}
              onClick={() => handleUpdateStatus(statusInfo.nextStatus)}
            >
              {isLoading ? "Loading..." : statusInfo.nextAction}
            </Button>
          )}

          {/* Emergency Actions */}
          {currentStatus === "accepted" && (
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                Report Issue
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer"
                onClick={() => handleUpdateStatus("cancelled")}
              >
                Cancel Trip
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusControl;
