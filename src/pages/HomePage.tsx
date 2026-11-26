import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/home/HeroSection';
import { StatisticsSection } from '../components/home/StatisticsSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { USPSection } from '../components/home/USPSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { IITDelhiTeamSection } from '../components/home/IITDelhiTeamSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { SubjectsSection } from '../components/home/SubjectsSection';
import { TargetStudentsSection } from '../components/home/TargetStudentsSection';
import { PricingSection } from '../components/home/PricingSection';
import { FreeCounsellingSection } from '../components/home/FreeCounsellingSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTASection } from '../components/home/FinalCTASection';
import { ContactSection } from '../components/home/ContactSection';
import { Footer } from '../components/common/Footer';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main>
        <HeroSection />
        <StatisticsSection />
        <ProblemSection />
        <USPSection />
        <FeaturesSection />
        <IITDelhiTeamSection />
        <HowItWorksSection />
        <SubjectsSection />
        <TargetStudentsSection />
        <PricingSection />
        <FreeCounsellingSection />
        <FAQSection />
        <FinalCTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
