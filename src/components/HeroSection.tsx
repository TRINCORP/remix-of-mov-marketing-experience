import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useGSAPNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    console.log('CTA Hero clicked');
    window.open('https://wa.me/5519981134193', '_blank');
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'hsl(0 0% 2%)' }}
    >
      {/* Clean Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, hsl(var(--primary) / 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, hsl(var(--primary) / 0.05), transparent)
          `,
        }}
      />

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Line Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 overflow-hidden">
        <div 
          className={`w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent transition-transform duration-1000 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transitionDelay: '800ms' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Eyebrow */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-primary uppercase">
                <span className="w-8 h-px bg-primary" />
                Marketing Digital de Alta Performance
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <span 
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Transforme
                </span>
                <span className="block text-foreground">sua marca em</span>
                <span 
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  referência.
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p 
              className={`text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Estratégias de marketing digital que geram resultados reais. 
              Mais de 500 marcas já confiam em nosso método exclusivo.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              <Button 
                onClick={handleCTAClick}
                className="group relative px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Agendar Consultoria
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button 
                variant="ghost"
                className="group px-8 py-6 text-lg font-medium text-foreground hover:text-primary hover:bg-transparent transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Ver Showreel
              </Button>
            </div>

            {/* Trust Indicators */}
            <div 
              className={`flex items-center gap-8 pt-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Resultados em 30 dias</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">98%</span> satisfação
              </div>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div 
              className={`grid grid-cols-2 gap-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {[
                { value: '500+', label: 'Marcas' },
                { value: '300%', label: 'ROI Médio' },
                { value: '24/7', label: 'Suporte' },
                { value: '30d', label: 'Resultados' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="group relative p-6 rounded-2xl border border-primary/10 bg-primary/[0.02] hover:bg-primary/[0.05] hover:border-primary/20 transition-all duration-500"
                  style={{ 
                    transitionDelay: `${600 + index * 100}ms`,
                  }}
                >
                  <div 
                    className="text-3xl md:text-4xl font-black mb-1"
                    style={{
                      background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(38, 92%, 50%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Corner Accents */}
      <div 
        className={`absolute top-8 right-8 w-12 h-12 border-t border-r border-primary/20 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
      <div 
        className={`absolute bottom-8 left-8 w-12 h-12 border-b border-l border-primary/20 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
    </section>
  );
};

export default HeroSection;