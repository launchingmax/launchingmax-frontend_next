import { Requester } from "../constants/idea.enum";
import { RequestStatus } from "../constants/request.enum";
import { IUser } from "../models/user.model";

export interface ITeam {
  _id?: string;

  user: IUser | any; //Types.ObjectId;

  status: RequestStatus;

  requester?: Requester;

  joinedAt?: Date;

  requestedAt?: Date;

  acceptedAt?: Date;
}
