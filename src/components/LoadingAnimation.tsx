import { useState, useEffect, useRef } from 'react';

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    color: string;
    type: 'spark' | 'glow' | 'trail';
  }

  // Particle system for golden sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      'hsl(45, 96%, 64%)',   // Primary gold
      'hsl(45, 96%, 74%)',   // Light gold
      'hsl(42, 89%, 68%)',   // Secondary gold
      'hsl(45, 96%, 84%)',   // Bright gold
      'hsl(35, 90%, 60%)',   // Deep gold
    ];

    const createParticle = (centerX: number, centerY: number, type: Particle['type'] = 'spark'): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = type === 'spark' ? 2 + Math.random() * 4 : 0.5 + Math.random() * 2;
      
      return {
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: type === 'glow' ? 20 + Math.random() * 40 : 2 + Math.random() * 4,
        opacity: type === 'glow' ? 0.1 + Math.random() * 0.2 : 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 60 + Math.random() * 120,
        color: colors[Math.floor(Math.random() * colors.length)],
        type
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Add new particles based on phase
      if (phase >= 1 && phase < 4) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(createParticle(centerX, centerY, 'spark'));
        }
        if (Math.random() > 0.7) {
          particlesRef.current.push(createParticle(centerX, centerY, 'glow'));
        }
      }

      // Explosion of particles on phase 2
      if (phase === 2 && particlesRef.current.length < 100) {
        for (let i = 0; i < 20; i++) {
          particlesRef.current.push(createParticle(centerX, centerY, 'spark'));
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // Subtle gravity
        p.vx *= 0.99; // Friction
        p.vy *= 0.99;

        const lifeRatio = 1 - (p.life / p.maxLife);
        const currentOpacity = p.opacity * lifeRatio;

        if (p.type === 'glow') {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color.replace(')', `, ${currentOpacity})`).replace('hsl', 'hsla'));
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw spark with glow effect
          ctx.save();
          ctx.globalAlpha = currentOpacity;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Trail effect
          ctx.save();
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.5 * lifeRatio;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
          ctx.stroke();
          ctx.restore();
        }

        return p.life < p.maxLife;
      });

      // Draw central glow
      if (phase >= 1) {
        const glowIntensity = phase === 2 ? 0.4 : 0.2;
        const glowSize = phase === 2 ? 300 : 200;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
        gradient.addColorStop(0, `hsla(45, 96%, 64%, ${glowIntensity})`);
        gradient.addColorStop(0.5, `hsla(45, 96%, 64%, ${glowIntensity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  // Phase progression - Extended timings for more impact
  useEffect(() => {
    const timings = [
      { delay: 200, nextPhase: 1 },    // Start particles
      { delay: 1200, nextPhase: 2 },   // MOV reveal
      { delay: 2500, nextPhase: 3 },   // Tagline reveal
      { delay: 4000, nextPhase: 4 },   // Final message
      { delay: 6000, nextPhase: 5 },   // Begin exit
    ];

    const timers: NodeJS.Timeout[] = [];

    timings.forEach(({ delay, nextPhase }) => {
      const timer = setTimeout(() => {
        if (nextPhase === 5) {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 1000);
        } else {
          setPhase(nextPhase);
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: 'hsl(var(--background))',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rotating gradient orbs */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full transition-all duration-1000 ${
            phase >= 1 ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(45 96% 64% / 0.3) 0%, transparent 70%)',
            animation: 'spin 20s linear infinite',
          }}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-all duration-1000 ${
            phase >= 2 ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(42 89% 68% / 0.4) 0%, transparent 60%)',
            animation: 'spin 15s linear infinite reverse',
          }}
        />

        {/* Light rays */}
        {phase >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[200vh] w-[2px] origin-center animate-pulse"
                style={{
                  background: `linear-gradient(to top, transparent, hsl(45 96% 64% / ${0.1 + (i % 3) * 0.05}), transparent)`,
                  transform: `rotate(${i * 30}deg)`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        
        {/* Decorative golden rings around MOV */}
        <div className="relative">
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border-2 border-primary/20 transition-all duration-1000 ${
              phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              animation: phase >= 2 ? 'spin 20s linear infinite' : 'none',
            }}
          />
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-primary/10 transition-all duration-1000 ${
              phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              animation: phase >= 2 ? 'spin 30s linear infinite reverse' : 'none',
              animationDelay: '500ms',
            }}
          />
        </div>

        {/* MOV Text with dramatic reveal */}
        <div className="overflow-hidden mb-4">
          <h1 
            className={`text-8xl md:text-9xl lg:text-[12rem] font-black transition-all duration-1000 ease-out ${
              phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, hsl(45, 96%, 64%) 0%, hsl(45, 96%, 74%) 50%, hsl(42, 89%, 68%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: phase >= 2 ? '0 0 80px hsl(45 96% 64% / 0.5)' : 'none',
              letterSpacing: '-0.05em',
            }}
          >
            MOV
          </h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-8">
          <p 
            className={`text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase transition-all duration-700 ${
              phase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{
              color: 'hsl(var(--muted-foreground))',
              transitionDelay: '200ms',
            }}
          >
            Assessoria de Marketing
          </p>
        </div>

        {/* Animated divider */}
        <div 
          className={`h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8 transition-all duration-1000 ${
            phase >= 3 ? 'w-64 md:w-96 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        {/* Impact message */}
        <div className="overflow-hidden">
          <p 
            className={`text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
              phase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              color: 'hsl(var(--foreground) / 0.8)',
            }}
          >
            <span className="text-primary font-bold">Transformamos</span> sua marca em{' '}
            <span className="text-primary font-bold">referência digital</span>
          </p>
        </div>

        {/* Loading indicator */}
        <div 
          className={`mt-12 flex flex-col items-center gap-4 transition-all duration-500 ${
            phase >= 1 && phase < 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                style={{
                  animation: 'pulse 1s ease-in-out infinite',
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Enter prompt */}
        <div 
          className={`mt-8 transition-all duration-700 ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="text-sm text-muted-foreground animate-pulse">
            Preparando sua experiência...
          </p>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div 
        className={`absolute top-0 left-0 w-32 h-32 transition-all duration-1000 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, hsl(45 96% 64% / 0.1) 0%, transparent 50%)',
        }}
      />
      <div 
        className={`absolute bottom-0 right-0 w-32 h-32 transition-all duration-1000 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(315deg, hsl(45 96% 64% / 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)',
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default LoadingAnimation;
