import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';
import heroBg from '@/assets/hero-bg.jpg';

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
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/85" />
        
        {/* Gradient Overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.2), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, hsl(var(--primary) / 0.1), transparent),
              radial-gradient(ellipse 50% 30% at 20% 80%, hsl(var(--primary) / 0.08), transparent)
            `,
          }}
        />
      </div>

      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] transition-all duration-[2000ms] ${
            isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ animationDelay: '200ms' }}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] transition-all duration-[2500ms] ${
            isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ animationDelay: '400ms' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Eyebrow Badge */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium tracking-[0.2em] text-primary uppercase backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Marketing que Transforma
              <Sparkles className="w-3 h-3" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span 
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MOV
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 tracking-tight">
              REVOLUCIONA SEU
            </span>
            <span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-1 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MARKETING
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Assessoria de marketing para empresas que precisam estruturar <span className="text-primary font-semibold">crescimento</span> com clareza e estratégia.
          </p>

          {/* CTA Button */}
          <div 
            className={`flex justify-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              onClick={handleCTAClick}
              size="lg"
              className="group relative px-10 py-7 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 overflow-hidden rounded-full shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Começar Revolução
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>

              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-20" />
            </Button>
          </div>

          {/* Mission Statement */}
          <div 
            className={`max-w-2xl mx-auto pt-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative px-8 py-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background rounded-full border border-primary/30">
                <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Nossa Atuação</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                Atuamos ao lado de <span className="text-foreground font-semibold">gestores e decisores</span> na organização do marketing, posicionamento e <span className="text-primary font-semibold">geração de demanda</span> para empresas em fase de crescimento.
              </p>
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
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>

      {/* Corner Accents */}
      <div 
        className={`absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
      <div 
        className={`absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
    </section>
  );
};

export default HeroSection;
