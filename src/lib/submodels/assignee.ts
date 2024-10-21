import { RoadmapStatus } from "../constants/roadmap.enum";
import { UserStatus } from "../constants/user.const";

export interface IAssignee {
  user: string;

  status: UserStatus;

  deadline: Date;

  doneAt: Date;
}

export interface IAssigneeRoadmap {
  user: string;

  status: RoadmapStatus;

  deadline: Date;

  doneAt: Date;
}
