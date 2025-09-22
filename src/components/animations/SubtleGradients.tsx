import { memo } from 'react';

interface SubtleGradientsProps {
  className?: string;
  variant?: 'warm' | 'cool' | 'mixed';
}

export const SubtleGradients = memo(({ className = "", variant = 'mixed' }: SubtleGradientsProps) => {
  const getGradient = () => {
    switch (variant) {
      case 'warm':
        return 'from-primary/5 via-accent/3 to-secondary/5';
      case 'cool':
        return 'from-secondary/5 via-primary/3 to-accent/5';
      default:
        return 'from-primary/4 via-transparent to-accent/4';
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Main gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} animate-gradient-shift`} />
      
      {/* Animated overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent animate-shimmer-wave" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-accent/2 to-transparent animate-shimmer-wave animation-delay-1000" />
    </div>
  );
});

SubtleGradients.displayName = 'SubtleGradients';