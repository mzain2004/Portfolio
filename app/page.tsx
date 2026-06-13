import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhishSlayerSpotlight from "@/components/PhishSlayerSpotlight";
import AboutSection from "@/components/AboutSection";
import SkillsCertifications from "@/components/SkillsCertifications";
import SelectedWork from "@/components/SelectedWork";
import ExperienceEducation from "@/components/ExperienceEducation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden font-sans">
      <BackgroundEffects />
      <Navbar />

      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

      <div className="relative z-10">
        <HeroSection />
        <PhishSlayerSpotlight />
        <AboutSection />
        <SkillsCertifications />
        <SelectedWork />
        <ExperienceEducation />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
