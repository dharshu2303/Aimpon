import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.25;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15;
      wireRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      {/* Solid distorted sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <Icosahedron args={[1.6, 1]}>
          <MeshDistortMaterial
            color="#00b4d8"
            emissive="#003d5b"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.1}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.25}
          />
        </Icosahedron>
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} position={[0, 0, 0]}>
        <Icosahedron args={[1.65, 1]}>
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
        </Icosahedron>
      </mesh>
    </>
  );
}

function FloatingOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orb1.current) {
      orb1.current.position.x = Math.sin(t * 0.8) * 2.5;
      orb1.current.position.y = Math.cos(t * 0.6) * 1.5;
    }
    if (orb2.current) {
      orb2.current.position.x = Math.cos(t * 0.5) * 2.8;
      orb2.current.position.y = Math.sin(t * 0.9) * 2;
    }
    if (orb3.current) {
      orb3.current.position.x = Math.sin(t * 1.1) * 1.8;
      orb3.current.position.y = Math.cos(t * 0.7) * 2.5;
    }
  });

  return (
    <>
      <mesh ref={orb1}>
        <Sphere args={[0.12, 16, 16]}>
          <meshBasicMaterial color="#00d4ff" />
        </Sphere>
      </mesh>
      <mesh ref={orb2}>
        <Sphere args={[0.08, 16, 16]}>
          <meshBasicMaterial color="#00b4d8" />
        </Sphere>
      </mesh>
      <mesh ref={orb3}>
        <Sphere args={[0.1, 16, 16]}>
          <meshBasicMaterial color="#48cae4" />
        </Sphere>
      </mesh>
    </>
  );
}

function InnerRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + t * 0.3;
      ringRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.015, 8, 100]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </mesh>
  );
}

export default function TechScene() {
  return (
    <div className="w-full h-full relative">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 180, 255, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00b4d8" />
        <pointLight position={[-5, -3, -5]} intensity={1} color="#0077b6" />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#00d4ff" angle={0.3} />

        <Stars radius={50} depth={20} count={800} factor={3} saturation={0} fade speed={1} />

        <RotatingIcosahedron />
        <FloatingOrbs />
        <InnerRing />
      </Canvas>
    </div>
  );
}
