"use client";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { ContactSection } from "@/components/ContactSection";
import { BankingSection } from "@/components/BankingSection";
import CommentsSection from "@/components/CommentsSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <section
        id="skills"
        className="snap-section h-screen flex items-center justify-center light-effect-3 subtle-shadows relative overflow-hidden"
      >
        <div className="content-overlay text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t("skills.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
          <SkillsCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      {/* Banking Section */}
      <BankingSection />
      {/* Comments Section */}
      <CommentsSection />
      {/* Footer */}
      <Footer />

    </div>
  );
}
