import { useEffect, useRef } from 'react';
import { useCarouselColorEffect } from '@/hooks/useCarouselColorEffect';

const ClientsPartnersSection = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useCarouselColorEffect(containerRef);

  // Fictional client/partner logos - placeholder data
  const clients = [
    { name: "TechCorp", color: "#3B82F6" },
    { name: "InnovaSoft", color: "#10B981" },
    { name: "DataFlow", color: "#8B5CF6" },
    { name: "CloudNext", color: "#F59E0B" },
    { name: "SmartBiz", color: "#EF4444" },
    { name: "FutureHub", color: "#06B6D4" },
    { name: "NeoTech", color: "#EC4899" },
    { name: "VisionPro", color: "#14B8A6" },
    { name: "AlphaTech", color: "#F97316" },
    { name: "BetaSoft", color: "#6366F1" },
    { name: "GammaLab", color: "#84CC16" },
    { name: "DeltaGroup", color: "#A855F7" },
  ];

  useEffect(() => {
    const scroll1 = scrollRef1.current;

    if (scroll1) {
      const scrollWidth = scroll1.scrollWidth / 2;
      let position1 = 0;
      
      const animate1 = () => {
        position1 += 0.5;
        if (position1 >= scrollWidth) {
          position1 = 0;
        }
        scroll1.style.transform = `translateX(-${position1}px)`;
        requestAnimationFrame(animate1);
      };
      
      const animation1 = requestAnimationFrame(animate1);
      return () => cancelAnimationFrame(animation1);
    }
  }, []);

  const LogoCard = ({ name, color }: { name: string; color: string }) => (
    <div className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 mx-4 md:mx-6 flex items-center justify-center rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 logo-card">
      <div className="text-2xl md:text-3xl font-bold logo-text" style={{ '--logo-color': color } as React.CSSProperties}>
        {name}
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nossos Clientes e Parceiros
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Empresas que confiam em nosso trabalho e crescem conosco
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative carousel-container" ref={containerRef}>
        <div className="carousel-gradient-left"></div>
        <div className="carousel-gradient-right"></div>
        <div className="flex" ref={scrollRef1}>
          {/* Duplicate for infinite scroll */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <LogoCard key={`carousel-${index}`} name={client.name} color={client.color} />
          ))}
        </div>
      </div>

      <style>{`
        .carousel-container {
          position: relative;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .carousel-gradient-left,
        .carousel-gradient-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          z-index: 10;
          pointer-events: none;
        }

        .carousel-gradient-left {
          left: 0;
          background: linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%);
        }

        .carousel-gradient-right {
          right: 0;
          background: linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%);
        }

        .logo-card {
          position: relative;
        }

        .logo-text {
          filter: grayscale(100%);
          color: hsl(var(--muted-foreground));
          transition: filter 0.6s ease, color 0.6s ease;
        }

        /* Color appears at edges as logos pass through */
        .carousel-container {
          position: relative;
        }

        .carousel-container::before,
        .carousel-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 300px;
          z-index: 5;
          pointer-events: none;
        }

        .carousel-container::before {
          left: 0;
          background: linear-gradient(
            to right,
            hsla(var(--background), 1) 0%,
            hsla(var(--background), 0.8) 20%,
            transparent 100%
          );
        }

        .carousel-container::after {
          right: 0;
          background: linear-gradient(
            to left,
            hsla(var(--background), 1) 0%,
            hsla(var(--background), 0.8) 20%,
            transparent 100%
          );
        }

        @media (min-width: 768px) {
          .carousel-container::before,
          .carousel-container::after {
            width: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsPartnersSection;
