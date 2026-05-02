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
const PURPLE = "#a26bff";

interface Props {
  current: number;
}

/* ───────────────────────────── helpers ───────────────────────────── */

function GoldFrame({ size, thickness = 0.015 }: { size: [number, number, number]; thickness?: number }) {
  return (
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(size[0] + thickness, size[1] + thickness, size[2] + thickness)]} />
      <lineBasicMaterial color={GOLD_BRIGHT} transparent opacity={0.85} />
    </lineSegments>
  );
}

function SceneIntro({ children, duration = 0.7 }: { children: React.ReactNode; duration?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tRef = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    tRef.current = Math.min(tRef.current + delta / duration, 1);
    const eased = 1 - Math.pow(1 - tRef.current, 3);
    groupRef.current.scale.setScalar(0.75 + eased * 0.25);
  });
  return <group ref={groupRef}>{children}</group>;
}

/* ───────────────────────── Ambient backdrop — particle field + wireframe globes
   Same visual vocabulary used on the /services hero, so the two pages feel like
   one universe.
   ───────────────────────── */

function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
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
      <pointsMaterial size={0.05} color={GOLD_BRIGHT} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function AmbientWireGlobes() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (outer.current) {
      outer.current.rotation.y = s.clock.elapsedTime * 0.06;
      outer.current.rotation.x = s.clock.elapsedTime * 0.03;
    }
    if (inner.current) {
      inner.current.rotation.y = -s.clock.elapsedTime * 0.1;
      inner.current.rotation.z = s.clock.elapsedTime * 0.04;
    }
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.10} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color={GOLD_BRIGHT} wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SCENE 1 — IT INFRASTRUCTURE (Software & Hardware)
   Central server tower + floating chips + connection pulses
   ════════════════════════════════════════════════════════════════════ */

function ITInfrastructure() {
  const groupRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.15;
    if (ledRef.current) {
      ledRef.current.children.forEach((mesh, i) => {
        const m = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
        const pulse = 0.5 + Math.sin(s.clock.elapsedTime * 2 + i * 0.5) * 0.5;
        m.opacity = pulse;
      });
    }
  });

  const chips = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return {
          x: Math.cos(angle) * 3.2,
          y: Math.sin(i * 1.3) * 1.3,
          z: Math.sin(angle) * 3.2,
          speed: 1.4 + (i % 3) * 0.3,
          rot: angle,
        };
      }),
    []
  );

  return (
    <SceneIntro>
      <group ref={groupRef}>
        {/* Server tower — 5 stacked rack units */}
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
          <group>
            {[1.4, 0.7, 0, -0.7, -1.4].map((y, i) => (
              <group key={i} position={[0, y, 0]}>
                <mesh>
                  <boxGeometry args={[1.6, 0.55, 1.1]} />
                  <meshStandardMaterial color={NAVY_DEEP} metalness={0.95} roughness={0.18} />
                </mesh>
                <GoldFrame size={[1.6, 0.55, 1.1]} />
                {/* Rack drives */}
                <mesh position={[0, 0, 0.56]}>
                  <boxGeometry args={[1.4, 0.4, 0.02]} />
                  <meshStandardMaterial color={NAVY} emissive={GOLD} emissiveIntensity={0.25} metalness={0.85} roughness={0.3} />
                </mesh>
              </group>
            ))}
            {/* Status LEDs along the side */}
            <group ref={ledRef}>
              {[1.4, 0.7, 0, -0.7, -1.4].map((y, i) => (
                <mesh key={i} position={[0.65, y, 0.57]}>
                  <sphereGeometry args={[0.05, 12, 12]} />
                  <meshBasicMaterial color={i % 2 === 0 ? GOLD_BRIGHT : CYAN} transparent />
                </mesh>
              ))}
            </group>
          </group>
        </Float>

        {/* Floating hardware chips around the tower */}
        {chips.map((c, i) => (
          <Float key={i} speed={c.speed} rotationIntensity={0.5} floatIntensity={0.7}>
            <group position={[c.x, c.y, c.z]} rotation={[0, c.rot, 0]}>
              {/* Chip body */}
              <mesh>
                <boxGeometry args={[0.55, 0.08, 0.55]} />
                <meshStandardMaterial color={NAVY} metalness={0.9} roughness={0.25} emissive={GOLD} emissiveIntensity={0.2} />
              </mesh>
              {/* Chip die */}
              <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[0.32, 0.04, 0.32]} />
                <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={0.8} />
              </mesh>
              {/* Pin rows */}
              {[-0.22, 0.22].map((x, j) => (
                <mesh key={j} position={[x, -0.03, 0]}>
                  <boxGeometry args={[0.04, 0.03, 0.5]} />
                  <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} />
                </mesh>
              ))}
            </group>
          </Float>
        ))}
      </group>
    </SceneIntro>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SCENE 2 — ERP IMPLEMENTATION (Odoo, Oracle)
   Hexagonal core + 6 ERP module tiles orbiting
   ════════════════════════════════════════════════════════════════════ */

