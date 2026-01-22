import { useState, useEffect, useRef } from 'react';
import { Play, Users, Trophy, Rocket, Target, Zap, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Seção estilo "Culture Reel" da Goat Agency - mais visual e impactante
const cultureHighlights = [
  {
    id: 1,
    title: "Cultura de Resultado",
    description: "Não entregamos relatórios. Entregamos crescimento.",
    video: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    icon: Trophy,
    stat: "+340%",
    statLabel: "média de crescimento",
  },
  {
    id: 2,
    title: "Criatividade sem Limites",
    description: "Ideias que quebram padrões e constroem marcas.",
    video: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    icon: Rocket,
    stat: "100+",
    statLabel: "campanhas criativas",
  },
  {
    id: 3,
    title: "Data-Driven",
    description: "Cada decisão é guiada por dados reais.",
    video: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    icon: Target,
    stat: "50M+",
    statLabel: "alcance em dados",
  },
  {
    id: 4,
    title: "Velocidade de Execução",
    description: "Do briefing ao resultado em tempo recorde.",
    video: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    icon: Zap,
    stat: "48h",
    statLabel: "tempo de resposta",
  },
];

const achievements = [
  { icon: Users, value: "30+", label: "Clientes Ativos" },
  { icon: Trophy, value: "50+", label: "Projetos Entregues" },
  { icon: TrendingUp, value: "300%", label: "ROI Médio" },
  { icon: Award, value: "100%", label: "Satisfação" },
];

const CultureCard = ({ item, index, isActive, onClick }: { 
  item: typeof cultureHighlights[0]; 
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = item.icon;
  
  return (
    <div 
      className={`relative cursor-pointer group transition-all duration-700 ${
        isActive ? 'scale-100' : 'scale-95 opacity-70'
      }`}
      onClick={onClick}
    >
      {/* Main card */}
      <div 
        className={`relative overflow-hidden rounded-3xl h-[300px] md:h-[400px] transition-all duration-500 ${
          isActive ? 'shadow-2xl shadow-primary/20' : ''
        }`}
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${item.video})` }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Animated highlight effect when active */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 animate-pulse" />
        )}
        
        {/* Play button */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}>
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/50 animate-pulse">
            <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Icon badge */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center">
          <Icon className="w-6 h-6 text-background" />
        </div>
        
        {/* Stat badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30">
          <span className="text-primary font-black text-lg">{item.stat}</span>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
          <p className="text-primary text-xs mt-2 font-semibold">{item.statLabel}</p>
        </div>
      </div>
      
      {/* Index number */}
      <div className="absolute -bottom-4 -right-4 text-8xl font-black text-primary/10 pointer-events-none">
        0{index + 1}
      </div>
    </div>
  );
};

const TeamShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cultureHighlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl animate-float animation-delay-1000" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header - Goat style */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider">NOSSA CULTURA</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-foreground">Não somos uma </span>
            <span className="text-gradient">agência comum</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos uma máquina de resultados. Cada projeto é uma missão, 
            cada cliente é um parceiro de crescimento.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {cultureHighlights.map((item, index) => (
            <CultureCard 
              key={item.id} 
              item={item} 
              index={index}
              isActive={activeCard === index}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-3 mb-16">
          {cultureHighlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeCard === index 
                  ? 'w-12 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Achievement Stats - Goat style horizontal bar */}
        <div 
          className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div 
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.05))',
              border: '1px solid hsl(var(--primary) / 0.2)',
            }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-50">
              <div className="absolute inset-0 rounded-3xl animate-pulse" style={{
                boxShadow: 'inset 0 0 40px hsl(var(--primary) / 0.1)',
              }} />
            </div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={index}
                    className="text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-2">
                      {achievement.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {achievement.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            className="btn-hero group text-lg px-10 py-6"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Faça Parte da Revolução</span>
            <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamShowcase;
