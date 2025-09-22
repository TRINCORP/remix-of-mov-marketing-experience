import { memo } from 'react';

interface GlowingOrbsProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  intensity?: 'subtle' | 'normal' | 'bright';
}

export const GlowingOrbs = memo(({ 
  className = "", 
  size = 'medium', 
  intensity = 'subtle' 
}: GlowingOrbsProps) => {
  const orbSize = size === 'small' ? 'w-16 h-16' : size === 'medium' ? 'w-24 h-24' : 'w-32 h-32';
  const opacity = intensity === 'subtle' ? '5' : intensity === 'normal' ? '10' : '15';
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary Orb */}
      <div 
        className={`absolute ${orbSize} bg-primary/${opacity} rounded-full blur-2xl animate-pulse-slow`}
        style={{
          top: '20%',
          right: '15%',
          animationDuration: '4s',
        }}
      />
      
      {/* Secondary Orb */}
      <div 
        className={`absolute ${orbSize} bg-secondary/${opacity} rounded-full blur-2xl animate-float`}
        style={{
          bottom: '25%',
          left: '10%',
          animationDuration: '6s',
        }}
      />
      
      {/* Accent Orb */}
      <div 
        className={`absolute w-20 h-20 bg-accent/${opacity} rounded-full blur-xl animate-pulse-slow`}
        style={{
          top: '60%',
          right: '30%',
          animationDuration: '5s',
          animationDelay: '2s',
        }}
      />
    </div>
  );
});

GlowingOrbs.displayName = 'GlowingOrbs';