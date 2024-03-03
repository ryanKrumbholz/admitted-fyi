
import { DegreeType, Residency } from "@prisma/client"
import { type User } from "./User"

export interface Stats {
    id?: string
    gpa: number | null
    residency?: Residency | null
    degreeType?: DegreeType | null
    userId?: string
    user?: User
}