import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowRight, Sparkles, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkItem {
  id: number;
  title: string;
  client: string;
  type: 'video' | 'image';
  thumbnail: string;
  color: string;
  result: string;
  // Mensagens que aparecem como se fosse um vídeo
  storyMessages: {
    text: string;
    delay: number;
    style: 'headline' | 'subtext' | 'stat' | 'cta';
  }[];
}

const featuredWork: WorkItem[] = [
  {
    id: 1,
    title: "Explosão Digital",
    client: "TechBrand",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    color: "#FF6B35",
    result: "+340% engajamento",
    storyMessages: [
      { text: "O DESAFIO:", delay: 0, style: 'subtext' },
      { text: "Marca invisível no digital", delay: 800, style: 'headline' },
      { text: "A ESTRATÉGIA:", delay: 2000, style: 'subtext' },
      { text: "Conteúdo que viraliza", delay: 2800, style: 'headline' },
      { text: "+340%", delay: 4000, style: 'stat' },
      { text: "de engajamento", delay: 4500, style: 'subtext' },
      { text: "🚀 Próximo case pode ser o seu", delay: 5500, style: 'cta' },
    ],
  },
  {
    id: 2,
    title: "Campanha Viral",
    client: "FoodCo",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    color: "#F59E0B",
    result: "2.5M visualizações",
    storyMessages: [
      { text: "RESTAURANTE LOCAL", delay: 0, style: 'subtext' },
      { text: "Virou fenômeno nacional", delay: 800, style: 'headline' },
      { text: "RECEITA DO SUCESSO:", delay: 2000, style: 'subtext' },
      { text: "Social Media + Influencers", delay: 2800, style: 'headline' },
      { text: "2.5M", delay: 4000, style: 'stat' },
      { text: "visualizações orgânicas", delay: 4500, style: 'subtext' },
      { text: "🍕 Sabor que conecta", delay: 5500, style: 'cta' },
    ],
  },
  {
    id: 3,
    title: "Rebranding Completo",
    client: "StyleBrand",
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    color: "#8B5CF6",
    result: "+180% vendas",
    storyMessages: [
      { text: "ANTES:", delay: 0, style: 'subtext' },
      { text: "Marca sem identidade", delay: 800, style: 'headline' },
      { text: "DEPOIS:", delay: 2000, style: 'subtext' },
      { text: "Referência no mercado", delay: 2800, style: 'headline' },
      { text: "+180%", delay: 4000, style: 'stat' },
      { text: "em vendas", delay: 4500, style: 'subtext' },
      { text: "✨ Estilo que vende", delay: 5500, style: 'cta' },
    ],
  },
  {
    id: 4,
    title: "Lançamento Épico",
    client: "GameStudio",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    color: "#EC4899",
    result: "500K downloads",
    storyMessages: [
      { text: "GAME INDIE", delay: 0, style: 'subtext' },
      { text: "Precisava bombar", delay: 800, style: 'headline' },
      { text: "NOSSA JOGADA:", delay: 2000, style: 'subtext' },
      { text: "Hype estratégico", delay: 2800, style: 'headline' },
      { text: "500K", delay: 4000, style: 'stat' },
      { text: "downloads em 30 dias", delay: 4500, style: 'subtext' },
      { text: "🎮 Game over pros concorrentes", delay: 5500, style: 'cta' },
    ],
  },
];

