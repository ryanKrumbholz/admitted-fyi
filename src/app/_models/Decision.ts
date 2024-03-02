
import { type Program } from "./Program";
import { type Stats } from "./Stats";
import { type Status } from "./Status";

import { type User } from "./User";
import { type Verification } from "./Verification";

export interface Decision {
  id: string;
  userId: string | null;
  statsId: string;
  programId: number;
  status:`${Status}`;
  date: Date;
  verificationId: string;
  user?: User;
  program: Program;
  stats: Stats
  verification: Verification;
  termYearString: string;
}