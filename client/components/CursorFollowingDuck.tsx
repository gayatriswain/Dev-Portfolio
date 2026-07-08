import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DuckModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = -mouse.y * 0.6;
      const targetY = mouse.x * 0.8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    }
  });

  const bodyColor = "#fde047"; // Bright Yellow
  const beakColor = "#ea580c"; // Bright Orange
  const eyeColor = "#111111"; // Black
  const catchlight = "#ffffff"; // White

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 0, 0]} scale={[1.25, 1.15, 1.25]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Tuft of hair */}
      <mesh position={[0, 1.1, 0]} scale={[0.15, 0.25, 0.15]} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} />
      </mesh>
      <mesh position={[-0.1, 1.05, 0]} scale={[0.1, 0.2, 0.1]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} />
      </mesh>

      {/* Beak Top */}
      <mesh position={[0, -0.1, 1.15]} scale={[0.45, 0.18, 0.45]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={beakColor} roughness={0.4} />
      </mesh>
      
      {/* Beak Bottom */}
      <mesh position={[0, -0.22, 1.1]} scale={[0.35, 0.12, 0.35]} rotation={[-0.1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={beakColor} roughness={0.4} />
      </mesh>

      {/* Left Eye */}
      <group position={[-0.45, 0.3, 1.05]}>
        {/* Main pupil */}
        <mesh scale={[0.15, 0.25, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} />
        </mesh>
        {/* Catchlight */}
        <mesh position={[-0.05, 0.12, 0.08]} scale={[0.06, 0.08, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
        <mesh position={[0.04, -0.08, 0.08]} scale={[0.03, 0.03, 0.03]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.45, 0.3, 1.05]}>
        {/* Main pupil */}
        <mesh scale={[0.15, 0.25, 0.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} />
        </mesh>
        {/* Catchlight */}
        <mesh position={[-0.05, 0.12, 0.08]} scale={[0.06, 0.08, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
        <mesh position={[0.04, -0.08, 0.08]} scale={[0.03, 0.03, 0.03]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
      </group>

      {/* Cheek Blush (Left) */}
      <mesh position={[-0.7, 0, 0.9]} scale={[0.2, 0.1, 0.1]} rotation={[0, -0.2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f87171" opacity={0.6} transparent />
      </mesh>

      {/* Cheek Blush (Right) */}
      <mesh position={[0.7, 0, 0.9]} scale={[0.2, 0.1, 0.1]} rotation={[0, 0.2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f87171" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

export default function CursorFollowingDuck() {
  return (
    <div className="w-full h-[120px] md:h-[160px] mx-auto relative flex items-center justify-center cursor-crosshair">
      <div className="absolute w-[400px] h-[400px] flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 11], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.2} />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#fef08a" />
          
          <DuckModel />
        </Canvas>
      </div>
    </div>
  );
}
