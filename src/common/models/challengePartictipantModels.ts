import { UserResponse } from "./userModels";

export enum ChallengeParticipantStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  UNCOMPLETED = "UNCOMPLETED",
}

export type ChallengeParticipantResponse = {
  id: number;
  user: UserResponse;
  status: ChallengeParticipantStatus;
  currentGoalValue: number;
  progressPercentage: number;
  durationRange: {
    startedAt: string;
    finishedAt: string;
  };
  challenge: {
    id: number;
    title: string;
  };
};
