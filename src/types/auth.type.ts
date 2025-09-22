import type { IUser } from "./user.type";

 
  
  export interface ILogin {
    email: string;
    password: string;
  }
  export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
