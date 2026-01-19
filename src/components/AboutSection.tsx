import { useState, useRef, useEffect } from 'react';
import { Users, Target, Lightbulb, Award, ArrowRight, TrendingUp, Heart, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamMeeting from '@/assets/team-meeting.jpg';
import workspace from '@/assets/workspace.jpg';
import { EnergyField } from '@/components/animations/EnergyField';
import { MagneticNumber } from '@/components/animations/MagneticNumbers';
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.05
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const companyValues = [{
    icon: Heart,
    label: "Paixão",
    description: "Dedicação genuína em cada projeto"
  }, {
    icon: Lightbulb,
    label: "Inovação",
    description: "Soluções criativas e modernas"
  }, {
    icon: Target,
    label: "Foco",
    description: "Resultados que fazem a diferença"
  }, {
    icon: Zap,
    label: "Agilidade",
    description: "Entrega rápida sem perder qualidade"
  }];
  return <section ref={sectionRef} id="about" className="section-animate py-32 relative overflow-hidden">
      {/* Three.js Energy Background */}
      <EnergyField className="opacity-30" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 parallax-element" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          
          <h2 className="text-4xl md:text-6xl font-black text-gradient mb-8 text-reveal">
            Sobre Nós
            <br />
            <span className="text-foreground silver-shine-text">MOV Marketing</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed parallax-element">
            Uma <span className="silver-shine-text">nova força</span> no marketing digital, focada em <span className="silver-shine-text">resultados reais</span> para o seu negócio.
          </p>
        </div>

        {/* Company Story */}
        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-24 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Logo and Brand */}
          <div className="relative">
            <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 text-center">
              <img 
                src="/lovable-uploads/daaf83ad-eb48-42e2-9743-321ad5ce7cd6.png" 
                alt="MOV Marketing Logo" 
                className={`w-32 h-auto mx-auto mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}
                style={{
                  animation: isVisible ? 'drop-bounce 1s ease-out forwards' : 'none',
                  animationDelay: '300ms'
                }}
              />
              <h3 className="text-2xl font-black text-gradient mb-4">MOV MARKETING</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Assessoria de Marketing
              </p>
              
              {/* Team Photo */}
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={teamMeeting} alt="Equipe MOV em reunião" className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Nossa Equipe</p>
                  <p className="text-sm opacity-90">Especialistas em Marketing Digital</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-slow energy-pulse" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float magnetic-float" />
          </div>

          {/* About Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary tracking-wide">NOSSA HISTÓRIA</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-gradient mb-8 silver-shine-text">
              Quem Somos
            </h3>
            
            <div className="space-y-6 text-foreground text-xl leading-relaxed">
              <p className="font-semibold">
                Somos uma <span className="text-primary font-black text-2xl">agência emergente</span> de marketing digital, nascida da paixão por transformar negócios através de estratégias inovadoras e personalizadas.
              </p>
              
              <p className="font-medium">
                Nossa <span className="text-accent font-bold text-xl">energia jovem e fome de resultados</span> nos permite dedicar atenção total a cada cliente, tratando seu projeto como se fosse nosso próprio negócio.
              </p>
              
              <p className="font-medium">
                Acreditamos que <span className="text-primary font-bold text-xl">grandes conquistas começam com primeiros passos corajosos</span> - e estamos aqui para dar esse passo junto com você.
              </p>
              
              <p className="font-semibold text-lg">
                <span className="text-accent font-black text-2xl">Crescendo juntos</span> - enquanto impulsionamos seu negócio, também evoluímos, criando uma parceria genuína para o sucesso mútuo.
              </p>
            </div>

            {/* Workspace Image */}
            <div className="relative overflow-hidden rounded-2xl mt-8">
              <img src={workspace} alt="Workspace MOV - Ambiente de trabalho moderno" className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-bold text-lg mb-2">Nosso Ambiente</h4>
                <p className="text-sm opacity-90">Tecnologia de ponta para resultados excepcionais</p>
              </div>
            </div>

              <Button className="btn-hero group mt-8 glow-border energy-pulse" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
              <span className="text-reveal">Vamos Conversar</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform drop-shadow-glow" />
            </Button>
          </div>
        </div>

        {/* Company Values */}
        


        {/* CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-3xl p-12 glow-border">
            <h3 className="text-3xl font-bold text-foreground mb-4 text-reveal">
              Vamos Crescer Juntos?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seja um dos nossos primeiros parceiros de sucesso. Sua marca merece atenção especial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero group energy-pulse glow-border" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
                <span className="text-reveal">Começar Agora</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform drop-shadow-glow" />
              </Button>
              
              <Button variant="outline" className="btn-secondary magnetic-float" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
                <span>Falar no WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;