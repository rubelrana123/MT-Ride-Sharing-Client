export function extractCoordinates(str: string) {
  const match = str.match(/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
  if (!match) return null; // return null if not found
  return [parseFloat(match[1]), parseFloat(match[3])];
}
