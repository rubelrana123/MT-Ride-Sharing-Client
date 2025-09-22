import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCancelRideMutation } from "@/redux/feature/ride/ride.api";
import type { IDriver } from "@/types";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function RideStatus({
  rideId,
  rideStatus,
  pickupAddress,
  destinationAddress,
  driver,
  fare,
}: {
  rideId: string;
  rideStatus: string;
  pickupAddress: string;
  destinationAddress: string;
  driver: IDriver;
  fare: number;
}) {
  const [cancelRide, { isLoading }] = useCancelRideMutation();
  const navigate = useNavigate();

  const handleUpdateStatus = async () => {
    const toastId = toast.loading("Cancelling...");
    try {
      const rideStatus = { rideStatus: "cancelled" };

      const res = await cancelRide({ rideId, rideStatus }).unwrap();

      if (res.success && res.statusCode === 200) {
        toast.success(res.message, { id: toastId });
        navigate("/ride/history");
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
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Status Card */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-6">
          {/* requested স্ট্যাটাসের জন্য UI */}
          {rideStatus === "requested" && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-yellow-600">
                Finding a Driver...
              </h2>
              <p className="text-muted-foreground">
                Please wait while we look for a nearby driver to accept your
                ride.
              </p>

              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  className="flex-1 mx-auto max-w-sm cursor-pointer"
                  onClick={handleUpdateStatus}
                  disabled={isLoading}
                >
                  Cancel Ride
                </Button>
              </div>
            </div>
          )}

          {/* accepted স্ট্যাটাসের জন্য UI */}
          {rideStatus === "accepted" && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-green-600">
                Your Ride is Confirmed!
              </h2>
              <p className="text-muted-foreground">
                Your driver is on the way to pick you up.
              </p>

              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-6 space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-2">
                    {driver?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">{driver.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {driver.vehicleInfo.model}
                    </p>
                    <p className="text-sm font-bold tracking-wider">
                      {driver.vehicleInfo.plate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Contact Driver
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 cursor-pointer"
                  onClick={handleUpdateStatus}
                  disabled={isLoading}
                >
                  Cancel Ride
                </Button>
              </div>
            </div>
          )}

          {/* in_transit বা picked_up স্ট্যাটাসের জন্য UI */}
          {(rideStatus === "in_transit" || rideStatus === "picked_up") && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-primary">
                You are on your way!
              </h2>
              <p className="text-muted-foreground">
                Destination: {destinationAddress}
              </p>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1">
                  Contact Driver
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Trip Details</h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
              <div className="flex-1">
                <div className="font-medium text-sm text-muted-foreground">
                  Pickup
                </div>
                <div className="text-sm font-medium">{pickupAddress}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-1.5">
              <div className="w-px h-8 bg-border"></div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 rounded-full bg-success mt-2"></div>
              <div className="flex-1">
                <div className="font-medium text-sm text-muted-foreground">
                  Destination
                </div>
                <div className="text-sm font-medium">{destinationAddress}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Fare Details</h3>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            <div className="border-t border-border/50 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Fare</span>
                <span className="text-primary">{fare}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
