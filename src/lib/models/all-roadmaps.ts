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

export interface IWebsite extends DynamicObj {}

export interface IPCT extends DynamicObj {}

export interface IPitchDeck extends DynamicObj {}

export interface IIntroVideo extends DynamicObj {}

export interface ICV extends DynamicObj {}

export interface IBusinessModel extends DynamicObj {}

export interface IBusinessPlan extends DynamicObj {}

export interface ICompletion extends DynamicObj {}

export interface IReview extends DynamicObj {}
