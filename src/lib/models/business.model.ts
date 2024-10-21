import { SupporterRequest } from "./startup.model";
import { IBrainStorming, IVisualBranding } from "./all-roadmaps";
import { ITeam } from "../submodels/Team";

export enum BusinessStatus {
  Failed = "failed",
  Active = "active",
}

export interface IBaseIdea {
  brainStorming: IBrainStorming;

  visualBranding: IVisualBranding;
}

export interface IBusiness extends IBaseIdea {
  startup: string;

  idea: string;

  supporters: SupporterRequest[];

  investors: ITeam[];

  status: BusinessStatus;
}
