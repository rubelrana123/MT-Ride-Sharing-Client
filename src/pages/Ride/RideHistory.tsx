import Loading from "@/components/modules/shared/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  useCancelRideMutation,
  useGetRideHistoryQuery,
} from "@/redux/features/ride/ride.api";
import { rideStatusColorMap } from "@/types";
import { dateFormater } from "@/utils/dateFormater";
import { Eye, X } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";

export default function RideHistory() {
  const { data, isLoading } = useGetRideHistoryQuery(undefined);
  const [cancelRideMutation] = useCancelRideMutation(); // ✅ add mutation hook
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  console.log(userProfile, "user profile");
  if (isLoading && !data) return <Loading />;

  const rideHistory = data?.data || []; // ✅ use data.data (API structure)
  console.log(data, "ride history");
  if (rideHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <p className="text-2xl text-slate-600 dark:text-primary-foreground font-bold">
          No Ride Details Found
        </p>
      </div>
    );
  }
  const handleCancelRide = async (rideId: string) => {
    console.log(rideId, "rideId");
    try {
      console.log("Cancelling ride:", rideId);
      //  { rideId: ride._id, rideStatus: values }
      const res = await cancelRideMutation(rideId).unwrap(); // ✅ call mutation
      console.log(res, "cancel ride response");
      toast.success("Ride cancelled successfully");
    } catch (error) {
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
    <div className="lg:px-6">
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-bold">Ride History</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Rider ID</TableHead>
            <TableHead>Pickup (Lat,Lng)</TableHead>
            <TableHead>Destination (Lat,Lng)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rideHistory.map((ride: any, idx: number) => (
            <TableRow key={ride._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{ride.rider._id}</TableCell>
              <TableCell>{ride.pickupLoc?.coordinates?.join(", ")}</TableCell>
              <TableCell>{ride.destLoc?.coordinates?.join(", ")}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize",
                    rideStatusColorMap[ride.rideStatus]
                  )}
                >
                  {ride.rideStatus}
                </Badge>
              </TableCell>
              <TableCell>{ride.fare}</TableCell>
              <TableCell>{dateFormater(ride.createdAt)}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                {/* cancel button here */}
                {ride.rideStatus != "completed" &&
                  ride.rideStatus != "cancelled" &&
                  userProfile?.role != "DRIVER" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
                          <X />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Ride</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this ride? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelRide(ride?._id)} // ✅ call handler
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                <Button size="icon" variant="outline" asChild>
                  <Link to={`/dashboard/rideDetails/${ride._id}`}>
                    <Eye />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
