import { createContext, useContext, useState } from "react";
import { ParentProps } from "../types/ParentProps";

const DevToolsContext = createContext<{ showPossibleMoveCells: boolean, setShowPossibleMoveCells: React.Dispatch<React.SetStateAction<boolean>> | undefined, showReturningPheromonLevel: boolean, setShowReturningPheromonLevel: React.Dispatch<React.SetStateAction<boolean>> | undefined, showExploringPheromonLevel: boolean, setShowExploringPheromonLevel: React.Dispatch<React.SetStateAction<boolean>> | undefined, showWalls: boolean, setShowWalls: React.Dispatch<React.SetStateAction<boolean>> | undefined, showHallway: boolean, setShowHallway: React.Dispatch<React.SetStateAction<boolean>> | undefined, showAntCell: boolean, setShowAntCell: React.Dispatch<React.SetStateAction<boolean>> | undefined}>({
    showPossibleMoveCells: true,
    setShowPossibleMoveCells: undefined,
    showExploringPheromonLevel: false,
    setShowExploringPheromonLevel: undefined,
    showReturningPheromonLevel: false,
    setShowReturningPheromonLevel: undefined,
    showWalls: true,
    setShowWalls: undefined,
    showHallway: false,
    setShowHallway: undefined,
    showAntCell: false,
    setShowAntCell: undefined,
})

export const DevToolsProvider = ({ children } : ParentProps) =>{
    const [showPossibleMoveCells, setShowPossibleMoveCells] = useState(false)
    const [showReturningPheromonLevel, setShowReturningPheromonLevel] = useState(false)
    const [showExploringPheromonLevel, setShowExploringPheromonLevel] = useState(true)
    const [showWalls, setShowWalls] = useState(true)
    const [showHallway, setShowHallway] = useState(false);
    const [showAntCell, setShowAntCell] = useState(false)

    return (
        <DevToolsContext.Provider value={{showReturningPheromonLevel, setShowReturningPheromonLevel, setShowAntCell, showExploringPheromonLevel, setShowPossibleMoveCells, setShowWalls, setShowHallway, showAntCell, showPossibleMoveCells, setShowExploringPheromonLevel, showWalls, showHallway}}>
            { children }
        </DevToolsContext.Provider>
    )
}

export const useDevTools = () =>{
    const { setShowPossibleMoveCells, setShowExploringPheromonLevel, setShowReturningPheromonLevel, showExploringPheromonLevel, showReturningPheromonLevel, setShowHallway, setShowAntCell, showAntCell, showHallway, showPossibleMoveCells, setShowWalls, showWalls } = useContext(DevToolsContext)

    if(typeof setShowPossibleMoveCells === "undefined" || typeof setShowReturningPheromonLevel === "undefined" || typeof setShowExploringPheromonLevel === "undefined" || typeof setShowAntCell === "undefined" || typeof setShowHallway === 'undefined' || typeof setShowWalls === 'undefined')
        throw new Error('Element is outside Dev Tools Provider')

    return { setShowExploringPheromonLevel, setShowReturningPheromonLevel, showExploringPheromonLevel, showReturningPheromonLevel, setShowPossibleMoveCells, setShowWalls, setShowHallway, setShowAntCell, showAntCell, showPossibleMoveCells, showWalls, showHallway, }
}