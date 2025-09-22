import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface RiderInfoProps {
  rider: {
    name: string;
    avatar?: string;
    phoneNumber: string;
  };
  trip: {
    pickupAddress: string;
    destinationAddress: string;
    fare: number;
  };
}

export default function  RiderInfo ({ rider, trip }: RiderInfoProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="shadow-medium border-0 bg-gradient-surface">
      <CardContent className="p-6 space-y-6">
        {/* Rider Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 shadow-soft">
              <AvatarImage src={rider.avatar} alt={rider.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getInitials(rider.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{rider.name}</h3>
              <p className="text-sm">{rider.phoneNumber}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm text-muted-foreground font-medium">
                  4.6
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-accent shadow-soft"></div>
              <div className="w-px h-8 bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-destructive shadow-soft"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pickup</p>
                <p className="font-medium text-sm leading-relaxed">
                  {trip.pickupAddress}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Destination
                </p>
                <p className="font-medium text-sm leading-relaxed">
                  {trip.destinationAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{trip.estimatedTime}</span>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <p>Fare</p>
            <p className="font-bold text-lg">{trip.fare}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

