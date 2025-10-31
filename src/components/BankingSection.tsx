"use client";

import { FC, useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BankingService {
  id: number;
  name: string;
  accountNumber: string;
  qrCode: string;
  backgroundImage: string;
  textColor: string;
}

export const BankingSection: FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { language, setLanguage, t } = useLanguage();

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
      { threshold: 0.2 }
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

  const bankingServices: BankingService[] = [
    {
      id: 1,
      name: "MB Bank",
      accountNumber: "30 31 000 30",
      qrCode: "/images/mbqr.jpg",
      backgroundImage: "/images/mb.jpg",
      textColor: "text-white"
    },
    {
      id: 2,
      name: "MoMo",
      accountNumber: "039 846 1925",
      qrCode: "/images/momoqr.jpg",
      backgroundImage: "/images/momo.png",
      textColor: "text-white"
    },
    {
      id: 3,
        name: "Vn-pay",
        accountNumber: "039 846 1925",
        qrCode: "/images/vnpayqr.jpg",
        backgroundImage: "/images/vnpay.jpg",
        textColor: "text-white"
    },
    {
      id: 4,
      name: "PayPal",
      accountNumber: "thachphir",
      qrCode: "/images/paypalqr.png",
      backgroundImage: "/images/paypal.jpg",
      textColor: "text-white"
    },
    {
      id: 5,
      name: "Binance",
      accountNumber: "255 273 435",
      qrCode: "/images/binanceqr.png",
      backgroundImage: "/images/binance.jpg",
      textColor: "text-white"
    },
    { 
    id:6,
    name: "Metamask",
    accountNumber: "0x87D546C2073b6BF102D2e77E1DCb1f1Ed2163d04",
    qrCode: "/images/metamaskqr.jpg",
    backgroundImage: "/images/metamask.jpeg",
    textColor: "text-white"
   },
  ];

  const truncateAccountNumber = (accountNumber: string, maxLength: number = 15) => {
    if (accountNumber.length <= maxLength) {
      return accountNumber;
    }
    
    const start = accountNumber.substring(0, 3);
    const end = accountNumber.substring(accountNumber.length - 3);
    return `${start}...${end}`;
  };

  const copyToClipboard = async (text: string, id: number) => {
    try {
      // Check if navigator.clipboard is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback method for older browsers or when clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopiedId(id);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Still show success message even if copy fails
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="banking"
      className="snap-section min-h-screen flex items-center justify-center light-effect-1 subtle-shadows relative overflow-hidden pt-20 sm:pt-16"
    >
      <div className="content-overlay max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t("banking.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {bankingServices.map((service, index) => (
            <div
              key={service.id}
              className={`relative bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden group ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{
                backgroundImage: `linear-gradient(rgba(63, 61, 61, 0.3), rgba(235, 230, 230, 0.3)), url(${service.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '200px',
                transitionDelay: isVisible ? `${0.2 + index * 0.15}s` : '0s'
              }}
            >
              {/* Background overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/5 to-black/40 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300"></div>
              
              <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex items-center">
                {/* Left side - QR Code */}
                <div className="flex-shrink-0 mr-4 sm:mr-6 lg:mr-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white rounded-md p-1 shadow-lg">
                    <div 
                      className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs text-center"
                      style={{
                        backgroundImage: `url(${service.qrCode})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                    </div>
                  </div>
                </div>

                {/* Right side - Service info */}
                <div className="flex-1 flex flex-col justify-center py-2 sm:py-4">
                  {/* Service name */}
                  <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 ${service.textColor} drop-shadow-lg`}>
                    {service.name}
                  </h3>

                  {/* Account number with copy button */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-white/50">
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-gray-800 font-mono text-xs sm:text-sm md:text-base font-bold"
                          title={service.accountNumber} // Show full account number on hover
                        >
                          {truncateAccountNumber(service.accountNumber)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(service.accountNumber, service.id)}
                          className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          title="Copy to clipboard"
                        >
                          {copiedId === service.id ? (
                            // Checkmark icon when copied
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                            </svg>
                          ) : (
                            // Copy icon
                            <svg className="w-5 h-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};