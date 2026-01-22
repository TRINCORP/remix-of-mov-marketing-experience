import { useState, useRef, useEffect } from 'react';
import { 
  Brain, Rocket, Target, TrendingUp, Megaphone, Palette, 
  BarChart3, Smartphone, Globe, Play, ArrowUpRight, Zap
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
  video?: string;
  color: string;
  stats: { value: string; label: string };
}

const services: Service[] = [
  {
    id: 1,
    icon: Brain,
    title: "Estratégia Digital",
    tagline: "Pense grande. Aja maior.",
    description: "Planejamento baseado em dados e insights comportamentais para maximizar resultados.",
    features: ["Análise de Mercado", "Personas", "Customer Journey"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4",
    color: "#FFD93D",
    stats: { value: "+250%", label: "ROI médio" },
  },
  {
    id: 2,
    icon: Rocket,
    title: "Growth Hacking",
    tagline: "Crescimento exponencial.",
    description: "Técnicas inovadoras para acelerar o crescimento da sua marca no digital.",
    features: ["Experimentação", "Otimização", "Escalabilidade"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/5077073/5077073-uhd_2560_1440_25fps.mp4",
    color: "#FF6B6B",
    stats: { value: "3x", label: "velocidade" },
  },
  {
    id: 3,
    icon: Target,
    title: "Performance",
    tagline: "Cada real conta.",
    description: "Campanhas de alta conversão com ROI mensurável e otimização em tempo real.",
    features: ["Meta Ads", "Google Ads", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/7579974/7579974-uhd_2560_1440_25fps.mp4",
    color: "#4ECDC4",
    stats: { value: "12x", label: "ROAS" },
  },
  {
    id: 4,
    icon: Palette,
    title: "Branding",
    tagline: "Marcas memoráveis.",
    description: "Identidade visual impactante que conecta emocionalmente com seu público.",
    features: ["Logo", "UI/UX", "Brand Book"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    color: "#A855F7",
    stats: { value: "+180%", label: "awareness" },
  },
  {
    id: 5,
    icon: Megaphone,
    title: "Social Media",
    tagline: "Viralize com propósito.",
    description: "Presença digital marcante com conteúdo viral e engajamento autêntico.",
    features: ["Gestão", "Conteúdo", "Influencers"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4",
    color: "#F472B6",
    stats: { value: "5M+", label: "alcance" },
  },
  {
    id: 6,
    icon: BarChart3,
    title: "Analytics & BI",
    tagline: "Dados que decidem.",
    description: "Inteligência de dados para decisões estratégicas e otimização contínua.",
    features: ["Dashboards", "Reports", "Insights"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "#06B6D4",
    stats: { value: "100%", label: "visibilidade" },
  },
];

// Service Card Component
const ServiceCard = ({ 
  service, 
  isActive, 
  onClick 
}: { 
  service: Service; 
  isActive: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = service.icon;

  useEffect(() => {
    if (videoRef.current && service.video) {
      if (isHovered || isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isActive, service.video]);

  return (
    <div
      data-cursor="view"
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 ${
          isActive 
            ? 'h-[400px] md:h-[500px]' 
            : 'h-[200px] md:h-[250px]'
        }`}
        style={{
          boxShadow: isActive ? `0 20px 60px ${service.color}30` : 'none',
        }}
      >
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              (isHovered || isActive) && service.video ? 'opacity-0' : 'opacity-100'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {service.video && (
            <video
              ref={videoRef}
              src={service.video}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered || isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isActive 
              ? `linear-gradient(135deg, ${service.color}90 0%, transparent 50%, rgba(0,0,0,0.8) 100%)`
              : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />

        {/* Icon Badge */}
        <div 
          className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ 
            backgroundColor: service.color,
            boxShadow: `0 0 20px ${service.color}60`,
          }}
        >
          <Icon className="w-6 h-6 text-black" />
        </div>

        {/* Play indicator */}
        {service.video && !isActive && (
          <div className={`absolute top-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${service.color}40` }}
            >
              <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          {/* Tagline */}
          <span 
            className={`text-xs font-bold tracking-widest uppercase mb-1 block transition-colors duration-300 ${
              isActive ? 'text-black' : ''
            }`}
            style={{ color: isActive ? 'inherit' : service.color }}
          >
            {service.tagline}
          </span>

          {/* Title */}
          <h3 className={`font-black text-white mb-2 transition-all duration-300 ${
            isActive ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}>
            {service.title}
          </h3>

          {/* Description - Only visible when active */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
              {service.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.features.map((feature, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ 
                    backgroundColor: `${service.color}30`,
                    color: service.color,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div>
                <span 
                  className="text-3xl md:text-4xl font-black"
                  style={{ color: service.color }}
                >
                  {service.stats.value}
                </span>
                <span className="text-white/60 text-sm ml-2">
                  {service.stats.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow indicator on hover */}
        <div className={`absolute right-5 bottom-5 transition-all duration-300 ${
          isHovered && !isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: service.color }}
          >
            <ArrowUpRight className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Active border */}
        {isActive && (
          <div 
            className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 3px ${service.color}` }}
          />
        )}
      </div>
    </div>
  );
};

// Text Marquee
const ServicesMarquee = () => {
  const items = services.map(s => s.title);
  
  return (
    <div className="overflow-hidden py-4 border-y border-primary/20 bg-gradient-to-r from-transparent via-primary/5 to-transparent">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-lg md:text-xl font-black text-primary/50 flex items-center gap-4">
            <Zap className="w-4 h-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Marquee */}
      <ServicesMarquee />

      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-16">
        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-sm font-bold text-primary tracking-widest uppercase">Serviços</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none">
              <span className="text-foreground">O que fazemos</span>
              <br />
              <span className="text-gradient">de melhor</span>
            </h2>
          </div>

          <p className="text-muted-foreground max-w-md text-base md:text-lg">
            Cada serviço é uma <span className="text-primary font-bold">arma estratégica</span> para o crescimento da sua marca.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onClick={() => setActiveService(
                activeService === service.id ? null : service.id
              )}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            className="btn-hero group text-base px-8 py-5"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Solicitar Orçamento</span>
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Resposta em até <span className="text-primary font-bold">24 horas</span>
          </p>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="mt-16">
        <ServicesMarquee />
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
