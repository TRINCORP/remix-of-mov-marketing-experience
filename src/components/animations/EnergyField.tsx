import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function EnergyParticles() {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    const colors = new Float32Array(1500 * 3);
    
    for (let i = 0; i < 1500; i++) {
      const i3 = i * 3;
      // Distribute particles in a more organic way
      const radius = Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Energy colors - gold and blue
      const energyType = Math.random();
      if (energyType > 0.7) {
        // Golden energy
        colors[i3] = 1; // R
        colors[i3 + 1] = 0.8; // G  
        colors[i3 + 2] = 0.2; // B
      } else {
        // Blue energy
        colors[i3] = 0.2; // R
        colors[i3 + 1] = 0.6; // G  
        colors[i3 + 2] = 1; // B
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + positions[i] * 0.02) * 0.02;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={2} 
        sizeAttenuation 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface EnergyFieldProps {
  className?: string;
  intensity?: number;
}

export const EnergyField = ({ className = "", intensity = 0.4 }: EnergyFieldProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: intensity }}>
      <Canvas
        camera={{ 
          position: [0, 0, 40], 
          fov: 60,
          near: 0.1,
          far: 200
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <EnergyParticles />
      </Canvas>
    </div>
  );
};