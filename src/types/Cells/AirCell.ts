import { Position } from "../Position";
import { Cell } from "./Cell";

export class AirCell extends Cell {
    constructor(
        position: Position,
        passable: boolean,
        public passableForAnt: boolean,
        public exploringPheromon: number,
        public returningPheromon: number
    ) {
        super(position, passable);
    }

    getPassable(): boolean {
        return this.passable;
    }
}
