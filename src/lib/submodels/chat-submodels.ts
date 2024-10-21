export interface IPushDevices {
  device: string;

  notify: boolean;
}

export interface ISettings {
  user: any; //Types.ObjectId;

  notification: IPushDevices[];

  lastSeen?: Date;

  isCreator?: boolean;

  unreadCount: number;
}

export interface IReadMessage {
  user: any; //Types.ObjectId;

  when: Date;
}
