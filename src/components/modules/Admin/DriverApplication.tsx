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
 

// Zod schema for validation
const vehicleSchema = z.object({
  vehicleInfo: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
    model: z.string().min(1, "Model is required"),
    plate: z.string().min(1, "Plate number is required"),
  }),
  licenseNumber: z.string().min(1, "License number is required"),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

// Default values coming from the user's JSON
const defaultValues: VehicleFormValues = {
  vehicleInfo: {
    vehicleType: "Bikee",
    model: "BM REife",
    plate: "SYL-562e1fi",
  },
  licenseNumber: "DX-20e25-0789fi",
};
function DriverApplications() {
  const [applyForDriver] = useApplyDriverMutation();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
    mode: "onTouched",
  });

  async function onSubmit  (values: VehicleFormValues) {
    // Replace this with your API call / state update
    try {
      const res = await applyForDriver(values);

      console.log("Submitted values:", values,res);
      toast.success("Form submitted — check dahboard for status!");
      toast.success("your application is under review" );

    } catch (error) {
      toast.error("Failed to submit form. Please try again." );
      
    } 
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vehicle & License Form</CardTitle>
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
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bike">Bike</SelectItem>
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