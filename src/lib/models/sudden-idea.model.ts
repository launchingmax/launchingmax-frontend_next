import { RequestStatus } from "../constants/request.enum";

export interface ISuddenIdea {
  ideaDesc: string;

  fullName: string;

  mobile: string;

  status: RequestStatus;

  email: string;
}
