import type { IDriver, IRider } from "./user.type";

export interface IPickedupCoordinates {
  type: string;
  coordinates: number[];
};
export interface IDestinationCoordinates {
  type: string;
  coordinates: number[];
}
export interface IStatusLog {
  status: string;
  timestamp: string;
}

export interface IRidesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sort?: string;
  searchTerm?: string;
  fields?: string;
  minFare?: string;
  maxFare?: string;
  rideStatus?: string;
}
export interface IRideLocation {
  type: "Point";
  coordinates: [number, number];
}
export interface IRideResponse<T> {
  data : T
}

// Ride
export interface IRide {
  _id: string;
  rider?: IRider;
  driver?: IDriver;
  pickupLoc?: IRideLocation;
  destLoc?: IRideLocation;
  rideStatus?: string;

  // Backend is sending these extra fields
  distance?: string;   // "10.12 km"
  fare?: string;       // "657 BDT"
  createdAt?: string;  // "2025-09-27T20:20:57.195Z"

  // Optional timestamps
  requestedAt?: string;
  cancelledAt?: string;
  rejectedAt?: string;
  acceptedAt?: string;
  completedAt?: string;
  pickedupAt?: string;
  inTransitAt?: string;
}
 

export interface RideType {
  id: string;
  name: string;
  icon: any;
  price: number;
  color: string;
}

