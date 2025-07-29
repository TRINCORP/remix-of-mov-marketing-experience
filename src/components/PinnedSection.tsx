
import { useState, useEffect, useRef } from 'react';

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Verifica se a seção está visível
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        setIsActive(true);
        
        // Calcula o progresso do scroll dentro da seção
        const progress = Math.abs(rect.top) / (rect.height - windowHeight);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(clampedProgress);
        
        // Define as fases da animação baseadas no progresso
        if (clampedProgress < 0.2) {
          setAnimationPhase(0); // Inicial
        } else if (clampedProgress < 0.4) {
          setAnimationPhase(1); // Revela imagem
        } else if (clampedProgress < 0.6) {
          setAnimationPhase(2); // Primeira mensagem
        } else if (clampedProgress < 0.8) {
          setAnimationPhase(3); // Segunda mensagem
        } else {
          setAnimationPhase(4); // Mensagem final
        }
      } else {
        setIsActive(false);
        setAnimationPhase(0);
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[300vh] overflow-hidden"
    >
      {/* Conteúdo fixo durante o scroll */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Imagem de fundo com revelação progressiva */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop')`,
            clipPath: `inset(${100 - (scrollProgress * 100)}% 0 0 0)`,
            filter: `brightness(${0.3 + scrollProgress * 0.4})`
          }}
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 transition-opacity duration-1000"
          style={{ opacity: 0.4 + scrollProgress * 0.4 }}
        />
        
        {/* Partículas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                opacity: scrollProgress * 0.8
              }}
            />
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          
          {/* Fase 1: Revelação inicial */}
          <div 
            className={`transition-all duration-1000 ${
              animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              <span className="text-gradient">CADA SCROLL</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light">
              É uma oportunidade de transformação
            </p>
          </div>

          {/* Fase 2: Primeira mensagem */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              animationPhase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="my-12 p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-primary/20">
              <h3 className="text-3xl md:text-5xl font-black text-gradient mb-6">
                TRANSFORMAMOS
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Ideias em <span className="text-primary font-bold">estratégias vencedoras</span>
              </p>
            </div>
          </div>

          {/* Fase 3: Segunda mensagem */}
          <div 
            className={`transition-all duration-1000 delay-600 ${
              animationPhase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="my-12 p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-secondary/20">
              <h3 className="text-3xl md:text-5xl font-black text-gradient mb-6">
                ELEVAMOS
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Negócios ao <span className="text-secondary font-bold">próximo nível</span>
              </p>
            </div>
          </div>

          {/* Fase 4: Mensagem final */}
          <div 
            className={`transition-all duration-1000 delay-900 ${
              animationPhase >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              <div className="relative p-12 bg-black/60 backdrop-blur-lg rounded-3xl border-2 border-primary/30">
                <h3 className="text-4xl md:text-6xl font-black text-gradient mb-8">
                  RESULTADOS
                </h3>
                <p className="text-xl md:text-2xl text-white font-semibold mb-6">
                  Que falam por si só
                </p>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-primary mb-2">+500%</div>
                    <div className="text-white/80 font-medium">ROI Médio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-secondary mb-2">15+</div>
                    <div className="text-white/80 font-medium">Anos de Experiência</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-gradient mb-2">∞</div>
                    <div className="text-white/80 font-medium">Possibilidades</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Indicador de progresso */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="w-full bg-gradient-to-t from-primary to-secondary transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PinnedSection;
