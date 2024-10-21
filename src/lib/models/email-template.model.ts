export interface IEmailTemplate {
  from: string;

  replyTo: string;

  subject: string;

  template: string;

  department?: string;

  body: string;
}
