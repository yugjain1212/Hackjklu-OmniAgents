import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { RiyaStorySection } from "@/components/landing/riya-story-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemsSection } from "@/components/landing/problems-section";
import { SelfHealingSection } from "@/components/landing/self-healing-section";
import { IndiaFirstSection } from "@/components/landing/india-first-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <HeroSection />
      <SocialProofBar />
      <RiyaStorySection />
      <HowItWorksSection />
      <ProblemsSection />
      <SelfHealingSection />
      <IndiaFirstSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
}
