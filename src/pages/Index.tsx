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
import CreativeShowcase from '@/components/CreativeShowcase';
import VideoHeroBanner from '@/components/VideoHeroBanner';
import ShowreelSection from '@/components/ShowreelSection';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';

const Index = () => {
  useGSAPNavigation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <VideoHeroBanner />
        <PinnedSection />
        
        <TrustIndicators />
        <ShowreelSection />
        <CreativeShowcase />
        <ImpactSection />
        
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
