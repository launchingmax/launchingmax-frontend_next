interface DynamicObj {
  [key: string]: unknown;
}

export interface IBrainStorming extends DynamicObj {
  title?: string;

  desc?: string;
}

export interface IVisualBranding extends DynamicObj {
  logo?: string;
}

export interface IWebsite extends DynamicObj {
  website?: string;
}

export interface IPCT extends DynamicObj {}

export interface IPitchDeck extends DynamicObj {
  summery?: string;
  pitchDeck?: string;
}

export interface IIntroVideo extends DynamicObj {}

export interface ICV extends DynamicObj {}

export interface IBusinessModel extends DynamicObj {}

export interface IBusinessPlan extends DynamicObj {
  investmentFee?: number;
  minStartupValue?: number;
  maxStartupValue?: number;
  industry?: string;
  tags?: string;
  country?: string;
  market?: string;
  businessPlan?: string;
}

export interface ICompletion extends DynamicObj {}

export interface IReview extends DynamicObj {}
