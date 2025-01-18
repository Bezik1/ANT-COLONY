import { Position } from "../Position";
import { Cell } from "./Cell";

export class WallCell extends Cell {
    constructor(position: Position) {
        super(position, false);
    }

    getPassable(): boolean {
        return false;
    }
}