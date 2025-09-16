import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Car, 
  Users, 
  CreditCard,
  ArrowUpDown,
  Search,
  Calendar,
  Star,
  X
} from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

// Custom marker icons
const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationPicker({ onSelect }: { onSelect: (coords: [number, number]) => void }) {
  useMapEvents({
    click(e: any) {
      onSelect([e.latlng.lng, e.latlng.lat]);
    },
  });
  return null;
}

export default function RideBook() {
  const [pickupLoc, setPickupLoc] = useState<[number, number] | null>(null);
  const [destLoc, setDestLoc] = useState<[number, number] | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [selectingPickup, setSelectingPickup] = useState(true);
  const [rideType, setRideType] = useState("standard");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [pickupSearch, setPickupSearch] = useState("");
  const [pickupResults, setPickupResults] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const pickupInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (coords: [number, number]) => {
    if (selectingPickup) {
      setPickupLoc(coords);
      setPickupAddress(`Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`);
    } else {
      setDestLoc(coords);
      setDestAddress(`Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`);
    }
  };

  const swapLocations = () => {
    const tempLoc = pickupLoc;
    const tempAddress = pickupAddress;
    setPickupLoc(destLoc);
    setPickupAddress(destAddress);
    setDestLoc(tempLoc);
    setDestAddress(tempAddress);
  };

  const useCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords: [number, number] = [longitude, latitude];
        setPickupLoc(coords);
        setPickupAddress(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setSelectingPickup(true);
      },
      (err) => {
        console.error(err);
        alert('Unable to fetch your location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const clearPickup = () => {
    setPickupLoc(null);
    setPickupAddress("");
  };

  // Search pickup using Nominatim (debounced)
  useEffect(() => {
    const q = pickupSearch.trim();
    if (q.length === 0) {
      setPickupResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const id = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });
        
        if (!res.ok) throw new Error('Search failed');
        const data = (await res.json()) as Array<{ display_name: string; lat: string; lon: string }>;
        setPickupResults(data.slice(0, 8));
      } catch (e) {
        if ((e as any)?.name !== 'AbortError') {
          console.error(e);
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [pickupSearch]);

  const calculateDistance = () => {
    if (!pickupLoc || !destLoc) return 0;
    // Simple distance calculation (not accurate for real-world use)
    const R = 6371; // Earth's radius in km
    const dLat = (destLoc[1] - pickupLoc[1]) * Math.PI / 180;
    const dLon = (destLoc[0] - pickupLoc[0]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pickupLoc[1] * Math.PI / 180) * Math.cos(destLoc[1] * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const calculatePrice = () => {
    const distance = calculateDistance();
    const basePrice = 50; // Base price in local currency
    const pricePerKm = 15; // Price per kilometer
    return Math.round(basePrice + (distance * pricePerKm));
  };

  const rideTypes = [
    { id: "standard", name: "Standard", icon: Car, price: 1, description: "Comfortable ride for everyday travel" },
    { id: "premium", name: "Premium", icon: Star, price: 1.5, description: "Luxury vehicle with premium features" },
    { id: "shared", name: "Shared", icon: Users, price: 0.7, description: "Share your ride and save money" }
  ];

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
            {/* Location Selection */}
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
                      placeholder="Search pickup (e.g., Baridhara)"
                      ref={pickupInputRef}
                      value={pickupSearch}
                      onChange={(e) => setPickupSearch(e.target.value)}
                      className="pl-10"
                    />
                    {(isSearching || pickupResults.length > 0 || pickupSearch.trim().length > 0) && (
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
                                  setPickupLoc([lon, lat]);
                                  setPickupAddress(r.display_name);
                                  setPickupSearch("");
                                  setPickupResults([]);
                                  setIsSearching(false);
                                  setSelectingPickup(true);
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
                    )}
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
                      onClick={() => setSelectingPickup(true)}
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
                      onChange={(e) => setDestAddress(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant={!selectingPickup ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectingPickup(false)}
                    className="w-full"
                  >
                    {!selectingPickup ? "Click on map to select" : "Select on Map"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Ride Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Choose Ride Type
              </h2>
              
              <div className="space-y-3">
                {rideTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        rideType === type.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setRideType(type.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {type.price}x
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Schedule Ride
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={rideDate}
                      onChange={(e) => setRideDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </Label>
                  <Input
                    type="time"
                    value={rideTime}
                    onChange={(e) => setRideTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Price Summary */}
            {pickupLoc && destLoc && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Price Estimate
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                    <span className="font-medium">{calculateDistance().toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Base Price:</span>
                    <span className="font-medium">৳50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Distance Cost:</span>
                    <span className="font-medium">৳{Math.round(calculateDistance() * 15)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Ride Type:</span>
                    <span className="font-medium">
                      {rideTypes.find(t => t.id === rideType)?.name} 
                      ({rideTypes.find(t => t.id === rideType)?.price}x)
                    </span>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">৳{Math.round(calculatePrice() * (rideTypes.find(t => t.id === rideType)?.price || 1))}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Book Ride Button */}
            <Button 
              className="w-full py-3 text-lg font-semibold"
              disabled={!pickupLoc || !destLoc}
            >
              <Search className="h-5 w-5 mr-2" />
              Book Ride Now
            </Button>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select on Map
              </h2>
              <div className="h-[600px] w-full rounded-lg overflow-hidden">
                <MapContainer 
                  center={[23.8103, 90.4125] as [number, number]} 
                  zoom={12} 
                  className="h-full w-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker onSelect={handleSelect} />

                  {pickupLoc && (
                    <Marker 
                      position={[pickupLoc[1], pickupLoc[0]] as [number, number]}
                      icon={pickupIcon as any}
                    >
                      <div className="text-center">
                        <p className="font-semibold">Pickup Location</p>
                      </div>
                    </Marker>
                  )}
                  
                  {destLoc && (
                    <Marker 
                      position={[destLoc[1], destLoc[0]] as [number, number]}
                      icon={destinationIcon as any}
                    >
                      <div className="text-center">
                        <p className="font-semibold">Destination</p>
                      </div>
                    </Marker>
                  )}
                  
                  {pickupLoc && destLoc && (
                    <Polyline 
                      positions={[[pickupLoc[1], pickupLoc[0]], [destLoc[1], destLoc[0]]] as [number, number][]} 
                      color="blue" 
                      weight={3}
                    />
                  )}
                </MapContainer>
              </div>
              
              {/* Map Instructions */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Instructions:</strong> Click on the map to select your {selectingPickup ? "pickup" : "destination"} location. 
                  Use the buttons above to switch between selecting pickup and destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}