import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mail } from "lucide-react";

export default function RiderInformation({ rider }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Rider Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={
                "https://i.ibb.co.com/3rCdWYF/WIN-20220822-12-01-28-Pro-2.jpg"
              }
              alt={rider?.name}
            />
            <AvatarFallback className="rounded-lg">
              {rider?.name}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {rider?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rider</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">
              {rider?.phone}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">
              {rider?.email}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
