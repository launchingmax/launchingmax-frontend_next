import { ChatType, TicketStatus } from "../constants/chat.enum";
import { ISettings } from "../submodels/chat-submodels";

export interface IChat {
  type: ChatType;

  subject: string;

  people?: any; // Types.ObjectId[];

  // messages: Types.ObjectId[];

  status: TicketStatus;

  department?: string;

  code?: number;

  assigned: boolean;

  settings?: ISettings[];
}
