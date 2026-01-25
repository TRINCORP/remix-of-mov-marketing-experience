import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        {/* Centered Pill Container */}
        <div className={`flex items-center gap-2 px-2 py-2 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/20' 
            : 'bg-gray-900/80 backdrop-blur-lg'
        }`}>
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'home');
            }}
            className="flex items-center gap-2 px-4 py-1 group cursor-pointer"
          >
            <img 
              src="/lovable-uploads/mov-logo-gold.png" 
              alt="MOV Logo" 
              className="h-8 w-auto group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-black text-white hidden sm:block">MOV</span>
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/20" />

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

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/20" />

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
