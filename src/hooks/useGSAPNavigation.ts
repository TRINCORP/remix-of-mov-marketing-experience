import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGSAPNavigation = () => {
  useEffect(() => {
    // Navegação suave para links internos
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId!);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: targetElement, offsetY: 80 },
            ease: "power2.inOut"
          });
        }
      }
    };

    // Animações de entrada para seções
    const sections = gsap.utils.toArray('.section-animate');
    sections.forEach((section: any) => {
      gsap.fromTo(section, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Parallax suave para elementos
    const parallaxElements = gsap.utils.toArray('.parallax-element');
    parallaxElements.forEach((element: any) => {
      gsap.fromTo(element, {
        y: -50
      }, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Efeito de reveal para textos
    const revealTexts = gsap.utils.toArray('.text-reveal');
    revealTexts.forEach((text: any) => {
      gsap.fromTo(text, {
        clipPath: "inset(0 100% 0 0)"
      }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};