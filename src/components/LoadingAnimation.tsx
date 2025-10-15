'use client';
import { motion } from 'framer-motion';
import { MessageSquare, Briefcase } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, handlePresetReply }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on client side
    setIsClient(true);
    
    // FOR TESTING: Always show animation (remove localStorage check)
    // Later you can uncomment the localStorage logic below
    
    // COMMENTED OUT FOR TESTING:
    // const visited = localStorage.getItem('portfolio-visited');
    // if (visited) {
    //   setShowLoading(false);
    // } else {
    //   localStorage.setItem('portfolio-visited', 'true');
    // }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // UNCOMMENT LATER: localStorage.setItem('portfolio-visited', 'true');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Show loading on client side
  if (!isClient || showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome message - Clean & Focused */}
      <motion.div 
        className="mb-8 text-center" 
        variants={itemVariants}
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
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

      {/* Available for Opportunities Button - Enhanced */}
      <motion.div 
        className="mb-12" 
        variants={itemVariants}
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
      >
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full px-8 py-4 shadow-lg flex items-center gap-3 text-base cursor-default"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
          </span>
          Available for Opportunities
          <Briefcase className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Instructions for horizontal navigation */}
      <motion.div
        className="text-center"
        variants={itemVariants}
        transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
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
