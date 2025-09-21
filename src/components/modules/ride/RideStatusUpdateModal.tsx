import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateRideStatusMutation } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types/ride.type";
 
 
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
 
import z from "zod";

interface IRideStatusProps {
  ride: IRide;
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const rideStatusSchema = z.object({
  rideStatus: z.string().nonempty("Status is required"),
});

export function RideStatusUpdateModal({
  ride,
  open,
  onChange,
}: IRideStatusProps) {
  const [updateRideStatus] = useUpdateRideStatusMutation();
  const form = useForm<z.infer<typeof rideStatusSchema>>({
    resolver: zodResolver(rideStatusSchema),
    defaultValues: {
      rideStatus: ride.rideStatus,
    },
  });
console.log(ride,'ride')
  const onSubmit = async (values: z.infer<typeof rideStatusSchema>) => {
    const toastId = toast.loading("Updating...")
    
    try {
      const res = await updateRideStatus({ rideId: ride._id, rideStatus: values }).unwrap();

      if (res.success && res.statusCode === 200) {
        toast.success(res.message, { id: toastId })
        onChange(false)
      }
    } catch (error: unknown) {
      console.log(error,"error in ride status update modal");
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
      onChange(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Ride Status</DialogTitle>
          <DialogDescription>
            Select a new status for this ride from the list below and click
            'Save changes' to apply.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="ride-status-form"
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="rideStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ride Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a ride status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* rejected → accepted → picked_up → in_transit → completed 
                          REQUESTED = "requested",
                          CANCELLED = "cancelled",
                          REJECTED = "rejected",
                          ACCEPTED = "accepted",
                          PICKED_UP = "picked_up",
                          IN_TRANSIT = "in_transit",
                          COMPLETED = "completed",
                        
                        */}
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="picked_up">Picked Up</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="ride-status-form"
            className="cursor-pointer"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
