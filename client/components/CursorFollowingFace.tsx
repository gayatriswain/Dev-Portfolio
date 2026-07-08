"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// If you have the mona.glb file, place it in the public/ folder.
// function MonaModel() {
//   const { scene } = useGLTF('/mona.glb');
//   const groupRef = useRef<THREE.Group>(null);
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth) * 2 - 1;
//       const y = -(e.clientY / window.innerHeight) * 2 + 1;
//       setMouse({ x, y });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);
//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.5, 0.1);
//       groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.8, 0.1);
//     }
//   });
//   return <primitive ref={groupRef} object={scene} scale={2} position={[0, -1, 0]} />;
// }

function FaceModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update rotation based on mouse on every frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Invert Y-axis so up/down tracks correctly, keep X-axis as is
      const targetX = -mouse.y * 0.6; // Up/down rotation
      const targetY = mouse.x * 0.8; // Left/right rotation

      // Smoothly interpolate current rotation to target rotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    }
  });

  // Accurate Colors from Reference Image
  const hoodColor = "#d65cff"; // Bright magenta/purple (Head/Hood & Ears)
  const faceColor = "#efc2ff"; // Light pastel pink/purple (Face patch)
  const eyeColor = "#000000"; // Black eyes
  const noseColor = "#000000"; // Black nose
  const catchlight = "#ffffff"; // White reflections

  return (
    <group ref={groupRef}>
      {/* Hood / Head Base (Much larger to create a thicker border around the face) */}
      <mesh position={[0, 0, 0]} scale={[1.45, 1.4, 1.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={hoodColor} roughness={0.5} />
      </mesh>

      {/* Face Skin Patch (Larger oval covering more of the head) */}
      <mesh position={[0, -0.12, 0.75]} scale={[1.12, 0.92, 0.4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={faceColor} roughness={0.4} />
      </mesh>

      {/* Left Ear */}
      <mesh position={[-1.0, 1.0, 0]} rotation={[0, 0, 0.3]} scale={[0.35, 0.65, 0.25]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={hoodColor} roughness={0.6} />
      </mesh>

      {/* Right Ear */}
      <mesh position={[1.0, 1.0, 0]} rotation={[0, 0, -0.3]} scale={[0.35, 0.65, 0.25]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={hoodColor} roughness={0.6} />
      </mesh>

      {/* Left Eye */}
      <group position={[-0.45, 0, 1.05]}>
        {/* Main Black Oval Pupil */}
        <mesh scale={[0.22, 0.32, 0.12]} rotation={[0, 0, -0.02]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} />
        </mesh>
        {/* Top Catchlight (Larger, more prominent) */}
        <mesh position={[-0.08, 0.14, 0.11]} scale={[0.1, 0.14, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
        {/* Bottom Catchlight (Small) */}
        <mesh position={[0.08, -0.12, 0.11]} scale={[0.04, 0.05, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.45, 0, 1.05]}>
        {/* Main Black Oval Pupil */}
        <mesh scale={[0.22, 0.32, 0.12]} rotation={[0, 0, 0.02]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} />
        </mesh>
        {/* Top Catchlight (Larger, more prominent) */}
        <mesh position={[-0.08, 0.14, 0.11]} scale={[0.1, 0.14, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
        {/* Bottom Catchlight (Small) */}
        <mesh position={[0.08, -0.12, 0.11]} scale={[0.04, 0.05, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={catchlight} />
        </mesh>
      </group>

      {/* Nose (Tiny Black Dot) */}
      <mesh position={[0, -0.18, 1.13]} scale={[0.06, 0.04, 0.05]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={noseColor} />
      </mesh>

      {/* Smile (Prominent and happy) */}
      <mesh position={[0, -0.25, 1.16]} rotation={[Math.PI, 0, 0]}>
        <torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default function CursorFollowingFace() {
  return (
    <div className="w-full h-[140px] md:h-[160px] mx-auto mb-2 md:mb-4 relative flex items-center justify-center cursor-crosshair">
      {/* Massive absolute container so the 3D model never clips the edges */}
      <div className="absolute w-[400px] h-[400px] flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 11], fov: 50 }}>
        {/* Lighting to make it look 3D and shiny */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={1} color="#a855f7" />
        
        {/* Environment for better reflections */}
        
        {/* The Face Model */}
        <FaceModel />
        
        {/* A soft shadow underneath */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={2} far={2} />
      </Canvas>
      </div>
    </div>
  );
}
