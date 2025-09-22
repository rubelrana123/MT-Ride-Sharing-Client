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
  // sortBy?: string;
  sort?: string;
  searchTerm?: string;
  fields?: string;
  minFare?: string;
  maxFare?: string;
  rideStatus?: string;
}
export interface IRide {
  _id: string;
  rider: IRider;
  driver: IDriver;
  pickupAddress: string;
  destinationAddress: string;
  pickupCoordinates: IPickedupCoordinates;
  destinationCoordinates: IPickedupCoordinates;
  fare: number;
  rideStatus: string;
  statusLogs: IStatusLog[];
  createdAt: string;
  updatedAt: string;
  platformEarnings: number;
  commisionRate: number;
  paymentMethod: string;
}
 

export interface RideType {
  id: string;
  name: string;
  icon: any;
  price: number;
  color: string;
}

