import { Status } from "../constants/general.status";

export interface ISupportiveCenter {
  _id: string;

  name: string;

  group: string[];

  city: string;

  country: string;

  strategy: string[];

  industries: string[];

  about: string;

  website: string;

  tel: string[];

  email: string[];

  roadmap: string;

  isTop: boolean;

  isAvailable: boolean;

  status: Status;

  detail: string;

  address: string;

  createdAt: string;

  updatedAt: string;

  __v: number;

  logo: string;

  programFee: string;
}
