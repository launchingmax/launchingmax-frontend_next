import { RequestStatus } from "../constants/request.enum";

export interface IRequest {
  requester: any; //Types.ObjectId;

  requestee?: any; //Types.ObjectId;

  date: Date;

  type: string;

  status: RequestStatus;

  idea?: any; //Types.ObjectId;

  startup?: any; //Types.ObjectId;

  business?: any; //Types.ObjectId;
}
