import { useFrame, useLoader, useThree } from "@react-three/fiber";
import "./index.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group, Vector3 } from "three";
import { Y_OFFSET } from "../../const/Ants";
import { Ant } from "../../types/Ant";
import { useEffect, useRef } from "react";
import { useFocus } from "../../contexts/FocusContext";

const Ant3D = ({ position, simulated, index, cameraTarget }: { position: Vector3, hasFood: boolean, lastPosition: Vector3, simulated: Ant, index: number, cameraTarget?: number }) => {
    const { target } = useFocus()
    const { camera } = useThree();
    const currentPosition = useRef(position);

    const antRef = useRef<Group>(null!);

    let { scene } = useLoader(GLTFLoader, "assets/ant.glb");
    scene = scene.clone();

    const speed = 1;

    useFrame((_, delta) => {
        if (target === index || cameraTarget === index) {
            const offsetCameraPosition = currentPosition.current.clone().add(new Vector3(0, 0.5, 0.35));
            camera.position.copy(offsetCameraPosition);
            camera.lookAt(currentPosition.current.clone().add(new Vector3(0, 0, 2.5)));
        }

        if (simulated && !currentPosition.current.equals(simulated.position)) {
            const { x: sx, y: sy, z: sz } = simulated.position;
            const offsetSimulatedPosition = new Vector3(sx, sy - Y_OFFSET, sz);

            const direction = offsetSimulatedPosition.clone().sub(currentPosition.current);
            const distance = direction.length();

            if (distance > speed * delta) {
                direction.normalize().multiplyScalar(speed * delta);
                currentPosition.current.add(direction);
            } else {
                currentPosition.current.copy(offsetSimulatedPosition);
            }

            antRef.current.position.copy(currentPosition.current);
        }
    });

    const { x, y, z } = currentPosition.current;

    useEffect(() =>{
        antRef.current.position.set(x, y, z)
    }, [x, y, z])

    return (
        <>
            <group ref={antRef} position={new Vector3(x, y - Y_OFFSET, z)} scale={new Vector3(2, 2, 2)}>
                <primitive object={scene} />
                {((simulated && simulated.hasFood)) && (
                    <mesh visible={camera.visible} key={`${x}-${y}-${z}-${index}`} position={[0, 0.1, 0.22]}>
                        <boxGeometry args={[0.075, 0.075, 0.075]} />
                        <meshStandardMaterial color="yellow" />
                    </mesh>
                )}
            </group>
        </>
    );
};

export default Ant3D;
