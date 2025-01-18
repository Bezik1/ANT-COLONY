import { useEffect, useState } from "react"
import "./index.css"
import { Anthill } from "../../types/Anthill"
import axios from "axios"
import { BASE_COLONY_URL, GET_ANTHILLS_URL } from "../../const/Anthill"
import { useAnthillId } from "../../contexts/AnthillIdContext"
import { Ant } from "../../types/Ant"
import { CloseBtn } from "../UI/Icons/CloseBtn"

const AnthillsContainer = ({ setShow } : { setShow: React.Dispatch<React.SetStateAction<boolean>> }) =>{
    const { setId } = useAnthillId()
    const [anthills, setAnthills] = useState<Anthill[]>([])
    const [expanded, setExpanded] = useState(-1)
    const [currentAntsCount, setCurrentAntsCount] = useState(-1)

    const getAnthills = async () =>{
        try {
            const res = await axios.get<Anthill[]>(GET_ANTHILLS_URL)

            if(res.status === 200) {
                setAnthills(res.data)
                console.log(res.data)
            } else {
                console.log(`Failed with status: ${res.statusText}`)
            }
        } catch(err) {
            console.log(`Connection error: ${err}`)
        }
    }

    useEffect(() =>{
        getAnthills()
    }, [])

    const handleConnect = (anthill: Anthill) =>{
        setShow(false)
        setId(anthill.id)
    }

    const handleCreate = async () =>{
        try {
            const res = await axios.post(BASE_COLONY_URL)

            if(res.status !== 200) throw new Error(`Anthill Creation Error: ${res.statusText}`)

            await getAnthills()
        } catch(err) {
            console.log(`Axios Connection Error: ${err}`)
        }
    }

    const addAnt = async (anthill: Anthill) =>{
        try {
            const res = await axios.post<Ant[]>(`${BASE_COLONY_URL}/${anthill.id}/addAnt`)

            if(res.status !== 200) throw new Error(`Anthill Creation Error: ${res.statusText}`)

            getAntsCount(anthill)
        } catch(err) {
            console.log(`Axios Connection Error: ${err}`)
        }
    }

    const getAntsCount = async (anthill: Anthill) =>{
        try {
            const res = await axios.get<Ant[]>(`${BASE_COLONY_URL}/${anthill.id}/getAnts`)

            if(res.status !== 200) throw new Error(`Anthill Creation Error: ${res.statusText}`)

            setCurrentAntsCount(res.data.length)
        } catch(err) {
            console.log(`Axios Connection Error: ${err}`)
        }
    }

    const removeAnthill  = async (anthill: Anthill) =>{
        try {
            const res = await axios.delete<Ant[]>(`${BASE_COLONY_URL}/${anthill.id}/removeAnthill`)

            if(res.status !== 200) throw new Error(`Anthill Creation Error: ${res.statusText}`)

            setExpanded(-1)
            getAnthills()
        } catch(err) {
            console.log(`Axios Connection Error: ${err}`)
        }
    }

    useEffect(() =>{
        getAntsCount(anthills[expanded])
    }, [expanded])

    return (
        <div className="anthills-container">
            {anthills.map((anthill, i) =>(
                <div
                    className={`anthill-showed ${(expanded !== -1 && expanded === i) && "anthill-expanded"}`}
                    onClick={expanded === i ? () =>{} : () => setExpanded(i)}
                >
                    <header>Anthill: {i}</header>
                    <div className="property">ID: {anthill.id}</div>
                    {(expanded !== -1 && expanded === i) && (
                        <div className="anthill-show-ants">
                            <div className="ant-count">Ant Count: {currentAntsCount}</div>
                            <div className="ant-btns">
                                <div className="anthill-btn" onClick={() => addAnt(anthill)}>Add Ant</div>
                                <div className="anthill-btn connect-btn" onClick={() => handleConnect(anthill)}>Connect to 3D View</div>
                                <div className="anthill-btn remove-btn" onClick={() => removeAnthill(anthill)}>Remove Anthill </div>
                            </div>
                            <CloseBtn onClick={() => setExpanded(-1)} className="anthill-showed-closed-btn"/>
                        </div>
                    )}
                </div>
            ))}
            <div className="anthill-showed" onClick={handleCreate}>
                <header>Create Anthill</header>
            </div>
        </div>
    )
}

export default AnthillsContainer