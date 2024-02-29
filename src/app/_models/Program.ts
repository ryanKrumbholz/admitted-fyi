import { type College } from "./College";

export interface Program {
    id: number;
    collegeId: number;
    name: string;
    degreeType: string;
    department: string | null;
    college: College
  }