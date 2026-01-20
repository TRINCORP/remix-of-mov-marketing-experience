import { useEffect, useState, useRef } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  // Energy particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const createParticle = (burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = burst ? Math.random() * 50 : Math.random() * 300 + 200;
      const speed = burst ? Math.random() * 8 + 4 : Math.random() * 2 + 0.5;
      
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        targetX: centerX,
        targetY: centerY,
        size: Math.random() * 3 + 1,
        speed,
        alpha: Math.random() * 0.8 + 0.2,
        angle,
        burst,
        burstAngle: angle,
        burstSpeed: Math.random() * 15 + 10,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
      };
    };

    let animationId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add particles based on phase
      if (phase >= 1 && phase < 3) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(createParticle(false));
        }
      }

      // Burst particles when MOV appears
      if (phase === 3 && particlesRef.current.filter(p => p.burst).length < 100) {
        for (let i = 0; i < 50; i++) {
          particlesRef.current.push(createParticle(true));
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        if (p.burst) {
          // Explode outward
          p.x += Math.cos(p.burstAngle) * p.burstSpeed;
          p.y += Math.sin(p.burstAngle) * p.burstSpeed;
          p.burstSpeed *= 0.96;
          p.life -= p.decay;
          p.alpha = p.life;
        } else {
          // Move toward center
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            p.x += (dx / dist) * p.speed;
            p.y += (dy / dist) * p.speed;
          } else {
            p.life -= 0.05;
          }
          p.alpha = Math.min(p.life, p.alpha);
        }

        if (p.life <= 0) return false;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `hsla(45, 96%, 64%, ${p.alpha})`);
        gradient.addColorStop(0.5, `hsla(42, 89%, 58%, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45, 96%, 74%, ${p.alpha})`;
        ctx.fill();

        return true;
      });

      // Draw energy lines converging to center
      if (phase >= 1 && phase < 3) {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + timestamp * 0.001;
          const startDist = 400 + Math.sin(timestamp * 0.003 + i) * 50;
          const endDist = 100 + Math.sin(timestamp * 0.005 + i) * 30;
          
          const startX = centerX + Math.cos(angle) * startDist;
          const startY = centerY + Math.sin(angle) * startDist;
          const endX = centerX + Math.cos(angle) * endDist;
          const endY = centerY + Math.sin(angle) * endDist;

          const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
          lineGradient.addColorStop(0, 'transparent');
          lineGradient.addColorStop(0.5, 'hsla(45, 96%, 64%, 0.3)');
          lineGradient.addColorStop(1, 'hsla(45, 96%, 64%, 0.6)');

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Central glow
      if (phase >= 2) {
        const glowSize = phase >= 3 ? 250 : 150;
        const glowAlpha = phase >= 3 ? 0.4 : 0.2;
        const centralGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
        centralGlow.addColorStop(0, `hsla(45, 96%, 64%, ${glowAlpha})`);
        centralGlow.addColorStop(0.5, `hsla(45, 96%, 54%, ${glowAlpha * 0.5})`);
        centralGlow.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = centralGlow;
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

  // Phase progression
  useEffect(() => {
    const sequence = [
      { delay: 100, action: () => setPhase(1) },  // Start particles
      { delay: 1500, action: () => setPhase(2) }, // Build energy
      { delay: 2500, action: () => setPhase(3) }, // MOV appears with burst
      { delay: 4500, action: () => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-800 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: 'hsl(0 0% 2%)' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Ambient light rays */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg,
              hsla(45, 96%, 64%, 0.03) 10deg,
              transparent 20deg,
              hsla(45, 96%, 64%, 0.05) 30deg,
              transparent 40deg,
              hsla(45, 96%, 64%, 0.03) 50deg,
              transparent 60deg,
              hsla(45, 96%, 64%, 0.04) 70deg,
              transparent 80deg
            )
          `,
          animation: phase >= 2 ? 'slowSpin 20s linear infinite' : 'none',
        }}
      />

      {/* Central energy ring */}
      <div 
        className={`absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full transition-all duration-700 ${
          phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          border: '1px solid hsla(45, 96%, 64%, 0.2)',
          boxShadow: phase >= 3 
            ? '0 0 60px hsla(45, 96%, 64%, 0.3), inset 0 0 60px hsla(45, 96%, 64%, 0.1)'
            : '0 0 30px hsla(45, 96%, 64%, 0.15)',
          animation: phase >= 2 ? 'pulse-ring 2s ease-in-out infinite' : 'none',
        }}
      />

      {/* Secondary ring */}
      <div 
        className={`absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px] rounded-full transition-all duration-1000 ${
          phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          border: '1px solid hsla(45, 96%, 64%, 0.1)',
          animation: phase >= 2 ? 'pulse-ring 3s ease-in-out infinite reverse' : 'none',
          animationDelay: '500ms',
        }}
      />

      {/* MOV Text - The Star */}
      <div 
        className={`relative z-10 transition-all duration-700 ${
          phase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: phase >= 3 
            ? 'scale(1) translateY(0)' 
            : 'scale(0.5) translateY(50px)',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <h1 
          className="text-[6rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, hsl(45, 96%, 70%) 0%, hsl(45, 96%, 64%) 30%, hsl(42, 89%, 58%) 70%, hsl(38, 92%, 50%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: phase >= 3 ? 'drop-shadow(0 0 40px hsla(45, 96%, 64%, 0.6)) drop-shadow(0 0 80px hsla(45, 96%, 64%, 0.4))' : 'none',
            animation: phase >= 3 ? 'text-glow 2s ease-in-out infinite alternate' : 'none',
          }}
        >
          MOV
        </h1>

        {/* Underline accent */}
        <div 
          className={`absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 ${
            phase >= 3 ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px hsla(45, 96%, 64%, 0.8)',
          }}
        />
      </div>

      {/* Impact flash */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          phase === 3 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, hsla(45, 96%, 64%, 0.3) 0%, transparent 70%)',
          animation: phase === 3 ? 'flash 0.5s ease-out forwards' : 'none',
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 2% / 0.8) 100%)',
        }}
      />

      {/* Custom Animations */}
      <style>{`
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-ring {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.7;
          }
        }
        
        @keyframes text-glow {
          0% {
            filter: drop-shadow(0 0 40px hsla(45, 96%, 64%, 0.6)) drop-shadow(0 0 80px hsla(45, 96%, 64%, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 60px hsla(45, 96%, 64%, 0.8)) drop-shadow(0 0 100px hsla(45, 96%, 64%, 0.5));
          }
        }
        
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
