
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  Star,
  CheckCircle,
  Globe,
  Zap,
  Target,
  Clock
} from 'lucide-react';

const trustMetrics = [
  {
    icon: Users,
    value: "500+",
    label: "Empresas Transformadas",
    description: "Clientes satisfeitos em todo Brasil",
    color: "primary"
  },
  {
    icon: TrendingUp,
    value: "300%",
    label: "Crescimento Médio",
    description: "Resultado comprovado em ROI",
    color: "secondary"
  },
  {
    icon: Award,
    value: "98%",
    label: "Taxa de Satisfação",
    description: "Excelência reconhecida",
    color: "accent"
  },
  {
    icon: Globe,
    value: "5+",
    label: "Anos de Mercado",
    description: "Experiência consolidada",
    color: "primary"
  }
];

const certifications = [
  {
    icon: Shield,
    title: "Google Partner",
    description: "Certificação oficial Google Ads"
  },
  {
    icon: CheckCircle,
    title: "Meta Business Partner",
    description: "Especialistas em Facebook & Instagram"
  },
  {
    icon: Award,
    title: "HubSpot Certified",
    description: "Inbound Marketing Expert"
  }
];

const liveActivity = [
  "Nova campanha ativada para TechCorp",
  "Cliente EcoSmart alcançou 250% ROI",
  "Estratégia aprovada para StartupX",
  "Case Fashion Forward publicado",
  "Consultoria concluída para FinTechPro"
];

const TrustIndicators = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivity.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Shield className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-caption text-primary">CONFIANÇA COMPROVADA</span>
          </div>
          
          <h2 className="text-headline mb-6">
            <span className="text-gradient">Números que</span>
            <br />
            <span className="text-foreground">Falam por Si</span>
          </h2>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={index}
                className={`card-premium text-center group cursor-pointer animate-scale-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  metric.color === 'primary' ? 'from-primary to-primary-glow' :
                  metric.color === 'secondary' ? 'from-secondary to-secondary-glow' :
                  'from-accent to-accent-light'
                } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {metric.value}
                </div>
                
                <div className="font-semibold text-foreground mb-2">
                  {metric.label}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card 
                key={index}
                className="card-premium flex items-center gap-4 group hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <div>
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {cert.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cert.description}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Live Activity Feed */}
        <Card className="card-premium">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Atividade em Tempo Real</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {liveActivity.map((activity, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  index === currentActivity 
                    ? 'bg-primary/10 border border-primary/20 scale-105' 
                    : 'bg-muted/20 opacity-60'
                }`}
              >
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{activity}</span>
                <div className="ml-auto text-xs text-muted-foreground">
                  {index === currentActivity ? 'Agora' : `${(index + 1) * 2}min`}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Social Proof Stars */}
        <div className="text-center mt-16">
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-8 h-8 fill-secondary text-secondary animate-bounce-subtle" 
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
          
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            "A MOV não é apenas uma agência, é um parceiro estratégico que realmente 
            entende nosso negócio e entrega resultados excepcionais."
          </p>
          
          <div className="text-sm text-primary font-semibold mt-2">
            Avaliação média de 4.9/5 baseada em 200+ reviews
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
