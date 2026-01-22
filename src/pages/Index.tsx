import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PinnedSection from '@/components/PinnedSection';
import TrustIndicators from '@/components/TrustIndicators';
import ImpactSection from '@/components/ImpactSection';
import ClientsPartnersSection from '@/components/ClientsPartnersSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import CreativeShowcase from '@/components/CreativeShowcase';
import VideoHeroBanner from '@/components/VideoHeroBanner';
import ShowreelSection from '@/components/ShowreelSection';
import CustomCursor from '@/components/CustomCursor';
import { DualParallaxText } from '@/components/ParallaxText';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';

const Index = () => {
  useGSAPNavigation();

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Cursor - Goat Agency style */}
      <CustomCursor />
      
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <VideoHeroBanner />
        <PinnedSection />
        <FeaturedWorkSection />
        
        {/* Parallax Text Divider */}
        <DualParallaxText 
          topText="ESTRATÉGIA" 
          bottomText="CRIATIVIDADE" 
          speed={0.4}
        />
        
        <TrustIndicators />
        <ShowreelSection />
        <CreativeShowcase />
        <ImpactSection />
        
        {/* Parallax Text Divider */}
        <DualParallaxText 
          topText="RESULTADOS" 
          bottomText="PERFORMANCE" 
          speed={0.3}
        />
        
        <section id="about">
          <AboutSection />
        </section>
        <ClientsPartnersSection />
        <section id="services">
          <ServicesSection />
        </section>
        <section id="cases">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
