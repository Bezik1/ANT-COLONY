import { Position } from "../Position";
import { AirCell } from "./AirCell";

export class ColonyCell extends AirCell {
    constructor(
        position: Position,
        passable: boolean,
        passableForAnt: boolean,
        exploringPheromon: number,
        returningPheromon: number,
        public foodAmount: number,
        public antAmount: number
    ) {
        super(position, passable, passableForAnt, exploringPheromon, returningPheromon);
    }

    getPassable(): boolean {
        return this.passable;
    }
}