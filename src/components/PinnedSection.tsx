
import { useState, useEffect, useRef } from 'react';

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mensagens progressivas de carregamento
  const loadingMessages = [
    "Você está pronto para revolucionar?",
    "Cada detalhe faz a diferença…", 
    "A inovação está acontecendo agora.",
    "Bem-vindo à MOV, onde cada pixel conta uma história de sucesso."
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Verifica se a seção está na área de visualização
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calcula o progresso baseado na posição da seção
        let progress = 0;
        
        if (rect.top <= 0) {
          // Seção está "pinned" no topo
          progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        } else {
          // Seção está entrando na tela
          progress = (windowHeight - rect.top) / windowHeight * 0.2;
        }
        
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(clampedProgress);
        
        // Marca que o usuário começou a rolar
        if (clampedProgress > 0.01 && !hasStartedScrolling) {
          setHasStartedScrolling(true);
        }
        
        // Define qual mensagem mostrar baseada no progresso
        let messageIndex = 0;
        if (clampedProgress >= 0.25) messageIndex = 1;
        if (clampedProgress >= 0.5) messageIndex = 2;
        if (clampedProgress >= 0.75) messageIndex = 3;
        
        setCurrentMessage(messageIndex);
      } else {
        setScrollProgress(0);
        setCurrentMessage(0);
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

    optimizedHandleScroll(); // Executa uma vez no mount
    window.addEventListener('scroll', optimizedHandleScroll, { passive: true });
    window.addEventListener('resize', optimizedHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedHandleScroll);
      window.removeEventListener('resize', optimizedHandleScroll);
    };
  }, [hasStartedScrolling]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400vh] bg-background"
    >
      {/* Conteúdo fixo durante o scroll */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Imagem de fundo com revelação progressiva */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollProgress * 0.1})`,
            opacity: scrollProgress * 0.9,
            filter: `brightness(${0.4 + scrollProgress * 0.3}) contrast(${1 + scrollProgress * 0.2})`
          }}
        />
        
        {/* Overlay gradient dinâmico */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at center, 
              hsl(var(--background) / ${0.8 - scrollProgress * 0.3}) 0%, 
              hsl(var(--background) / ${0.9 - scrollProgress * 0.2}) 100%)`,
          }}
        />
        
        {/* Partículas douradas animadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const size = 4 + (i % 3) * 2; // Tamanhos fixos baseados no índice
            const opacity = 0.4 + (i % 4) * 0.15; // Opacidades fixas
            const left = (i * 8.33) % 100; // Posições distribuídas uniformemente
            const top = (i * 13.7) % 100;
            const delay = (i * 0.5) % 4; // Delays escalonados
            const duration = 5 + (i % 3); // Durações variadas mas fixas
            
            return (
              <div
                key={i}
                className="absolute rounded-full animate-float"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `hsl(var(--primary) / ${opacity})`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  opacity: Math.min(scrollProgress * 1.5, 1),
                  boxShadow: `0 0 ${15}px hsl(var(--primary) / 0.4)`
                }}
              />
            );
          })}
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
          
          {/* Mensagem inicial (aparece apenas no início) */}
          {!hasStartedScrolling && (
            <div className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6">
                <span className="inline-block text-gradient">
                  TRANSFORMAÇÃO
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light mb-8 md:mb-12 px-2">
                Cada pixel conta uma história de <span className="text-primary font-bold">sucesso</span>
              </p>
            </div>
          )}

          {/* Mensagens progressivas durante o scroll */}
          {hasStartedScrolling && (
            <div 
              key={currentMessage}
              className="animate-fade-in min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-center justify-center"
            >
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8">
                  <span 
                    className="inline-block text-gradient leading-tight"
                    style={{
                      transform: `translateY(${Math.max(0, (1 - scrollProgress) * 20)}px)`,
                      transition: 'transform 0.8s ease-out'
                    }}
                  >
                    {loadingMessages[currentMessage]}
                  </span>
                </h2>
                
                {/* Barra de progresso elegante */}
                <div className="w-32 sm:w-48 md:w-64 h-1 bg-border rounded-full mx-auto mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-primary-glow transition-all duration-700 ease-out"
                    style={{ 
                      width: `${scrollProgress * 100}%`,
                      boxShadow: `0 0 10px hsl(var(--primary) / 0.5)`
                    }}
                  />
                </div>
                
                {/* Percentual */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  {Math.round(scrollProgress * 100)}% Carregado
                </p>
              </div>
            </div>
          )}

          {/* Conteúdo adicional que aparece apenas quando o carregamento termina */}
          {scrollProgress >= 0.95 && (
            <div className="animate-fade-in mt-8 md:mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
                
                {/* Card de impacto final */}
                <div className="md:col-span-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl md:rounded-3xl blur-xl" />
                    <div className="relative p-6 md:p-8 lg:p-12 bg-card/90 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-primary/30">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-6 md:mb-8 leading-tight">
                        TRANSFORMAÇÃO COMPLETA
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        <div className="text-center p-4">
                          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-2 animate-glow">+500%</div>
                          <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">ROI Médio dos Clientes</div>
                        </div>
                        <div className="text-center p-4">
                          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-secondary mb-2 animate-glow">15+</div>
                          <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">Anos Transformando Marcas</div>
                        </div>
                        <div className="text-center p-4 sm:col-span-2 md:col-span-1">
                          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-2">200+</div>
                          <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">Projetos de Sucesso</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Indicador de progresso lateral (apenas durante o carregamento) */}
        {hasStartedScrolling && scrollProgress < 0.95 && (
          <div className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20">
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-0.5 md:w-1 h-24 sm:h-32 md:h-40 bg-border rounded-full overflow-hidden">
                <div 
                  className="w-full bg-gradient-to-t from-primary via-secondary to-primary-glow transition-all duration-700 ease-out"
                  style={{ 
                    height: `${scrollProgress * 100}%`,
                    boxShadow: `0 0 12px hsl(var(--primary) / 0.5)`
                  }}
                />
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium bg-background/80 px-1 py-0.5 rounded text-center">
                {Math.round(scrollProgress * 100)}%
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PinnedSection;
