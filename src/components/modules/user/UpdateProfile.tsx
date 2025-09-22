 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetUserProfileQuery, useUpdateUserInfoMutation } from "@/redux/features/user/user.api";
import { updateProfileSchema } from "@/zodSchema/zodSchema";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
 
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import Loading from "../shared/Loading";
import { useGetDriverProfileQuery } from "@/redux/features/driver/driver.api";

export default function UpdateProfile() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);
  const { data: driverInfo } = useGetDriverProfileQuery(undefined, { skip: !userProfile || userProfile?.role !== "DRIVER" });
  const [updateUserInfo, { isLoading: updateProfileLoading }] = useUpdateUserInfoMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: userProfile?.name,
      email: userProfile?.email,
      phoneNumber: userProfile?.phoneNumber,
      role: userProfile?.role,
      address: userProfile?.address,
      licenseNumber: driverInfo?.licenseNumber,
      vehicleType: driverInfo?.vehicleInfo?.vehicleType,
      model: driverInfo?.vehicleInfo?.model,
      plate: driverInfo?.vehicleInfo?.plate,
    },
  });

  useEffect(() => {
    // userProfile এ ডেটা থাকলে
    if (userProfile) {
      // reset ফাংশন দিয়ে ফর্মের ভ্যালুগুলো সেট করে দিন
      form.reset({
        name: userProfile.name,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        role: userProfile?.role,
        address: userProfile?.address,
        licenseNumber: driverInfo?.licenseNumber,
        vehicleType: driverInfo?.vehicleInfo?.vehicleType,
        model: driverInfo?.vehicleInfo?.model,
        plate: driverInfo?.vehicleInfo?.plate,
      });
    }
  }, [userProfile, form, driverInfo?.licenseNumber, driverInfo?.vehicleInfo]);

  if (isLoading) return <Loading />;

  // Handle Update Profile
  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const toastId = toast.loading("Updating...");

    const baseUserData = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address
    };

    let finalUserData;

    if (userProfile?.role === "driver") {
      if (values.role === "driver") {
        finalUserData = {
          ...baseUserData,
          licenseNumber: values.licenseNumber,
          vehicleInfo: {
            vehicleType: values.vehicleType,
            model: values.model,
            plate: values.plate,
          },
        };
      } else {
        finalUserData = baseUserData;
      }
    } else {
      // যদি রাইডার হয়, তাহলে শুধু বেস ডেটাই থাকবে
      finalUserData = baseUserData;
    }

    try {
      const res = await updateUserInfo({
        userId: userProfile?._id,
        userData: finalUserData,
      }).unwrap();

      if (res.success && res.statusCode === 200) {
        toast.success(res.message, { id: toastId });
        navigate("/dashboard/profile");
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
          console.log(errorMessage,'errorMessage')
      toast.error(errorMessage, { id: toastId });
    }
  };
   console.log(userProfile,'userProfile', driverInfo,'driverInfo')
  return (
    <div>
      <div>
        <h2 className="text-3xl text-foreground font-ride-title mb-10">
          Update Profile
        </h2>
      </div>
      <div className="max-w-2xl w-full mx-auto">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-2xl text-foreground font-ride-title mt-7">
              Update Profile
            </h1>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="update-profile-form"
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jhon Doe"
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
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Email can not be updated
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row w-full sm:items-center gap-5">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+880 123456789"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 streat, Dhaka Bangladesh"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {userProfile?.role === "driver" && (
                  <>
                    <div className="flex flex-col sm:flex-row w-full sm:items-center gap-5">
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
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              variant="default"
              className="cursor-pointer"
              form="update-profile-form"
              disabled={updateProfileLoading}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
