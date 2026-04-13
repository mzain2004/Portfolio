"use client";

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PhishSlayerSpotlight from '../components/PhishSlayerSpotlight';
import SelectedWork from '../components/SelectedWork';
import ExperienceEducation from '../components/ExperienceEducation';
import LiveStats from '../components/LiveStats';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';
import AuroraBackground from '../components/AuroraBackground';
import CustomCursor from '../components/CustomCursor';

export default function Page() {
  return (
    <main className="relative min-h-screen bg-zinc-950 overflow-hidden font-sans">
      <CustomCursor />
      <AuroraBackground />
      <ParticleNetwork />
      <Navbar />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <PhishSlayerSpotlight />
        <SelectedWork />
        <ExperienceEducation />
        <section id="stats" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-20">
          <LiveStats />
        </section>
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
