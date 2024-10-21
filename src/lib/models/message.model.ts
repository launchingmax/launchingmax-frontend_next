import { IReadMessage } from "../submodels/chat-submodels";

export interface IMessage {
  from: string;

  to: string;

  text: string;

  attachments?: string[];

  isDeleted: boolean;

  reads: IReadMessage[];

  reply: string; // The id of the message which this is a reply to it.

  flag: string;

  chat: string;
}
