import { memo } from 'react';

interface StarFieldProps {
  className?: string;
  density?: 'light' | 'medium' | 'dense';
}

export const StarField = memo(({ className = "", density = 'light' }: StarFieldProps) => {
  const starCount = density === 'light' ? 30 : density === 'medium' ? 50 : 80;
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: starCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
});

StarField.displayName = 'StarField';