function ERPImplementation() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.18;
  });

  const modules = useMemo(
    () => [
      { label: "CRM", angle: 0 },
      { label: "FIN", angle: Math.PI / 3 },
      { label: "INV", angle: (2 * Math.PI) / 3 },
      { label: "HR",  angle: Math.PI },
      { label: "MFG", angle: (4 * Math.PI) / 3 },
      { label: "BI",  angle: (5 * Math.PI) / 3 },
    ],
    []
  );

  return (
    <SceneIntro>
      <group ref={groupRef}>
        {/* Central hex prism core */}
        <Float speed={1} rotationIntensity={0.25} floatIntensity={0.35}>
          <group>
            <mesh rotation={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 1.6, 6]} />
              <meshStandardMaterial color={NAVY_DEEP} metalness={0.95} roughness={0.18} />
            </mesh>
            {/* Top cap glow */}
            <mesh position={[0, 0.81, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.18, 1.18, 0.04, 6]} />
              <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={1.2} />
            </mesh>
            {/* Bottom cap */}
            <mesh position={[0, -0.81, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.18, 1.18, 0.04, 6]} />
              <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} />
            </mesh>
            {/* Vertical gold edges on hex */}
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              return (
                <mesh key={i} position={[Math.cos(a) * 1.04, 0, Math.sin(a) * 1.04]}>
                  <boxGeometry args={[0.04, 1.62, 0.04]} />
                  <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={0.8} />
                </mesh>
              );
            })}
            {/* Inner glow orb */}
            <mesh>
              <sphereGeometry args={[0.55, 32, 32]} />
              <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={1.5} transparent opacity={0.8} />
            </mesh>
          </group>
        </Float>

        {/* ERP module tiles orbiting */}
        {modules.map((m, i) => {
          const r = 3.4;
          return (
            <Float key={m.label} speed={1.4 + (i % 3) * 0.3} rotationIntensity={0.3} floatIntensity={0.6}>
              <group position={[Math.cos(m.angle) * r, Math.sin(i * 1.2) * 0.8, Math.sin(m.angle) * r]} rotation={[0, -m.angle + Math.PI / 2, 0]}>
                <mesh>
                  <boxGeometry args={[0.85, 0.85, 0.08]} />
                  <meshStandardMaterial color={NAVY} metalness={0.9} roughness={0.22} emissive={GOLD} emissiveIntensity={0.22} />
                </mesh>
                <GoldFrame size={[0.85, 0.85, 0.08]} />
                {/* Inner lit panel */}
                <mesh position={[0, 0, 0.05]}>
                  <boxGeometry args={[0.7, 0.7, 0.02]} />
                  <meshStandardMaterial color={NAVY_DEEP} emissive={GOLD_BRIGHT} emissiveIntensity={0.5} />
                </mesh>
              </group>
            </Float>
          );
        })}
      </group>
    </SceneIntro>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SCENE 3 — DIGITAL SERVICES (Web, App, Networking design)
   Floating browser + phone + connected globe of network nodes
   ════════════════════════════════════════════════════════════════════ */

