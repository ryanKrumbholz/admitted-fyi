
import { type Program_degreeType, type Stats_residency } from "@prisma/client"
import { type User } from "./User"

export interface Stats {
    id?: string
    gpa: number | null
    residency?: Stats_residency | null
    degreeType?: Program_degreeType | null
    userId?: string
    user?: User
}