import { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  ArrowRight,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamMeeting from '@/assets/team-meeting.jpg';
import workspace from '@/assets/workspace.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const teamStats = [
    { number: "15+", label: "Especialistas", icon: Users },
    { number: "8", label: "Anos de Experiência", icon: Award },
    { number: "500+", label: "Projetos Entregues", icon: Target },
    { number: "98%", label: "Taxa de Sucesso", icon: TrendingUp }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Inovação Constante",
      description: "Sempre na vanguarda das tendências e tecnologias do marketing digital."
    },
    {
      icon: Target,
      title: "Resultados Comprovados",
      description: "Foco total em métricas que realmente importam para o seu negócio."
    },
    {
      icon: Heart,
      title: "Paixão pelo que Fazemos",
      description: "Cada projeto é tratado com dedicação e comprometimento genuínos."
    },
    {
      icon: Zap,
      title: "Agilidade e Eficiência",
      description: "Processos otimizados para entregas rápidas sem comprometer a qualidade."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-6">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">QUEM SOMOS</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gradient mb-8">
            A Força por Trás da
            <br />
            <span className="text-foreground">Revolução Digital</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Equipe especializada em <span className="text-primary font-bold">transformar marcas em fenômenos digitais</span> com resultados comprovados.
          </p>
        </div>

        {/* Company Story */}
        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-24 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Logo and Brand */}
          <div className="relative">
            <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 text-center">
              <img 
                src="/lovable-uploads/daaf83ad-eb48-42e2-9743-321ad5ce7cd6.png" 
                alt="MOV Marketing Logo"
                className="w-32 h-auto mx-auto mb-6 hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-2xl font-black text-gradient mb-4">MOV MARKETING</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Assessoria de Marketing
              </p>
              
              {/* Team Photo */}
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img 
                  src={teamMeeting}
                  alt="Equipe MOV em reunião"
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Nossa Equipe</p>
                  <p className="text-sm opacity-90">Especialistas em Marketing Digital</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-slow" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float" />
          </div>

          {/* Story Content */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Nossa História de Sucesso
            </h3>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                <span className="text-primary font-semibold">8+ anos</span> transformando negócios através de marketing digital inovador e estratégico.
              </p>
              
              <p>
                Combinamos <span className="text-accent font-semibold">criatividade, tecnologia e estratégia</span> para superar expectativas e gerar resultados.
              </p>
              
              <p>
                <span className="text-primary font-semibold">500+ projetos</span> entregues com 98% de satisfação dos clientes.
              </p>
            </div>

            {/* Workspace Image */}
            <div className="relative overflow-hidden rounded-2xl mt-8">
              <img 
                src={workspace}
                alt="Workspace MOV - Ambiente de trabalho moderno"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-bold text-lg mb-2">Nosso Ambiente</h4>
                <p className="text-sm opacity-90">Tecnologia de ponta para resultados excepcionais</p>
              </div>
            </div>

            <Button 
              className="btn-hero group mt-8"
              onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
            >
              <span>Conheça Nossos Cases</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Team Stats */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {teamStats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-foreground mb-4">
              Nossos <span className="text-gradient">Valores</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Os princípios que nos guiam em cada projeto e relacionamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/50 transition-all duration-300 group hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Pronto para Revolucionar Sua Marca?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se às centenas de empresas que já transformaram seus resultados conosco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-hero group"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                <span>Começar Agora</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="btn-secondary"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                <span>Falar no WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;