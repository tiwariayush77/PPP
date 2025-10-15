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
  const [mounted, setMounted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const morphTexts = [
    "Explore My Work",
    "Product Manager", 
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
      }, 1000);

      return () => {
        clearInterval(textInterval);
      };
    }, 100);

    return () => clearTimeout(mountTimer);
  }, []);

  // Mobile-Optimized Loading Animation
  if (!mounted || showLoading) {
    return (
      <div className="loading-overlay flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          
          {/* Mobile-Safe Morphing Text */}
          {mounted && (
            <div className="relative min-h-[160px] flex items-center justify-center py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                >
                  {/* Mobile-optimized text with solid colors */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white text-center px-4">
                    <span className="block sm:inline text-blue-600 dark:text-blue-400">
                      {morphTexts[currentTextIndex].split(' ')[0]}
                    </span>
                    {morphTexts[currentTextIndex].split(' ').slice(1).length > 0 && (
                      <>
                        <span className="hidden sm:inline"> </span>
                        <span className="block sm:inline text-purple-600 dark:text-purple-400">
                          {morphTexts[currentTextIndex].split(' ').slice(1).join(' ')}
                        </span>
                      </>
                    )}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile-Safe Progress Indicator */}
          {mounted && (
            <motion.div
              className="w-48 sm:w-60 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-6 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentTextIndex + 1) / morphTexts.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              />
            </motion.div>
          )}

          {/* Mobile-Optimized Status Text */}
          {mounted && (
            <motion.p
              className="text-sm text-gray-600 dark:text-gray-400 mt-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {currentTextIndex < morphTexts.length - 1 ? "Loading..." : "Almost ready..."}
            </motion.p>
          )}

          {/* Static fallback */}
          {!mounted && (
            <div className="opacity-0">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Explore My Work</h1>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      key="main-content"
    >
      <motion.div 
        className="mb-8 text-center" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="inline-flex items-center px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300 text-xs font-medium mb-4">
          <MessageSquare className="w-4 h-4 mr-2" />
          Portfolio Navigation
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Explore My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Work</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mx-auto max-w-2xl text-lg leading-relaxed">
          Product Manager with 3+ years of 0→1 experience across FinTech, EdTech, and entrepreneurship. Use the navigation below to explore my work.
        </p>
      </motion.div>

      <motion.div 
        className="mb-8 sm:mb-12" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
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

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
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
