import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary rounded-full animate-ping animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-accent rounded-full animate-ping animation-delay-2000" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8 animate-scale-in">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-semibold text-primary">INOVAÇÃO EM MARKETING</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block text-gradient animate-slide-up">MOV</span>
          <span className="block text-foreground text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-up animation-delay-300">
            REVOLUCIONA
          </span>
          <span className="block text-gradient animate-slide-up animation-delay-600">
            SEU MARKETING
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up animation-delay-900">
          Transformamos marcas em <span className="text-primary font-bold">fenômenos digitais</span> através de 
          estratégias inovadoras, tecnologia de ponta e criatividade sem limites.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up animation-delay-1200">
          <Button className="btn-hero group">
            <span>Começar Revolução</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" className="btn-secondary group">
            <Zap className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Ver Cases de Sucesso</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 animate-slide-up animation-delay-1500">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
              500+
            </div>
            <div className="text-muted-foreground font-semibold">Marcas Transformadas</div>
          </div>
          
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
              200%
            </div>
            <div className="text-muted-foreground font-semibold">Crescimento Médio</div>
          </div>
          
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
              98%
            </div>
            <div className="text-muted-foreground font-semibold">Satisfação dos Clientes</div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 right-20 opacity-20">
          <TrendingUp className="w-12 h-12 text-primary animate-float" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <Sparkles className="w-10 h-10 text-secondary animate-float animation-delay-1000" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;