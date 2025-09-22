import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { SafeThreeProvider } from './SafeThreeProvider';
import { useThreeGuard } from '@/hooks/useThreeGuard';

const AnimatedParticles = memo(() => {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const particleCount = 80; // Extremamente reduzido para máxima sutileza
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Espalhar muito mais as partículas para serem quase imperceptíveis
      positions[i3] = (Math.random() - 0.5) * 150;
      positions[i3 + 1] = (Math.random() - 0.5) * 150;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;
      
      // Tons de amarelo muito suaves
      colors[i3] = 1.0; // Red
      colors[i3 + 1] = 0.85 + Math.random() * 0.15; // Green (amarelado)
      colors[i3 + 2] = 0.2 + Math.random() * 0.15; // Blue (baixo para amarelo)
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Movimento muito mais suave e lento
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.03;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.03;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      // Movimento vertical muito sutil
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 0.3 + positions[i] * 0.005) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.8} 
        sizeAttenuation 
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

AnimatedParticles.displayName = 'AnimatedParticles';

interface ParticleFieldProps {
  className?: string;
}

export const ParticleField = memo(({ className = "" }: ParticleFieldProps) => {
  const canRender = useThreeGuard();
  
  if (!canRender) {
    return <div className={`hidden ${className}`} />;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <SafeThreeProvider>
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
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true
          }}
          dpr={[1, 1.5]} // Limit pixel ratio
          performance={{ min: 0.8 }} // Auto-degrade if performance drops
        >
          <AnimatedParticles />
        </Canvas>
      </SafeThreeProvider>
    </div>
  );
});

ParticleField.displayName = 'ParticleField';