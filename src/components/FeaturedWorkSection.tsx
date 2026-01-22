import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkItem {
  id: number;
  title: string;
  client: string;
  type: 'video' | 'image';
  thumbnail: string;
  videoUrl?: string;
  color: string;
  result: string;
}

const featuredWork: WorkItem[] = [
  {
    id: 1,
    title: "Explosão Digital",
    client: "TechBrand",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    videoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165",
    color: "#FF6B35",
    result: "+340% engajamento"
  },
  {
    id: 2,
    title: "Campanha Viral",
    client: "FoodCo",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    videoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=364e1a90f0e4e31ec4bd5e12c3e01f8f6e5e86f3&profile_id=165",
    color: "#F59E0B",
    result: "2.5M visualizações"
  },
  {
    id: 3,
    title: "Rebranding Completo",
    client: "StyleBrand",
    type: 'image',
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    color: "#8B5CF6",
    result: "+180% vendas"
  },
  {
    id: 4,
    title: "Lançamento Épico",
    client: "GameStudio",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=165",
    color: "#EC4899",
    result: "500K downloads"
  },
];

const FilmFrame = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const rotation = (index % 2 === 0 ? -3 : 3) + Math.random() * 2;
  
  return (
    <div 
      className="relative group"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Film strip perforations */}
      <div className="absolute -left-4 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-3 bg-background/80 rounded-sm"
          />
        ))}
      </div>
      <div className="absolute -right-4 top-0 bottom-0 w-4 flex flex-col justify-around py-4">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-3 bg-background/80 rounded-sm"
          />
        ))}
      </div>
      
      {/* Film info text */}
      <div className="absolute -left-8 top-4 text-[10px] text-primary/60 font-mono writing-vertical transform -rotate-180">
        FILM PORTRA 400
      </div>
      <div className="absolute -left-8 bottom-8 text-[10px] text-primary/60 font-mono writing-vertical transform -rotate-180">
        43
      </div>
      <div className="absolute -right-8 top-4 text-[10px] text-primary/60 font-mono writing-vertical">
        FILM PORTRA 400
      </div>
      
      {/* Main content with silver/glitter border effect */}
      <div 
        className="relative overflow-hidden rounded-lg transition-all duration-500 group-hover:scale-[1.02]"
        style={{
          boxShadow: '0 0 0 4px rgba(192, 192, 192, 0.6), 0 0 20px rgba(192, 192, 192, 0.3)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const VideoCard = ({ item, isActive }: { item: WorkItem; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isHovered) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isHovered]);

  return (
    <div 
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video or thumbnail */}
      {item.type === 'video' && item.videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={item.videoUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={item.thumbnail}
          />
          {/* Play indicator */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div 
              className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ boxShadow: `0 0 30px ${item.color}` }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-background" />
              ) : (
                <Play className="w-8 h-8 text-background ml-1" />
              )}
            </div>
          </div>
        </>
      ) : (
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay info */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-80'
        }`}
      >
        <span 
          className="text-sm font-bold tracking-wider mb-2"
          style={{ color: item.color }}
        >
          {item.client.toUpperCase()}
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-white/80">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-semibold">{item.result}</span>
        </div>
      </div>

      {/* Color accent bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
        style={{ 
          background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
          boxShadow: `0 0 20px ${item.color}`,
        }}
      />
    </div>
  );
};

const FeaturedWorkSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border-4 border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary/10 rotate-45 animate-float animation-delay-1000" />

      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider">CASES QUE BOMBARAM</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-foreground">Trabalhos que </span>
            <span className="text-gradient">fazem barulho</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada projeto é uma história de sucesso. Veja como transformamos marcas em fenômenos digitais.
          </p>
        </div>

        {/* Featured Work Grid - Collage Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Large featured item */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px]">
            <FilmFrame index={0}>
              <VideoCard item={featuredWork[0]} isActive={activeIndex === 0} />
            </FilmFrame>
          </div>

          {/* Stacked items */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="h-[240px]">
              <FilmFrame index={1}>
                <VideoCard item={featuredWork[1]} isActive={activeIndex === 1} />
              </FilmFrame>
            </div>
            <div className="h-[240px]">
              <FilmFrame index={2}>
                <VideoCard item={featuredWork[2]} isActive={activeIndex === 2} />
              </FilmFrame>
            </div>
          </div>

          {/* Bottom row */}
          <div className="lg:col-span-5 h-[300px]">
            <FilmFrame index={3}>
              <VideoCard item={featuredWork[3]} isActive={activeIndex === 3} />
            </FilmFrame>
          </div>

          {/* Stats card */}
          <div className="lg:col-span-7 h-[300px] relative">
            <div 
              className="w-full h-full rounded-2xl p-8 flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.1))',
                border: '1px solid hsl(var(--primary) / 0.3)',
              }}
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Campanhas Criadas</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">50M+</div>
                  <div className="text-sm text-muted-foreground">Alcance Total</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Clientes Felizes</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-primary/30 rounded-lg rotate-12" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            className="btn-hero group text-lg px-10 py-6"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Ver Todos os Cases</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
};

export default FeaturedWorkSection;
