import { createContext, useContext, useState } from "react";
import { ParentProps } from "../types/ParentProps";
import { Ant } from "../types/Ant";
import { Cell } from "../types/Cells/Cell";

const SimulationContext = createContext<{ ants: Ant[], setAnts: React.Dispatch<React.SetStateAction<Ant[]>> | undefined, grid: (Cell | null)[][][], setGrid: React.Dispatch<React.SetStateAction<(Cell | null)[][][]>> | undefined, }>({
    ants: [],
    setAnts: undefined,
    grid: [],
    setGrid: undefined,
})

export const SimulationProvider = ({ children } : ParentProps) =>{
    const [ants, setAnts] = useState<Ant[]>([])
    const [grid, setGrid] = useState<(Cell | null)[][][]>([])

    return (
        <SimulationContext.Provider value={{ ants, setAnts, grid, setGrid }}>
            { children }
        </SimulationContext.Provider>
    )
}

export const useSimulation = () =>{
    const { ants, setAnts, grid, setGrid } = useContext(SimulationContext)

    if(typeof setAnts === "undefined" || typeof setGrid === 'undefined')
        throw new Error('Element is outside Anthill Provider')

    return { ants, setAnts, grid, setGrid, }
}