import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Silva",
    position: "CEO, TechnoVision",
    company: "Startup de IA",
    rating: 5,
    text: "A MOV transformou completamente nossa presença digital. Em 6 meses, aumentamos nosso faturamento em 300% e nos tornamos referência no setor.",
    results: "300% aumento no faturamento",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
  },
  {
    name: "Carlos Mendes",
    position: "Fundador",
    company: "EcoSmart Solutions",
    rating: 5,
    text: "Estratégias inovadoras que realmente funcionam. A equipe da MOV não apenas entende de marketing, eles respiram inovação.",
    results: "250% mais leads qualificados",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
  },
  {
    name: "Ana Costa",
    position: "Diretora de Marketing",
    company: "Fashion Forward",
    rating: 5,
    text: "ROI impressionante! A MOV conseguiu escalar nossa marca de forma sustentável e com resultados mensuráveis em cada campanha.",
    results: "500% ROI em campanhas",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
  },
  {
    name: "Ricardo Santos",
    position: "Co-founder",
    company: "FinTech Pro",
    rating: 5,
    text: "Parceria estratégica que vai além do marketing. A MOV se tornou uma extensão da nossa equipe, sempre trazendo insights valiosos.",
    results: "1M+ usuários adquiridos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  },
  {
    name: "Juliana Oliveira",
    position: "CMO",
    company: "HealthTech Innovation",
    rating: 5,
    text: "Criatividade sem limites! Cada campanha da MOV supera nossas expectativas e gera buzz genuíno no mercado.",
    results: "150% crescimento orgânico",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
  },
  {
    name: "Pedro Almeida",
    position: "CEO",
    company: "SaaS Revolution",
    rating: 5,
    text: "A MOV não apenas executa, eles inovam. Transformaram nossa visão em realidade digital com resultados que superaram todos os KPIs.",
    results: "400% aumento em conversões",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary rounded-full animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-3 mb-8">
            <Award className="w-5 h-5 text-secondary animate-pulse" />
            <span className="text-sm font-semibold text-secondary">HISTÓRIAS DE SUCESSO</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">CLIENTES QUE</span>
            <br />
            <span className="text-foreground">VIRARAM LENDAS</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada cliente é uma história de transformação. Veja como empresas 
            <span className="text-secondary font-bold"> revolucionaram seus mercados</span> com nossas estratégias.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Testimonial Card */}
          <Card className="card-glow relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <Quote className="w-12 h-12 text-primary/20" />
            </div>
            
            <div className="pt-16 pb-8">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-foreground leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-primary/20"
                />
                <div>
                  <div className="font-bold text-foreground">{currentTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial.position}</div>
                  <div className="text-sm text-primary font-semibold">{currentTestimonial.company}</div>
                </div>
              </div>
            </div>

            {/* Result Badge */}
            <div className="absolute top-6 right-6 bg-gradient-to-r from-secondary to-accent text-white px-4 py-2 rounded-full text-sm font-bold">
              {currentTestimonial.results}
            </div>
          </Card>

          {/* Stats & Navigation */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient">500+</div>
                <div className="text-sm text-muted-foreground font-semibold">Projetos Concluídos</div>
              </div>
              
              <div className="text-center p-6 bg-secondary/5 border border-secondary/10 rounded-2xl">
                <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-3xl font-black text-gradient">98%</div>
                <div className="text-sm text-muted-foreground font-semibold">Taxa de Satisfação</div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="btn-secondary px-6 py-3 text-sm"
              >
                Anterior
              </button>
              
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="btn-hero px-6 py-3 text-sm"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                index === currentIndex 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'border-border/50 hover:border-primary/30'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-primary/20"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {testimonial.text}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button className="btn-hero group">
            <span>Seja o Próximo Case de Sucesso</span>
            <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;