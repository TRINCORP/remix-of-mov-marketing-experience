import { 
  Sparkles, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div className="text-3xl font-black text-gradient">MOV</div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Transformamos marcas em fenômenos digitais através de estratégias inovadoras, 
              criatividade sem limites e tecnologia de ponta.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#', color: 'hover:text-[#1877F2]' },
                { icon: Instagram, href: '#', color: 'hover:text-[#E4405F]' },
                { icon: Linkedin, href: '#', color: 'hover:text-[#0A66C2]' },
                { icon: Twitter, href: '#', color: 'hover:text-[#1DA1F2]' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground hover:scale-110 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Serviços</h3>
            <ul className="space-y-3">
              {[
                'Estratégia Digital',
                'Growth Hacking',
                'Performance Marketing',
                'Branding & Design',
                'Social Media',
                'SEO & Conteúdo'
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Empresa</h3>
            <ul className="space-y-3">
              {[
                'Sobre Nós',
                'Nossa Equipe',
                'Cases de Sucesso',
                'Blog',
                'Carreiras',
                'Contato'
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Contato</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>contato@mov.marketing</span>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+55 (11) 99999-9999</span>
              </div>
              
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>São Paulo, SP<br />Brasil</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Receba insights exclusivos sobre marketing digital.
              </p>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu email"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 MOV Marketing. Todos os direitos reservados.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
                <a href="#" className="hover:text-primary transition-colors">Termos</a>
                <a href="#" className="hover:text-primary transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>e muito código</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button className="btn-hero rounded-full w-14 h-14 p-0 shadow-2xl animate-glow">
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;