import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-600 ${
      !isVisible ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-10" />
      
      {/* Main Content */}
      <div className="text-center px-6 animate-scale-in">
        {/* Logo */}
        <div className="mb-6">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse" />
          
          <h1 className="text-7xl md:text-8xl font-black text-gradient mb-3 animate-slide-up">
            MOV
          </h1>
          
          <p className="text-lg text-muted-foreground font-medium mb-6 animate-slide-up animation-delay-300">
            Assessoria de Marketing
          </p>
          
          <p className="text-muted-foreground max-w-md mx-auto animate-fade-in animation-delay-600">
            Transformamos sua marca em referência digital com estratégias que realmente funcionam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;