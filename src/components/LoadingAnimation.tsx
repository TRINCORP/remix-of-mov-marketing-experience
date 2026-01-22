import { useEffect, useState, useRef } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [counter, setCounter] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Counter animation
  useEffect(() => {
    if (phase >= 1 && counter < 100) {
      const duration = 2500; // 2.5 seconds to reach 100
      const steps = 100;
      const interval = duration / steps;
      
      const timer = setInterval(() => {
        setCounter(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [phase]);

  // Canvas animation - Goat Agency inspired with geometric shapes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Grid lines for Goat-style editorial feel
    const drawGrid = (progress: number) => {
      ctx.strokeStyle = `hsla(45, 96%, 64%, ${0.03 * progress})`;
      ctx.lineWidth = 1;

      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Geometric shapes floating
    const shapes: any[] = [];
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: ['square', 'triangle', 'circle'][Math.floor(Math.random() * 3)],
        alpha: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = (timestamp: number) => {
      ctx.fillStyle = 'hsl(0 0% 2%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (phase >= 1) {
        drawGrid(Math.min(phase / 2, 1));
      }

      // Draw floating geometric shapes
      shapes.forEach(shape => {
        shape.y -= shape.speed;
        shape.rotation += shape.rotationSpeed;

        if (shape.y < -100) {
          shape.y = canvas.height + 100;
          shape.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `hsla(45, 96%, 64%, ${shape.alpha * (phase >= 1 ? 1 : 0)})`;
        ctx.lineWidth = 1.5;

        if (shape.type === 'square') {
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else if (shape.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Central glow pulse
      if (phase >= 2) {
        const pulseSize = 200 + Math.sin(timestamp * 0.003) * 50;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
        gradient.addColorStop(0, `hsla(45, 96%, 64%, ${phase >= 3 ? 0.3 : 0.15})`);
        gradient.addColorStop(0.5, `hsla(45, 96%, 64%, ${phase >= 3 ? 0.1 : 0.05})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase]);

  // Phase progression - faster, punchier like Goat
  useEffect(() => {
    const sequence = [
      { delay: 100, action: () => setPhase(1) },   // Start counter & grid
      { delay: 1000, action: () => setPhase(2) },  // Build energy
      { delay: 2800, action: () => setPhase(3) },  // MOV reveal
      { delay: 4200, action: () => setPhase(4) },  // Tagline
      { delay: 5500, action: () => {
        setIsExiting(true);
        setTimeout(onComplete, 600);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-600 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'hsl(0 0% 2%)' }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Progress bar at top - Goat style */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted/20">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ 
            width: `${counter}%`,
            boxShadow: '0 0 20px hsl(var(--primary))',
          }}
        />
      </div>

      {/* Counter - Large editorial number */}
      <div 
        className={`absolute top-8 right-8 md:top-12 md:right-12 transition-all duration-500 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <span 
          className="text-6xl md:text-8xl font-black tabular-nums"
          style={{
            color: 'hsl(var(--primary))',
            textShadow: '0 0 40px hsla(45, 96%, 64%, 0.3)',
          }}
        >
          {String(counter).padStart(3, '0')}
        </span>
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center px-4">
        
        {/* Pre-text - Editorial style */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-sm md:text-base tracking-[0.3em] text-muted-foreground uppercase font-medium">
            Assessoria de Marketing
          </span>
        </div>

        {/* MOV Logo - Glitch-in effect */}
        <div 
          className={`relative transition-all duration-700 ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: phase >= 3 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          }}
        >
          {/* Glitch layers */}
          {phase >= 3 && (
            <>
              <h1 
                className="absolute inset-0 text-[5rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tight animate-glitch-1"
                style={{
                  color: 'hsl(var(--primary))',
                  clipPath: 'inset(0 0 50% 0)',
                  opacity: 0.8,
                }}
              >
                MOV
              </h1>
              <h1 
                className="absolute inset-0 text-[5rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tight animate-glitch-2"
                style={{
                  color: 'hsl(var(--secondary))',
                  clipPath: 'inset(50% 0 0 0)',
                  opacity: 0.8,
                }}
              >
                MOV
              </h1>
            </>
          )}
          
          <h1 
            className="text-[5rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tight relative"
            style={{
              background: 'linear-gradient(135deg, hsl(45, 96%, 75%) 0%, hsl(45, 96%, 64%) 40%, hsl(38, 92%, 50%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: phase >= 3 
                ? 'drop-shadow(0 0 30px hsla(45, 96%, 64%, 0.5))' 
                : 'none',
            }}
          >
            MOV
          </h1>
        </div>

        {/* Tagline - Slide in */}
        <div 
          className={`mt-8 transition-all duration-700 ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Movemos sua marca para o{' '}
            <span 
              className="inline-block"
              style={{
                color: 'hsl(var(--primary))',
                textShadow: '0 0 20px hsla(45, 96%, 64%, 0.4)',
              }}
            >
              próximo nível
            </span>
          </p>
        </div>

        {/* Decorative line */}
        <div 
          className={`mt-12 mx-auto transition-all duration-1000 ${
            phase >= 4 ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div 
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ boxShadow: '0 0 10px hsl(var(--primary))' }}
          />
        </div>
      </div>

      {/* Corner accents - Editorial style */}
      <div 
        className={`absolute bottom-8 left-8 md:bottom-12 md:left-12 transition-all duration-700 ${
          phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-primary" />
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Social First
          </span>
        </div>
      </div>

      <div 
        className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 transition-all duration-700 ${
          phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Results Driven
          </span>
          <div className="w-8 h-px bg-primary" />
        </div>
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 2% / 0.7) 100%)',
        }}
      />

      {/* Custom Animations */}
      <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(3px); }
          40% { transform: translateX(-3px); }
          60% { transform: translateX(2px); }
          80% { transform: translateX(-2px); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s ease-in-out 1;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s ease-in-out 1;
          animation-delay: 0.05s;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
