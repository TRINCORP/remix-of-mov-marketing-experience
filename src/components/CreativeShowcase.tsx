import { useState, useEffect, useRef } from 'react';
import { Zap, Target, TrendingUp, Users, Rocket, Heart } from 'lucide-react';

interface ShowcaseItem {
  id: number;
  image: string;
  caption: string;
  rotation: number;
  scale: number;
  zIndex: number;
}

const images: ShowcaseItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    caption: "Brainstorm criativo",
    rotation: -8,
    scale: 1,
    zIndex: 3,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=500&fit=crop",
    caption: "Team em ação",
    rotation: 5,
    scale: 0.95,
    zIndex: 2,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop",
    caption: "Colaboração",
    rotation: -3,
    scale: 1.05,
    zIndex: 4,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop",
    caption: "Estratégia digital",
    rotation: 7,
    scale: 0.9,
    zIndex: 1,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=500&fit=crop",
    caption: "Resultados reais",
    rotation: -5,
    scale: 1,
    zIndex: 2,
  },
];

const floatingIcons = [
  { Icon: Zap, color: '#F59E0B', delay: 0 },
  { Icon: Target, color: '#EC4899', delay: 200 },
  { Icon: TrendingUp, color: '#10B981', delay: 400 },
  { Icon: Users, color: '#8B5CF6', delay: 600 },
  { Icon: Rocket, color: '#3B82F6', delay: 800 },
  { Icon: Heart, color: '#EF4444', delay: 1000 },
];

const PolaroidCard = ({ item, index, isHovered }: { item: ShowcaseItem; index: number; isHovered: boolean }) => {
  const [localHover, setLocalHover] = useState(false);

  return (
    <div
      className="absolute transition-all duration-500 cursor-pointer group"
      style={{
        transform: `
          rotate(${localHover ? 0 : item.rotation}deg) 
          scale(${localHover ? 1.1 : item.scale})
          translateY(${localHover ? -20 : 0}px)
        `,
        zIndex: localHover ? 10 : item.zIndex,
        left: `${15 + index * 15}%`,
        top: `${10 + (index % 3) * 10}%`,
      }}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
    >
      {/* Polaroid frame */}
      <div 
        className="bg-white p-3 pb-12 rounded shadow-2xl transition-shadow duration-300"
        style={{
          boxShadow: localHover 
            ? '0 25px 50px rgba(0,0,0,0.4), 0 0 0 2px hsl(var(--primary))' 
            : '0 15px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Image */}
        <div className="w-48 h-60 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className="font-handwriting text-gray-700 text-lg">{item.caption}</span>
        </div>

        {/* Decorative tape */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 opacity-70"
          style={{
            background: `linear-gradient(135deg, hsla(45, 80%, 70%, 0.8), hsla(45, 80%, 60%, 0.6))`,
            transform: `translateX(-50%) rotate(${Math.random() * 10 - 5}deg)`,
          }}
        />
      </div>
    </div>
  );
};

const CreativeShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* Floating marketing icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, color, delay }, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + Math.sin(index) * 30}%`,
              transitionDelay: `${delay}ms`,
              animation: isVisible ? `iconFloat 4s ease-in-out infinite ${delay}ms` : 'none',
            }}
          >
            <div 
              className="p-4 rounded-2xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                border: `1px solid ${color}40`,
                boxShadow: `0 10px 40px ${color}30`,
              }}
            >
              <Icon className="w-8 h-8" style={{ color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Rocket className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-sm font-bold text-primary tracking-wider">NOSSO PROCESSO CRIATIVO</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-foreground">Criatividade que </span>
              <span className="text-gradient relative">
                TRANSFORMA
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-4 text-primary" 
                  viewBox="0 0 200 20"
                >
                  <path 
                    d="M0,10 Q50,0 100,10 T200,10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    className="animate-draw"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Nossa equipe combina <span className="text-primary font-semibold">estratégia</span>, 
              <span className="text-primary font-semibold"> criatividade</span> e 
              <span className="text-primary font-semibold"> dados</span> para criar campanhas 
              que não apenas chamam atenção, mas geram resultados reais.
            </p>

            {/* Fun stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { emoji: '🎨', label: 'Ideias malucas/dia', value: '147' },
                { emoji: '☕', label: 'Cafés consumidos', value: '∞' },
                { emoji: '🚀', label: 'Campanhas lançadas', value: '500+' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-muted/50 rounded-full px-5 py-3 border border-border/50"
                >
                  <span className="text-2xl">{stat.emoji}</span>
                  <div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Collage */}
          <div 
            className={`relative h-[500px] md:h-[600px] transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            {images.map((item, index) => (
              <PolaroidCard 
                key={item.id} 
                item={item} 
                index={index}
                isHovered={false}
              />
            ))}

            {/* Decorative elements */}
            <div className="absolute bottom-10 right-10 text-6xl animate-bounce">
              🎯
            </div>
            <div className="absolute top-20 left-5 text-4xl animate-float">
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }

        @keyframes iconFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(5deg); 
          }
        }

        @keyframes draw {
          from {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 2s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default CreativeShowcase;
