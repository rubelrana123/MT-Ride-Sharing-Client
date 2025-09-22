import { type Dispatch, type SetStateAction } from "react";
import type { ComponentType } from 'react';
 

export type {  ILogin }  from  "./auth.type";
export type {
  IDriver,
  IRider,
  IRiderUpdateStatus,
  IUpdateDriverStatus,
  IUpdateProfile,
  IUser,
  IUserProfile,
} from "./user.type";

export type {
  IRidesParams,
   
} from "./ride.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export   interface ISliderItem {
 
  title: string
  items: { 
    title: string
    url: string
    Component: ComponentType;
  }[]
}
export type TRole = 'ADMIN' | 'SUPER_ADMIN' | "DRIVER" | "RIDER";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};
export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export interface PaginationPageProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const rideStatusColorMap: Record<string, string> = {
  requested:
    "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
  accepted: "text-sky-800 bg-sky-100 dark:text-sky-300 dark:bg-sky-900/50",
  picked_up: "text-blue-800 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50",
  in_transit:
    "text-indigo-800 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50",
  completed:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  cancelled: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
  rejected: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
};
export const role = {
  admin: "ADMIN",
  rider: "RIDER",
  driver: "DRIVER", 
  superadmin: "SUPER_ADMIN",
};