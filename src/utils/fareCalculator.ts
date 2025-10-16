import { rideTypes } from "@/constants";

export const calculateFare = (distance: number, rideTypeId: string) => {
  const basePrice = 50;
  const pricePerKm = 15;
  const rideType = rideTypes?.find((t) => t.id === rideTypeId);
  const multiplier = rideType?.price || 1;

  const distanceCost = Math.round(distance * pricePerKm);
  const subtotal = basePrice + distanceCost;
  const total = Math.round(subtotal * multiplier);

  return {
    basePrice,
    distanceCost,
    subtotal,
    total,
    multiplier,
  };
};
