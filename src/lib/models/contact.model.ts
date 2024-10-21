import { ContactType } from "../constants/contact.enum";

export interface IContact {
  firstName: string;

  lastName: string;

  mobile: string;

  email: string;

  message: string;

  package: string;

  type: ContactType;
}
