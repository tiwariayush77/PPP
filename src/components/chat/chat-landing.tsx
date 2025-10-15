'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Briefcase } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, handlePresetReply }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const morphTexts = [
    "Explore My Work",
    "Product Management", 
    "0→1 Experience",
    "Ready for Impact"
  ];

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
      
      // Text morphing sequence
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => {
          if (prev < morphTexts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(textInterval);
            setShowLoading(false);
            return prev;
          }
        });
      }, 1000); // Change text every 1 second

      return () => {
        clearInterval(textInterval);
      };
    }, 100);

    return () => clearTimeout(mountTimer);
  }, []);

  // OPTION 2: Morphing Text Animation
  if (!mounted || showLoading) {
    return (
      <div className="loading-overlay flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          
          {/* Morphing Text */}
          {mounted && (
            <div className="relative h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentTextIndex}
                 className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-none bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    rotateX: 90,
                    filter: "blur(10px)"
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.2,
                    rotateX: -90,
                    filter: "blur(10px)"
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  {morphTexts[currentTextIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
          )}

          
      

          {/* Static fallback */}
          {!mounted && (
            <div className="opacity-0">
              <h1 className="text-5xl font-bold">Explore My Work</h1>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Content (after loading)
  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      key="main-content"
    >
      {/* Welcome message */}
      <motion.div 
        className="mb-8 text-center" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
      >
        <div className="inline-flex items-center px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300 text-xs font-medium mb-4">
          <MessageSquare className="w-4 h-4 mr-2" />
          Portfolio Navigation
        </div>
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Explore My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Work</span>
        </h2>
     <p className="text-gray-600 dark:text-gray-300 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed">
          Aspiring Product Manager with 3+ years of 0→1 experience across FinTech, EdTech, and entrepreneurship. Use the navigation below to explore my work.
        </p>
      </motion.div>

      {/* Available for Opportunities Button */}
      <motion.div 
        className="mb-8 sm:mb-12" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full px-4 py-2.5 sm:px-8 sm:py-4 shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-default max-w-fit mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-white"></span>
          </span>
          <span className="whitespace-nowrap">Available for Opportunities</span>
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          Quick Navigation
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          Use the buttons below to explore different sections
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
