import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Phone, Mail } from "lucide-react";

interface Rider {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
}

interface RiderInformationProps {
  rider: Rider;
}

export default function RiderInformation({ rider }: RiderInformationProps) {
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
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
              {rider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{rider.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rider</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{rider.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 dark:text-white">{rider.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { IRider } from "@/types";

// export default function RiderInformation( { rider }: { rider: IRider } ) {
//   console.log(rider, "rider info");
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Rider Details</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-center">
//           <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xl font-bold mx-auto mb-2">
//             {rider?.name.charAt(0).toUpperCase()}
//           </div>
//           <h3 className="font-semibold text-lg capitalize">
//             {rider?.name}
//           </h3>
//         </div>
//         <div className="mt-5">
//           <p className="text-sm">
//             <strong>Rider Id:</strong> {rider._id}
//           </p>
//           <p className="text-sm">
//             <strong>Email:</strong> {rider.email}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
