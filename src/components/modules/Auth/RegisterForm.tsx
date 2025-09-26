import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

import { registerZodSchema } from "@/zodSchema/zodSchema";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import type z from "zod";

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "RIDER";
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: initialRole,
      licenseNumber: "",
      vehicleType: "",
      model: "",
      plate: "",
    },
  });

  // local state for conditional rendering
  const [userRole, setUserRole] = useState(initialRole);

  const onSubmit = async (values: z.infer<typeof registerZodSchema>) => {
    const toastId = toast.loading("Registering...");

    const baseUserData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };

    let finalUserData =
      values.role === "DRIVER"
        ? {
            ...baseUserData,
            licenseNumber: values.licenseNumber,
            vehicleInfo: {
              vehicleType: values.vehicleType,
              model: values.model,
              plate: values.plate,
            },
          }
        : baseUserData;

    try {
      const res = await register(finalUserData).unwrap();
      if (res.success && res.statusCode === 201) {
        toast.success(res.message, { id: toastId });
        navigate("/login");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    setUserRole(value);
                    form.setValue("role", value as "RIDER" | "DRIVER");
                  }}
                  className="flex flex-row"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="RIDER" />
                    </FormControl>
                    <FormLabel className="font-normal">Rider</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="DRIVER" />
                    </FormControl>
                    <FormLabel className="font-normal">Driver</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Driver Fields */}
        {userRole === "DRIVER" && (
          <>
            <div className="flex flex-col sm:flex-row gap-5">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="NS9765FG56" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Motorbike" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Yamaha FZS v3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="XYZ-34-Z-90" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {/* Submit */}
        <Button type="submit" disabled={isLoading} className="w-full">
          Register
        </Button>
      </form>
    </Form>
  );
}
