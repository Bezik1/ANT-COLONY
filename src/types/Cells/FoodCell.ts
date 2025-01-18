import { Position } from "../Position";
import { AirCell } from "./AirCell";

export class FoodCell extends AirCell {
    constructor(
        position: Position,
        passable: boolean,
        passableForAnt: boolean,
        exploringPheromon: number,
        returningPheromon: number,
        public foodAmount: number
    ) {
        super(position, passable, passableForAnt, exploringPheromon, returningPheromon);
    }

    getPassable(): boolean {
        return this.passable;
    }
}