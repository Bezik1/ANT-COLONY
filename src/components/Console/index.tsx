import { Suspense, useEffect, useState } from "react"
import Area3D from "../Area3D"
import { CameraBtn } from "../UI/Icons/CameraBtn"
import "./index.css"
import { useSimulation } from "../../contexts/AnthillSimulationContext"
import { useAnthill } from "../../contexts/AnthillContext"
import { Ant } from "../../types/Ant"
import { useFocus } from "../../contexts/FocusContext"
import { ResetBtn } from "../UI/Icons/ResetBtn"
import { ChartBtn } from "../UI/Icons/ChartBtn"
import ChartPanels from "../ChartPanel"
import { AnthillsBtn } from "../UI/Icons/AnthillsBtn"
import AnthillsContainer from "../AnthillsContainer"

const Console = () =>{
    const [showAnthills, setShowAnthills] = useState(false)
    const [showCharts, setShowCharts] = useState(false)
    const [showCameras, setShowCameras] = useState(false)
    const [currentAnts, setCurrentAnts] = useState<Ant[]>([])

    const { ants } = useAnthill()
    const { setTarget } = useFocus()
    const { ants: simulatedAnts } = useSimulation()

    useEffect(() =>{
        setCurrentAnts(simulatedAnts)
    }, [simulatedAnts])

    useEffect(() =>{
        setCurrentAnts(ants)
    }, [ants])

    useEffect(() =>{
        console.log(currentAnts)
    }, [currentAnts])

    return (
        <Suspense>
            <div className='console-container'>
                <div className="camera-btns">
                            <CameraBtn onClick={() => setShowCameras(!showCameras)}/>
                            <ResetBtn onClick={() => setTarget(-1)}/>
                </div>
                <div className={`camera-container ${showCameras && "camera-container-expanded"}`}>
                {showCameras && <div className="cameras">
                    {currentAnts.map((_, index) =>(
                        <div className="cameras-canvas-container" onClick={() => {setTarget(index); setShowCameras(false)}}>
                            <h1 className="camera-ant-header">Ant {index}</h1>
                            <Area3D cameraTarget={index} className="canvas-camera" width={250*4/currentAnts.length} height={250*4/currentAnts.length} />
                        </div>
                    ))}
                </div>}
                </div>
                {(!showCameras && !showCharts && !showAnthills) && <Area3D />}
                {showCharts && (
                    <div className="charts-container">
                        <ChartPanels />
                    </div>
                )}
                {showAnthills && (
                    <div className="anthills-show-container">
                        <AnthillsContainer setShow={setShowAnthills} />
                    </div>
                )}
                <div className="chart-panel">
                    <ChartBtn onClick={() => setShowCharts(!showCharts)} />
                    <AnthillsBtn onClick={() => setShowAnthills(!showAnthills)} />
                </div>
            </div>
        </Suspense>
    )
}

export default Console