import { Status } from "../constants/general.status";
import { IdeaStatus } from "../constants/idea.enum";
import { IAssignee } from "../submodels/assignee";
import { ITeam } from "../submodels/Team";
import {
  IBrainStorming,
  IBusinessModel,
  IBusinessPlan,
  ICV,
  ICompletion,
  IIntroVideo,
  IPCT,
  IPitchDeck,
  IReview,
  IVisualBranding,
  IWebsite,
} from "./all-roadmaps";

interface BaseIdea {
  brainStorming: IBrainStorming;

  visualBranding: IVisualBranding;

  website: IWebsite;

  ip: IPCT;

  pitchDeck: IPitchDeck;

  introVideo: IIntroVideo;

  cv: ICV;

  businessModel: IBusinessModel;

  businessPlan: IBusinessPlan;

  completion: ICompletion;

  review: IReview;
}

export interface IIdea extends BaseIdea {
  userData: BaseIdea; // All user data relating to the idea is here.

  owner: any; //IUser;//Types.ObjectId;

  cooperator?: any; //Types.ObjectId;

  startup?: any; //Types.ObjectId;

  business?: any; //Types.ObjectId;

  assignees: IAssignee[];

  team: ITeam[];

  startedAt: Date;

  status: IdeaStatus;

  progress: number;

  roadmaps: any; //Types.ObjectId[]; // list of roadmap of this idea

  requests?: ITeam[];

  invites?: string[]; // this is a helper field. It won't be saved in db.

  showToApplicant: boolean;

  isTop: boolean;

  header?: string;

  rejectedReason?: string;
}
