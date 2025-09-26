import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import { useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
 
import { dateFormater } from "@/utils/dateFormater";
 
import { Eye } from "lucide-react"; 
 
import { Link } from "react-router";
import { toast } from "sonner";

interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minFare?: string;
  maxFare?: string;
}

export default function IncomingRideDataTable({
  allIncomingRides,
  queryParams,
}: {
  allIncomingRides: any[], queryParams: QueryParams;
}) {
 
  const [updateRideStatus] = useUpdateRideStatusMutation();

 

  const acceptRide = async (rideId: string) => {
    const toastId = toast.loading("Update Ride Status")
     try {
 
      const res = await updateRideStatus({ rideId, status: "accepted" }).unwrap();
      if (res.success) {
        // You can add a toast notification here for success
        toast.success(res.message || "Ride accepted successfully");
        // console.log(res.message);
      } else {
        toast.error(res.message || "Failed to accept the ride");
      }
    
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Rider name
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
             email
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Distance
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Fare
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-xl text-forground font-ride-title font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allIncomingRides?.length > 0 &&
            allIncomingRides?.map((ride) => (
              <TableRow key={ride._id}>
                <TableCell className="font-medium">
                  {ride?.rider?.name}
                </TableCell>
                <TableCell className="font-medium max-w-sm truncate">
                  {ride?.rider?.email}
                </TableCell>
                <TableCell className="font-medium max-w-sm truncate">
                  {ride?.distance}
                </TableCell>
                <TableCell>{ride?.fare}</TableCell>
                <TableCell>{dateFormater(new Date(ride?.createdAt))}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-3">
                  {/* <div> */}
                  <Button
                    size="sm"
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => acceptRide(ride._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    asChild
                  >
                    <Link to={`/dashboard/rideDetails/${ride?._id}`}>
                      <Eye />
                    </Link>
                  </Button>
                  {/* </div> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {allIncomingRides.length === 0 && (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
          <div className="text-center">
            <h3 className="text-xl font-semibold">All Caught Up!</h3>
            <p className="text-muted-foreground mt-2">
              There are no new ride requests at the moment.
            </p>
          </div>
        </div>
      )}

      {allIncomingRides.length === 0 && (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
          <div className="text-center">
            <h3 className="text-xl font-semibold font-ride-title">
              List Cleared
            </h3>
            <p className="text-muted-foreground mt-2">
              You have dismissed all current requests. New rides will appear
              here.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
