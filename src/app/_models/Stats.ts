import { type DegreeType } from "./DegreeType"
import { type User } from "./User"

export interface Stats {
    id: string
    gpa: number
    greVerbal: number
    greWritten: number
    degreeType: DegreeType
    userId: string
    user: User
}