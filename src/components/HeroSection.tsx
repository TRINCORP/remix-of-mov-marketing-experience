
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp, Play, MousePointer } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import { ParticleField } from '@/components/animations/ParticleField';
import { MagneticNumber } from '@/components/animations/MagneticNumbers';
import { BrilliantReflection } from '@/components/animations/BrilliantReflection';
import { RotatingRectangle } from '@/components/animations/RotatingRectangle';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  // Initialize GSAP animations and performance monitoring
  useGSAPNavigation();
  const { getCurrentFPS } = usePerformanceMonitor();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleCTAClick = () => {
    // Analytics tracking
    console.log('CTA Hero clicked');
    window.open('https://wa.me/5519981134193', '_blank');
  };

  const handleVideoPlay = () => {
    // Video play logic
    console.log('Video play clicked');
  };

  return (
    <section 
      ref={heroRef}
      className="section-animate relative min-h-screen flex items-center justify-center overflow-hidden bg-hero"
    >
      {/* Three.js Particle Field - Performance Optimized */}
      <ParticleField className={`transition-opacity duration-1000 ${getCurrentFPS() > 30 ? 'opacity-20' : 'opacity-10'}`} />
      
      {/* Dynamic Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          opacity: 0.15,
          transform: `scale(${1 + mousePosition.y * 0.02}) translateX(${mousePosition.x * 10}px)`
        }}
      />
      
      {/* Interactive Mesh Background */}
      <div 
        className="absolute inset-0 bg-mesh transition-opacity duration-700"
        style={{ 
          opacity: 0.4 + mousePosition.y * 0.2
        }}
      />
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(0deg, hsl(var(--primary)) 0.5px, transparent 0.5px),
              linear-gradient(90deg, hsl(var(--primary)) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-7xl mx-auto transition-all duration-1500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Premium Brand Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full px-6 py-3 mb-8 animate-scale-in backdrop-blur-xl">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm text-primary font-semibold tracking-wide">ASSESSORIA DE MARKETING</span>
        </div>

        {/* Hero Headlines with Staggered Animation and Brilliant Reflection */}
        <div className="space-y-2 mb-12 relative">
          <BrilliantReflection className="z-0" />
          <h1 className="relative z-10 text-display leading-tight">
            <span className="block text-7xl md:text-8xl lg:text-9xl font-black animate-slide-up tracking-tighter text-golden-glow">
              MOV
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-foreground animate-slide-up animation-delay-300 tracking-tight">
              REVOLUCIONA
            </span>
            <span className="block text-6xl md:text-7xl lg:text-8xl font-black text-gradient animate-slide-up animation-delay-600 gradient-shift silver-shine-text tracking-tighter">
              SEU MARKETING
            </span>
          </h1>
        </div>

        {/* Enhanced Subtitle with Rotating Rectangle Highlight */}
        <div className="animate-slide-up animation-delay-900 mb-16 relative">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Transformamos marcas em <span className="silver-shine-text font-semibold">fenômenos digitais</span> com estratégias inovadoras e resultados comprovados.
          </p>
          
          {/* Rotating Rectangle with Key Message */}
          <div className="flex justify-center mb-8">
            <RotatingRectangle size="md" speed="slow" className="animate-slide-up animation-delay-1000">
              <div className="text-center">
                <div className="text-sm font-bold text-primary mb-1">GARANTIA EXCLUSIVA</div>
                <div className="text-xs text-muted-foreground">Resultados em 30 dias ou seu dinheiro de volta</div>
              </div>
            </RotatingRectangle>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Resultados em 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-500" />
              <span>ROI garantido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse animation-delay-1000" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center animate-slide-up animation-delay-1200 mb-20">
          <Button 
            className="btn-hero group text-xl px-12 py-6 relative overflow-hidden glow-border energy-pulse"
            onClick={handleCTAClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300 drop-shadow-glow" />
              <span className="text-reveal">Começar Revolução</span>
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Enhanced Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-secondary to-primary transition-all duration-300 ${
              isHovered ? 'opacity-20 scale-105' : 'opacity-0 scale-100'
            }`} />
          </Button>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="btn-secondary group px-8 py-6"
              onClick={handleVideoPlay}
            >
              <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Ver Demo</span>
            </Button>
            
            <Button variant="ghost" className="btn-ghost">
              <Zap className="mr-2 w-5 h-5" />
              <span>Cases de Sucesso</span>
            </Button>
          </div>
        </div>

        {/* Premium Stats with Magnetic Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up animation-delay-1500">
          {[
            { value: "500+", label: "Marcas Transformadas", icon: TrendingUp },
            { value: "300%", label: "Crescimento Médio", icon: Zap },
            { value: "98%", label: "Satisfação dos Clientes", icon: Sparkles }
          ].map((stat, index) => (
            <MagneticNumber
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Interactive Mouse Follower */}
        <div 
          className="fixed w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-50 transition-transform duration-100"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            display: isHovered ? 'block' : 'none'
          }}
        />

        {/* Floating Action Hints */}
        <div className="absolute bottom-20 right-20 opacity-20 animate-bounce-subtle">
          <MousePointer className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
          Explore Mais
        </div>
        <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center animate-bounce-subtle">
          <div className="w-1 h-4 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
