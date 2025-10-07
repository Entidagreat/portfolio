"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AdminPanel } from "./AdminPanel";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const navItems = [
    { name: t("navbar.home"), href: "#home" },
    { name: t("navbar.about"), href: "#about" },
    { name: t("navbar.skills"), href: "#skills" },
    { name: t("navbar.contact"), href: "#contact" },
    { name: t("navbar.banking"), href: "#banking" },
    { name: t("navbar.comments"), href: "#comments" },
  ];

  // Effect để detect section nào đang được xem
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const navbarHeight = 64;
      
      // Tìm section nào đang được xem nhiều nhất
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top - navbarHeight;
          const elementBottom = rect.bottom - navbarHeight;
          
          // Nếu section này đang trong viewport
          if (elementTop <= 100 && elementBottom >= 100) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Thêm event listener
    window.addEventListener('scroll', handleScroll);
    
    // Gọi ngay lập tức để set initial state
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect để đóng language dropdown khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  // Smooth scroll function với snap scrolling proximity
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
      // Với proximity, ta có thể dùng smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      // Set active section ngay lập tức khi click
      setActiveSection(elementId.replace('#', ''));
    }
    // Đóng mobile menu sau khi click
    setIsMenuOpen(false);
  };

  // Handle click event
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  // Handle logo click for admin panel
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    setLogoClickCount(prev => prev + 1);
    
    // Reset click count after 500ms
    setTimeout(() => {
      setLogoClickCount(0);
    }, 500);
    
    // If double click (or more), open admin panel
    if (logoClickCount >= 1) {
      setIsAdminOpen(true);
      setLogoClickCount(0);
    } else {
      // Single click - normal navigation
      smoothScrollTo("#home");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Bên trái */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={handleLogoClick}
              className="navbar-logo transition-colors cursor-pointer flex items-center"
              title="Double click để mở admin panel"
            >
              <Image
                src="/images/logo.png"
                alt="Phan Ngọc Thạch Logo"
                width={240}
                height={80}
                className="h-10 w-auto"
                priority
              />
            </a>
          </div>

          {/* Center - Navigation Menu (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`navbar-link text-lg font-medium transition-all duration-300 cursor-pointer
                      ${isActive ? 'active' : ''}
                    `}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right side - Language Selector (Desktop) */}
          <div className="hidden md:block relative language-dropdown">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="navbar-link inline-flex items-center p-2 rounded-md transition-colors focus:outline-none"
              aria-expanded={isLanguageOpen}
            >
              {/* Translate Icon */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
              <span className="text-sm font-medium">
                {t("navbar.language")}
              </span>
              {/* Dropdown Arrow */}
              <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 z-50">
                <div className="py-2">
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center text-gray-800 ${
                      language === "en" ? "bg-gray-50 font-medium" : ""
                    }`}
                  >
                    <span className="mr-3">🇺🇸</span>
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("vi");
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center text-gray-800 ${
                      language === "vi" ? "bg-gray-50 font-medium" : ""
                    }`}
                  >
                    <span className="mr-3">🇻🇳</span>
                    Tiếng Việt
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-link inline-flex items-center justify-center p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full right-0 z-50`}>
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-bl-lg border border-gray-200 min-w-[200px]">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`navbar-link block px-3 py-2 text-lg font-medium transition-all duration-300 cursor-pointer rounded-md
                    ${isActive ? 'active bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                  `}
                >
                  {item.name}
                </a>
              );
            })}
            
            {/* Mobile Language Selector */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="relative language-dropdown">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="navbar-link w-full flex items-center justify-between p-2 rounded-md transition-colors focus:outline-none bg-gray-50"
                  aria-expanded={isLanguageOpen}
                >
                  <div className="flex items-center">
                    {/* Translate Icon */}
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                    </svg>
                    <span className="text-sm font-medium">
                      {t("navbar.language")}
                    </span>
                  </div>
                  {/* Dropdown Arrow */}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>

                {/* Mobile Language Dropdown */}
                {isLanguageOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setLanguage("en");
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center text-gray-800 ${
                          language === "en" ? "bg-gray-50 font-medium" : ""
                        }`}
                      >
                        <span className="mr-3">🇺🇸</span>
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("vi");
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center text-gray-800 ${
                          language === "vi" ? "bg-gray-50 font-medium" : ""
                        }`}
                      >
                        <span className="mr-3">🇻🇳</span>
                        Tiếng Việt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;