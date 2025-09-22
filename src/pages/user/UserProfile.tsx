 
// import ChangePasswordModal from "@/components/modals/user/ChangePasswordModal";
import Loading from "@/components/modules/shared/Loading";
import ChangePasswordModal from "@/components/modules/user/ChangePasswordModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { useGetUserProfileQuery } from "@/redux/features/user/user.api";
 
import { useState } from "react";
import { Link } from "react-router";

export default function UserProfile() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);
  const { data: driverInfo } = useGetDriverProfileQuery(undefined, {
    skip: !userProfile || userProfile?.role !== "driver",
  });
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl min-[350px]:text-3xl text-foreground font-ride-title">
          My Profile
        </h2>
        <Button size="lg" variant="default" className="cursor-pointer" asChild>
          <Link to="/dashboard/updateProfile">Edit Profile</Link>
        </Button>
      </div>
      <div className="max-w-2xl w-full mx-auto">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="cursor-pointer w-28 h-28">
              <AvatarImage
                src={
                  userProfile?.profilePicture ||
                  "https://avatars.githubusercontent.com/u/124599?v=4"
                }
              />
              <AvatarFallback>{userProfile?.name}</AvatarFallback>
            </Avatar>

            <h1 className="text-2xl text-foreground font-ride-title mt-7">
              {userProfile?.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {userProfile?.email}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mt-10">
              <h2 className="text-muted-foreground text-lg">
                Personal Details
              </h2>

              <div className="mt-10">
                <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                  <p>Full Name:</p>
                  <span>{userProfile?.name}</span>
                </div>
                <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                  <p>Email:</p>
                  <span>{userProfile?.email}</span>
                </div>
                <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                  <p>Phone:</p>
                  <span>
                    {userProfile?.phoneNumber
                      ? userProfile?.phoneNumber
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20">
                  <p>Address:</p>
                  <span className="text-wrap">
                    {userProfile?.address ? userProfile?.address : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {driverInfo && (
              <div className="mt-5">
                <h2 className="text-muted-foreground text-lg">Vehicle Info</h2>

                <div className="mt-10">
                  <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                    <p>License Number:</p>
                    <span>{driverInfo?.licenseNumber}</span>
                  </div>
                  <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                    <p>Vehicle Type:</p>
                    <span>{driverInfo?.vehicleInfo?.vehicleType}</span>
                  </div>
                  <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20 border-b pb-3">
                    <p>Model:</p>
                    <span>{driverInfo?.vehicleInfo?.model}</span>
                  </div>
                  <div className="flex flex-col items-start min-[400px]:flex-row justify-between mt-5 min-[400px]:items-center gap-4 min-[400px]:gap-20">
                    <p>Plate:</p>
                    <span>{driverInfo?.vehicleInfo?.plate}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <ChangePasswordModal open={open} onChange={setOpen} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
