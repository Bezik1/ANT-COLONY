import axios from "axios";
import { Cell } from "../types/Cells/Cell";
import { createCellInstance } from "./createCellIInstance";

export const getAnthill = async (id: string): Promise<(Cell | null)[][][]> => {
    try {
        const res = await axios.get<(Cell | null)[][][]>(`http://localhost:8080/colony/${id}/grid`);

        if (res.status !== 200 || !res.data) {
            throw new Error(`Operation Failed: ${res.statusText}`);
        }

        const grid = res.data.map(row =>
            row.map(column =>
                    column.map(cellData =>
                    createCellInstance(cellData)
                )
            )
        );

        if(!grid) throw new Error('Data is undefined');

        return grid;
    } catch (err) {
        throw new Error(`Operation Failed: ${err}`)
    }
};