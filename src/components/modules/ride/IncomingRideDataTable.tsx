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
import { Eye, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

interface Props {
  allIncomingRides: any[];
  serialNumber: number;
  sortConfig: { sortBy: string; sortOrder: string };
  handleSort: (field: string) => void;
}

export default function IncomingRideDataTable({
  allIncomingRides,
  serialNumber,
  sortConfig,
  handleSort,
}: Props) {
  const [updateRideStatus] = useUpdateRideStatusMutation();

  const updateStatus = async (
    rideId: string,
    status: "accepted" | "rejected"
  ) => {
    const toastId = toast.loading(`Updating Ride Status to ${status}...`);
    try {
      const res = await updateRideStatus({ rideId, status }).unwrap();
      if (res.success) {
        toast.success(res.message || `Ride ${status} successfully`, {
          id: toastId,
        });
      } else {
        toast.error(res.message || `Failed to ${status} the ride`, {
          id: toastId,
        });
      }
      //  navigate("/drivers/ride-history")
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

  const renderSortIcon = (field: string) => {
    if (sortConfig.sortBy !== field) return null;
    return sortConfig.sortOrder === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SL</TableHead>
          <TableHead>Rider</TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("rideType")}
          >
            Ride Type {renderSortIcon("rideType")}
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("distance")}
          >
            Distance {renderSortIcon("distance")}
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("fare")}
          >
            Fare {renderSortIcon("fare")}
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("createdAt")}
          >
            Date {renderSortIcon("createdAt")}
          </TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allIncomingRides.map((ride, idx) => (
          <TableRow key={ride._id}>
            <TableCell>{serialNumber + idx + 1}</TableCell>
            <TableCell>{ride.rider?.name}</TableCell>
            <TableCell>{ride.rideType?.toUpperCase()}</TableCell>
            <TableCell>{ride.distance}</TableCell>
            <TableCell>{ride.fare}</TableCell>
            <TableCell>{dateFormater(ride.createdAt)}</TableCell>
            <TableCell className="flex gap-2">
              <Button onClick={() => updateStatus(ride._id, "accepted")}>
                Accept
              </Button>
              <Button
                variant="destructive"
                onClick={() => updateStatus(ride._id, "rejected")}
              >
                Reject
              </Button>
              <Button variant="outline">
                <Link to={`/dashboard/rideDetails/${ride._id}`}>
                  <Eye />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
