import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, MapPin } from 'lucide-react';

interface MetricProps {
  value: string;
  label: string;
  delay?: number;
}

const AnimatedMetric = ({ value, label, delay = 0 }: MetricProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        // Extract numeric part and suffix (like "bi", "mi", "+")
        const matches = value.match(/^(\+\s*de\s*)?(.+)$/);
        const prefix = matches?.[1] || '';
        const mainValue = matches?.[2] || value;
        
        const numericPart = mainValue.match(/[\d.]+/)?.[0] || '0';
        const suffix = mainValue.replace(/[\d.]+/, '');
        
        const numericValue = parseFloat(numericPart);
        
        let current = 0;
        const increment = numericValue / 50;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            const currentStr = numericValue > 100 
              ? Math.floor(current).toString() 
              : current.toFixed(numericValue < 10 ? 1 : 0);
            setDisplayValue(prefix + currentStr + suffix);
          }
        }, 30);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  return (
    <div 
      ref={ref}
      className="flex flex-col items-start gap-2 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" />
        <span className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
          {displayValue}
        </span>
      </div>
      <p className="text-sm md:text-base text-foreground/90 font-medium">
        {label}
      </p>
    </div>
  );
};

const BrazilMap = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Simplified Brazil map coordinates for pins
  const pinLocations = [
    { x: '45%', y: '15%' }, // Norte
    { x: '52%', y: '22%' }, // Norte
    { x: '38%', y: '28%' }, // Nordeste
    { x: '45%', y: '32%' }, // Nordeste
    { x: '50%', y: '35%' }, // Nordeste
    { x: '55%', y: '38%' }, // Nordeste
    { x: '42%', y: '45%' }, // Centro-Oeste
    { x: '48%', y: '48%' }, // Centro-Oeste
    { x: '55%', y: '52%' }, // Sudeste
    { x: '58%', y: '55%' }, // Sudeste
    { x: '62%', y: '58%' }, // Sudeste
    { x: '52%', y: '62%' }, // Sul
    { x: '55%', y: '68%' }, // Sul
    { x: '58%', y: '72%' }, // Sul
  ];

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      {/* Brazil SVG simplified outline */}
      <svg 
        viewBox="0 0 200 240" 
        className={`w-full h-full max-w-md transition-all duration-1000 ${
          inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ filter: 'drop-shadow(0 0 30px rgba(252, 211, 77, 0.15))' }}
      >
        {/* Brazil outline path */}
        <path
          d="M100,20 L120,25 L135,35 L145,50 L150,65 L155,85 L158,105 L160,125 L158,145 L155,160 L150,175 L145,190 L135,205 L120,215 L105,220 L90,218 L75,210 L65,195 L58,180 L55,165 L52,145 L50,125 L52,105 L55,85 L60,70 L70,55 L80,40 L90,30 Z"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(252, 211, 77, 0.3)"
          strokeWidth="1"
          className="transition-all duration-1000"
        />
        
        {/* Regional states - simplified */}
        <path
          d="M100,20 L120,25 L135,35 L145,50 L140,60 L130,65 L115,62 L105,55 L95,45 L90,30 Z"
          fill="rgba(255, 255, 255, 0.02)"
          stroke="rgba(252, 211, 77, 0.15)"
          strokeWidth="0.5"
        />
        
        {/* Pins */}
        {pinLocations.map((pin, index) => (
          <g 
            key={index}
            className={`transition-all duration-500 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              transitionDelay: `${800 + index * 50}ms`,
            }}
          >
            <circle
              cx={pin.x}
              cy={pin.y}
              r="2"
              fill="hsl(0, 84%, 60%)"
              className="animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            />
            <circle
              cx={pin.x}
              cy={pin.y}
              r="4"
              fill="hsl(0, 84%, 60%)"
              opacity="0.3"
              className="animate-ping"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          </g>
        ))}
      </svg>
      
      {/* Glow effect behind map */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl" />
    </div>
  );
};

const ImpactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(252,211,77,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Title */}
            <div 
              className={`space-y-4 transition-all duration-1000 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                A maior e melhor assessoria de{' '}
                <span className="text-gradient">marketing do Brasil</span>
              </h2>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              Há mais de 12 anos alavancando empresas dos mais diversos segmentos. 
              Nosso foco é na geração de vendas e na transformação da realidade de 
              milhares de empreendedores, dentro e fora do Brasil.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <AnimatedMetric 
                value="+ de 6627" 
                label="Clientes Ativos" 
                delay={400}
              />
              <AnimatedMetric 
                value="+ de 2bi" 
                label="investidos em mídia digital" 
                delay={600}
              />
              <AnimatedMetric 
                value="+ de 256" 
                label="escritórios pelo Brasil" 
                delay={800}
              />
              <AnimatedMetric 
                value="+ de 9bi" 
                label="de faturamento para clientes" 
                delay={1000}
              />
            </div>
          </div>

          {/* Right column - Map */}
          <div 
            className={`relative transition-all duration-1000 delay-500 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
              <BrazilMap />
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default ImpactSection;
