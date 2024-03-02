import { type DegreeType } from "~/app/_models/DegreeType";
import { type Residency } from "~/app/_models/Residency";


export interface StatsInput {
    gpa?: number;
    residency?: Residency;
    degreeType?: DegreeType;
}