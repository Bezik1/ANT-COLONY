import axios from "axios";
import { Cell } from "../types/Cells/Cell";
import { createCellInstance } from "./createCellIInstance";
import { BASE_API_URL } from "../const/Anthill";

export const getAnthill = async (id: string): Promise<(Cell | null)[][][]> => {
    try {
        const res = await axios.get<(Cell | null)[][][]>(`${BASE_API_URL}/colony/${id}/grid`);

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