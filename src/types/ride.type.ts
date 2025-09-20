export interface IRidesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  searchTerm?: string;
  fields?: string;
  minFare?: string;
  maxFare?: string;
  rideStatus?: string;
}