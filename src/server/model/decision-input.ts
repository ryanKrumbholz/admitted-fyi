import { type Status, type Term } from "@prisma/client";
import { type StatsInput } from "./stats-input";
import { type VerificationInput } from "./verification-input";
import { type NewProgramInput } from "./new-program-input";

export interface DecisionInput {
    programId: number;
    status: Status;
    collegeId: number;
    statsInput: StatsInput;
    newProgramInput?: NewProgramInput;
    verificationInput: VerificationInput;
    date: Date;
    term: Term;
  }