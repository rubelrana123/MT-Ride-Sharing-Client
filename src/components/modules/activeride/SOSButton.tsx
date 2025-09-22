import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, MapPin, Phone, ShieldAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SOSButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    const toastId = toast.loading("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        console.log("Location found:", locationLink);
        setIsOpen(false);

        toast.success(
          "Emergency contact notified successfully with your current location.",
          { id: toastId }
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error(
          "Could not get your location. Please enable location services.",
          { id: toastId }
        );
        setIsOpen(false);
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`
                w-14 h-14 rounded-full bg-primary
                shadow-emergency hover:shadow-emergency hover:scale-105 
                transition-all duration-300 border-0 cursor-pointer
                ${isPressed ? "animate-bounce-subtle" : "animate-pulse"}
              `}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          <AlertTriangle className="w-7 h-7 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] z-[1000]">
        <DialogHeader className="text-center">
          <DialogTitle>Emergency SOS</DialogTitle>
          <DialogDescription>
            This will immediately contact emergency services and share your
            location. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            asChild // 👈 Button-কে Link হিসেবে কাজ করানোর জন্য
            size="lg"
            className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <a href="tel:999">
              <Phone className="w-4 h-4" /> Call Police
            </a>
          </Button>

          {/* Notify Contact Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto cursor-pointer"
            variant="outline"
            onClick={handleShare}
          >
            <ShieldAlert className="w-4 h-4" /> Notify Contact
          </Button>

          {/* Share Location Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto cursor-pointer"
            variant="outline"
            onClick={handleShare}
          >
            <MapPin className="w-4 h-4" /> Share Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SOSButton;
