"use client";

import { FC, useState } from 'react';
import { Timeline } from './Timeline';
import { useLanguage } from '@/contexts/LanguageContext';

type TabType = 'skills' | 'education' | 'achievements' | 'branding';

interface TabContent {
  title: string;
  description: string;
  items: Array<{
    title: string;
    subtitle: string;
  }>;
}

export const AboutSection: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  const [brandingText, setBrandingText] = useState<string>('');
  const { language, setLanguage, t } = useLanguage();


  const tabContents: Record<TabType, TabContent> = {
    skills: {
      title: t("about.skill"),
      description: t("about.skillDesc"),
      items: [
        { title: t("about.skil1"), subtitle: t("about.skill1Desc") },
        { title: t("about.skill2"), subtitle: t("about.skill2Desc") },
        { title: t("about.skill3"), subtitle: t("about.skill3Desc") }
      ]
    },
    education: {
      title: t("about.education"),
      description: t("about.educationDesc"),
      items: [
        { title: t("about.edu1"), subtitle: t("about.edu1Desc") },
        { title: t("about.edu2"), subtitle: t("about.edu2Desc") },
        { title: t("about.edu3"), subtitle: t("about.edu3Desc") },
        { title: t("about.edu4"), subtitle: t("about.edu4Desc") }
      ]
    },
    achievements: {
      title: t("about.award"),
      description: t("about.awardDesc"),
      items: [
        { title: t("about.award1"), subtitle: t("about.award1Desc") },
        { title: t("about.award2"), subtitle: t("about.award2Desc") },
        { title: t("about.award3"), subtitle: t("about.award3Desc") }
      ]
    },
    branding: {
      title: t("about.brand"),
      description: t("about.brandDesc"),
      items: [
        { title: t("about.brandstory"), subtitle: t("about.brandstoryDesc") },
      ]
    },
  };

  const tabs = [
    { id: 'skills', label: t("about.skill"), icon: '🧠' },
    { id: 'education', label: t("about.education"), icon: '🎓' },
    { id: 'achievements', label: t("about.award"), icon: '🏆' },
    { id: 'branding', label: t("about.brand"), icon: '🎨' },
  ] as const;

  const currentContent = tabContents[activeTab];

  return (
    <section
      id="about"
      className="snap-section h-screen flex items-center justify-center light-effect-2 subtle-shadows relative overflow-hidden"
    >
      <div className="content-overlay text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
          {t("about.title")}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
          {t("about.h1")}
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="bg-white/40 backdrop-blur-sm rounded-full p-1 sm:p-2 border border-white/30 flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 mx-0.5 sm:mx-1 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                }`}
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline lg:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500 ease-in-out">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            {currentContent.title}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            {currentContent.description}
          </p>

          {/* Content Cards / Timeline */}
          {activeTab === 'education' ? (
            /* Timeline for Education */
            <Timeline 
              items={currentContent.items} 
              isActive={activeTab === 'education'} 
            />
          ) : activeTab === 'branding' ? (
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center">
                {/* Logo Section */}
                <div className="flex justify-center items-center w-full h-full order-1 lg:order-1">
                  <img 
                    src="/images/logo.png" 
                    alt="Personal Brand Logo" 
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      console.log('Logo clicked!');
                    }}
                  />
                </div>
                
                {/* Textbox Section */}
                <div className="flex items-center justify-center w-full h-full order-2 lg:order-2">
                  <div className="w-full max-w-md p-4 sm:p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
                    <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-lg sm:text-xl text-center">
                      {t("about.brandstory")}
                    </h4>
                    <textarea
                      value={brandingText}
                      className="w-full h-40 sm:h-48 md:h-56 p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm sm:text-base leading-relaxed"
                      placeholder={t("about.brandstoryDesc")}
                      onChange={(e) => setBrandingText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Grid for other tabs */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
              {currentContent.items.map((item, index) => (
                <div 
                  key={index}
                  className="p-4 sm:p-6 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};