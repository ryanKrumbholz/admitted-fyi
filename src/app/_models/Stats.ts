
import { DegreeType } from "@prisma/client"
import { type User } from "./User"

export interface Stats {
    id: string
    gpa: number | null
    greVerbal: number | null
    greWritten: number | null
    degreeType: DegreeType | null
    userId?: string
    user?: User
}