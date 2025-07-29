import { createContext, useContext, useState } from "react";
import { ParentProps } from "../types/ParentProps";

const FocusContext = createContext<{ target: number, setTarget: React.Dispatch<React.SetStateAction<number>> | undefined}>({
    target: -1,
    setTarget: undefined,
})

export const FocusProvider = ({ children } : ParentProps) =>{
    const [target, setTarget] = useState(-1)

    return (
        <FocusContext.Provider value={{ target, setTarget }}>
            { children }
        </FocusContext.Provider>
    )
}

export const useFocus = () =>{
    const { target, setTarget } = useContext(FocusContext)

    if(typeof setTarget === "undefined")
        throw new Error('Element is outside Focus Provider')

    return { target, setTarget }
}