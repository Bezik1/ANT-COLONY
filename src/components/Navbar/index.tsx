import { useRef, useState } from "react"
import { ResumeBtn } from "../UI/Icons/ResumeBtn"
import "./index.css"
import axios from "axios"
import { getAnthill } from "../../utils/getAnthill"
import { ANTHILL_ID, BASE_COLONY_URL } from "../../const/Anthill"
import { getAnthillAnts } from "../../utils/getAnthillAnts"
import { useAnthill } from "../../contexts/AnthillContext"
import { useSimulation } from "../../contexts/AnthillSimulationContext"
import { PauseBtn } from "../UI/Icons/PauseBtn"
import { PheromonIcon } from "../UI/Icons/PheromonIcon"
import { useDevTools } from "../../contexts/DevToolsContext"
import { WallBtn } from "../UI/Icons/WallIBtn"
import { MoveCellBtn } from "../UI/Icons/MoveCellBtn"
import { HallwayBtn } from "../UI/Icons/HallwayBtn"
import { useAnthillId } from "../../contexts/AnthillIdContext"

const Navbar = () =>{
    const [pheromonMenuActive, setPheromonMenuActive] = useState(false)
    const [played, setPlayed] = useState(false)
    const intervalRef = useRef<number>();

    const {
        showWalls,
        showHallway,
        showPossibleMoveCells,
        showExploringPheromonLevel,
        showReturningPheromonLevel,
        setShowWalls,
        setShowHallway,
        setShowPossibleMoveCells,
        setShowExploringPheromonLevel,
        setShowReturningPheromonLevel,
    } = useDevTools()

    const { id } = useAnthillId()
    const { setGrid } = useAnthill();
    const { setAnts } = useSimulation();

    const simulateAnthill = async () => {
        try {
            const res = await axios.post(`${BASE_COLONY_URL}/${id}/simulate`, {
                steps: 1,
            });

            if (res.status === 200) {
                const grid = await getAnthill(id);
                const ants = await getAnthillAnts(id);

                setGrid(grid);
                setAnts(ants);
            }
        } catch (err) {
            console.error(`Simulation failed: ${err}`);
        }
    };

    const toggleSimulation = () => {
        if (played) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            setPlayed(false);
        } else {
            setPlayed(true);
            intervalRef.current = setInterval(simulateAnthill, 2750);
        }
    };

    const getPheromonColor = () =>{
        if(showExploringPheromonLevel) return "violet"
        else if(showReturningPheromonLevel) return "cyan"
        return "#de8181"
    }

    return (
        <nav className="navbar">
            <HallwayBtn className={showHallway && "btn-active"} onClick={() => setShowHallway(!showHallway)} />
            <PheromonIcon pheromonColor={getPheromonColor()} className={pheromonMenuActive && "btn-active"} onClick={() => setPheromonMenuActive(!pheromonMenuActive)}/>
            {pheromonMenuActive && <div className="pheromon-menu">
                <div
                    className={`pheromon-option ${showExploringPheromonLevel && "pheromon-option-active"}`}
                    onClick={() => { setShowExploringPheromonLevel(!showExploringPheromonLevel); setShowReturningPheromonLevel(false)}}
                    style={{ background: "violet" }}
                />
                <div
                    className={`pheromon-option ${showReturningPheromonLevel && "pheromon-option-active"}`}
                    onClick={() => {setShowReturningPheromonLevel(!showReturningPheromonLevel); setShowExploringPheromonLevel(false)}}
                    style={{ background: "cyan" }}
                />
            </div>}
            {played
                ? <PauseBtn className={!pheromonMenuActive && "btn-active"}  onClick={toggleSimulation} />
                : <ResumeBtn onClick={toggleSimulation}/>}
            <WallBtn className={showWalls && "btn-active"} onClick={() => setShowWalls(!showWalls)}/>
            <MoveCellBtn className={showPossibleMoveCells && "btn-active"} onClick={() => setShowPossibleMoveCells(!showPossibleMoveCells)}/>
        </nav>
    )
}

export default Navbar