// Componente de storytelling interativo
const StoryPlayer = ({ 
  item, 
  isPlaying, 
  onClose 
}: { 
  item: WorkItem; 
  isPlaying: boolean;
  onClose: () => void;
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  useEffect(() => {
    if (!isPlaying) {
      setCurrentMessageIndex(-1);
      setVisibleMessages([]);
      setProgress(0);
      return;
    }
    
    // Inicia a sequência de mensagens
    item.storyMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, index]);
        setCurrentMessageIndex(index);
      }, msg.delay);
    });
    
    // Progress bar
    const totalDuration = 7000;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (totalDuration / 50));
      });
    }, 50);
    
    // Auto-close após terminar
    const timeout = setTimeout(() => {
      onClose();
    }, totalDuration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPlaying, item.storyMessages, onClose]);
  
  if (!isPlaying) return null;
  
  return (
    <div className="absolute inset-0 z-20 bg-black/95 flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      />
      
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full transition-all duration-100"
          style={{ 
            width: `${progress}%`,
            background: item.color,
            boxShadow: `0 0 10px ${item.color}`,
          }}
        />
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-30">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {item.storyMessages.map((msg, index) => {
          const isVisible = visibleMessages.includes(index);
          const isCurrent = currentMessageIndex === index;
          
          return (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${!isCurrent && isVisible ? 'opacity-40 scale-90' : ''}`}
              style={{
                position: isCurrent ? 'relative' : 'absolute',
                left: '50%',
                transform: isCurrent ? 'translateX(0)' : 'translateX(-50%)',
              }}
            >
              {msg.style === 'headline' && (
                <h3 
                  className="text-3xl md:text-5xl font-black text-white mb-4"
                  style={{
                    textShadow: `0 0 30px ${item.color}80`,
                  }}
                >
                  {msg.text}
                </h3>
              )}
              {msg.style === 'subtext' && (
                <p 
                  className="text-sm md:text-base text-white/70 uppercase tracking-widest mb-2"
                  style={{ color: item.color }}
                >
                  {msg.text}
                </p>
              )}
              {msg.style === 'stat' && (
                <div 
                  className="text-6xl md:text-8xl font-black mb-2"
                  style={{
                    color: item.color,
                    textShadow: `0 0 60px ${item.color}`,
                  }}
                >
                  {msg.text}
                </div>
              )}
              {msg.style === 'cta' && (
                <div 
                  className="text-xl md:text-2xl font-bold text-white animate-pulse"
                >
                  {msg.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Brand watermark */}
      <div className="absolute bottom-4 left-4 text-white/30 text-sm font-bold">
        MOV MARKETING
      </div>
    </div>
  );
};

const VideoCard = ({ item, onPlay }: { item: WorkItem; onPlay: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <img 
        src={item.thumbnail} 
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      
      {/* Play button - sempre visível */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          style={{ 
            boxShadow: `0 0 30px ${item.color}80`,
            background: item.color,
          }}
        >
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <span 
          className="text-xs md:text-sm font-bold tracking-wider mb-1 md:mb-2 block"
          style={{ color: item.color }}
        >
          {item.client.toUpperCase()}
        </span>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-white/80">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          <span className="font-semibold text-sm md:text-base">{item.result}</span>
        </div>
      </div>

      {/* Hover accent bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
        style={{ 
          background: item.color,
          boxShadow: `0 0 20px ${item.color}`,
        }}
      />
    </div>
  );
};

const FeaturedWorkSection = () => {
  const [playingItem, setPlayingItem] = useState<WorkItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
            <Play className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-bold text-primary tracking-wider">CASES QUE BOMBARAM</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6">
            <span className="text-foreground">Trabalhos que </span>
            <span className="text-gradient">fazem barulho</span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Clique no play para ver a história de cada projeto. 
            Cada case é uma jornada de transformação.
          </p>
        </div>

        {/* Featured Work Grid - Responsivo */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Large featured item */}
          <div className="sm:col-span-2 lg:col-span-7 h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl">
            <VideoCard item={featuredWork[0]} onPlay={() => setPlayingItem(featuredWork[0])} />
            <StoryPlayer 
              item={featuredWork[0]} 
              isPlaying={playingItem?.id === featuredWork[0].id} 
              onClose={() => setPlayingItem(null)}
            />
          </div>

          {/* Stacked items */}
          <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            <div className="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden relative shadow-xl">
              <VideoCard item={featuredWork[1]} onPlay={() => setPlayingItem(featuredWork[1])} />
              <StoryPlayer 
                item={featuredWork[1]} 
                isPlaying={playingItem?.id === featuredWork[1].id} 
                onClose={() => setPlayingItem(null)}
              />
            </div>
            <div className="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden relative shadow-xl">
              <VideoCard item={featuredWork[2]} onPlay={() => setPlayingItem(featuredWork[2])} />
              <StoryPlayer 
                item={featuredWork[2]} 
                isPlaying={playingItem?.id === featuredWork[2].id} 
                onClose={() => setPlayingItem(null)}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div className="sm:col-span-1 lg:col-span-5 h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden relative shadow-xl">
            <VideoCard item={featuredWork[3]} onPlay={() => setPlayingItem(featuredWork[3])} />
            <StoryPlayer 
              item={featuredWork[3]} 
              isPlaying={playingItem?.id === featuredWork[3].id} 
              onClose={() => setPlayingItem(null)}
            />
          </div>

          {/* Stats card - Responsivo */}
          <div className="sm:col-span-1 lg:col-span-7 h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] relative">
            <div 
              className="w-full h-full rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.1))',
                border: '1px solid hsl(var(--primary) / 0.3)',
              }}
            >
              <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-1 md:mb-2">500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Campanhas Criadas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-1 md:mb-2">50M+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Alcance Total</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-1 md:mb-2">98%</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Clientes Felizes</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 border-2 border-primary/30 rounded-lg rotate-12 hidden sm:block" />
              <div className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 bg-primary/20 rounded-full hidden sm:block" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            className="btn-hero group text-base md:text-lg px-8 md:px-10 py-5 md:py-6"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Ver Todos os Cases</span>
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
