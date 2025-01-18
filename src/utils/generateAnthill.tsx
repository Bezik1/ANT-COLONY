import { useLoader, useThree } from "@react-three/fiber";
import { Cell } from "../types/Cells/Cell";
import { TextureLoader, Vector3 } from "three";
import { useDevTools } from "../contexts/DevToolsContext";
import { AirCell } from "../types/Cells/AirCell";
import { FoodCell } from "../types/Cells/FoodCell";
import { ColonyCell } from "../types/Cells/ColonyCell";
import CustomGeometryParticles from "../components/Particles/CustomGeometryParticles";

const Box = ({ cell, x, y, z} : { cell: Cell | null, x: number, y: number, z: number }) => {
    const { camera } = useThree()
    const { showExploringPheromonLevel, showReturningPheromonLevel, showPossibleMoveCells, showWalls, showHallway } = useDevTools()
    const colorMap = useLoader(TextureLoader, 'assets/textures/dirt.png ')

        if(showWalls && cell == null) {
            return (
                <mesh visible={camera.visible} key={`${x}-${y}-${z}-empty`} position={[x, y, z]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial map={colorMap}/>
                </mesh>
            )
        } else if(cell instanceof AirCell && showHallway) {
            return (
                <mesh visible={camera.visible} key={`${x}-${y}-${z}-passable`} position={[x, y, z]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="blue"
                        transparent
                        opacity={0.25}
                    />
                </mesh>
            )
        } else if(cell instanceof ColonyCell) {
            return (
                <mesh visible={camera.visible} key={`${x}-${y}-${z}-passable`} position={[x, y, z]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="lightblue"
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            )
        }
        else if(cell instanceof FoodCell) {
            return (
                <>
                {Array.from({ length: cell.foodAmount }).map((_, index) => {
                    const gridSize = 3;
                    const halfGridSize = Math.floor(gridSize / 2);
                    const gap = 0.3;

                    const dx = (index % gridSize) - halfGridSize;
                    const dy = (Math.floor(index / gridSize) % gridSize) - halfGridSize;
                    const dz = Math.floor(index / (gridSize * gridSize)) - halfGridSize;

                    return (
                        <mesh visible={camera.visible} key={`${x}-${y}-${z}-${index}`} position={[x + dx * gap, y + dy * gap, z + dz * gap]}>
                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                            <meshStandardMaterial color="yellow" />
                        </mesh>
                    );
                })}
                </>
            )
        } else if(cell instanceof AirCell && cell.passableForAnt && showPossibleMoveCells) {
            return (
                <mesh visible={camera.visible} key={`${x}-${y}-${z}-passable`} position={[x, y, z]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="green"
                        transparent
                        opacity={0.25}
                    />
                </mesh>
            )
        } else if(showPossibleMoveCells && cell instanceof AirCell && !cell.passableForAnt) {
            return (
                <mesh visible={camera.visible} key={`${x}-${y}-${z}-unpassable`} position={[x, y, z]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="red"
                        transparent
                        opacity={0.25}
                    />
                </mesh>
            )
        } else if(showExploringPheromonLevel && cell instanceof AirCell && cell.exploringPheromon > 0) {
            return (
                <CustomGeometryParticles
                    intensity={cell.exploringPheromon*1.1}
                    color="violet"
                    position={new Vector3(x, y, z)}
                    count={100}
                />
            )
        } else if(showReturningPheromonLevel && cell instanceof AirCell && cell.returningPheromon > 0) {
            return (
                <CustomGeometryParticles
                    intensity={cell.returningPheromon*1.3}
                    color="cyan"
                    position={new Vector3(x, y, z)}
                    count={100}
                />
            )
    }
}

export const generateAnthill = (grid: (Cell | null)[][][]): JSX.Element[] => {
    const anthill3D: JSX.Element[] = [];
    if (!grid) return anthill3D;

    for (let z = 0; z < grid.length; z++) {
        for (let y = 0; y < grid[z].length; y++) {
            for (let x = 0; x < grid[z][y].length; x++) {
                const cell = grid[x][y][z];

                anthill3D.push(<Box key={`${x}-${y}-${z}`} cell={cell} x={x} y={y} z={z} />);
            }
        }
    }

    return anthill3D;
};