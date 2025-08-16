
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / documentHeight) * 100;
      
      setIsScrolled(scrollY > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#home', id: 'home' },
    { name: 'Serviços', href: '#services', id: 'services' },
    { name: 'Cases', href: '#cases', id: 'cases' },
    { name: 'Sobre', href: '#about', id: 'about' },
    { name: 'Contato', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <img 
                  src="/lovable-uploads/5b1fbcd6-b921-46de-81cc-192aea869e0f.png" 
                  alt="MOV Logo" 
                  className="w-12 h-12 group-hover:scale-110 transition-all duration-300 filter drop-shadow-lg group-hover:drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex flex-col">
                <div className="text-2xl font-black text-gradient">MOV</div>
                <div className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
                  Marketing
                </div>
              </div>
            </div>

            {/* Desktop Navigation Premium */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                    activeSection === item.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                  
                  {/* Active Indicator */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === item.id ? 'w-8' : 'group-hover:w-6'
                  }`} />
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Desktop CTA Premium */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Quick Contact */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="btn-ghost p-3"
                  onClick={() => window.open('tel:+5519981134193', '_blank')}
                >
                  <Phone className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="btn-ghost p-3"
                  onClick={() => window.open('mailto:contato@mov.marketing', '_blank')}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Main CTA */}
              <Button 
                className="btn-hero group px-8 py-3"
                onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              >
                <Sparkles className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Começar Agora</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 rounded-xl hover:bg-primary/10"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`} />
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu Premium */}
          <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 pb-8' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 space-y-2 glass rounded-2xl p-6 border border-border/50">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`block w-full text-left px-6 py-4 rounded-xl font-semibold transition-all duration-300 animate-slide-up ${
                    activeSection === item.id 
                      ? 'text-primary bg-primary/10 border border-primary/20' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-6 space-y-4 border-t border-border/20">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 btn-secondary"
                    onClick={() => window.open('tel:+5519981134193', '_blank')}
                  >
                    <Phone className="mr-2 w-4 h-4" />
                    Ligar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 btn-secondary"
                    onClick={() => window.open('mailto:contato@mov.marketing', '_blank')}
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Email
                  </Button>
                </div>
                
                <Button 
                  className="w-full btn-hero"
                  onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  <span>Começar Agora</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
