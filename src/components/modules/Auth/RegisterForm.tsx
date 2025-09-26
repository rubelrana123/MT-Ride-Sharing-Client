import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
 
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 
import { useNavigate, useSearchParams } from "react-router";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { toast } from "sonner";
import { registerZodSchema } from "@/zodSchema/zodSchema";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

export default function RegisterForm() {
   const [register, { isLoading }] = useRegisterMutation();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role");
  const [userRole, setRole] = useState(initialRole || "RIDER");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      role: initialRole === "RIDER" ? "DRIVER" : "RIDER",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      vehicleType: "",
      model: "",
      plate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerZodSchema>) => {
    const toastId = toast.loading("Registering...");
    const baseUserData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: userRole,
    };

    let finalUserData;

    // 👇 মূল সমাধান: 'values.role' দিয়ে কন্ডিশন চেক করুন
    if (values.role === "DRIVER") {
      // এই if ব্লকের ভেতরে, TypeScript এখন ১০০% নিশ্চিত যে 'values' একজন ড্রাইভারের ডেটা
      // তাই এখন `values.licenseNumber` ইত্যাদি ব্যবহার করলে আর কোনো error হবে না
      finalUserData = {
        ...baseUserData,
        licenseNumber: values.licenseNumber,
        vehicleInfo: {
          vehicleType: values.vehicleType,
          model: values.model,
          plate: values.plate
        },
      };
    } else {
      // যদি রাইডার হয়, তাহলে শুধু বেস ডেটাই থাকবে
      finalUserData = baseUserData;
    }

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
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="name"
                  placeholder="Jhone Doe"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) =>
                    setRole(value as "RIDER" | "DRIVER")
                  }
                  defaultValue={field.value}
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

        {/* ================ driver field ================= */}
        {userRole === "DRIVER" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>License Number</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="NS9765FG56"
                        {...field}
                        value={field.value || ""}
                      />
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
                    <FormControl className="w-full">
                      <Input
                        placeholder="Moto bike"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:items-center gap-5">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Yamaha FZS v3"
                        {...field}
                        value={field.value || ""}
                      />
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
                    <FormControl className="w-full">
                      <Input
                        placeholder="XYZ-34-Z-90"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
