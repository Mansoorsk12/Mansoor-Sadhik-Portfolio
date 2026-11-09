import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
function Sculpture() {
  const group = useRef();
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y +=
      (pointer.x * 0.2 - group.current.rotation.y) * delta * 2;
    group.current.rotation.x +=
      (pointer.y * 0.12 - group.current.rotation.x) * delta * 2;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.06;
  });
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.3}>
        <mesh rotation={[0.5, 0.4, -0.5]}>
          <torusKnotGeometry args={[1.15, 0.36, 240, 40, 2, 3]} />
          <meshPhysicalMaterial
            color="#a695eb"
            metalness={0.58}
            roughness={0.23}
            clearcoat={1}
            iridescence={0.65}
          />
        </mesh>
        <mesh position={[1.6, 1.25, 0.3]}>
          <sphereGeometry args={[0.29, 40, 40]} />
          <meshPhysicalMaterial
            color="#c8dafa"
            metalness={0.3}
            roughness={0.12}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[-1.65, -0.85, 0.4]} rotation={[0.5, 0.7, 0.3]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#9981d9"
            metalness={0.45}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0.55, -1.8, 0]} rotation={[1.1, 0.5, 0.4]}>
          <torusGeometry args={[0.19, 0.045, 20, 60]} />
          <meshStandardMaterial
            color="#b09bea"
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}
export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 4]} intensity={5} />
      <directionalLight position={[-4, 0, 2]} intensity={3} color="#b7b6ff" />
      <directionalLight position={[0, -3, -3]} intensity={4} color="#b2d2ff" />
      <Sculpture />
    </Canvas>
  );
}
