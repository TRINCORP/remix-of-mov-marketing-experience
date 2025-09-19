import { memo } from 'react';

interface RotatingRectangleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
  children?: React.ReactNode;
}

export const RotatingRectangle = memo(({ 
  className = "", 
  size = 'md',
  speed = 'normal',
  children 
}: RotatingRectangleProps) => {
  const sizeClasses = {
    sm: 'w-32 h-20',
    md: 'w-48 h-28',
    lg: 'w-64 h-36'
  };

  const speedClasses = {
    slow: 'animate-rotate-slow',
    normal: 'animate-rotate-rectangle',
    fast: 'animate-rotate-fast'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Rotating rectangle background */}
      <div className={`
        absolute inset-0 ${sizeClasses[size]} ${speedClasses[speed]}
        bg-gradient-to-r from-primary/20 to-secondary/20 
        border-2 border-primary/40 rounded-lg
        shadow-lg shadow-primary/25
        backdrop-blur-sm
      `} />
      
      {/* Content */}
      <div className={`
        relative z-10 ${sizeClasses[size]} 
        flex items-center justify-center
        text-center p-4
      `}>
        {children}
      </div>
    </div>
  );
});

RotatingRectangle.displayName = 'RotatingRectangle';