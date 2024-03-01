import { v4 as uuidv4 } from 'uuid';

export const genHeadlessUserId = () => {
    const uuid: string = uuidv4();
    return `HDLS-${uuid.substring(0, uuid.length - 5)}`
}