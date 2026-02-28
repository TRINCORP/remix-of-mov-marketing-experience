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
  rotation: number;
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
    rotation: -6,
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
    rotation: 4,
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
    rotation: -3,
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
    rotation: 5,
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
    rotation: -4,
  },
];

const PolaroidCard = ({
  step,
  index,
  isActive,
  onClick,
  isVisible,
}: {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
  isVisible: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      className="cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: step.rotation }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              rotate: hovered || isActive ? 0 : step.rotation,
              scale: hovered ? 1.05 : isActive ? 1.02 : 1,
            }
          : {}
      }
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className={`relative bg-white p-2 pb-10 rounded-lg transition-shadow duration-300 ${
          isActive
            ? 'shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_0_2px_hsl(var(--primary))]'
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]'
        }`}
      >
        {/* Image */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={step.image}
            alt={step.caption}
            className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-2 left-0 right-0 text-center px-2">
          <span className="text-gray-600 font-medium text-xs md:text-sm" style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)' }}>
            {step.caption}
          </span>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Icon className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        )}

        {/* Decorative tape */}
        <div
          className="absolute -top-2.5 left-1/2 w-14 h-5 opacity-70 rounded-sm"
          style={{
            background: 'linear-gradient(135deg, hsla(45, 80%, 70%, 0.8), hsla(45, 80%, 60%, 0.6))',
            transform: `translateX(-50%) rotate(${(index % 2 === 0 ? 3 : -2)}deg)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const CreativeShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
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

        {/* Title + Subtitle - dynamic */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="max-w-3xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight text-foreground">
              {current.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient relative inline-block">
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

            <div className="space-y-2">
              {current.subtitle.map((line, i) => (
                <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cards grid - all visible at once */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <PolaroidCard
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
              isVisible={isVisible}
            />
          ))}
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
