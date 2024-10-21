import { Status } from "../constants/general.status";

export interface IMusic {
  name: string;

  category: string;

  link: string;

  cover: string;

  singer: string;

  status: Status;
}
