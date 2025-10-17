import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, MapPin } from 'lucide-react';
import mapaBrasil from '@/assets/mapa-brasil.png';
interface MetricProps {
  value: string;
  label: string;
  delay?: number;
}
const AnimatedMetric = ({
  value,
  label,
  delay = 0
}: MetricProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.3,
    triggerOnce: true
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
            const currentStr = numericValue > 100 ? Math.floor(current).toString() : current.toFixed(numericValue < 10 ? 1 : 0);
            setDisplayValue(prefix + currentStr + suffix);
          }
        }, 30);
        return () => clearInterval(counter);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);
  return <div ref={ref} className="flex flex-col items-start gap-2 opacity-0 animate-fade-in" style={{
    animationDelay: `${delay}ms`
  }}>
      <div className="flex items-center gap-2">
        <TrendingUp className="w-6 h-6" style={{
        color: 'hsl(0, 84%, 60%)'
      }} />
        
      </div>
      
    </div>;
};
const BrazilMap = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Regional numbers
  const regionalNumbers = [{
    number: '+45',
    label: 'Norte',
    x: '42%',
    y: '18%'
  }, {
    number: '+78',
    label: 'Nordeste',
    x: '62%',
    y: '30%'
  }, {
    number: '+52',
    label: 'Centro-Oeste',
    x: '42%',
    y: '44%'
  }, {
    number: '+156',
    label: 'Sudeste',
    x: '58%',
    y: '56%'
  }, {
    number: '+189',
    label: 'Sul',
    x: '52%',
    y: '80%'
  }];

  // Brazil map coordinates for pins - distributed across regions
  const pinLocations = [
  // Norte (espalhado)
  {
    x: '35%',
    y: '12%'
  }, {
    x: '42%',
    y: '14%'
  }, {
    x: '48%',
    y: '16%'
  }, {
    x: '38%',
    y: '18%'
  }, {
    x: '45%',
    y: '20%'
  }, {
    x: '52%',
    y: '19%'
  }, {
    x: '40%',
    y: '15%'
  }, {
    x: '47%',
    y: '18%'
  }, {
    x: '36%',
    y: '16%'
  },
  // Nordeste (distribuído)
  {
    x: '58%',
    y: '22%'
  }, {
    x: '62%',
    y: '24%'
  }, {
    x: '56%',
    y: '26%'
  }, {
    x: '60%',
    y: '28%'
  }, {
    x: '64%',
    y: '30%'
  }, {
    x: '58%',
    y: '32%'
  }, {
    x: '62%',
    y: '34%'
  }, {
    x: '66%',
    y: '32%'
  }, {
    x: '54%',
    y: '30%'
  }, {
    x: '60%',
    y: '26%'
  }, {
    x: '64%',
    y: '28%'
  }, {
    x: '56%',
    y: '24%'
  }, {
    x: '62%',
    y: '30%'
  }, {
    x: '66%',
    y: '34%'
  }, {
    x: '58%',
    y: '28%'
  },
  // Centro-Oeste (médio)
  {
    x: '38%',
    y: '38%'
  }, {
    x: '42%',
    y: '40%'
  }, {
    x: '46%',
    y: '42%'
  }, {
    x: '40%',
    y: '44%'
  }, {
    x: '44%',
    y: '46%'
  }, {
    x: '48%',
    y: '44%'
  }, {
    x: '36%',
    y: '42%'
  }, {
    x: '40%',
    y: '48%'
  }, {
    x: '44%',
    y: '40%'
  }, {
    x: '48%',
    y: '38%'
  }, {
    x: '42%',
    y: '46%'
  }, {
    x: '46%',
    y: '48%'
  },
  // Sudeste (alta concentração)
  {
    x: '52%',
    y: '52%'
  }, {
    x: '56%',
    y: '54%'
  }, {
    x: '60%',
    y: '56%'
  }, {
    x: '54%',
    y: '56%'
  }, {
    x: '58%',
    y: '58%'
  }, {
    x: '62%',
    y: '60%'
  }, {
    x: '56%',
    y: '60%'
  }, {
    x: '60%',
    y: '62%'
  }, {
    x: '64%',
    y: '58%'
  }, {
    x: '52%',
    y: '58%'
  }, {
    x: '58%',
    y: '52%'
  }, {
    x: '62%',
    y: '54%'
  }, {
    x: '54%',
    y: '50%'
  }, {
    x: '58%',
    y: '50%'
  }, {
    x: '62%',
    y: '52%'
  }, {
    x: '66%',
    y: '56%'
  }, {
    x: '64%',
    y: '60%'
  }, {
    x: '60%',
    y: '64%'
  }, {
    x: '52%',
    y: '54%'
  }, {
    x: '56%',
    y: '56%'
  }, {
    x: '60%',
    y: '58%'
  }, {
    x: '54%',
    y: '58%'
  }, {
    x: '58%',
    y: '60%'
  }, {
    x: '62%',
    y: '62%'
  }, {
    x: '56%',
    y: '62%'
  }, {
    x: '60%',
    y: '54%'
  }, {
    x: '64%',
    y: '56%'
  }, {
    x: '52%',
    y: '56%'
  }, {
    x: '58%',
    y: '54%'
  }, {
    x: '62%',
    y: '56%'
  }, {
    x: '54%',
    y: '52%'
  }, {
    x: '58%',
    y: '56%'
  }, {
    x: '62%',
    y: '58%'
  },
  // Sul (muito alta concentração)
  {
    x: '48%',
    y: '68%'
  }, {
    x: '52%',
    y: '70%'
  }, {
    x: '56%',
    y: '72%'
  }, {
    x: '50%',
    y: '72%'
  }, {
    x: '54%',
    y: '74%'
  }, {
    x: '58%',
    y: '76%'
  }, {
    x: '52%',
    y: '76%'
  }, {
    x: '56%',
    y: '78%'
  }, {
    x: '60%',
    y: '74%'
  }, {
    x: '48%',
    y: '74%'
  }, {
    x: '52%',
    y: '78%'
  }, {
    x: '56%',
    y: '80%'
  }, {
    x: '50%',
    y: '80%'
  }, {
    x: '54%',
    y: '82%'
  }, {
    x: '58%',
    y: '82%'
  }, {
    x: '52%',
    y: '84%'
  }, {
    x: '56%',
    y: '84%'
  }, {
    x: '60%',
    y: '80%'
  }, {
    x: '48%',
    y: '78%'
  }, {
    x: '54%',
    y: '86%'
  }, {
    x: '58%',
    y: '86%'
  }, {
    x: '50%',
    y: '86%'
  }, {
    x: '56%',
    y: '88%'
  }, {
    x: '52%',
    y: '88%'
  }, {
    x: '48%',
    y: '70%'
  }, {
    x: '52%',
    y: '72%'
  }, {
    x: '56%',
    y: '74%'
  }, {
    x: '50%',
    y: '74%'
  }, {
    x: '54%',
    y: '76%'
  }, {
    x: '58%',
    y: '78%'
  }, {
    x: '52%',
    y: '80%'
  }, {
    x: '56%',
    y: '82%'
  }, {
    x: '60%',
    y: '76%'
  }, {
    x: '48%',
    y: '76%'
  }, {
    x: '52%',
    y: '82%'
  }, {
    x: '56%',
    y: '86%'
  }, {
    x: '50%',
    y: '82%'
  }, {
    x: '54%',
    y: '84%'
  }, {
    x: '58%',
    y: '84%'
  }, {
    x: '50%',
    y: '76%'
  }, {
    x: '54%',
    y: '78%'
  }, {
    x: '58%',
    y: '80%'
  }, {
    x: '52%',
    y: '74%'
  }, {
    x: '56%',
    y: '76%'
  }, {
    x: '60%',
    y: '78%'
  }];
  return <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      {/* Brazil Map Image */}
      <div className="relative w-full h-auto">
        <img src={mapaBrasil} alt="Mapa do Brasil" className={`w-full h-auto object-contain transition-all duration-1000 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{
        filter: 'brightness(0.95) contrast(1.1)'
      }} />
        
        {/* Regional Numbers */}
        {regionalNumbers.map((region, index) => <div key={`region-${index}`} className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{
        left: region.x,
        top: region.y,
        transitionDelay: `${600 + index * 100}ms`
      }}>
            <div className="flex flex-col items-center gap-1 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-[hsl(0,84%,60%)]/20 shadow-lg">
              <span className="text-2xl md:text-3xl font-black text-[hsl(0,84%,60%)]">
                {region.number}
              </span>
              <span className="text-xs font-medium text-foreground/70 whitespace-nowrap">
                {region.label}
              </span>
            </div>
          </div>)}

        {/* Pins */}
        {pinLocations.map((pin, index) => <div key={index} className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`} style={{
        left: pin.x,
        top: pin.y,
        transitionDelay: `${400 + index * 20}ms`
      }}>
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]" style={{
            animationDelay: `${index * 50}ms`,
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
          }} />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-[hsl(0,84%,60%)] opacity-40 animate-ping" style={{
            animationDelay: `${index * 50}ms`
          }} />
            </div>
          </div>)}
      </div>
    </div>;
};
const ImpactSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  return <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(252,211,77,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Title */}
            <div className={`space-y-4 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                A maior e melhor assessoria de{' '}
                <span className="text-gradient">marketing do Brasil</span>
              </h2>
            </div>

            {/* Subtitle */}
            <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              Há mais de 12 anos alavancando empresas dos mais diversos segmentos. 
              Nosso foco é na geração de vendas e na transformação da realidade de 
              milhares de empreendedores, dentro e fora do Brasil.
            </p>

            {/* Metrics Grid */}
            
          </div>

          {/* Right column - Map */}
          <div className={`relative transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-full flex items-center justify-end">
              <div className="relative w-full max-w-2xl">
                <BrazilMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>;
};
export default ImpactSection;