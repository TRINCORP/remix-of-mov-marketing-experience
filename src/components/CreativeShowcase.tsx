import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Search, Map, Settings, BarChart3, Brain } from 'lucide-react';

import imgDiagnostico from '@/assets/process/diagnostico-estrategico.jpg';
import imgPlanejamento from '@/assets/process/planejamento-direcionamento.png';
import imgEstrutura from '@/assets/process/estrutura-processos.jpg';
import imgExecucao from '@/assets/process/execucao-performance.png';
import imgDecisao from '@/assets/process/decisao-execucao.jpg';

interface ProcessStep {
  id: number;
  cardTitle: string;
  title: string;
  subtitle: string[];
  image: string;
  caption: string;
  icon: typeof Search;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    cardTitle: 'Diagnóstico Estratégico',
    title: 'Estrutura que começa antes da execução',
    subtitle: [
      'Antes de qualquer campanha, mergulhamos no cenário, números e posicionamento.',
      'Decisão vem antes de ação.',
    ],
    image: imgDiagnostico,
    caption: 'Diagnóstico estratégico',
    icon: Search,
  },
  {
    id: 2,
    cardTitle: 'Planejamento e Direcionamento',
    title: 'Clareza que organiza o crescimento',
    subtitle: [
      'Transformamos análise em plano estruturado, prioridades definidas e metas alinhadas ao negócio.',
    ],
    image: imgPlanejamento,
    caption: 'Planejamento estratégico',
    icon: Map,
  },
  {
    id: 3,
    cardTitle: 'Estrutura e Processos',
    title: 'Processos que sustentam escala',
    subtitle: [
      'Nada é improvisado. Trabalhamos com fluxos internos claros, acompanhamento contínuo e organização operacional.',
    ],
    image: imgEstrutura,
    caption: 'Estrutura operacional',
    icon: Settings,
  },
  {
    id: 4,
    cardTitle: 'Execução e Performance',
    title: 'Execução orientada por dados',
    subtitle: [
      'Criatividade guiada por métricas.',
      'Performance construída com acompanhamento constante.',
    ],
    image: imgExecucao,
    caption: 'Performance estratégica',
    icon: BarChart3,
  },
  {
    id: 5,
    cardTitle: 'Decisão Acima de Execução',
    title: 'Decisão antes de produção',
    subtitle: [
      'Não começamos criando.',
      'Começamos entendendo o que realmente precisa ser construído. Aqui tratamos marketing como um sistema. Integramos estratégia, tecnologia, comercial e comunicação em uma estrutura única de crescimento.',
    ],
    image: imgDecisao,
    caption: 'Sistema de crescimento',
    icon: Brain,
  },
];

const CreativeShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const current = steps[activeStep];

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Badge */}
        <motion.div
          className="flex justify-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider">NOSSO PROCESSO CRIATIVO</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight text-foreground">
                  {current.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-gradient relative">
                    {current.title.split(' ').slice(-1)[0]}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-4 text-primary"
                      viewBox="0 0 200 20"
                    >
                      <path
                        d="M0,10 Q50,0 100,10 T200,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="animate-draw"
                      />
                    </svg>
                  </span>
                </h2>

                <div className="space-y-3 mb-8">
                  {current.subtitle.map((line, i) => (
                    <p key={i} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step cards */}
            <div className="flex flex-wrap gap-3 mt-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-primary/15 border-primary/50 text-primary shadow-lg shadow-primary/10'
                        : 'bg-muted/50 border-border/50 text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                    <span className="text-sm font-medium whitespace-nowrap">{step.cardTitle}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Main image container - Polaroid style */}
                <div className="bg-white p-3 pb-14 rounded-lg shadow-2xl mx-auto max-w-md lg:max-w-lg" style={{ transform: 'rotate(-2deg)' }}>
                  <div className="aspect-[4/3] overflow-hidden rounded">
                    <img
                      src={current.image}
                      alt={current.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Caption */}
                  <p className="absolute bottom-4 left-0 right-0 text-center text-muted-foreground/80 italic text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                    {current.caption}
                  </p>
                </div>

                {/* Decorative tape */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 rounded-sm opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, hsla(45, 80%, 70%, 0.8), hsla(45, 80%, 60%, 0.6))',
                    transform: 'translateX(-50%) rotate(3deg)',
                  }}
                />

                {/* Step indicator */}
                <div className="absolute -bottom-6 right-4 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5">
                  <span className="text-sm font-bold text-primary">
                    {String(activeStep + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

        @keyframes draw {
          from { stroke-dasharray: 200; stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 2s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default CreativeShowcase;
