// components/DrinkwareCanvas.tsx
"use client";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

type DrinkwareCanvasProps = {
  imageUrl: string;
  height: number;
  topRadius: number;
  bottomRadius: number;
  angleFraction?: number; // default: 1
  rotation?: [number, number, number]; // mesh rotation
};

const DrinkwareCanvas = ({
  imageUrl,
  height,
  topRadius,
  bottomRadius,
  angleFraction = 1,
  rotation = [0.33, -1.1, 0],
}: DrinkwareCanvasProps) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const avgRadius = (topRadius + bottomRadius) / 2;
  const circumference = 2 * Math.PI * avgRadius * angleFraction;

  useEffect(() => {
    const img = texture.image;
    if (!img) return;

    const setTextureRepeat = () => {
      const aspectRatio = img.width / img.height;
      const repeatX = circumference / height / aspectRatio;
      texture.repeat.set(repeatX, 1);
      texture.center.set(0, 0);
    };

    if (!img.complete) {
      img.onload = setTextureRepeat;
    } else {
      setTextureRepeat();
    }
  }, [texture, circumference, height]);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <mesh rotation={rotation}>
        <cylinderGeometry
          args={[
            topRadius,
            bottomRadius,
            height,
            64,
            1,
            true,
            0,
            Math.PI * 2 * angleFraction,
          ]}
        />
        <meshStandardMaterial
          map={texture}
          side={THREE.FrontSide}
          transparent
        />
      </mesh>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default DrinkwareCanvas;
