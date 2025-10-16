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
import { useNavigate } from "react-router";

// Zod schema
const vehicleSchema = z.object({
  vehicleInfo: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
    model: z.string().min(1, "Model is required"),
    plate: z.string().min(1, "Plate number is required"),
  }),
  licenseNumber: z.string().min(1, "License number is required"),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

const defaultValues: VehicleFormValues = {
  vehicleInfo: {
    vehicleType: "",
    model: "",
    plate: "",
  },
  licenseNumber: "",
};

export default function DriverApplications() {
  const navigate = useNavigate();
  const [applyForDriver] = useApplyDriverMutation();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
    mode: "onTouched",
  });

  async function onSubmit(values: VehicleFormValues) {
    try {
      await applyForDriver(values);
      toast.success("Form submitted — check dashboard for status!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    }
  }

  return (
    <Card className="max-w-2xl min-w-2/3 mx-auto mt-12 shadow-lg rounded-xl border bg-background text-foreground border-border transition-colors duration-300">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-primary">
          Vehicle & License Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Vehicle Type */}
            <FormField
              control={form.control}
              name="vehicleInfo.vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full rounded-lg border border-border bg-input focus:ring-2 focus:ring-accent">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground rounded-lg">
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

            {/* Model */}
            <FormField
              control={form.control}
              name="vehicleInfo.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. BM REife"
                      {...field}
                      className="rounded-lg border border-border bg-input focus:ring-2 focus:ring-accent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Plate Number */}
            <FormField
              control={form.control}
              name="vehicleInfo.plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. SYL-562e1fi"
                      {...field}
                      className="rounded-lg border border-border bg-input focus:ring-2 focus:ring-accent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* License Number */}
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. DX-20e25-0789fi"
                      {...field}
                      className="rounded-lg border border-border bg-input focus:ring-2 focus:ring-accent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary text-accent-foreground hover:bg-accent/90 rounded-lg px-6 py-2"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
