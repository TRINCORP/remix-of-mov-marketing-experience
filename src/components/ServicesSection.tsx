import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  Rocket, 
  Target, 
  TrendingUp, 
  Megaphone, 
  Palette,
  BarChart3,
  Smartphone,
  Globe
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url(${servicesImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Rocket className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">NOSSOS SUPERPODERES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">SERVIÇOS QUE</span>
            <br />
            <span className="text-foreground">TRANSFORMAM NEGÓCIOS</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estratégia, criatividade e tecnologia combinadas para gerar <span className="text-primary font-bold">resultados extraordinários</span> para sua marca.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <Card
                key={index}
                className={`card-glow group cursor-pointer transition-all duration-500 ${
                  isHovered ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  service.color === 'primary' ? 'from-primary to-primary-glow' :
                  service.color === 'secondary' ? 'from-secondary to-secondary-glow' :
                  'from-accent to-accent-glow'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        isHovered ? 'translate-x-2' : ''
                      }`}
                      style={{ transitionDelay: `${featureIndex * 100}ms` }}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        service.color === 'primary' ? 'bg-primary' :
                        service.color === 'secondary' ? 'bg-secondary' :
                        'bg-accent'
                      }`} />
                      <span className="text-sm text-muted-foreground font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  service.color === 'primary' ? 'from-primary/5 to-transparent' :
                  service.color === 'secondary' ? 'from-secondary/5 to-transparent' :
                  'from-accent/5 to-transparent'
                } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
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