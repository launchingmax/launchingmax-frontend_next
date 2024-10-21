import { UserType } from "../constants/user.const";

export enum PublishStatus {
  Publish = "publish",
  Draft = "draft",
  Archived = "archived",
}

export interface IAcademy {
  title: string;

  desc: string;

  photoLink?: string;

  source: string;

  duration: number;

  level: string;

  price: string;

  target: UserType;

  status: PublishStatus;
}
