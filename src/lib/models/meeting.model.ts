export enum MeetingStatus {
  Rejected = "rejected",
  Pending = "pending",
  Assigned = "assigned",
  Scheduled = "scheduled",
  Done = "done",
}
export interface IMeeting {
  fullName: string;
  email: string;
  mobile: string | undefined;
  desc: string | undefined;
  host: string;
  extraDesc: string | undefined;
  scheduled: Date;
  status: MeetingStatus;
}
