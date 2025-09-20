
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  phoneNumber: string;
  address: string;
  isActive: string;
  isVerified: boolean;
  isDeleted: boolean;
  status: string;
  isPasswordResetTokenUsed?: boolean;
  createdAt: string;
  updatedAt: string
}

export interface IRider {
  _id: string
  name: string
  email: string
  role: string
  phoneNumber: string;
}

export interface IDriver {
  _id: string
  name: string
  email: string
  role: string
  vehicleInfo: IVehicleInfo
  licenseNumber: string
}

export interface IVehicleInfo {
  vehicleType?: string
  model?: string
  plate?: string
}

export interface IUpdateProfile {
  userId: string;
  userData: IUserProfile;
}

export interface IUserProfile {
  name?: string;
  phoneNumber?: string;
  address?: string;
  vehicleInfo?: IVehicleInfo
  licenseNumber?: string
}

export interface IRiderUpdateStatus {
  isActive: string;
  userId: string
}

export interface IUpdateDriverStatus {
  driverId: string;
  driverStatus: string;
}
