"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#d4af37";
const GOLD_BRIGHT = "#f3e6b0";
const NAVY = "#0a1129";
const NAVY_DEEP = "#05081a";
const CYAN = "#7fd9ff";

interface Props {
  /* Kept for backwards compatibility with Hero.tsx — not used now that the
     scene is static rather than slide-based. */
  current?: number;
}

/* ───────────────────────── Ambient star particles ───────────────────────── */

function ParticleField({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.04;
    ref.current.rotation.x = s.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={GOLD_BRIGHT} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ───────────────────────── 4 small floating primitives ───────────────────────── */

function GoldCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.3;
    ref.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
      <group position={[-3.2, 0.9, 0]}>
        <mesh ref={ref}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color={NAVY_DEEP} metalness={0.95} roughness={0.18} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.71, 0.71, 0.71)]} />
          <lineBasicMaterial color={GOLD_BRIGHT} transparent opacity={0.85} />
        </lineSegments>
      </group>
    </Float>
  );
}

function GoldOctahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.4;
    ref.current.rotation.z = s.clock.elapsedTime * 0.18;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
      <group position={[3.0, -0.3, 0.5]}>
        <mesh ref={ref}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.22} emissive={GOLD} emissiveIntensity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function WireSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.22;
    ref.current.rotation.x = s.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={[0.4, 1.6, -0.4]}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshBasicMaterial color={GOLD_BRIGHT} wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

function CyanRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.5;
    ref.current.rotation.y = s.clock.elapsedTime * 0.35;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={[-1.2, -1.4, 0.6]}>
        <torusGeometry args={[0.45, 0.06, 16, 64]} />
        <meshStandardMaterial color={CYAN} metalness={0.6} roughness={0.3} emissive={CYAN} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 4]} intensity={1.0} color={GOLD_BRIGHT} />
      <pointLight position={[-5, -3, 4]} intensity={0.5} color={CYAN} />
    </>
  );
}

export default function Hero3DSlider({ current: _current }: Props) {
  void _current; // silence unused-prop lint while keeping API stable
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.5, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Environment preset="city" />
        <ParticleField count={1100} />
        {/* 4 small floating primitives, scattered so the hero never feels crowded */}
        <GoldCube />
        <GoldOctahedron />
        <WireSphere />
        <CyanRing />
      </Canvas>
    </div>
  );
}
