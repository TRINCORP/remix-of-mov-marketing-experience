import HeroSection from '@/components/HeroSection';
import ParallaxSection from '@/components/ParallaxSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PinnedSection from '@/components/PinnedSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ParallaxSection />
        <PinnedSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
