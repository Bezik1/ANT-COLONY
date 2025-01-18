import { Position } from "../Position";

export abstract class Cell {
    constructor(public position: Position, public passable: boolean) {}

    abstract getPassable(): boolean;
}