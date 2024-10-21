import { RoadmapStatus, RoadmapStep } from "../constants/roadmap.enum";
import { IAssigneeRoadmap } from "../submodels/assignee";

export interface IRoadmap {
  schemas: RoadmapStep;

  idea: string;

  assignees?: IAssigneeRoadmap[];

  report?: string;

  showToApplicant?: boolean;

  order?: number;

  deadline?: Date;

  startedAt?: Date;
  data?: any;

  status?: RoadmapStatus;
}
