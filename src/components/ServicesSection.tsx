import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Rocket, Target, TrendingUp, Megaphone, Palette, BarChart3, Smartphone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import servicesImage from '@/assets/services-bg.jpg';
import { SmokeEffect } from '@/components/animations/SmokeEffect';
const services = [{
  icon: Brain,
  title: "Estratégia Digital",
  description: "Planejamento inteligente baseado em dados e insights comportamentais para maximizar resultados.",
  features: ["Análise de Mercado", "Personas Detalhadas", "Jornada do Cliente"],
  color: "primary"
}, {
  icon: Rocket,
  title: "Growth Hacking",
  description: "Técnicas inovadoras para acelerar o crescimento exponencial da sua marca no digital.",
  features: ["Experimentação Rápida", "Otimização Contínua", "Escalabilidade"],
  color: "secondary"
}, {
  icon: Target,
  title: "Performance Marketing",
  description: "Campanhas de alta conversão com ROI mensurável e otimização em tempo real.",
  features: ["Meta Ads", "Google Ads", "Analytics Avançado"],
  color: "accent"
}, {
  icon: Palette,
  title: "Branding & Design",
  description: "Identidade visual impactante que conecta emocionalmente com seu público-alvo.",
  features: ["Logo & Identidade", "UI/UX Design", "Materiais Gráficos"],
  color: "primary"
}, {
  icon: Megaphone,
  title: "Social Media",
  description: "Presença digital marcante com conteúdo viral e engajamento autêntico.",
  features: ["Gestão de Redes", "Conteúdo Criativo", "Influencer Marketing"],
  color: "secondary"
}, {
  icon: BarChart3,
  title: "Analytics & BI",
  description: "Inteligência de dados para decisões estratégicas e otimização contínua.",
  features: ["Dashboards Interativos", "Relatórios Customizados", "Previsões"],
  color: "accent"
}, {
  icon: Smartphone,
  title: "Mobile Marketing",
  description: "Estratégias mobile-first para alcançar usuários em qualquer dispositivo.",
  features: ["App Marketing", "Mobile Ads", "Push Notifications"],
  color: "primary"
}, {
  icon: Globe,
  title: "SEO & Conteúdo",
  description: "Visibilidade orgânica através de conteúdo relevante e otimização técnica.",
  features: ["SEO Técnico", "Content Marketing", "Link Building"],
  color: "secondary"
}, {
  icon: TrendingUp,
  title: "Automação",
  description: "Processos automatizados para nutrição de leads e conversão inteligente.",
  features: ["Email Marketing", "Lead Nurturing", "CRM Integration"],
  color: "accent"
}];
const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % services.length);
    setIsAutoPlaying(false);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
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
  return <section className="section-animate py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 parallax-element" style={{
      backgroundImage: `url(${servicesImage})`
    }} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow energy-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float magnetic-float" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 section-animate">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8 magnetic-float">
            <Rocket className="w-5 h-5 text-primary animate-pulse drop-shadow-glow" />
            <span className="text-sm font-semibold text-primary">NOSSOS SUPERPODERES</span>
          </div>
          
          <div className="relative inline-block">
            <SmokeEffect />
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-reveal relative z-10">
              <span className="text-gradient silver-shine-text drop-shadow-[0_0_30px_rgba(255,193,7,0.5)] animate-pulse">SERVIÇOS QUE</span>
              <br />
              <span className="text-foreground drop-shadow-[0_0_20px_rgba(255,193,7,0.3)]">TRANSFORMAM NEGÓCIOS</span>
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed parallax-element">
            Estratégia, criatividade e tecnologia combinadas para gerar <span className="silver-shine-text">resultados extraordinários</span> para sua marca.
          </p>
        </div>

        {/* Auto-Running Services List */}
        <div className="mb-12 overflow-hidden">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {[...services, ...services].map((service, index) => <div key={index} className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/30 rounded-full backdrop-blur-sm">
                <service.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{service.title}</span>
              </div>)}
          </div>
        </div>

        {/* Carousel Container */}
        

        {/* CTA */}
        <div className="text-center mt-16 section-animate">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <Button className="btn-hero group glow-border energy-pulse" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
              <span className="text-reveal">Descobrir Mais Serviços</span>
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-y-[-2px] transition-transform drop-shadow-glow" />
            </Button>
            
            <Button variant="outline" className="group px-8 py-6 bg-background hover:bg-primary/10 border-2 border-primary/30 hover:border-primary/50 text-foreground hover:text-foreground transition-all duration-300" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
              <span className="font-semibold">Falar com Especialista</span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;