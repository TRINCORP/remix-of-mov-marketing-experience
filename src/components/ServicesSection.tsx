import { useState, useRef, useEffect } from 'react';
import { 
  Brain, Rocket, Target, Megaphone, Palette, 
  BarChart3, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: number;
  icon: typeof Brain;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  stats: { value: string; label: string }[];
}

const services: Service[] = [
  {
    id: 1,
    icon: Brain,
    title: "Estratégia",
    tagline: "Dados que guiam",
    description: "Insights comportamentais para decisões precisas.",
    features: ["Mercado", "Personas", "Jornada"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    color: "#FFD93D",
    stats: [
      { value: "+250%", label: "ROI" },
      { value: "98%", label: "satisfação" },
    ],
  },
  {
    id: 2,
    icon: Rocket,
    title: "Growth",
    tagline: "Escale rápido",
    description: "Metodologias ágeis para crescimento exponencial.",
    features: ["Testes A/B", "Otimização", "Escala"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "#FF6B6B",
    stats: [
      { value: "3x", label: "velocidade" },
      { value: "+400%", label: "conversões" },
    ],
  },
  {
    id: 3,
    icon: Target,
    title: "Performance",
    tagline: "Cada real conta",
    description: "Campanhas de alta conversão com ROI mensurável.",
    features: ["Meta Ads", "Google", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "#4ECDC4",
    stats: [
      { value: "12x", label: "ROAS" },
      { value: "-65%", label: "CAC" },
    ],
  },
  {
    id: 4,
    icon: Palette,
    title: "Branding",
    tagline: "Marcas que ficam",
    description: "Identidade visual que conecta e destaca.",
    features: ["Logo", "UI/UX", "Guidelines"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    color: "#A855F7",
    stats: [
      { value: "+180%", label: "awareness" },
      { value: "50+", label: "marcas" },
    ],
  },
  {
    id: 5,
    icon: Megaphone,
    title: "Social",
    tagline: "Viralize certo",
    description: "Presença digital com engajamento autêntico.",
    features: ["Gestão", "Conteúdo", "Influencers"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    color: "#F472B6",
    stats: [
      { value: "5M+", label: "alcance" },
      { value: "+320%", label: "engajamento" },
    ],
  },
  {
    id: 6,
    icon: BarChart3,
    title: "Analytics",
    tagline: "Dados que decidem",
    description: "Inteligência para decisões estratégicas.",
    features: ["Dashboards", "Reports", "Insights"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "#06B6D4",
    stats: [
      { value: "100%", label: "visibilidade" },
      { value: "24/7", label: "monitoramento" },
    ],
  },
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'right' : 'left');
    setPreviousIndex(currentIndex);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Get visible cards (current + neighbors)
  const getVisibleCards = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + services.length) % services.length;
      result.push({ ...services[index], position: i });
    }
    return result;
  };

  const visibleCards = getVisibleCards();
  const currentService = services[currentIndex];
  const Icon = currentService.icon;

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${currentService.color}15 0%, transparent 60%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header with animated text transition */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles 
              className="w-5 h-5"
              style={{ 
                color: currentService.color,
                transition: 'color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              }} 
            />
            <span 
              className="text-sm font-bold tracking-widest uppercase"
              style={{ 
                color: currentService.color,
                transition: 'color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              Nossos Serviços
            </span>
            <Sparkles 
              className="w-5 h-5"
              style={{ 
                color: currentService.color,
                transition: 'color 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              }} 
            />
          </div>
          
          <div className="relative overflow-hidden">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
              <span className="text-foreground">Soluções que</span>
              <br />
              <span 
                className="inline-block"
                style={{
                  background: `linear-gradient(135deg, ${currentService.color} 0%, ${currentService.color}CC 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                  filter: `drop-shadow(0 4px 30px ${currentService.color}40)`,
                }}
              >
                transformam
              </span>
            </h2>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Descubra como cada serviço é projetado para impulsionar seu negócio ao próximo nível.
          </p>
        </div>

        {/* Carousel Container */}
        <div className={`relative transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Cards Carousel */}
          <div 
            ref={carouselRef}
            className="relative h-[500px] md:h-[550px] flex items-center justify-center perspective-1000"
          >
            {visibleCards.map((service, idx) => {
              const Icon = service.icon;
              const isCenter = service.position === 0;
              const isLeft = service.position === -1;
              const isRight = service.position === 1;
              const isFarLeft = service.position === -2;
              const isFarRight = service.position === 2;
              
              let transform = '';
              let zIndex = 0;
              let opacity = 1;
              let scale = 1;
              let blur = 0;
              let grayscale = 0;

              // Enhanced positioning with smoother transitions
              if (isCenter) {
                transform = 'translateX(0) rotateY(0deg) translateZ(80px) scale(1)';
                zIndex = 40;
                scale = 1;
                blur = 0;
                grayscale = 0;
              } else if (isLeft) {
                transform = 'translateX(-85%) rotateY(25deg) translateZ(-30px)';
                zIndex = 30;
                scale = 0.85;
                opacity = 0.7;
                blur = 2;
                grayscale = 40;
              } else if (isRight) {
                transform = 'translateX(85%) rotateY(-25deg) translateZ(-30px)';
                zIndex = 30;
                scale = 0.85;
                opacity = 0.7;
                blur = 2;
                grayscale = 40;
              } else if (isFarLeft) {
                transform = 'translateX(-160%) rotateY(40deg) translateZ(-100px)';
                zIndex = 10;
                scale = 0.65;
                opacity = 0.2;
                blur = 4;
                grayscale = 70;
              } else if (isFarRight) {
                transform = 'translateX(160%) rotateY(-40deg) translateZ(-100px)';
                zIndex = 10;
                scale = 0.65;
                opacity = 0.2;
                blur = 4;
                grayscale = 70;
              }

              return (
                <div
                  key={`${service.id}-${service.position}`}
                  className={`absolute w-[280px] md:w-[360px] cursor-pointer ${
                    isCenter ? '' : 'pointer-events-none md:pointer-events-auto'
                  }`}
                  style={{
                    transform: `${transform} scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: `blur(${blur}px) grayscale(${grayscale}%)`,
                    transition: isAnimating 
                      ? 'all 1s cubic-bezier(0.23, 1, 0.32, 1)' 
                      : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    willChange: 'transform, opacity, filter',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => !isCenter && goToSlide(services.findIndex(s => s.id === service.id))}
                  onMouseEnter={() => isCenter && setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className={`relative bg-card/90 backdrop-blur-md rounded-2xl overflow-hidden border ${
                      isCenter 
                        ? 'border-transparent' 
                        : 'border-border/20'
                    }`}
                    style={{
                      borderColor: isCenter ? `${service.color}50` : undefined,
                      boxShadow: isCenter ? `0 30px 80px -20px ${service.color}50, 0 15px 40px -15px rgba(0,0,0,0.4)` : '0 10px 30px -10px rgba(0,0,0,0.2)',
                      transition: 'box-shadow 0.8s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s ease',
                    }}
                  >
                    {/* Card Image - Smaller */}
                    <div className="relative h-40 md:h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        style={{
                          transform: hoveredCard === service.id ? 'scale(1.12)' : 'scale(1)',
                          filter: hoveredCard === service.id ? 'brightness(1.1)' : 'brightness(1)',
                          transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease',
                        }}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, hsl(var(--card)) 5%, ${service.color}15 60%, transparent 100%)`,
                          transition: 'opacity 0.6s ease',
                        }}
                      />
                      
                      {/* Floating Icon */}
                      <div 
                        className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ 
                          backgroundColor: service.color,
                          boxShadow: `0 8px 24px ${service.color}50`,
                          transform: hoveredCard === service.id ? 'scale(1.15) rotate(-8deg)' : 'scale(1) rotate(0deg)',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                    </div>

                    {/* Card Content - Minimal */}
                    <div className="p-5 md:p-6">
                      {/* Tagline */}
                      <span 
                        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block"
                        style={{ 
                          color: service.color,
                          transition: 'color 0.5s ease',
                        }}
                      >
                        {service.tagline}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 tracking-tight">
                        {service.title}
                      </h3>

                      {/* Description - Short */}
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Minimal Feature Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-muted/40 text-muted-foreground border border-border/30"
                            style={{
                              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Stats - Compact */}
                      <div className="flex items-center gap-5 pt-4 border-t border-border/30">
                        {service.stats.map((stat, i) => (
                          <div 
                            key={i}
                            style={{
                              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                          >
                            <span 
                              className="text-xl md:text-2xl font-black block"
                              style={{ 
                                color: service.color,
                                transition: 'color 0.5s ease',
                              }}
                            >
                              {stat.value}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Animated Border Glow */}
                    {isCenter && (
                      <div 
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          boxShadow: `inset 0 0 50px ${service.color}15, 0 0 80px ${service.color}10`,
                          opacity: hoveredCard === service.id ? 1 : 0,
                          transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls - Refined */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="group w-11 h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30"
              style={{
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <ChevronLeft 
                className="w-4 h-4 group-hover:-translate-x-0.5"
                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
            </button>

            {/* Elegant Dots */}
            <div className="flex items-center gap-2.5">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative p-1"
                >
                  <span 
                    className="block rounded-full"
                    style={{
                      width: index === currentIndex ? '24px' : '6px',
                      height: '6px',
                      backgroundColor: index === currentIndex ? service.color : 'hsl(var(--muted-foreground) / 0.2)',
                      boxShadow: index === currentIndex ? `0 0 16px ${service.color}70` : 'none',
                      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="group w-11 h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30"
              style={{
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <ChevronRight 
                className="w-4 h-4 group-hover:translate-x-0.5"
                style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`flex flex-col items-center justify-center gap-6 mt-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            className="btn-hero group text-base px-8 py-6"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Solicitar Orçamento Gratuito</span>
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            ✨ Resposta em até <span className="text-primary font-bold">24 horas</span>
          </p>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
