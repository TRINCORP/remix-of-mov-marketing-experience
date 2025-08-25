import { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    { range: [0, 25], text: "Iniciando sua revolução..." },
    { range: [25, 50], text: "Carregando inovação..." },
    { range: [50, 75], text: "Preparando experiência..." },
    { range: [75, 100], text: "MOV - Onde pixels viram resultados" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Atualizar mensagem baseada no progresso
        const currentMsg = messages.find(msg => 
          newProgress >= msg.range[0] && newProgress <= msg.range[1]
        );
        
        if (currentMsg && currentMsg.text !== currentMessage) {
          setCurrentMessage(currentMsg.text);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 800);
          return 100;
        }
        
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentMessage, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-500 ${
      !isVisible ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-20" />
      
      {/* Main Loading Content */}
      <div className="relative text-center px-6 max-w-2xl">
        {/* Logo/Brand */}
        <div className="mb-8 animate-scale-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              <Zap className="w-6 h-6 text-secondary absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-gradient mb-2">
            MOV
          </h1>
          
          <p className="text-muted-foreground font-medium">
            Assessoria de Marketing
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-muted rounded-full h-1 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm text-primary font-bold">
            {progress}%
          </div>
        </div>

        {/* Dynamic Message */}
        <div className="min-h-[2rem] flex items-center justify-center">
          <p className="text-muted-foreground animate-fade-in font-medium">
            {currentMessage}
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                top: `${20 + (i * 10)}%`,
                left: `${15 + (i * 12)}%`,
                animationDelay: `${i * 400}ms`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;