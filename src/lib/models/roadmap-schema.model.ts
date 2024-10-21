import { RoadmapStep } from "../constants/roadmap.enum";

export interface IRoadmapSchema {
  order: number; // order of the roadmap.

  step: RoadmapStep; // the step name of the roadmap

  subtitle?: string;

  desc?: string;

  image?: string;

  data?: any; // this defines the data schema of a roadmap step
}
