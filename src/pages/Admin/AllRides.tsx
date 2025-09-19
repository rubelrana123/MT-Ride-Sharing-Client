import React from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";

 

export default function AllRides() {
  const { data, isLoading } = useGetAllRidesQuery(undefined);
  const rides = data || [];
    console.log("All rides data:", rides);
  const handleAccept = (id: string) => {
    // TODO: integrate with PATCH /rides/:id/status
    toast.success(`Ride ${id} accepted!`);
  };

  const handleDelete = (id: string) => {
    // TODO: integrate with DELETE /rides/:id
    toast.error(`Ride ${id} deleted!`);
  };

  if (isLoading) {
    return <div className="p-6">Loading rides...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Rides</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rider</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride: any) => (
            <TableRow key={ride?._id}>
              <TableCell>{ride?.rider?.name || "N/A"}</TableCell>
              <TableCell>
                {ride?.pickupLoc?.coordinates?.join(", ") || "Unknown"}
              </TableCell>
              <TableCell>
                {ride?.destLoc?.coordinates?.join(", ") || "Unknown"}
              </TableCell>
              <TableCell>{ride?.distance}</TableCell>
              <TableCell>{ride?.fare}</TableCell>
              <TableCell>{ride?.rideStatus}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  {/* View button */}
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>

                  {/* Accept button (only for requested rides) */}
                  {ride?.rideStatus === "requested" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleAccept(ride?._id)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Accept</span>
                    </Button>
                  )}

                  {/* Delete button with confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete ride</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete ride with ID {ride?._id}.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(ride?._id)}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
