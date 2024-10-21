import Theme from "../submodels/Theme";
import { IContact } from "./contact.model";

interface ILanguage {
  lang: string;

  level: string;
}

export interface IProfile {
  user: any; //Types.ObjectId;

  firstName: string;

  lastName?: string;

  email: string;

  position?: string;

  phoneCode?: string;

  phoneNumber?: string;

  gender?: string;

  birthDate?: Date;

  country?: string;

  avatar?: string;

  city?: string;

  postalCode?: string;

  lastJob?: string;

  image?: string;

  licenses?: IContact[];

  theme: Theme;

  abrExp?: string[]; // list of countries where an investor invested yet.

  invExp?: boolean; // has this investor any investment experience.

  invExpDesc?: string; // investment description

  invTerm?: string[]; // investment term can bee short-term, long-term, mid-term ...

  invRange?: string[]; // investment range specifies the min and max amount for investment.

  invCurrency?: string;

  bio?: string;

  passport?: string;

  eduField?: string;

  eduDegree?: string;

  maritalStatus?: string;

  languages?: ILanguage[];

  motherTongue?: string;

  resumeLink?: string;

  socials: IContact[];

  jobDesc?: string; // Cooperator job skills

  business?: string; // organization company name.

  businessDesc?: string; // summary about the company

  businessEmail?: string;

  slug: string;

  showInOurTeam: boolean;

  locale: string;

  profile: any; //Types.ObjectId;
}
