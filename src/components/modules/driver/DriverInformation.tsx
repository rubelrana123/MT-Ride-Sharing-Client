import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Car, Phone, Mail, FileText } from "lucide-react";

interface Driver {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
  vehicleInfo: {
    vehicleType: string;
    model: string;
    plate: string;
  };
  licenseNumber: string;
}

interface DriverInformationProps {
  driver: Driver;
}

export default function DriverInformation({ driver }: DriverInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Driver Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{driver.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Driver</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{driver.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{driver.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{driver.licenseNumber}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-2">Vehicle Information</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Type:</span>
              <span className="text-gray-900 dark:text-white capitalize">{driver.vehicleInfo.vehicleType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Model:</span>
              <span className="text-gray-900 dark:text-white">{driver.vehicleInfo.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Plate:</span>
              <span className="text-gray-900 dark:text-white">{driver.vehicleInfo.plate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
 