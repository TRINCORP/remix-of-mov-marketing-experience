import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Sobre', href: '#about', id: 'about' },
    { name: 'Serviços', href: '#services', id: 'services' },
    { name: 'Cases', href: '#cases', id: 'cases' },
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled ? 'flex justify-center px-4 pt-4' : 'flex justify-center px-0 pt-0'
      }`}>
        {/* Container that transforms from full-width to centered pill */}
        <div className={`flex items-center justify-between transition-all duration-700 ease-out ${
          isScrolled 
            ? 'gap-2 px-2 py-2 rounded-full bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 max-w-fit' 
            : 'gap-4 px-6 md:px-12 py-4 rounded-none bg-gray-900/90 backdrop-blur-lg w-full'
        }`}>
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'home');
            }}
            className={`flex items-center gap-2 group cursor-pointer transition-all duration-500 ${
              isScrolled ? 'px-4 py-1' : 'px-0 py-0'
            }`}
          >
            <img 
              src="/lovable-uploads/mov-logo-gold.png" 
              alt="MOV Logo" 
              className={`w-auto group-hover:scale-110 transition-all duration-300 ${
                isScrolled ? 'h-8' : 'h-10'
              }`}
            />
            <span className={`font-black text-white hidden sm:block transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>MOV</span>
          </a>

          {/* Right side navigation */}
          <div className="flex items-center gap-2">
            {/* Contact Icons - hidden on mobile */}
            <div className="hidden md:flex items-center gap-1">
              <a 
                href="tel:+5519981134193"
                className={`flex items-center justify-center w-9 h-9 rounded-full text-gray-300 hover:text-primary hover:bg-white/10 transition-all duration-300 ${
                  isScrolled ? 'scale-90' : 'scale-100'
                }`}
                title="Ligar"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contato@movmarketing.com.br"
                className={`flex items-center justify-center w-9 h-9 rounded-full text-gray-300 hover:text-primary hover:bg-white/10 transition-all duration-300 ${
                  isScrolled ? 'scale-90' : 'scale-100'
                }`}
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Divider - only visible when scrolled */}
            <div className={`hidden md:block w-px h-6 bg-white/20 transition-opacity duration-500 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`} />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Divider - only visible when scrolled */}
            <div className={`hidden md:block w-px h-6 bg-white/20 transition-opacity duration-500 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`} />

            {/* Contact CTA Button */}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
              onClick={() => handleNavClick('#contact', 'contact')}
            >
              Contato
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-white hover:text-primary hover:bg-white/5'
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'fade-in 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
              onClick={() => {
                handleNavClick('#contact', 'contact');
              }}
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
