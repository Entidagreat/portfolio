"use client";

import { FC, useEffect, useState } from 'react';

interface TimelineItem {
  title: string;
  subtitle: string;
}

interface TimelineProps {
  items: TimelineItem[];
  isActive?: boolean;
  className?: string;
}

export const Timeline: FC<TimelineProps> = ({ 
  items, 
  isActive = true, 
  className = "" 
}) => {
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Reset animation
    setLineProgress(0);
    setVisibleNodes([]);

    // Calculate when line reaches each node
    const totalDuration = 3000; // Total time for line to complete (3 seconds)
    
    items.forEach((_, index) => {
      const nodePosition = index / (items.length - 1); // 0, 0.5, 1 for 3 nodes
      const timeToReachNode = nodePosition * totalDuration + 500; // Add 500ms initial delay
      
      setTimeout(() => {
        setVisibleNodes(prev => [...prev, index]);
      }, timeToReachNode);
    });

    // Start line animation - it will reach each node at the right time
    const lineAnimation = setTimeout(() => {
      setLineProgress(100);
    }, 500);

    return () => {
      clearTimeout(lineAnimation);
    };
  }, [isActive, items.length]);

  return (
    <div className={`relative max-w-6xl mx-auto py-12 ${className}`}>
      {/* Desktop Timeline Container */}
      <div className="relative hidden md:block lg:block xl:block">
        {/* Background Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
        
        {/* Animated Progress Line */}
        <div 
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-3000 ease-linear"
          style={{ width: `${lineProgress}%` }}
        ></div>
        
        {/* Timeline Items */}
        <div className="relative h-16">
          {items.map((item, index) => {
            const isNodeVisible = visibleNodes.includes(index);
            const nodePosition = (index / (items.length - 1)) * 100;
            
            return (
              <div 
                key={index}
                className="absolute"
                style={{ 
                  left: `${nodePosition}%`,
                  transform: 'translateX(-50%)',
                  top: '0'
                }}
              >
                {/* Timeline Node - positioned in the middle of the line */}
                <div className={`relative z-10 transition-all duration-500 ${
                  isNodeVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`} style={{ top: '-8px' }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                    {index + 1}
                  </div>
                  {/* Node glow effect */}
                  {isNodeVisible && (
                    <div className="absolute inset-0 w-16 h-16 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Cards - separate from nodes */}
        <div className="relative mt-12">
          <div className="flex justify-between">
            {items.map((item, index) => {
              const isNodeVisible = visibleNodes.includes(index);
              
              return (
                <div 
                  key={index}
                  className={`bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/30 shadow-lg w-72 text-center transition-all duration-700 delay-300 ${
                    isNodeVisible 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-8'
                  }`}
                >
                  <h4 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Version  */}
      <div className="block md:hidden lg:hidden xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        {items.map((item, index) => {
          const isNodeVisible = visibleNodes.includes(index);
          
          return (
            <div
              key={index}
              className={`p-4 sm:p-6 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isNodeVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
            >
              <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">
                {item.title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};