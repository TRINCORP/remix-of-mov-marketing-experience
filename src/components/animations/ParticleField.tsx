import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      // Cores variadas com tons de azul e roxo
      colors[i3] = Math.random() * 0.5 + 0.5; // R
      colors[i3 + 1] = Math.random() * 0.3 + 0.7; // G  
      colors[i3 + 2] = 1; // B
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={1.5} 
        sizeAttenuation 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleFieldProps {
  className?: string;
}

export const ParticleField = ({ className = "" }: ParticleFieldProps) => {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 30], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <AnimatedParticles />
      </Canvas>
    </div>
  );
};