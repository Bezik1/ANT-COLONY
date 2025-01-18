import { createContext, useContext, useState } from "react";
import { ANTHILL_ID } from "../const/Anthill";
import { ParentProps } from "../types/ParentProps";

const AnthillIdContext = createContext<{ id: string, setId: React.Dispatch<React.SetStateAction<string>> | undefined }>({
    id: ANTHILL_ID,
    setId: undefined,
})

export const AnthillIdProvider = ({ children } : ParentProps) =>{
    const [id, setId] = useState(ANTHILL_ID)

    return (
        <AnthillIdContext.Provider value={{ id, setId }}>
            { children }
        </AnthillIdContext.Provider>
    )
}

export const useAnthillId = () =>{
    const { id, setId } = useContext(AnthillIdContext)

    if(typeof setId === "undefined") throw new Error("Element is outside the AnthillId Provider")
    return { id, setId }
}