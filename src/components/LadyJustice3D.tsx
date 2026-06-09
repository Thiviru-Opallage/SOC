"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const MODEL_URL = "/models/lady-justice-compressed.glb";
const DRACO_DECODER = "/draco/";

function SceneEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const env = pmrem.fromScene(new RoomEnvironment()).texture;
    scene.environment = env;
    pmrem.dispose();
    return () => { env.dispose(); };
  }, [gl, scene]);
  return null;
}

function Model({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_DECODER);
  const group = useRef<THREE.Group>(null);
  const fadeProgress = useRef(0);
  const readyCalled = useRef(false);
  // Store opacity ref directly — avoids material replacement timing issues
  const opacityRef = useRef(0);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const meshes: THREE.Mesh[] = [];

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      // Replace with gold material
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#AD8A46"),
        metalness: 1.0,
        roughness: 0.28,
        envMapIntensity: 2.0,
        transparent: true,
        opacity: 0,
      });

      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    if (!readyCalled.current) {
      readyCalled.current = true;
      // Small delay so the material swap is committed before signalling ready
      setTimeout(() => onReady(), 50);
    }
  }, [scene, onReady]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += 0.12 * delta;

    if (fadeProgress.current < 1) {
      fadeProgress.current = Math.min(1, fadeProgress.current + delta / 1.0);
      const opacity = 1 - Math.pow(1 - fadeProgress.current, 3);
      meshesRef.current.forEach((m) => {
        (m.material as THREE.MeshStandardMaterial).opacity = opacity;
      });
    }
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={1.85} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_URL, DRACO_DECODER);

export default function LadyJustice3D({ onLoaded }: { onLoaded?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.6], fov: 32 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ width: "100%", height: "100%", touchAction: "none", pointerEvents: "none" }}
    >
      <SceneEnvironment />
      <ambientLight intensity={0.4} color="#1a3a35" />
      <directionalLight position={[5, 8, 4]} intensity={3.5} color="#D4B37A" />
      <directionalLight position={[-6, 4, -5]} intensity={1.4} color="#7fb8a8" />
      <pointLight position={[0, -2, 3]} intensity={1.2} color="#AD8A46" distance={12} />
      <spotLight position={[-4, 6, 2]} intensity={2.0} angle={0.55} penumbra={0.85} color="#C4A870" />
      <Suspense fallback={null}>
        <Model onReady={() => onLoaded?.()} />
      </Suspense>
    </Canvas>
  );
}