import { type DegreeType } from "@prisma/client";

export interface NewProgramInput {
    name: string,
    degreeType: DegreeType,
    department?: string,
    url: string
}