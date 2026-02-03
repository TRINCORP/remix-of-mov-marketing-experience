import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';

// Real client logos from MOV_CLIENTES_PARCEIROS folder
const clients = [
  { name: "Aline Britto MMC", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Aline Britto MMC.jpg" },
  { name: "Amitai", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Amitai.png" },
  { name: "Arte Funilaria", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Arte Funilaria.png" },
  { name: "Café Abelha", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Café Abelha.jpg" },
  { name: "Cristiane Loureiro", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Cristiane Loureiro.png" },
  { name: "Cru Sem Disfarces", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Cru Sem Disfarces.jpg" },
  { name: "FY Audio Visual", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - FY Audio Visual.jpg" },
  { name: "FertiQuímica", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - FertiQuímica.jpg" },
  { name: "Gelo Toy", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Gelo Toy.jpg" },
  { name: "Kelby Figueiredo", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Kelby Figueiredo.jpg" },
  { name: "LC Tec", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - LC Tec.jpg" },
  { name: "Majesttade Seguros", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Majesttade Seguros.png" },
  { name: "Miriam Vieira", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Miriam Vieira.png" },
  { name: "Mundo Zitrus", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Mundo Zitrus.jpg" },
  { name: "NSA Cursos", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - NSA Cursos.png" },
  { name: "PUV Group", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - PUV group.png" },
  { name: "SDG Guincho", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - SDG Guincho.jpg" },
  { name: "Wolfs", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/Logo - Wolfs.jpeg" },
  { name: "Trincorp", logo: "/lovable-uploads/MOV_CLIENTES_PARCEIROS/TRINCORP_LOGO_COMPLETA.jpeg" },
];

// 3D Floating Card Component with magnetic effect
const FloatingLogoCard = ({ 
  client, 
  index, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  client: typeof clients[0]; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Glow effect behind card */}
      <motion.div 
        className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translateZ(-20px)"
        }}
      />
      
      {/* Main card */}
      <motion.div
        className="relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)"
        }}
        whileHover={{ 
          scale: 1.08,
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-border/50" />
        
        {/* Animated border gradient */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor"
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Logo container */}
        <div className="relative z-10 w-full h-full p-4 md:p-5 flex items-center justify-center">
          <motion.img
            src={client.logo}
            alt={client.name}
            className="max-w-full max-h-full object-contain filter transition-all duration-500"
            style={{
              filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(100%) brightness(0.8)",
              transform: "translateZ(30px)"
            }}
            loading="lazy"
          />
        </div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
            transform: "translateX(-100%)"
          }}
          animate={isHovered ? { transform: "translateX(100%)" } : { transform: "translateX(-100%)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Sparkle particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: "50%",
                    y: "50%"
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    x: `${30 + Math.random() * 40}%`,
                    y: `${10 + i * 30}%`
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Client name tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ transform: "translateZ(40px) translateX(-50%)" }}
      >
        {client.name}
      </motion.div>
    </motion.div>
  );
};

// Floating orbs background
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${100 + i * 60}px`,
          height: `${100 + i * 60}px`,
          background: `radial-gradient(circle at center, hsl(var(--primary) / ${0.08 - i * 0.01}) 0%, transparent 70%)`,
          left: `${10 + i * 20}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Animated counter
const AnimatedStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
  <motion.div 
    className="flex flex-col items-center gap-2 p-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        {value}
      </span>
    </div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </motion.div>
);

const ClientsPartnersSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Background effects */}
      <FloatingOrbs />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Confiança que gera resultados</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
            <span className="text-foreground">Nossos </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Clientes & Parceiros
              </span>
              {/* Underline effect */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Marcas que escolheram transformar sua presença digital conosco. 
            <span className="text-foreground font-medium"> Cada parceria é uma história de sucesso.</span>
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedStat value={`${clients.length}+`} label="Parceiros ativos" icon={Star} />
          <AnimatedStat value="100%" label="Satisfação" icon={Sparkles} />
          <AnimatedStat value="5+" label="Anos de experiência" icon={Zap} />
        </motion.div>

        {/* Logo grid with 3D effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 justify-items-center mb-16">
          {clients.map((client, index) => (
            <FloatingLogoCard
              key={client.name}
              client={client}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Sua marca pode ser a próxima a fazer parte dessa história
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            Seja nosso parceiro
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsPartnersSection;
