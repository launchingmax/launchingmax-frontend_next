import { Requester } from "../constants/idea.enum";
import { RequestStatus } from "../constants/request.enum";

export interface ITeam {
  _id?: string;

  user: any; //Types.ObjectId;

  status: RequestStatus;

  requester?: Requester;

  joinedAt?: Date;

  requestedAt?: Date;

  acceptedAt?: Date;
}
