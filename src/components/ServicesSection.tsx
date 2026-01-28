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
    title: "Estratégia Digital",
    tagline: "Pense grande. Aja maior.",
    description: "Planejamento baseado em dados e insights comportamentais para maximizar resultados e dominar seu mercado.",
    features: ["Análise de Mercado", "Personas", "Customer Journey", "Planejamento"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    color: "#FFD93D",
    stats: [
      { value: "+250%", label: "ROI médio" },
      { value: "98%", label: "satisfação" },
    ],
  },
  {
    id: 2,
    icon: Rocket,
    title: "Growth Hacking",
    tagline: "Crescimento exponencial.",
    description: "Técnicas inovadoras e metodologias ágeis para acelerar o crescimento da sua marca no digital.",
    features: ["Experimentação", "Otimização", "Escalabilidade", "A/B Testing"],
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
    tagline: "Cada real conta.",
    description: "Campanhas de alta conversão com ROI mensurável e otimização em tempo real para máximo retorno.",
    features: ["Meta Ads", "Google Ads", "Analytics", "Remarketing"],
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
    tagline: "Marcas memoráveis.",
    description: "Identidade visual impactante que conecta emocionalmente com seu público e destaca sua marca.",
    features: ["Logo Design", "UI/UX", "Brand Book", "Guidelines"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    color: "#A855F7",
    stats: [
      { value: "+180%", label: "awareness" },
      { value: "50+", label: "marcas criadas" },
    ],
  },
  {
    id: 5,
    icon: Megaphone,
    title: "Social Media",
    tagline: "Viralize com propósito.",
    description: "Presença digital marcante com conteúdo estratégico, engajamento autêntico e alcance massivo.",
    features: ["Gestão", "Conteúdo", "Influencers", "Community"],
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
    title: "Analytics & BI",
    tagline: "Dados que decidem.",
    description: "Inteligência de dados para decisões estratégicas precisas e otimização contínua de resultados.",
    features: ["Dashboards", "Reports", "Insights", "Previsões"],
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
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get visible cards (current + neighbors)
  const getVisibleCards = () => {
    const result = [];
    for (let i = -1; i <= 2; i++) {
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
        {/* Section Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Nossos Serviços</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
            <span className="text-foreground">Soluções que</span>
            <br />
            <span className="text-gradient">transformam</span>
          </h2>
          
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
              const isFar = service.position === 2;
              
              let transform = '';
              let zIndex = 0;
              let opacity = 1;
              let scale = 1;

              if (isCenter) {
                transform = 'translateX(0) rotateY(0deg)';
                zIndex = 30;
                scale = 1;
              } else if (isLeft) {
                transform = 'translateX(-85%) rotateY(15deg)';
                zIndex = 20;
                scale = 0.85;
                opacity = 0.6;
              } else if (isRight) {
                transform = 'translateX(85%) rotateY(-15deg)';
                zIndex = 20;
                scale = 0.85;
                opacity = 0.6;
              } else if (isFar) {
                transform = 'translateX(170%) rotateY(-25deg)';
                zIndex = 10;
                scale = 0.7;
                opacity = 0.3;
              }

              return (
                <div
                  key={`${service.id}-${service.position}`}
                  className={`absolute w-[320px] md:w-[400px] transition-all duration-500 ease-out cursor-pointer ${
                    isCenter ? '' : 'pointer-events-none md:pointer-events-auto'
                  }`}
                  style={{
                    transform: `${transform} scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  onClick={() => !isCenter && goToSlide(services.findIndex(s => s.id === service.id))}
                  onMouseEnter={() => isCenter && setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className={`relative bg-card rounded-3xl overflow-hidden border transition-all duration-500 ${
                      isCenter 
                        ? 'border-primary/30 shadow-2xl' 
                        : 'border-border/30'
                    }`}
                    style={{
                      boxShadow: isCenter ? `0 25px 80px ${service.color}30, 0 0 40px ${service.color}10` : undefined,
                    }}
                  >
                    {/* Card Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === service.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, hsl(var(--card)) 0%, ${service.color}20 50%, transparent 100%)`,
                        }}
                      />
                      
                      {/* Icon Badge */}
                      <div 
                        className="absolute top-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300"
                        style={{ 
                          backgroundColor: `${service.color}`,
                          boxShadow: `0 8px 32px ${service.color}60`,
                          transform: hoveredCard === service.id ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                        }}
                      >
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      {/* Tagline */}
                      <span 
                        className="text-xs font-bold tracking-widest uppercase mb-2 block"
                        style={{ color: service.color }}
                      >
                        {service.tagline}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm md:text-base mb-5 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-muted/50 text-muted-foreground border border-border/50"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-6 pt-5 border-t border-border/50">
                        {service.stats.map((stat, i) => (
                          <div key={i}>
                            <span 
                              className="text-2xl md:text-3xl font-black block"
                              style={{ color: service.color }}
                            >
                              {stat.value}
                            </span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    {isCenter && (
                      <div 
                        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
                          hoveredCard === service.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          boxShadow: `inset 0 0 60px ${service.color}20`,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
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
