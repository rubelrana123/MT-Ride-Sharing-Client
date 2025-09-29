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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
 

import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { registerSchema, type RegisterFormData } from "@/zodSchema/zodSchema";

 
interface ApiError {
  data?: {
    message?: string;
  };
}

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get initial role from URL params with proper typing
  const urlRole = searchParams.get("role");
  const initialRole: "RIDER" | "DRIVER" = 
    urlRole === "DRIVER" || urlRole === "RIDER" ? urlRole : "RIDER";

  // State for conditional rendering
  const [selectedRole, setSelectedRole] = useState<"RIDER" | "DRIVER">(initialRole);

  // Form setup with proper typing
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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
    mode: "onChange", // Enable real-time validation
  });

  // Watch for role changes to update conditional rendering
  const watchedRole = form.watch("role");

  useEffect(() => {
    setSelectedRole(watchedRole);
    
    // Clear driver-specific fields when switching to RIDER
    if (watchedRole === "RIDER") {
      form.setValue("licenseNumber", "");
      form.setValue("vehicleType", "");
      form.setValue("model", "");
      form.setValue("plate", "");
    }
  }, [watchedRole, form]);

  // Handle form submission
  const handleSubmit = async (values: RegisterFormData) => {
    const toastId = toast.loading("Creating your account...");

    try {
      // Prepare base user data
      const baseUserData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      // Add driver-specific data if role is DRIVER
      const finalUserData = values.role === "DRIVER" 
        ? {
            ...baseUserData,
            licenseNumber: values.licenseNumber!,
            vehicleInfo: {
              vehicleType: values.vehicleType!,
              model: values.model!,
              plate: values.plate!,
            },
          }
        : baseUserData;

      const response = await register(finalUserData).unwrap();

      if (response.success && response.statusCode === 201) {
        toast.success(response.message || "Account created successfully!", { 
          id: toastId 
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      const apiError = error as ApiError;
      const errorMessage = 
        apiError?.data?.message || 
        "Something went wrong. Please try again.";
      
      toast.error(errorMessage, { id: toastId });
    }
  };

  // Handle role change
  const handleRoleChange = (value: string) => {
    const newRole = value as "RIDER" | "DRIVER";
    form.setValue("role", newRole);
    setSelectedRole(newRole);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
          noValidate
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Enter your email address" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Password 
                    placeholder="Create a strong password"
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password *</FormLabel>
                <FormControl>
                  <Password 
                    placeholder="Confirm your password"
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Account Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={handleRoleChange}
                    value={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                    disabled={isLoading}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="RIDER" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        🚗 Rider (Book rides)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="DRIVER" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        🚙 Driver (Provide rides)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Driver-Specific Fields */}
          {selectedRole === "DRIVER" && (
            <div className="space-y-6 p-4 bg-gray-50 rounded-lg border">
              <h3 className="text-sm font-medium text-gray-900">
                Driver Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., NS9765FG56" 
                          {...field} 
                          disabled={isLoading}
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
    <FormItem className="w-full">
      <FormLabel>Vehicle Type *</FormLabel>
      <FormControl>
        <select
          {...field}
          disabled={isLoading}
          className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select a vehicle type
          </option>
          <option value="bike">Bike</option>
          <option value="nac-car">Non-AC Car</option>
          <option value="ac-car">AC Car</option>
          <option value="scooter">Scooter</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Yamaha FZS v3" 
                          {...field} 
                          disabled={isLoading}
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
                    <FormItem>
                      <FormLabel>License Plate *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., XYZ-34-Z-90" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !form.formState.isValid} 
            className="w-full h-11"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </Form>
    </div>
  );
}
 