import { Status } from "../constants/general.status";

export interface ISupportiveCenter {
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

  detail: string;

  address: string;

  isTop: boolean;

  logo: string;

  programFee: string;

  isAvailable: boolean;

  status: Status;
}
