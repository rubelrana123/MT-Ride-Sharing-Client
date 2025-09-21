import { dateFormater } from "@/utils/dateFormater";

 

interface RideHeaderProps {
  rideDetails: any;
  userProfile: any;
}

export default function RideHeader({ rideDetails, userProfile }: RideHeaderProps) {
  const getTitle = () => {
    switch (userProfile?.role) {
      case "RIDER":
        return `Your trip ${dateFormater(new Date(rideDetails?.createdAt))}`;
      case "DRIVER":
        return `Trip with ${rideDetails?.rider?.name}`;
      case "ADMIN":
        return `Ride Details: #${rideDetails?._id?.slice(-8)}`;
      default:
        return "Ride Details";
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {getTitle()}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {dateFormater(new Date(rideDetails?.createdAt))}
      </p>
    </div>
  );
}