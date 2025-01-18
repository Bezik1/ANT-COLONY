import { Position } from "./Position";

export type Ant = {
    id: string;
    expirationTime: number;
    position: Position;
    lastPosition: Position;
    anthillId: string;
    hasFood: boolean
}