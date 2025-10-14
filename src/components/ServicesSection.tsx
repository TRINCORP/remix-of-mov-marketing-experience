import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Rocket, 
  Target, 
  TrendingUp, 
  Megaphone, 
  Palette,
  BarChart3,
  Smartphone,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import servicesImage from '@/assets/services-bg.jpg';

const services = [
  {
    icon: Brain,
    title: "Estratégia Digital",
    description: "Planejamento inteligente baseado em dados e insights comportamentais para maximizar resultados.",
    features: ["Análise de Mercado", "Personas Detalhadas", "Jornada do Cliente"],
    color: "primary"
  },
  {
    icon: Rocket,
    title: "Growth Hacking",
    description: "Técnicas inovadoras para acelerar o crescimento exponencial da sua marca no digital.",
    features: ["Experimentação Rápida", "Otimização Contínua", "Escalabilidade"],
    color: "secondary"
  },
  {
    icon: Target,
    title: "Performance Marketing",
    description: "Campanhas de alta conversão com ROI mensurável e otimização em tempo real.",
    features: ["Meta Ads", "Google Ads", "Analytics Avançado"],
    color: "accent"
  },
  {
    icon: Palette,
    title: "Branding & Design",
    description: "Identidade visual impactante que conecta emocionalmente com seu público-alvo.",
    features: ["Logo & Identidade", "UI/UX Design", "Materiais Gráficos"],
    color: "primary"
  },
  {
    icon: Megaphone,
    title: "Social Media",
    description: "Presença digital marcante com conteúdo viral e engajamento autêntico.",
    features: ["Gestão de Redes", "Conteúdo Criativo", "Influencer Marketing"],
    color: "secondary"
  },
  {
    icon: BarChart3,
    title: "Analytics & BI",
    description: "Inteligência de dados para decisões estratégicas e otimização contínua.",
    features: ["Dashboards Interativos", "Relatórios Customizados", "Previsões"],
    color: "accent"
  },
  {
    icon: Smartphone,
    title: "Mobile Marketing",
    description: "Estratégias mobile-first para alcançar usuários em qualquer dispositivo.",
    features: ["App Marketing", "Mobile Ads", "Push Notifications"],
    color: "primary"
  },
  {
    icon: Globe,
    title: "SEO & Conteúdo",
    description: "Visibilidade orgânica através de conteúdo relevante e otimização técnica.",
    features: ["SEO Técnico", "Content Marketing", "Link Building"],
    color: "secondary"
  },
  {
    icon: TrendingUp,
    title: "Automação",
    description: "Processos automatizados para nutrição de leads e conversão inteligente.",
    features: ["Email Marketing", "Lead Nurturing", "CRM Integration"],
    color: "accent"
  }
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Show all services but highlight the active ones
  const getServiceClasses = (index: number) => {
    const isActive = index === currentIndex;
    const isNext = index === (currentIndex + 1) % services.length;
    const isPrev = index === (currentIndex - 1 + services.length) % services.length;
    
    if (isActive) {
      return "scale-105 border-primary/50 bg-primary/5 shadow-lg shadow-primary/25";
    } else if (isNext || isPrev) {
      return "scale-100 border-accent/30 bg-accent/5";
    } else {
      return "scale-95 border-border/30 bg-card/30 opacity-70";
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url(${servicesImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Rocket className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">NOSSOS SUPERPODERES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient silver-shine-text">SERVIÇOS QUE</span>
            <br />
            <span className="text-foreground">TRANSFORMAM NEGÓCIOS</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estratégia, criatividade e tecnologia combinadas para gerar <span className="silver-shine-text">resultados extraordinários</span> para sua marca.
          </p>
        </div>

        {/* Auto-Running Services List */}
        <div className="mb-12 overflow-hidden">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {[...services, ...services].map((service, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/30 rounded-full backdrop-blur-sm"
              >
                <service.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{service.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Services Grid - Show All Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 ease-out ${getServiceClasses(index)}`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTimeout(() => setIsAutoPlaying(true), 3000);
                  }}
                >
                  <div className="p-6 h-full">
                    {/* Icon */}
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                        index === currentIndex 
                          ? 'bg-gradient-to-br from-primary to-accent scale-110' 
                          : `bg-gradient-to-br ${
                            service.color === 'primary' ? 'from-primary to-primary-glow' :
                            service.color === 'secondary' ? 'from-secondary to-secondary-glow' :
                            'from-accent to-accent-glow'
                          } group-hover:scale-110`
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                      index === currentIndex ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features - Show only for active service */}
                    {index === currentIndex && (
                      <ul className="space-y-2 animate-fade-in">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Active Service Indicator */}
                  {index === currentIndex && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
                  )}

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    service.color === 'primary' ? 'from-primary/5 to-transparent' :
                    service.color === 'secondary' ? 'from-secondary/5 to-transparent' :
                    'from-accent/5 to-transparent'
                  } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                </Card>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <button className="btn-hero group">
              <span>Descobrir Mais Serviços</span>
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            </button>
            
            <button className="btn-secondary">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;