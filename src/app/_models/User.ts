import { type Stats } from "./Stats";

export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    resident?: boolean;
  }