// types/applicationTypes.ts
export type DriverStatus = "pending" | "approved" | "rejected" | "suspend";

export interface DriverApplication {
  _id: string;
  driver: {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
  };
  vehicleInfo: {
    vehicleType: string;
    model: string;
    plate: string;
  };
  licenseNumber: string;
  availability: string;
  driverStatus: DriverStatus;
  earnings: string;
  createdAt: string;
  updatedAt: string;
};

export interface IDriverProfile {
  vehicleInfo: IVehicleInfo;
  _id: string;
  driver: string;
  licenseNumber: string;
  availability: string;
  driverStatus: string;
  earnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface IVehicleInfo {
  vehicleType: string;
  model: string;
  plate: string;
}