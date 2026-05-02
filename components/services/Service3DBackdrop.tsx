"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  accentColor?: string;
  density?: "low" | "medium" | "high";
  /** Global scale for the 3D objects (1 = original size). Default 0.7 so the
   *  backdrop reads as ambient detail rather than a focal element. */
  scale?: number;
}

function ParticleField({ accentColor, count }: { accentColor: string; count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={accentColor} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function WireGlobe({ accentColor }: { accentColor: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    ref.current.rotation.x = state.clock.elapsedTime * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3.2, 1]} />
      <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function InnerSphere({ accentColor }: { accentColor: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.12;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export default function Service3DBackdrop({ accentColor = "#00d4ff", density = "medium", scale = 0.7 }: Props) {
  const counts = { low: 600, medium: 1200, high: 2000 };
  const count = counts[density];
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.85,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 11], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ParticleField accentColor={accentColor} count={count} />
        <group scale={scale}>
          <WireGlobe accentColor={accentColor} />
          <InnerSphere accentColor={accentColor} />
        </group>
      </Canvas>
    </div>
  );
}
