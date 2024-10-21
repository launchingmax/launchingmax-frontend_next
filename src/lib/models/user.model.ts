import { IUserLevel } from "./user-level.model";
import { LoginType, UserStatus, UserType } from "../constants/user.const";

export interface IP {
  address: string;

  family: string;

  port: number;
}

export interface IAuth {
  ip?: IP;

  userAgent: string;

  date: Date;

  login: LoginType;

  clientID?: string;

  refreshToken?: string;

  accessToken?: string;
}

interface IType {
  type: string;

  level: string;

  status: UserStatus;
}

export interface IUser {
  _id?: string;

  username?: string;

  email?: string;

  firstName: string;

  lastName: string;

  isEmailVerified?: boolean;

  type?: UserType; // the current type of user

  status?: UserStatus;

  profile?: string; // profile object

  level?: IUserLevel;

  types?: IType[];

  createdAt: Date;

  updatedAt: Date;

  code?: number;
}

export interface IUserResponse {
  user: IUser;
  isAuthenticated: boolean;
}
