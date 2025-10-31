"use client";

import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SocialMediaIcons } from './SocialMediaIcons';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection: FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger khi 20% section visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="snap-section h-screen flex items-center justify-center light-effect-1 subtle-shadows relative overflow-hidden pt-20 sm:pt-16"
    >
      <div className="content-overlay max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center min-h-[80vh] py-4">
          
          {/* Left Side - Information */}
          <div className="flex flex-col justify-start lg:justify-center space-y-6 sm:space-y-8 order-2 lg:order-1">
            
            {/* Name and Title - Separate Row */}
            <div className={`space-y-4 transition-all duration-800 ${isVisible ? 'animate-[fadeInUp_0.8s_ease-out]' : 'opacity-0'}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                PHAN NGỌC THẠCH
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600 leading-relaxed">
                Frontend Developer
              </h2>
            </div>

            {/* Information Box */}
            <div className={`bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-lg max-h-none sm:max-h-[70vh] overflow-visible sm:overflow-y-auto transition-all duration-1000 ${isVisible ? 'animate-[fadeInUp_1s_ease-out_0.2s] opacity-100 [animation-fill-mode:forwards]' : 'opacity-0'}`}>
              <div className="space-y-4 sm:space-y-6">
                
                {/* Description */}
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                    {t("hero.h1")}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
                    {t("hero.h2")}
                  <a 
                    href="/cv/PhanNgocThachCV.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 underline text-sm sm:text-base font-medium transition-colors"
                  >
                    {t("hero.CV")}
                  </a>
                  </p>
                </div>

                    {/* Social Media Icons */}
                    <div className="border-t border-gray-200/50 pt-4 sm:pt-6 pb-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 sm:mb-4">
                       {t("hero.connect")}
                      </h4>
                      <div className="overflow-x-auto">
                        <SocialMediaIcons iconSize="sm" className="justify-start flex-nowrap min-w-max" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          {/* Right Side - Profile Image */}
          <div className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'animate-[fadeInRight_1s_ease-out_0.4s] opacity-100 [animation-fill-mode:forwards]' : 'opacity-0'}`}>
            <div className="relative group">
              
              {/* Image Container */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[26rem] md:w-[22rem] md:h-[30rem] lg:w-80 lg:h-[26rem] xl:w-[22rem] xl:h-[30rem]">
                
                {/* Background Decorations */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-500/20 to-zinc-500/20 rounded-2xl blur-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute -inset-2 bg-white/30 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
                
                {/* Main Image */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 group-hover:shadow-3xl transition-all duration-500">       
                  <Image
                    src="/images/2.jpg" 
                    alt="Phan Ngọc Thạch - Frontend Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                  />
                 
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};