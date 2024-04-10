import { type Program_degreeType } from "@prisma/client";

export interface NewProgramInput {
    name: string,
    degreeType: Program_degreeType,
    department?: string,
    url: string
}