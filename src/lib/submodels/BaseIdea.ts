import {
  IBrainStorming,
  IVisualBranding,
  IWebsite,
  IPCT,
  IPitchDeck,
  IIntroVideo,
  ICV,
  IBusinessModel,
  IBusinessPlan,
  ICompletion,
  IReview,
} from "../models/all-roadmaps";

export interface IBaseIdea {
  brainStorming: IBrainStorming;

  visualBranding: IVisualBranding;

  website: IWebsite;

  pct: IPCT;

  pitchDeck: IPitchDeck;

  introVideo: IIntroVideo;

  cv: ICV;

  businessModel: IBusinessModel;

  businessPlan: IBusinessPlan;

  completion: ICompletion;

  review: IReview;
}
