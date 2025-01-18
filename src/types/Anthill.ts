import { Cell } from "./Cells/Cell"

export type Anthill = {
    id: string
    grid: (Cell | null)[][][]
}