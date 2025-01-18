import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CustomGeometryParticles = ({ intensity, count, position, color }: { intensity: number, count: number, position: THREE.Vector3, color: string }) => {
    const points = useRef<any>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const size = 1;

        for (let i = 0; i < count; i++) {
            const x = THREE.MathUtils.randFloatSpread(size);
            const y = THREE.MathUtils.randFloatSpread(size);
            const z = THREE.MathUtils.randFloatSpread(size);

            positions.set([x, y, z], i * 3);
        }

        return positions;
    }, [count]);

    useFrame((state) => {
        const { clock } = state;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 0.05 * i) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 0.05 * i) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 0.05 * i) * 0.001;
        }

        points.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={points} position={position}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.01 + intensity*0.4} color={color} />
        </points>
    );
};

export default CustomGeometryParticles;