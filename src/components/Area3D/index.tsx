import { Canvas } from "@react-three/fiber"
import "./index.css"
import { generateAnthill } from "../../utils/generateAnthill"
import { OrbitControls } from "@react-three/drei"
import { Color, Vector3 } from "three"
import Ant3D from "../Ant3D"
import { useAnthill } from "../../contexts/AnthillContext"
import { useEffect, useState } from "react"
import { ANTHILL_ID } from "../../const/Anthill"
import { getAnthill } from "../../utils/getAnthill"
import { getAnthillAnts } from "../../utils/getAnthillAnts"
import { Position } from "../../types/Position"
import { getColonyCoordinates } from "../../utils/getColonyCoordinates"
import { useSimulation } from "../../contexts/AnthillSimulationContext"
import { useFocus } from "../../contexts/FocusContext"
import { useAnthillId } from "../../contexts/AnthillIdContext"

const Area3D = ({ cameraTarget, className, width=window.innerWidth * 0.65, height=window.innerHeight * 0.75 } : { cameraTarget?: number, className?: string, width?: number, height?: number }) =>{
    const {id: anthillId} = useAnthillId()
    const { target } = useFocus()
    const [colonyPosition, setColonyPosition] = useState<Position>();
    const { ants, grid, setAnts, setGrid } = useAnthill()
    const { ants: simulatedAnts } = useSimulation()

    useEffect(() =>{
        const updateAnthill = async () =>{
            const colonyCoordinates = await getColonyCoordinates(anthillId);
            setColonyPosition(colonyCoordinates)

            const ants = await getAnthillAnts(anthillId)
            const anthill = await getAnthill(anthillId)

            setAnts(ants)
            setGrid(anthill)
        }

        updateAnthill()
    }, [anthillId])

    return (
        <Canvas className={`canvas ${className}`} style={{ width, height }}>
            {target === -1 && <OrbitControls target={new Vector3(5, 5, 5)} />}
            <ambientLight intensity={2} />
            {grid && generateAnthill(grid)}
            {ants.map(({ position, lastPosition, hasFood }, i) => <Ant3D
                                                                    cameraTarget={cameraTarget}
                                                                    key={`ant-${i}`}
                                                                    hasFood={hasFood}
                                                                    index={i}
                                                                    simulated={simulatedAnts[i]}
                                                                    position={new Vector3(position.x, position.y, position.z)}
                                                                    lastPosition={new Vector3(lastPosition.x, lastPosition.y, lastPosition.z)}
                                                                />
            )}
        </Canvas>
    )
}

export default Area3D