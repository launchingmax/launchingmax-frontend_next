import { Requester } from "../constants/idea.enum";
import { RequestStatus } from "../constants/request.enum";
import { StartupStatus } from "../constants/startup.enum";
import { IAssignee } from "../submodels/assignee";
import { ITeam } from "../submodels/Team";
import { IBrainStorming, IVisualBranding } from "./all-roadmaps";
import { IIdea } from "./idea.model";

export interface IPlacement {
  country: String;

  city?: String;

  flag?: String;
}

export interface SupporterRequest {
  supporter: string;

  status: RequestStatus;

  requestedAt?: Date;

  acceptedAt: Date;

  requester?: Requester;
}

export interface BaseIdea {
  brainStorming: IBrainStorming;

  visualBranding: IVisualBranding;
}

export interface IStartup extends BaseIdea {
  _id?: string;

  idea: IIdea;

  owner: any; //string;

  business: string;

  team: ITeam[];

  desc: string;

  shortDesc: string;

  isTop: boolean;

  header: string;

  invFee: string;

  minValuation: string;

  maxValuation: string;

  placement: IPlacement[];

  group: string[];

  tags: string[];

  industries: string[];

  investorsType: string[];

  supporters: SupporterRequest[];

  investors: ITeam[];

  status: StartupStatus;

  suggestedInvestors: any; //Types.ObjectId[];

  suggestedSc: any; //Types.ObjectId[];

  assignees?: IAssignee[];

  minStartupValue?: number;
  maxStartupValue?: number;
  investmentFee?: number;
}
