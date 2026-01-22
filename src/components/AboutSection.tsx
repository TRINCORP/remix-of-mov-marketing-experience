import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, Zap, Target, Heart, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Goat Agency style - Editorial grid with video and bold typography
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [activeValue, setActiveValue] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Auto-rotate values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Video controls
  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  const values = [
    { icon: Heart, label: "Paixão", color: "hsl(var(--primary))" },
    { icon: Target, label: "Foco", color: "hsl(var(--secondary))" },
    { icon: Zap, label: "Agilidade", color: "hsl(var(--primary-glow))" },
    { icon: TrendingUp, label: "Resultados", color: "hsl(var(--primary))" },
  ];

  const stats = [
    { number: "100%", label: "Dedicação" },
    { number: "24/7", label: "Disponibilidade" },
    { number: "∞", label: "Criatividade" },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="gsap-section relative py-20 md:py-32 overflow-hidden bg-background"
    >
      {/* Subtle grid background - Goat style */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header - Editorial style */}
        <div className="text-center mb-16 md:mb-24">
          <div className="gsap-badge inline-flex items-center gap-2 mb-6">
            <div className="gsap-line w-12 h-px bg-primary" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase font-medium">
              Quem Somos
            </span>
            <div className="gsap-line w-12 h-px bg-primary" />
          </div>
          
          <h2 className="gsap-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-foreground">Uma agência </span>
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 96%, 70%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              diferente
            </span>
          </h2>
          
          <p className="gsap-paragraph text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Nascemos para quebrar padrões. Não somos mais uma agência, 
            somos seu parceiro de crescimento.
          </p>
        </div>

        {/* Main Grid - Goat Agency Editorial Layout */}
        <div className="gsap-cards-container grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
          
          {/* Video Card - Large */}
          <div className="gsap-card lg:col-span-7 relative group">
            <div className="gsap-image relative aspect-[16/10] rounded-3xl overflow-hidden bg-muted">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                playsInline
                muted={videoMuted}
                poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80"
              >
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              </video>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              
              {/* Play button */}
              <button
                onClick={() => setVideoPlaying(!videoPlaying)}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div 
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    videoPlaying 
                      ? 'bg-primary/20 scale-90' 
                      : 'bg-primary/30 group-hover/play:bg-primary/40 group-hover/play:scale-110'
                  }`}
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  {videoPlaying ? (
                    <Pause className="w-8 h-8 text-primary" fill="currentColor" />
                  ) : (
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  )}
                </div>
              </button>

              {/* Video controls */}
              {videoPlaying && (
                <button
                  onClick={() => setVideoMuted(!videoMuted)}
                  className="absolute bottom-4 right-4 p-3 rounded-full bg-background/50 hover:bg-background/70 transition-all duration-300"
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  {videoMuted ? (
                    <VolumeX className="w-5 h-5 text-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-primary" />
                  )}
                </button>
              )}

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-20">
                <span className="text-sm text-primary font-medium">Nossa Cultura</span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1">
                  Onde a criatividade encontra resultados
                </h3>
              </div>
            </div>
          </div>

          {/* Right column - Stats and values */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stats row */}
            <div 
              className={`grid grid-cols-3 gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-muted/30 rounded-2xl p-4 md:p-6 text-center border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div 
                    className="text-2xl md:text-3xl lg:text-4xl font-black mb-1"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Values carousel */}
            <div 
              className={`flex-1 bg-muted/30 rounded-3xl p-6 md:p-8 border border-border/50 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Nossos Valores</span>
              </div>

              {/* Active value display */}
              <div className="relative h-32 mb-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.label}
                      className={`absolute inset-0 flex items-center gap-4 transition-all duration-500 ${
                        activeValue === index 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-10'
                      }`}
                    >
                      <div 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                        style={{ 
                          background: `${value.color}20`,
                          boxShadow: `0 0 30px ${value.color}30`,
                        }}
                      >
                        <Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: value.color }} />
                      </div>
                      <div>
                        <h4 
                          className="text-3xl md:text-4xl font-black"
                          style={{ color: value.color }}
                        >
                          {value.label}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          É o que nos move
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Value indicators */}
              <div className="flex items-center gap-2">
                {values.map((value, index) => (
                  <button
                    key={value.label}
                    onClick={() => setActiveValue(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeValue === index ? 'w-8' : 'w-3'
                    }`}
                    style={{
                      background: activeValue === index 
                        ? value.color 
                        : 'hsl(var(--muted-foreground) / 0.3)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Story + CTA */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {/* Story text */}
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Somos uma agência{' '}
              <span className="text-primary">emergente</span>{' '}
              com fome de{' '}
              <span className="text-primary">resultados</span>
            </h3>
            
            <div className="space-y-4 text-muted-foreground text-base md:text-lg">
              <p>
                Enquanto outras agências tratam você como "mais um cliente", 
                nós tratamos seu projeto como se fosse nosso próprio negócio.
              </p>
              <p>
                Nossa energia jovem e dedicação total significa que você terá 
                acesso direto a quem realmente faz acontecer - sem intermediários, 
                sem burocracia.
              </p>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-6 md:p-10 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary">Vamos Conversar</span>
            </div>
            
            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para crescer?
            </h4>
            
            <p className="text-muted-foreground mb-8">
              Seja um dos nossos primeiros parceiros de sucesso. 
              Sua marca merece atenção especial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="group flex-1 h-12 md:h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                <span>Começar Agora</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 h-12 md:h-14 text-base font-semibold rounded-xl border-primary/30 hover:bg-primary/10"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Floating accent */}
        <div 
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'hsl(var(--primary))',
            opacity: 0.05,
          }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
