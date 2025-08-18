
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp, Play, MousePointer } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero"
    >
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
      
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-full blur-3xl animate-float transition-transform duration-1000"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)`
          }}
        />
        
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-accent/15 to-primary/10 rounded-full blur-3xl animate-float animation-delay-1000 transition-transform duration-1000"
          style={{
            bottom: '15%',
            right: '8%',
            transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 15}px)`
          }}
        />

        {/* Floating Particles - Sem interação do mouse */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float opacity-60"
            style={{
              top: `${20 + (i * 12)}%`,
              left: `${10 + (i * 11)}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}

        {/* Interactive Grid Lines */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-7xl mx-auto transition-all duration-1500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Premium Brand Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full px-8 py-4 mb-12 animate-scale-in backdrop-blur-xl">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <span className="text-caption text-primary font-bold tracking-wide">INOVAÇÃO EM MARKETING DIGITAL</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>

        {/* Hero Headlines with Staggered Animation */}
        <div className="space-y-4 mb-12">
          <h1 className="text-display leading-none">
            <span className="block text-gradient animate-slide-up gradient-shift">MOV</span>
            <span className="block text-foreground text-6xl md:text-7xl lg:text-8xl font-bold animate-slide-up animation-delay-300">
              REVOLUCIONA
            </span>
            <span className="block text-gradient animate-slide-up animation-delay-600 gradient-shift">
              SEU MARKETING
            </span>
          </h1>
        </div>

        {/* Enhanced Subtitle */}
        <div className="animate-slide-up animation-delay-900 mb-16">
          <p className="text-body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transformamos marcas em <span className="text-gradient font-bold">fenômenos digitais</span> com estratégias inovadoras e resultados comprovados.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
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
            className="btn-hero group text-xl px-12 py-6 relative overflow-hidden"
            onClick={handleCTAClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Começar Revolução
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-secondary to-primary transition-opacity duration-300 ${
              isHovered ? 'opacity-20' : 'opacity-0'
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

        {/* Premium Stats with Enhanced Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up animation-delay-1500">
          {[
            { value: "500+", label: "Marcas Transformadas", icon: TrendingUp },
            { value: "300%", label: "Crescimento Médio", icon: Zap },
            { value: "98%", label: "Satisfação dos Clientes", icon: Sparkles }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="group cursor-pointer"
                style={{ animationDelay: `${(index + 15) * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-5xl md:text-6xl font-black text-gradient group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                </div>
                <div className="text-muted-foreground font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
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
