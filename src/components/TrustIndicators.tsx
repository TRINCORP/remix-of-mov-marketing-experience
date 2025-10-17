import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Globe
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

const AnimatedMetric = ({ value, label, description, index }: { value: string, label: string, description: string, index: number }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const numericMatch = value.match(/\d+/);
      if (!numericMatch) {
        setDisplayValue(value);
        return;
      }

      const numericValue = parseInt(numericMatch[0]);
      const suffix = value.replace(/\d+/, '');
      let current = 0;
      const increment = numericValue / 50;

      const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(current) + suffix);
        }
      }, 30);

      return () => clearInterval(counter);
    }
  }, [inView, value]);

  return (
    <Card
      ref={ref}
      className={`card-premium text-center group cursor-pointer animate-scale-in`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="text-4xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
        {displayValue}
      </div>
      
      <div className="font-semibold text-foreground mb-2">
        {label}
      </div>
      
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
    </Card>
  );
};

const TrustIndicators = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
          {trustMetrics.map((metric, index) => (
            <AnimatedMetric
              key={index}
              value={metric.value}
              label={metric.label}
              description={metric.description}
              index={index}
            />
          ))}
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

        {/* Social Proof */}
        <div className="text-center mt-8">
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-4">
            "A MOV não é apenas uma agência, é um parceiro estratégico que realmente 
            entende nosso negócio e entrega resultados excepcionais."
          </p>
          
          <div className="text-sm text-primary font-semibold">
            Avaliação média de 4.9/5 baseada em 200+ reviews
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
