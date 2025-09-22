import { memo } from 'react';

interface FloatingDotsProps {
  className?: string;
  count?: number;
  color?: 'primary' | 'secondary' | 'accent';
}

export const FloatingDots = memo(({ className = "", count = 15, color = 'primary' }: FloatingDotsProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-${color}/30 rounded-full animate-float-gentle`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
});

FloatingDots.displayName = 'FloatingDots';