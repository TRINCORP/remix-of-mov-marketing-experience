import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageCircle,
  Zap,
  Target,
  CheckCircle
} from 'lucide-react';

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      {/* Animated Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent rounded-full animate-ping" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-secondary rounded-full animate-ping animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full px-8 py-4 mb-8 animate-glow">
            <Rocket className="w-6 h-6 text-primary animate-bounce" />
            <span className="text-lg font-bold text-gradient">PRONTO PARA DECOLAR?</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="block text-gradient animate-slide-up">VAMOS</span>
            <span className="block text-foreground animate-slide-up animation-delay-300">REVOLUCIONAR</span>
            <span className="block text-gradient animate-slide-up animation-delay-600">SEU NEGÓCIO</span>
          </h2>
          
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-900">
            Transforme sua marca em um <span className="text-primary font-bold">fenômeno digital</span>. 
            Consultoria gratuita disponível.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: Zap, text: "Consultoria Gratuita", color: "primary" },
              { icon: Target, text: "Estratégia Personalizada", color: "secondary" },
              { icon: CheckCircle, text: "Resultados Garantidos", color: "accent" }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 justify-center animate-scale-in"
                style={{ animationDelay: `${(index + 10) * 100}ms` }}
              >
                <benefit.icon className={`w-6 h-6 text-${benefit.color}`} />
                <span className="font-semibold text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-slide-up animation-delay-1200">
            <Button 
              className="btn-hero group text-xl px-12 py-6"
              onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
            >
              <Sparkles className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Consultoria Gratuita</span>
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="btn-secondary p-4"
                onClick={() => window.open('tel:+5519981134193', '_blank')}
              >
                <Phone className="w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary p-4"
                onClick={() => window.open('mailto:contato@mov.marketing', '_blank')}
              >
                <Mail className="w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary p-4"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="card-glow">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Fale Conosco</h3>
                <p className="text-muted-foreground">Resposta em até 2 horas</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Empresa
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nome da empresa"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Conte-nos sobre seu projeto
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva seus objetivos, desafios e como podemos ajudar..."
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button type="submit" className="btn-hero w-full text-lg py-4 group">
                <span>Enviar Mensagem</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info & Stats */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="card-glow">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contatos Diretos</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Telefone</div>
                    <div className="text-muted-foreground">(19) 98113-4193</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">contato@mov.marketing</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-2xl hover:bg-accent/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground">Resposta instantânea</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Promise */}
            <div className="card-glow bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center">
                <Zap className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Resposta Rápida</h3>
                <p className="text-muted-foreground mb-4">
                  Respondemos todos os contatos em até <span className="text-primary font-bold">2 horas úteis</span>
                </p>
                <div className="text-4xl font-black text-gradient">100%</div>
                <div className="text-sm text-muted-foreground">Taxa de resposta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;