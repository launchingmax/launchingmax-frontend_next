import { IUserLevel } from "./user-level.model";
import { LoginType, UserStatus, UserType } from "../constants/user.const";
import { IProfile } from "./profile.model";

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

  code?: number;

  refCode?: number;

  username?: string;

  email?: string;

  googleId?: string;

  facebookId?: string;

  linkedinId?: string;

  firstName: string;

  lastName: string;

  avatar?: string;

  isEmailVerified?: boolean;

  password?: string;

  salt?: string;

  type?: UserType; // the current type of user

  types?: IType[];

  status?: UserStatus;

  position?: string;

  profile?: IProfile; // profile object

  level?: IUserLevel;

  auths?: IAuth[];

  activationToken?: string;

  resetToken?: string;

  showInOurTeam?: boolean;

  slug?: string;

  orderInOurTeam?: number;

  createdAt?: Date;

  updatedAt?: Date;
  __v?: number;
}

export interface IUserResponse {
  user: IUser;
  isAuthenticated: boolean;
}
