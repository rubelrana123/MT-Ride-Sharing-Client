import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, MessageCircle, Phone, Star } from "lucide-react";

export default function DriverInfo() {
  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Your Driver</h3>

        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder.svg" alt="Driver" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              JS
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg">John Smith</h3>
              <Badge
                variant="secondary"
                className="bg-success/10 text-success hover:bg-success/20"
              >
                <Star className="w-3 h-3 mr-1 fill-current" />
                4.9
              </Badge>
            </div>

            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <Car className="w-4 h-4 mr-2" />
              <span>Toyota Camry • Blue • ABC-123</span>
            </div>

            <div className="text-xs text-muted-foreground">
              2,847 trips completed
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
