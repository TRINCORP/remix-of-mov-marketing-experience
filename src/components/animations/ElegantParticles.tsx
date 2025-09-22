import { memo } from 'react';

interface ElegantParticlesProps {
  className?: string;
  density?: 'sparse' | 'normal' | 'rich';
  theme?: 'primary' | 'secondary' | 'accent' | 'mixed';
}

export const ElegantParticles = memo(({ 
  className = "", 
  density = 'normal',
  theme = 'mixed'
}: ElegantParticlesProps) => {
  const particleCount = density === 'sparse' ? 8 : density === 'normal' ? 12 : 18;
  
  const getParticleColor = (index: number) => {
    if (theme === 'mixed') {
      const colors = ['primary', 'secondary', 'accent'];
      return colors[index % 3];
    }
    return theme;
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 bg-${getParticleColor(i)}/40 rounded-full animate-float-gentle blur-sm`}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Larger accent particles */}
      {Array.from({ length: Math.floor(particleCount / 3) }).map((_, i) => (
        <div
          key={`accent-${i}`}
          className={`absolute w-2 h-2 bg-${getParticleColor(i)}/30 rounded-full animate-twinkle blur-sm`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
});

ElegantParticles.displayName = 'ElegantParticles';