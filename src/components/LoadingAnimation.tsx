import { useEffect, useState, useRef } from 'react';
import { Rocket, Zap, Target, TrendingUp, Sparkles, Star, Heart } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<any[]>([]);
  const [letterStates, setLetterStates] = useState({
    m: { visible: false, bouncing: false },
    o: { visible: false, spinning: false, winking: false },
    v: { visible: false, bouncing: false }
  });

  // Confetti particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      'hsl(45, 96%, 64%)',   // Primary gold
      'hsl(42, 89%, 68%)',   // Secondary gold
      'hsl(0, 84%, 60%)',    // Red
      'hsl(280, 84%, 60%)',  // Purple
      'hsl(180, 84%, 60%)',  // Cyan
      'hsl(120, 84%, 50%)',  // Green
      'hsl(200, 84%, 60%)',  // Blue
    ];

    const shapes = ['circle', 'square', 'triangle', 'star'];

    const createConfetti = () => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
      };
    };

    const drawShape = (particle: any) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = i % 2 === 0 ? particle.size / 2 : particle.size / 4;
            if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
            else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    };

    let animationId: number;
    let lastConfettiTime = 0;

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add confetti based on phase
      if (phase >= 4 && timestamp - lastConfettiTime > 30) {
        for (let i = 0; i < 5; i++) {
          confettiRef.current.push(createConfetti());
        }
        lastConfettiTime = timestamp;
      }

      // Update and draw confetti
      confettiRef.current = confettiRef.current.filter((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 2;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.1; // Gravity

        if (p.y < canvas.height + 50) {
          drawShape(p);
          return true;
        }
        return false;
      });

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

  // Phase progression with letter animations
  useEffect(() => {
    const sequence = [
      { delay: 300, action: () => setPhase(1) },
      { delay: 800, action: () => {
        setLetterStates(prev => ({ ...prev, m: { visible: true, bouncing: true } }));
      }},
      { delay: 1200, action: () => {
        setLetterStates(prev => ({ ...prev, o: { visible: true, spinning: true, winking: false } }));
      }},
      { delay: 1600, action: () => {
        setLetterStates(prev => ({ ...prev, v: { visible: true, bouncing: true } }));
      }},
      { delay: 2200, action: () => {
        setLetterStates(prev => ({ ...prev, o: { ...prev.o, spinning: false, winking: true } }));
        setPhase(2);
      }},
      { delay: 2800, action: () => setPhase(3) },
      { delay: 3500, action: () => setPhase(4) },
      { delay: 4500, action: () => setPhase(5) },
      { delay: 6000, action: () => {
        setIsExiting(true);
        setTimeout(onComplete, 1000);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const floatingIcons = [
    { Icon: Rocket, delay: 0, position: 'top-[15%] left-[10%]' },
    { Icon: Zap, delay: 200, position: 'top-[20%] right-[15%]' },
    { Icon: Target, delay: 400, position: 'bottom-[25%] left-[15%]' },
    { Icon: TrendingUp, delay: 600, position: 'bottom-[20%] right-[10%]' },
    { Icon: Sparkles, delay: 100, position: 'top-[40%] left-[5%]' },
    { Icon: Star, delay: 300, position: 'top-[35%] right-[8%]' },
    { Icon: Heart, delay: 500, position: 'bottom-[40%] right-[5%]' },
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: 'hsl(0 0% 2%)' }}
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Animated Background Gradient */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          phase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(45 96% 64% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(42 89% 68% / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(280 84% 60% / 0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* Spotlight Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(45 96% 64% / 0.2) 0%, transparent 60%)',
        }}
      />

      {/* Floating Marketing Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} transition-all duration-700 ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: phase >= 3 ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
            transitionDelay: `${delay}ms`,
          }}
        >
          <Icon 
            className="text-primary animate-bounce" 
            size={28}
            style={{
              animationDelay: `${delay}ms`,
              animationDuration: `${2 + index * 0.3}s`,
              filter: 'drop-shadow(0 0 10px hsl(45 96% 64% / 0.5))',
            }}
          />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 text-center">
        
        {/* Decorative Circles */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-2 border-primary/30 transition-all duration-1000 ${
            phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            animation: phase >= 2 ? 'spin 15s linear infinite' : 'none',
          }}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-primary/15 transition-all duration-1000 ${
            phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            animation: phase >= 2 ? 'spin 25s linear infinite reverse' : 'none',
            animationDelay: '300ms',
          }}
        />

        {/* FUN MOV Letters with Individual Animations */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4 mb-8">
          {/* M */}
          <span
            className={`text-8xl md:text-[12rem] font-black transition-all inline-block ${
              letterStates.m.visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, hsl(45 96% 64%), hsl(42 89% 68%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px hsl(45 96% 64% / 0.5)',
              transform: letterStates.m.visible 
                ? 'translateY(0) rotate(0deg)' 
                : 'translateY(-200px) rotate(-30deg)',
              animation: letterStates.m.bouncing ? 'letterBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
              transitionDuration: '600ms',
            }}
          >
            M
          </span>

          {/* O - The Star of the Show */}
          <span
            className={`text-8xl md:text-[12rem] font-black transition-all inline-block relative ${
              letterStates.o.visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: letterStates.o.winking 
                ? 'linear-gradient(135deg, hsl(0 84% 60%), hsl(45 96% 64%))'
                : 'linear-gradient(135deg, hsl(45 96% 64%), hsl(42 89% 68%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: letterStates.o.winking 
                ? '0 0 80px hsl(0 84% 60% / 0.6)'
                : '0 0 60px hsl(45 96% 64% / 0.5)',
              transform: letterStates.o.visible 
                ? `scale(${letterStates.o.winking ? 1.2 : 1}) ${letterStates.o.spinning ? 'rotate(360deg)' : 'rotate(0deg)'}`
                : 'scale(0)',
              transitionDuration: letterStates.o.spinning ? '500ms' : '300ms',
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
          >
            O
            {/* Wink effect - closing eye line */}
            {letterStates.o.winking && (
              <span 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: 'wink 0.3s ease-in-out',
                }}
              >
                <span 
                  className="w-12 md:w-20 h-1 md:h-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                  style={{
                    boxShadow: '0 0 20px hsl(45 96% 64% / 0.8)',
                  }}
                />
              </span>
            )}
          </span>

          {/* V */}
          <span
            className={`text-8xl md:text-[12rem] font-black transition-all inline-block ${
              letterStates.v.visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, hsl(45 96% 64%), hsl(42 89% 68%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px hsl(45 96% 64% / 0.5)',
              transform: letterStates.v.visible 
                ? 'translateY(0) rotate(0deg)' 
                : 'translateY(200px) rotate(30deg)',
              animation: letterStates.v.bouncing ? 'letterBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
              transitionDuration: '600ms',
            }}
          >
            V
          </span>
        </div>

        {/* Fun Tagline with Typewriter-ish Effect */}
        <div 
          className={`transition-all duration-700 ${
            phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p 
            className="text-xl md:text-3xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(45 96% 64%), hsl(var(--foreground)))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: phase >= 3 ? 'shimmer-text 2s linear infinite' : 'none',
            }}
          >
            ✨ Marketing que MOVimenta! ✨
          </p>
        </div>

        {/* Energetic Subtitle */}
        <div 
          className={`transition-all duration-700 ${
            phase >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Prepare-se para decolar 🚀
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>💡</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '100ms' }}>🎯</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>📈</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>🔥</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '400ms' }}>⭐</span>
          </div>
        </div>

        {/* Loading indicator with fun animation */}
        <div 
          className={`mt-12 transition-all duration-700 ${
            phase >= 5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-foreground/70 text-sm">Carregando a magia</span>
            <span className="flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div 
        className={`absolute top-8 left-8 transition-all duration-500 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
      </div>
      <div 
        className={`absolute top-8 right-8 transition-all duration-500 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 border-r-2 border-t-2 border-primary/50 rounded-tr-xl" />
      </div>
      <div 
        className={`absolute bottom-8 left-8 transition-all duration-500 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 border-l-2 border-b-2 border-primary/50 rounded-bl-xl" />
      </div>
      <div 
        className={`absolute bottom-8 right-8 transition-all duration-500 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 2% / 0.6) 100%)',
        }}
      />

      {/* Custom Animations */}
      <style>{`
        @keyframes letterBounce {
          0% {
            transform: translateY(-200px) rotate(-20deg) scale(0.5);
          }
          50% {
            transform: translateY(20px) rotate(5deg) scale(1.1);
          }
          70% {
            transform: translateY(-10px) rotate(-2deg) scale(0.95);
          }
          85% {
            transform: translateY(5px) rotate(1deg) scale(1.02);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }
        
        @keyframes wink {
          0%, 100% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        @keyframes shimmer-text {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
