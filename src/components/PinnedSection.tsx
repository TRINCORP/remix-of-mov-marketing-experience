import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

// Dados das "slides" com estética Goat Agency
const slides = [
  {
    id: 1,
    headline: "ESTRATÉGIA",
    subline: "que gera resultados",
    description: "Não criamos campanhas bonitas. Criamos máquinas de crescimento.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary))",
    icon: Target,
  },
  {
    id: 2,
    headline: "CRIATIVIDADE",
    subline: "sem limites",
    description: "Ideias que quebram padrões e constroem marcas memoráveis.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--secondary))",
    icon: Sparkles,
  },
  {
    id: 3,
    headline: "PERFORMANCE",
    subline: "de alto impacto",
    description: "Cada real investido retorna multiplicado. Prometemos números.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary-glow))",
    icon: TrendingUp,
  },
  {
    id: 4,
    headline: "VELOCIDADE",
    subline: "de execução",
    description: "Do briefing ao resultado em tempo recorde. Sem desculpas.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary))",
    icon: Zap,
  },
];

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        let progress = 0;
        
        if (rect.top <= 0) {
          progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        } else {
          progress = (windowHeight - rect.top) / windowHeight * 0.1;
        }
        
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(clampedProgress);
        
        // Determina qual slide mostrar
        const slideIndex = Math.min(
          Math.floor(clampedProgress * slides.length),
          slides.length - 1
        );
        setCurrentSlide(slideIndex);
      } else {
        setScrollProgress(0);
        setCurrentSlide(0);
      }
    };

    let ticking = false;
    const optimizedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    optimizedHandleScroll();
    window.addEventListener('scroll', optimizedHandleScroll, { passive: true });
    window.addEventListener('resize', optimizedHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedHandleScroll);
      window.removeEventListener('resize', optimizedHandleScroll);
    };
  }, []);

  const slide = slides[currentSlide];
  const Icon = slide?.icon || Target;

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400vh] bg-background"
    >
      {/* Conteúdo fixo */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background slides */}
        {slides.map((s, index) => (
          <div 
            key={s.id}
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              backgroundImage: `url('${s.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 0.4 : 0,
              transform: `scale(${currentSlide === index ? 1.05 : 1.1})`,
              filter: 'brightness(0.5) contrast(1.1)',
            }}
          />
        ))}
        
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--background) / 0.9) 0%, 
              hsl(var(--background) / 0.7) 50%,
              hsl(var(--background) / 0.85) 100%)`,
          }}
        />

        {/* Animated grid background */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(${slide?.accent || 'hsl(var(--primary))'} 1px, transparent 1px),
              linear-gradient(90deg, ${slide?.accent || 'hsl(var(--primary))'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.03 + scrollProgress * 0.02,
          }}
        />

        {/* Floating accent shapes */}
        <div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: slide?.accent || 'hsl(var(--primary))',
            opacity: 0.1 + scrollProgress * 0.1,
            transform: `translate(${scrollProgress * -50}px, ${scrollProgress * 30}px)`,
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: 'hsl(var(--secondary))',
            opacity: 0.1 + scrollProgress * 0.1,
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * -30}px)`,
          }}
        />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              {/* Slide indicator */}
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{ 
                    background: slide?.accent || 'hsl(var(--primary))',
                    boxShadow: `0 0 40px ${slide?.accent || 'hsl(var(--primary))'}40`,
                  }}
                >
                  <Icon className="w-7 h-7 text-background" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-primary font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="mx-2">/</span>
                  <span>{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Headline with animated transition */}
              <div className="overflow-hidden mb-4">
                <h2 
                  key={slide?.headline}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black animate-fade-in"
                  style={{ 
                    color: slide?.accent || 'hsl(var(--primary))',
                    textShadow: `0 0 60px ${slide?.accent || 'hsl(var(--primary))'}40`,
                  }}
                >
                  {slide?.headline}
                </h2>
              </div>
              
              <div className="overflow-hidden mb-6">
                <h3 
                  key={slide?.subline}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground animate-fade-in"
                  style={{ animationDelay: '100ms' }}
                >
                  {slide?.subline}
                </h3>
              </div>
              
              <p 
                key={slide?.description}
                className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in"
                style={{ animationDelay: '200ms' }}
              >
                {slide?.description}
              </p>
            </div>

            {/* Right: Visual element */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Orbital rings */}
                <div 
                  className="absolute inset-0 w-80 h-80 border-2 rounded-full animate-spin-slow"
                  style={{ 
                    borderColor: `${slide?.accent || 'hsl(var(--primary))'}30`,
                    animationDuration: '20s',
                  }}
                />
                <div 
                  className="absolute inset-4 w-72 h-72 border rounded-full animate-spin-slow"
                  style={{ 
                    borderColor: `${slide?.accent || 'hsl(var(--primary))'}20`,
                    animationDuration: '15s',
                    animationDirection: 'reverse',
                  }}
                />
                
                {/* Center element */}
                <div 
                  className="relative w-80 h-80 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${slide?.accent || 'hsl(var(--primary))'}15 0%, transparent 70%)`,
                  }}
                >
                  {/* Progress percentage */}
                  <div className="text-center">
                    <div 
                      className="text-7xl md:text-8xl font-black mb-2 transition-all duration-300"
                      style={{ 
                        color: slide?.accent || 'hsl(var(--primary))',
                        textShadow: `0 0 40px ${slide?.accent || 'hsl(var(--primary))'}60`,
                      }}
                    >
                      {Math.round(scrollProgress * 100)}%
                    </div>
                    <div className="text-muted-foreground font-medium">
                      IMERSÃO COMPLETA
                    </div>
                  </div>
                </div>

                {/* Floating dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-float"
                    style={{
                      background: slide?.accent || 'hsl(var(--primary))',
                      top: `${20 + i * 12}%`,
                      left: i % 2 === 0 ? '-10%' : '105%',
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar - Goat style */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
            <div className="flex items-center gap-2 mb-4 justify-center">
              {slides.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-12' : 'w-4'
                  }`}
                  style={{
                    background: index === currentSlide 
                      ? slide?.accent || 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground) / 0.2)',
                    boxShadow: index === currentSlide 
                      ? `0 0 10px ${slide?.accent || 'hsl(var(--primary))'}60` 
                      : 'none',
                  }}
                />
              ))}
            </div>
            
            {/* Scroll indicator */}
            {scrollProgress < 0.9 && (
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-muted-foreground">Continue rolando</span>
                <ArrowDown className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Side progress indicator */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col items-center gap-3">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  background: index === currentSlide 
                    ? slide?.accent || 'hsl(var(--primary))'
                    : 'hsl(var(--muted-foreground) / 0.3)',
                  boxShadow: index === currentSlide 
                    ? `0 0 15px ${slide?.accent || 'hsl(var(--primary))'}` 
                    : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PinnedSection;
