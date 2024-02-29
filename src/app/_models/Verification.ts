export interface Verification {
    id: string;
    verified: boolean;
    imgUrl: string;
    userId?: string | null;
    programId?: number;
    // Decision relation omitted for brevity
  }