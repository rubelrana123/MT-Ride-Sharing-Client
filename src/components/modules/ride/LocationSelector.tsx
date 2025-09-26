import { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { MapPin, Navigation, ArrowUpDown, X } from "lucide-react";

interface LocationSelectorProps {
  pickupLoc: [number, number] | null;
  destLoc: [number, number] | null;
  pickupAddress: string;
  destAddress: string;
  selectingPickup: boolean;
  onPickupChange: (coords: [number, number] | null) => void;
  onDestChange: (coords: [number, number] | null) => void;
  onPickupAddressChange: (address: string) => void;
  onDestAddressChange: (address: string) => void;
  onSelectingPickupChange: (selecting: boolean) => void;
}

export default function LocationSelector({
  pickupLoc,
  destLoc,
  pickupAddress,
  destAddress,
  selectingPickup,
  onPickupChange,
  onDestChange,
  onPickupAddressChange,
  onDestAddressChange,
  onSelectingPickupChange
}: LocationSelectorProps) {
  const [pickupSearch, setPickupSearch] = useState("");
  const [pickupResults, setPickupResults] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  // const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const pickupInputRef = useRef<HTMLInputElement | null>(null);

  const useCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords: [number, number] = [longitude, latitude];
        onPickupChange(coords);
        onPickupAddressChange(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        onSelectingPickupChange(true);
      },
      (err) => {
        console.error(err);
        alert('Unable to fetch your location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const swapLocations = () => {
    const tempLoc = pickupLoc;
    const tempAddress = pickupAddress;
    onPickupChange(destLoc);
    onPickupAddressChange(destAddress);
    onDestChange(tempLoc);
    onDestAddressChange(tempAddress);
  };

  const clearPickup = () => {
    onPickupChange(null);
    onPickupAddressChange("");
  };

  // Search pickup using Nominatim (debounced)
  // useEffect(() => {
  //   const q = pickupSearch.trim();
  //   if (q.length === 0) {
  //     setPickupResults([]);
  //     setIsSearching(false);
  //     return;
  //   }
  //   setIsSearching(true);
  //   if (abortRef.current) abortRef.current.abort();
  //   const controller = new AbortController();
  //   abortRef.current = controller;
  //   const id = setTimeout(async () => {
  //     try {
  //       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json`;
  //       const res = await fetch(url, {
  //         signal: controller.signal,
  //         headers: { Accept: 'application/json' },
  //       });
        
  //       if (!res.ok) throw new Error('Search failed');
  //       const data = (await res.json()) as Array<{ display_name: string; lat: string; lon: string }>;
  //       setPickupResults(data.slice(0, 8));
  //     } catch (e) {
  //       if ((e as any)?.name !== 'AbortError') {
  //         console.error(e);
  //       }
  //     } finally {
  //       setIsSearching(false);
  //     }
  //   }, 400);
  //   return () => {
  //     clearTimeout(id);
  //     controller.abort();
  //   };
  // }, [pickupSearch]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        Select Locations
      </h2>
      
      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Pickup Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Select Location From Map"
              ref={pickupInputRef}
              value={pickupSearch}
              onChange={(e) => setPickupSearch(e.target.value)}
              className="pl-10"
            />
            {/* {(isSearching || pickupResults.length > 0 || pickupSearch.trim().length > 0) && (
              <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white text-sm shadow-lg dark:border-gray-700 dark:bg-gray-900">
                {isSearching && (
                  <div className="px-3 py-2 text-gray-500">Searching...</div>
                )}
                {!isSearching && pickupResults.length > 0 && (
                  <div>
                    {pickupResults.map((r, idx) => (
                      <button
                        key={`${r.lat}-${r.lon}-${idx}`}
                        type="button"
                        onClick={() => {
                          const lat = parseFloat(r.lat);
                          const lon = parseFloat(r.lon);
                          onPickupChange([lon, lat]);
                          onPickupAddressChange(r.display_name);
                          setPickupSearch("");
                          setPickupResults([]);
                          setIsSearching(false);
                          onSelectingPickupChange(true);
                          setTimeout(() => pickupInputRef.current?.blur(), 0);
                        }}
                        className="block w-full cursor-pointer truncate px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {r.display_name}
                      </button>
                    ))}
                  </div>
                )}
                {!isSearching && pickupSearch.trim().length >= 3 && pickupResults.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">No results</div>
                )}
              </div>
            )} */}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={useCurrentLocation}
              className="w-full"
            >
              Use Your Location
            </Button>
            <Button
              type="button"
              variant={selectingPickup ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectingPickupChange(true)}
              className="w-full"
            >
              {selectingPickup ? "Click on Map" : "Select on Map"}
            </Button>
          </div>
          {pickupLoc && (
            <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900/40">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{pickupAddress}</span>
              </div>
              <button
                type="button"
                aria-label="Clear pickup location"
                onClick={clearPickup}
                className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapLocations}
            className="rounded-full p-2"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Destination Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Destination
          </Label>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Enter destination address"
              value={destAddress}
              onChange={(e) => onDestAddressChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={!selectingPickup ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectingPickupChange(false)}
            className="w-full"
          >
            {!selectingPickup ? "Click on map to select" : "Select on Map"}
          </Button>
        </div>
      </div>
    </div>
  );
}
