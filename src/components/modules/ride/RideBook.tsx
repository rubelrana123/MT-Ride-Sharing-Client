import { toast } from "sonner";
import PaymentMethod from "@/components/modules/payment/PaymentMethod";
import LocationSelector from "@/components/modules/ride/LocationSelector";
import MapView from "@/components/modules/ride/MapView";
import PriceSummary from "@/components/modules/ride/PriceSummary";
import RideOptions from "@/components/modules/ride/RideOptions";
import { Button } from "@/components/ui/button";
import { useRequestRideMutation } from "@/redux/features/ride/ride.api";
import { extractCoordinates } from "@/utils/extractCoordinates";
import { Search } from "lucide-react";
import { useState } from "react";

export default function RideBook() {
  const [pickupLoc, setPickupLoc] = useState<[number, number] | null>(null);
  const [destLoc, setDestLoc] = useState<[number, number] | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(true);
  const [rideType, setRideType] = useState<string>("alto");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  const [requestRide] = useRequestRideMutation();
  console.log(pickupLoc, destAddress);
  const handleBooking = async () => {
    const toastId = toast.loading("Ride booking.....");

    const riderData = {
      pickupLoc: {
        type: "Point",
        coordinates: pickupLoc
          ? [pickupLoc[0], pickupLoc[1]]
          : extractCoordinates(pickupAddress),
      },
      destLoc: {
        type: "Point",
        coordinates: destLoc
          ? [destLoc[0], destLoc[1]]
          : extractCoordinates(destAddress),
      },
      rideType,
      paymentMethod,
    };

    console.log("rideData", riderData);
    try {
      const res = await requestRide(riderData).unwrap();
      if (res.success) {
        toast.success("Ride requested successfully!", { id: toastId });
        //reset form
        setPickupLoc(null);
        setDestLoc(null);
        setPickupAddress("");
        setDestAddress("");
        setSelectingPickup(true);
        setRideType("bike");
        setPaymentMethod("cash");
      }
    } catch (error) {
      console.log("error in ride request", error);
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Ride
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose your pickup and destination to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Booking Form */}
          <div className="lg:col-span-1 space-y-6">
            <LocationSelector
              pickupLoc={pickupLoc}
              destLoc={destLoc}
              pickupAddress={pickupAddress}
              destAddress={destAddress}
              selectingPickup={selectingPickup}
              onPickupChange={setPickupLoc}
              onDestChange={setDestLoc}
              onPickupAddressChange={setPickupAddress}
              onDestAddressChange={setDestAddress}
              onSelectingPickupChange={setSelectingPickup}
            />

            <RideOptions
              selectedRideType={rideType}
              onRideTypeChange={setRideType}
            />

            <PaymentMethod
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            {pickupLoc && destLoc && (
              <PriceSummary
                pickupLoc={pickupLoc}
                destLoc={destLoc}
                rideType={rideType}
              />
            )}

            <Button
              onClick={handleBooking}
              className="w-full py-3 text-lg font-semibold"
              disabled={!pickupLoc || !destLoc}
            >
              <Search className="h-5 w-5 mr-2" />
              Book Ride Now
            </Button>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <MapView
              pickupLoc={pickupLoc}
              destLoc={destLoc}
              selectingPickup={selectingPickup}
              onLocationSelect={(coords) => {
                if (selectingPickup) {
                  setPickupLoc(coords);
                  setPickupAddress(
                    `Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`
                  );
                } else {
                  setDestLoc(coords);
                  setDestAddress(
                    `Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
