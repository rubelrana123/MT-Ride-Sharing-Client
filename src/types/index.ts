import { type Dispatch, type SetStateAction } from "react";
import type { ComponentType } from 'react';
 

export type { ISendOtp, IVerifyOtp, ILogin }  from  "./auth.type";
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
export type TRole = 'ADMIN' | 'Super_ADMIN' | "DRIVER" | "RIDER";

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