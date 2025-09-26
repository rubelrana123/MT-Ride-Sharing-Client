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
export interface IRideResponse {
  data : IRide
}
export interface IRide {
  _id: string;
  rider: IRider;
  driver?: IDriver;
  pickupAddress?: string;
  destinationAddress?: string;
  pickupLoc?: IRideLocation;
  destLoc?: IRideLocation;
  rideStatus?: string;
  requestedAt?: Date;
  cancelledAt?: Date;
  rejectedAt?: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  pickedupAt?: Date;
  inTransitAt?: Date;
}
 

export interface RideType {
  id: string;
  name: string;
  icon: any;
  price: number;
  color: string;
}