function DigitalServices() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.18;
    if (globeRef.current) {
      globeRef.current.rotation.y = -s.clock.elapsedTime * 0.4;
      globeRef.current.rotation.x = s.clock.elapsedTime * 0.15;
    }
  });

  const networkNodes = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 10);
        const theta = Math.sqrt(10 * Math.PI) * phi;
        const r = 1.3;
        return [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)] as [number, number, number];
      }),
    []
  );

  return (
    <SceneIntro>
      <group ref={groupRef}>
        {/* Center: network globe */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
          <group>
            <mesh ref={globeRef}>
              <icosahedronGeometry args={[1.25, 1]} />
              <meshStandardMaterial color={GOLD} wireframe transparent opacity={0.45} emissive={GOLD} emissiveIntensity={0.3} />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.9, 1]} />
              <meshStandardMaterial color={NAVY_DEEP} metalness={0.95} roughness={0.18} />
            </mesh>
            {networkNodes.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={2} />
              </mesh>
            ))}
          </group>
        </Float>

        {/* Browser frame on the left */}
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
          <group position={[-2.8, 0.7, 0.4]} rotation={[0, 0.5, 0]}>
            <mesh>
              <boxGeometry args={[2.2, 1.4, 0.1]} />
              <meshStandardMaterial color={NAVY} metalness={0.9} roughness={0.25} emissive={GOLD} emissiveIntensity={0.15} />
            </mesh>
            <GoldFrame size={[2.2, 1.4, 0.1]} />
            {/* Title bar */}
            <mesh position={[0, 0.55, 0.06]}>
              <boxGeometry args={[2, 0.18, 0.04]} />
              <meshStandardMaterial color={NAVY_DEEP} emissive={GOLD} emissiveIntensity={0.4} />
            </mesh>
            {[-0.85, -0.7, -0.55].map((x, i) => (
              <mesh key={i} position={[x, 0.55, 0.09]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshBasicMaterial color={GOLD_BRIGHT} />
              </mesh>
            ))}
            {/* Lit content area */}
            <mesh position={[0, -0.05, 0.06]}>
              <boxGeometry args={[2, 1.05, 0.02]} />
              <meshStandardMaterial color={NAVY_DEEP} emissive={GOLD_BRIGHT} emissiveIntensity={0.35} />
            </mesh>
          </group>
        </Float>

        {/* Phone mockup on the right */}
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.7}>
          <group position={[2.6, -0.4, 0.4]} rotation={[0, -0.4, 0.12]}>
            <mesh>
              <boxGeometry args={[0.9, 1.85, 0.13]} />
              <meshStandardMaterial color={NAVY} metalness={0.92} roughness={0.2} />
            </mesh>
            <GoldFrame size={[0.9, 1.85, 0.13]} />
            <mesh position={[0, 0, 0.075]}>
              <boxGeometry args={[0.78, 1.65, 0.02]} />
              <meshStandardMaterial color={NAVY_DEEP} emissive={GOLD_BRIGHT} emissiveIntensity={0.55} />
            </mesh>
          </group>
        </Float>
      </group>
    </SceneIntro>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Main canvas wrapper
   ════════════════════════════════════════════════════════════════════ */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} color={GOLD_BRIGHT} />
      <pointLight position={[-5, -3, 4]} intensity={0.6} color={CYAN} />
      <pointLight position={[4, -2, -4]} intensity={0.5} color={PURPLE} />
    </>
  );
}

const SCENES = [ITInfrastructure, ERPImplementation, DigitalServices];

export default function Hero3DSlider({ current }: Props) {
  const Scene = SCENES[current % SCENES.length];

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
        camera={{ position: [0, 1, 13], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Environment preset="city" />

        {/* Ambient backdrop — gold particle field + wide wireframe globes,
            same visual language as the /services hero */}
        <ParticleField count={1400} />
        <AmbientWireGlobes />

        {/* Foreground swappable 3D scene — small accent, lowered to sit clear of the header */}
        <group position={[0, -0.9, 0]} scale={0.5}>
          <group key={current}>
            <Scene />
          </group>
        </group>
      </Canvas>
    </div>
  );
}
