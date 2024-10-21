import { PublishStatus } from "./academy.model";

export interface IEvent {
  title: string;

  desc: string;

  photoLink: string;

  source: string;

  startDate: Date;

  enrollDate: Date;

  duration: number;

  period: string;

  status: PublishStatus;

  isDeleted: boolean;
}
