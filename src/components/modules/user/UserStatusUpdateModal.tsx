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
import { useUpdateDriverStatusMutation } from "@/redux/features/driver/driver.api";
import { useUpdateRiderStatusMutation } from "@/redux/features/user/user.api";
 
import type { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
 
import z from "zod";

interface IUserStatusProps {
  user: IUser;
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const userStatusSchema = z.object({
  status: z.string().nonempty("Status is required"),
});

export function UserStatusUpdateModal({
  user,
  open,
  onChange,
}: IUserStatusProps) {
  const [updateRiderStatus] = useUpdateRiderStatusMutation();
  const [updateDriverStatus] = useUpdateDriverStatusMutation();
  const form = useForm<z.infer<typeof userStatusSchema>>({
    resolver: zodResolver(userStatusSchema),
    defaultValues: {
      status: user.status,
    },
  });

  console.log(user, "user in modal", open, "modal open", user?.status, "user status");
  const onSubmit = async (values: z.infer<typeof userStatusSchema>) => {
    const toastId = toast.loading("Updating...");
   
    try {
      if (user?.role === "RIDER") {
        const res = await updateRiderStatus({
          userId: user._id,
          isActive: values.status,
        }).unwrap();

        if (res.success && res.statusCode === 200) {
          toast.success(res.message, { id: toastId });
          onChange(false);
        }
      }

      const res = await updateDriverStatus({
          driverId: user._id,
          driverStatus: values.status,
        }).unwrap();

        if (res.success && res.statusCode === 200) {
          toast.success(res.message, { id: toastId });
          onChange(false);
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
      onChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update {user?.role === "RIDER" ? "Rider" : "Driver"} Status
          </DialogTitle>
          <DialogDescription>
            Select a new status for this{" "}
            {user?.role === "RIDER" ? "Rider" : "Driver"} from the list below
            and click 'Save changes' to apply.
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {user?.role === "RIDER" ? "Rider" : "Driver"} Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select a ${
                              user?.role === "RIDER" ? "rider" : "driver"
                            }${" "} status`}
                          />
                        </SelectTrigger>
                      </FormControl>
                      {user?.role === "RIDER" ? (
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                      ) : (
                        <SelectContent>
                          {/* <SelectItem value="pending">Pending</SelectItem> */}
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          {/* <SelectItem value="suspend">Suspend</SelectItem> */}
                        </SelectContent>
                      )}
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
