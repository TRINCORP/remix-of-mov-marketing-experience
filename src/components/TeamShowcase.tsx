import { useState, useEffect, useRef } from 'react';
import { Linkedin, Instagram, Twitter, Sparkles } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  funFact: string;
  color: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "CEO & Estrategista",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    funFact: "Viciada em café e post-its ☕",
    color: "#FF6B35",
  },
  {
    id: 2,
    name: "Pedro Costa",
    role: "Diretor Criativo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    funFact: "Coleciona ideias malucas 🚀",
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "Julia Santos",
    role: "Head de Social Media",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    funFact: "Sonha com algoritmos 📱",
    color: "#EC4899",
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    role: "Performance Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    funFact: "Obcecado por métricas 📊",
    color: "#10B981",
  },
  {
    id: 5,
    name: "Mariana Lima",
    role: "Designer Sênior",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
    funFact: "Vive no Figma 🎨",
    color: "#F59E0B",
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="perspective-1000 cursor-pointer group"
      onMouseEnter={() => {
        setIsHovered(true);
        setTimeout(() => setIsFlipped(true), 200);
      }}
      onMouseLeave={() => {
        setIsFlipped(false);
        setIsHovered(false);
      }}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div 
        className={`relative w-full h-[350px] md:h-[400px] transition-all duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div 
            className="relative w-full h-full rounded-2xl overflow-hidden"
            style={{
              boxShadow: isHovered 
                ? `0 20px 40px ${member.color}40, 0 0 0 2px ${member.color}`
                : '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            {/* Image with cutout effect */}
            <div className="absolute inset-0">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Glitter border effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${member.color}40 0%, transparent 50%, ${member.color}40 100%)`,
                }}
              />
            </div>

            {/* Name tag - sticker style */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${member.color}, ${member.color}CC)`,
              }}
            >
              <div className="absolute -top-3 left-4 px-3 py-1 bg-background rounded text-xs font-bold">
                {member.role}
              </div>
              <h3 className="text-xl font-black text-white mt-2">{member.name}</h3>
            </div>

            {/* Decorative elements */}
            <div 
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: member.color }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div 
            className="w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            style={{
              background: `linear-gradient(135deg, ${member.color}, ${member.color}DD)`,
              boxShadow: `0 20px 40px ${member.color}40`,
            }}
          >
            {/* Fun fact */}
            <div className="text-4xl mb-4">🤪</div>
            <p className="text-white text-lg font-bold mb-6">{member.funFact}</p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>

            {/* Decorative stickers */}
            <div className="absolute top-4 left-4 text-3xl rotate-12">⭐</div>
            <div className="absolute bottom-4 right-4 text-3xl -rotate-12">🎉</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamShowcase = () => {
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
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Fun background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-8xl opacity-10 animate-float">🎨</div>
        <div className="absolute bottom-20 right-20 text-8xl opacity-10 animate-float animation-delay-1000">🚀</div>
        <div className="absolute top-1/2 left-10 text-6xl opacity-10 animate-float animation-delay-500">💡</div>
      </div>

      {/* Confetti-like dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#FF6B35', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i % 5],
              opacity: 0.3,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl">👋</span>
            <span className="text-sm font-bold text-primary tracking-wider">CONHEÇA O TIME</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Mentes </span>
            <span className="text-gradient">brilhantes</span>
            <span className="text-foreground">,</span>
            <br />
            <span className="text-foreground">ideias </span>
            <span className="relative">
              <span className="text-gradient">malucas</span>
              <span className="absolute -top-4 -right-8 text-3xl animate-bounce">🤪</span>
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um time apaixonado por transformar marcas em fenômenos. 
            Passe o mouse para conhecer nossos super-heróis do marketing!
          </p>
        </div>

        {/* Team Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Fun CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Quer fazer parte do time mais divertido do marketing?
          </p>
          <a 
            href="mailto:contato@movmarketing.com.br"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-lg"
          >
            <span>Manda um salve! 🤙</span>
          </a>
        </div>
      </div>

      {/* Custom 3D styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default TeamShowcase;
