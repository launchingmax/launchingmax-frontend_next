//import { ObjectCannedACL } from "@aws-sdk/client-s3";
import { AjvPropertyType } from "../constants/endpoint.enum";
import { UserType } from "../constants/user.const";

export interface IKeyValue {
  field: string[];
  [key: string]: string | string[];
}

export interface IAjvPropertySchema {
  type: AjvPropertyType;

  minLength?: number;

  maxLength?: number;

  format?: string;

  pattern?: string;

  enum?: Array<any>;

  const?: any;
}

export interface IAjvProperty {
  [key: string]: IAjvPropertySchema;

  sample: IAjvPropertySchema;
}

export interface IAjvSchemaBase {
  properties: IAjvProperty;

  required?: string[];

  additionalProperties?: boolean;

  optionalProperties?: IAjvProperty;
}

export interface AjvSchema extends IAjvSchemaBase {
  type: string;

  anyOf?: IAjvSchemaBase[];
}

//export type CustomQueryOption = MyOptions & QueryOptions;

interface Options {
  projection?: string;

  page?: string;

  itemsCount?: number;

  sort?: string;

  populate?: [];
}

export interface Uploads {
  field: string;

  bucket?: string;

  directory: string;

  acl: any; //ObjectCannedACL;

  rename?: boolean;
}

export interface ChannelSchema {
  options?: Options;

  schemas?: AjvSchema;

  errorMessage?: string;

  errorTitle?: string;

  default?: any;

  deniedKeys?: string[];

  deniedKeysValue?: IKeyValue;

  uploads?: Uploads[];

  useDefaultSchema: boolean;
}

export interface QuerySchema extends ChannelSchema {
  merge?: boolean;

  isPrior?: boolean;
}

export interface BodySchema extends ChannelSchema {}

export interface RateLimit {
  ttl: number;
  max: number;
}

export interface EndpointSchema {
  query?: QuerySchema;

  body?: ChannelSchema;

  response?: ChannelSchema;

  shouldCheckAction?: boolean;

  baseAction?: string;

  canVisitorVisit?: boolean;

  allowedUsers?: UserType[];

  rateLimit?: RateLimit;
}

export interface Endpoint {
  v1_auth_get?: string | number | null;
}

export interface IMenu {
  title: string;
  default?: boolean;
  icon?: string;
  link?: string;
  subMenus?: IMenu[];
}

export interface IAccess {
  endpoints?: Endpoint; // query,

  menus?: IMenu[];
}

export interface IUserLevel {
  _id: string;

  actions: string[]; // list of action that a user can perform such as deleting a ticket.

  access: IAccess;
}
