export const calculateDistance = (
  pickupLoc: [number, number] | null,
  destLoc: [number, number] | null
) => {
  if (!pickupLoc || !destLoc) return 0;
  // Haversine distance in KM
  const R = 6371;
  const dLat = ((destLoc[1] - pickupLoc[1]) * Math.PI) / 180;
  const dLon = ((destLoc[0] - pickupLoc[0]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pickupLoc[1] * Math.PI) / 180) *
      Math.cos((destLoc[1] * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
