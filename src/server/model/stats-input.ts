import { type DegreeType } from "~/app/_models/DegreeType";

export interface StatsInput {
    gpa?: number;
    greVerbal?: number;
    greWritten?: number;
    degreeType?: DegreeType;
}