import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useApplyDriverMutation } from "@/redux/features/driver/driver.api";
import RideHeader from "./RideHeader";
import { getErrorMessage } from "@/utils/getErrorMessage";

// Zod schema for validation

export const vehicleSchema = z.object({
  licenseNumber: z
    .string()
    .min(6, "License number must be at least 6 characters")
    .max(20, "License number must be at most 20 characters"),

  vehicleInfo: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
    model: z.string().min(1, "Model is required"),
    plate: z
      .string()
      .min(5, "Plate number must be at least 5 characters")
      .max(15, "Plate number must be at most 15 characters"),
  }),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

// Default values coming from the user's JSON
const defaultValues: VehicleFormValues = {
  vehicleInfo: {
    vehicleType: "Bike",
    model: "",
    plate: "",
  },
  licenseNumber: "",
};
function DriverApplications() {
  const [applyForDriver] = useApplyDriverMutation();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
    mode: "onTouched",
  });

  async function onSubmit(values: VehicleFormValues) {
    // Replace this with your API call / state update
try {
  const res = await applyForDriver(values);
  console.log(res, "driver application response");
  console.log("Submitted values:", values);

  if (res?.success) {
    toast.success("Your application has been submitted successfully!");
  } else {
    // backend sent a failure response
    const errMsg = getErrorMessage(res.error);
    toast.error(errMsg ||"Application failed. Please try again.");
    
  }
} catch (error: any) {
  const errMsg =
    error?.data?.message || // backend error
    error?.error || // RTK Query network error
    "Failed to submit form. Please try again."; // fallback

  toast.error(errMsg);
  console.log(error, "error in driver application");
}

  }

  return (
    <Card className="max-w-2xl min-w-dvh mx-auto my-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Vehicle & License Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="vehicleInfo.vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "Bike"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem defaultChecked value="Bike">
                          Bike
                        </SelectItem>
                        <SelectItem value="AC Car">AC Car</SelectItem>
                        <SelectItem value="Non-AC Car">Non-AC Car</SelectItem>
                        <SelectItem value="Scooter">Scooter</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleInfo.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. BM REife" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleInfo.plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. SYL-562e1fi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. DX-20e25-0789fi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default DriverApplications;
