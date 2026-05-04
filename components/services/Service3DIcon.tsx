"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  category: string;
  accentColor?: string;
  size?: number;
}

function CubeGrid({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.4;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.25;
  });
  const cubes: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push([x * 0.7, y * 0.7, z * 0.7]);
      }
    }
  }
  return (
    <group ref={group}>
      {cubes.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.35} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function ServerStack({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.3;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.12;
  });
  return (
    <group ref={group}>
      {[1, 0.5, 0, -0.5, -1].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[1.7, 0.36, 1]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.22} metalness={0.55} roughness={0.4} />
          </mesh>
          <mesh position={[0.6, 0, 0.51]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#00ff9d" />
          </mesh>
          <mesh position={[0.45, 0, 0.51]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function NeuralSphere({ accentColor }: { accentColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbs = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = s.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = s.clock.elapsedTime * 0.15;
    }
    if (orbs.current) orbs.current.rotation.y = -s.clock.elapsedTime * 0.5;
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.45, 2]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.55} />
      </mesh>
      <group ref={orbs}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.95, Math.sin(angle * 1.5) * 0.6, Math.sin(angle) * 1.95]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.8} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function BrowserFrame({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.35;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2.3, 1.55, 0.1]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.16} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.62, 0.06]}>
        <boxGeometry args={[2.1, 0.2, 0.05]} />
        <meshStandardMaterial color="#0a0a14" emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>
      {[-0.9, -0.74, -0.58].map((x, i) => (
        <mesh key={i} position={[x, 0.62, 0.1]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={["#ff5f56", "#ffbd2e", "#27c93f"][i]} />
        </mesh>
      ))}
      <mesh position={[0, -0.05, 0.06]}>
        <boxGeometry args={[2, 1.1, 0.02]} />
        <meshStandardMaterial color="#0a0a14" emissive={accentColor} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function AscendingBars({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.4;
  });
  const heights = [0.6, 1.0, 1.4, 1.8, 2.2];
  return (
    <group ref={group} position={[0, -0.85, 0]}>
      {heights.map((h, i) => (
        <mesh key={i} position={[(i - 2) * 0.5, h / 2, 0]}>
          <boxGeometry args={[0.36, h, 0.36]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.32} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneShape({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.55;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.45) * 0.1;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1, 2, 0.16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.12} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <boxGeometry args={[0.85, 1.7, 0.02]} />
        <meshStandardMaterial color="#0a0a14" emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.93, 0.085]}>
        <torusGeometry args={[0.06, 0.012, 8, 24]} />
        <meshBasicMaterial color="#666" />
      </mesh>
    </group>
  );
}

export default function Service3DIcon({ category, accentColor = "#00d4ff", size = 200 }: Props) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color={accentColor} />
        <pointLight position={[-5, -3, 3]} intensity={0.5} />
        {category === "erp" && <CubeGrid accentColor={accentColor} />}
        {category === "it-infrastructure" && <ServerStack accentColor={accentColor} />}
        {category === "ai-automation" && <NeuralSphere accentColor={accentColor} />}
        {category === "web-ecommerce" && <BrowserFrame accentColor={accentColor} />}
        {category === "digital-marketing" && <AscendingBars accentColor={accentColor} />}
        {category === "mobile-apps" && <PhoneShape accentColor={accentColor} />}
        {category === "fiber-cabling" && <ServerStack accentColor={accentColor} />}
        {category === "it-peripherals" && <CubeGrid accentColor={accentColor} />}
      </Canvas>
    </div>
  );
}
