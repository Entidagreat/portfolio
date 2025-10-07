"use client";

import React from 'react';
import { SocialMediaIcons } from './SocialMediaIcons';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-[#EDE8D0] text-white py-6 sm:py-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-black text-sm sm:text-base">
              © {currentYear} Phan Ngọc Thạch. {t("footer.copyright")}
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center">
            <SocialMediaIcons iconSize="sm" />
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;