import { type Status } from "@prisma/client";
import { type StatsInput } from "./stats-input";
import { type VerificationInput } from "./verification-input";

export interface DecisionInput {
    programId: number;
    status: Status;
    collegeId: number;
    statsInput: StatsInput,
    verificationInput: VerificationInput
  }