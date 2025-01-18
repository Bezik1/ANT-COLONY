import { AirCell } from "../types/Cells/AirCell";
import { Cell } from "../types/Cells/Cell";
import { ColonyCell } from "../types/Cells/ColonyCell";
import { FoodCell } from "../types/Cells/FoodCell";
import { Position } from "../types/Position";

type CellData = {
    position: { x: number, y: number, z: number };
    passable: boolean;
    passableForAnt?: boolean;
    exploringPheromon?: number;
    returningPheromon?: number;
    foodAmount?: number;
    antAmount?: number;
};

export const createCellInstance = (cellData: CellData | null): Cell | null => {
    if(cellData == null) return null;
    const { position, passable, passableForAnt, exploringPheromon, returningPheromon, foodAmount, antAmount } = cellData;
    const pos = new Position(position.x, position.y, position.z);

    if (antAmount !== undefined) {
        return new ColonyCell(pos, passable, passableForAnt!, exploringPheromon!, returningPheromon!, foodAmount!, antAmount);
    } else if (foodAmount !== undefined) {
        return new FoodCell(pos, passable, passableForAnt!, exploringPheromon!, returningPheromon!, foodAmount);
    } else {
        return new AirCell(pos, passable, passableForAnt!, exploringPheromon!, returningPheromon!);
    }
};