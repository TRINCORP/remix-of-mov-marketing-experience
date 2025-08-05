
import { useState, useEffect, useRef } from 'react';

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        
        // Marca que o usuário começou a rolar se o progresso > 0
        if (clampedProgress > 0 && !hasStartedScrolling) {
          setHasStartedScrolling(true);
        }
        
        // Define as fases da animação apenas após o usuário começar a rolar
        if (hasStartedScrolling || clampedProgress > 0) {
          const currentPhase = animationPhase;
          let newPhase = currentPhase;
          
          if (clampedProgress < 0.1) {
            newPhase = 0;
          } else if (clampedProgress >= 0.15 && currentPhase < 1) {
            newPhase = 1;
          } else if (clampedProgress >= 0.35 && currentPhase < 2) {
            newPhase = 2;
          } else if (clampedProgress >= 0.55 && currentPhase < 3) {
            newPhase = 3;
          } else if (clampedProgress >= 0.75 && currentPhase < 4) {
            newPhase = 4;
          }
          
          if (newPhase !== currentPhase) {
            setAnimationPhase(newPhase);
          }
        }
      } else {
        setScrollProgress(0);
        if (!hasStartedScrolling) {
          setAnimationPhase(0);
        }
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
  }, [animationPhase, hasStartedScrolling]);

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
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          
          {/* Mensagem inicial - antes do scroll começar */}
          {!hasStartedScrolling && (
            <div 
              className={`transition-all duration-1000 ease-out ${
                scrollProgress === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6">
                <span className="inline-block text-gradient">
                  TUDO COMEÇA
                </span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground/80 font-light mb-8 md:mb-12 px-4">
                com uma <span className="text-primary font-bold">ideia...</span>
              </p>
            </div>
          )}

          {/* Conteúdo de transformação - após começar o scroll */}
          {hasStartedScrolling && (
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationPhase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6">
                <span 
                  className="inline-block text-gradient"
                  style={{
                    transform: `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)`,
                    transition: 'transform 0.6s ease-out'
                  }}
                >
                  TRANSFORMAÇÃO
                </span>
              </h2>
              <p 
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground/80 font-light mb-8 md:mb-12 px-4"
                style={{
                  transform: `translateY(${Math.max(0, (1 - scrollProgress) * 20)}px)`,
                  transition: 'transform 0.6s ease-out'
                }}
              >
                Cada pixel conta uma história de <span className="text-primary font-bold">sucesso</span>
              </p>
            </div>
          )}

          {/* Cards de impacto - apenas após começar o scroll */}
          {hasStartedScrolling && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 px-4">
            
            {/* Card 1 */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationPhase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl md:text-2xl font-black text-primary-foreground">+</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gradient mb-3 md:mb-4">
                  ESTRATÉGIA
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed px-2">
                  Transformamos dados em <span className="text-primary font-semibold">insights poderosos</span>
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationPhase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl md:text-2xl font-black text-primary-foreground">⚡</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gradient mb-3 md:mb-4">
                  EXECUÇÃO
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed px-2">
                  Implementamos com <span className="text-secondary font-semibold">precisão cirúrgica</span>
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className={`transition-all duration-1000 ease-out md:col-span-2 lg:col-span-1 ${
                animationPhase >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-primary via-secondary to-primary-glow rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl md:text-2xl font-black text-primary-foreground">∞</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gradient mb-3 md:mb-4">
                  RESULTADOS
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed px-2">
                  Entregamos <span className="text-gradient font-semibold">crescimento exponencial</span>
                </p>
              </div>
            </div>
          </div>
          )}

          {/* Estatísticas finais - apenas após começar o scroll */}
          {hasStartedScrolling && (
          <div 
            className={`transition-all duration-1000 ease-out px-4 ${
              animationPhase >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl" />
              <div className="relative p-6 md:p-8 lg:p-12 bg-card/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-primary/20">
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gradient mb-6 md:mb-8">
                  NÚMEROS QUE IMPRESSIONAM
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-2 animate-glow">+500%</div>
                    <div className="text-muted-foreground font-medium text-sm md:text-base lg:text-lg">ROI Médio dos Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-secondary mb-2 animate-glow">15+</div>
                    <div className="text-muted-foreground font-medium text-sm md:text-base lg:text-lg">Anos Transformando Marcas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gradient mb-2">200+</div>
                    <div className="text-muted-foreground font-medium text-sm md:text-base lg:text-lg">Projetos de Sucesso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

        </div>

        {/* Indicador de progresso aprimorado */}
        <div className="absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <div className="w-0.5 md:w-1 h-32 md:h-40 bg-border rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-t from-primary via-secondary to-primary-glow transition-all duration-500 ease-out"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  boxShadow: `0 0 15px hsl(var(--primary) / 0.4)`
                }}
              />
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground font-medium">
              {Math.round(scrollProgress * 100)}%
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedSection;
