import { randomUUID } from "crypto"

export const genHeadlessUserId = () => {
    const uuid = randomUUID();
    return `HDLS-${uuid.substring(0, uuid.length - 5)}`
}