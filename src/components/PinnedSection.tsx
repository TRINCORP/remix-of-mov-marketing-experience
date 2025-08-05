
import { useState, useEffect, useRef } from 'react';

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
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
        
        // Define as fases da animação baseadas no progresso
        if (clampedProgress < 0.15) {
          setAnimationPhase(0);
        } else if (clampedProgress < 0.35) {
          setAnimationPhase(1);
        } else if (clampedProgress < 0.55) {
          setAnimationPhase(2);
        } else if (clampedProgress < 0.75) {
          setAnimationPhase(3);
        } else {
          setAnimationPhase(4);
        }
      } else {
        setScrollProgress(0);
        setAnimationPhase(0);
      }
    };

    handleScroll(); // Executa uma vez no mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                background: `hsl(var(--primary) / ${0.3 + Math.random() * 0.4})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                opacity: scrollProgress * (0.6 + Math.random() * 0.4),
                boxShadow: `0 0 ${10 + Math.random() * 20}px hsl(var(--primary) / 0.5)`
              }}
            />
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          
          {/* Título principal sempre visível */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollProgress > 0.1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
            }`}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
              <span 
                className="inline-block text-gradient"
                style={{
                  transform: `translateY(${(1 - scrollProgress) * 50}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                TRANSFORMAÇÃO
              </span>
            </h2>
            <p 
              className="text-xl md:text-3xl text-foreground/80 font-light mb-12"
              style={{
                transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              Cada pixel conta uma história de <span className="text-primary font-bold">sucesso</span>
            </p>
          </div>

          {/* Cards de impacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Card 1 */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationPhase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-black text-primary-foreground">+</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gradient mb-4">
                  ESTRATÉGIA
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Transformamos dados em <span className="text-primary font-semibold">insights poderosos</span>
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationPhase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-black text-primary-foreground">⚡</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gradient mb-4">
                  EXECUÇÃO
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Implementamos com <span className="text-secondary font-semibold">precisão cirúrgica</span>
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className={`transition-all duration-1000 ease-out md:col-span-2 lg:col-span-1 ${
                animationPhase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="card-glow group cursor-pointer">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary via-secondary to-primary-glow rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-black text-primary-foreground">∞</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gradient mb-4">
                  RESULTADOS
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Entregamos <span className="text-gradient font-semibold">crescimento exponencial</span>
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas finais */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              animationPhase >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-2xl" />
              <div className="relative p-8 md:p-12 bg-card/80 backdrop-blur-xl rounded-3xl border border-primary/20">
                <h3 className="text-3xl md:text-5xl font-black text-gradient mb-8">
                  NÚMEROS QUE IMPRESSIONAM
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-black text-primary mb-2 animate-glow">+500%</div>
                    <div className="text-muted-foreground font-medium text-lg">ROI Médio dos Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-black text-secondary mb-2 animate-glow">15+</div>
                    <div className="text-muted-foreground font-medium text-lg">Anos Transformando Marcas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-black text-gradient mb-2">200+</div>
                    <div className="text-muted-foreground font-medium text-lg">Projetos de Sucesso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Indicador de progresso aprimorado */}
        <div className="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-1 h-40 bg-border rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-t from-primary via-secondary to-primary-glow transition-all duration-500 ease-out"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  boxShadow: `0 0 20px hsl(var(--primary) / 0.5)`
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              {Math.round(scrollProgress * 100)}%
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedSection;
