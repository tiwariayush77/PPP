'use client';
import { motion } from 'framer-motion';
import { Award, Code, GraduationCap, Mail, MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';
import { presetReplies } from '@/lib/config-loader';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, handlePresetReply }) => {
  // Suggested questions that the user can click on
  const suggestedQuestions = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      text: 'Who are you?',
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: 'What projects are you most proud of?',
    },
    {
      icon: <Award className="h-4 w-4" />,
      text: 'What are your skills?',
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      text: 'Are You available for opportunities?',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'What is the best way to connect with you',
    },
  ];

 const handleQuestionClick = (questionText: string) => {
  // Add debugging
  console.log('Question clicked:', questionText);
  console.log('Available preset keys:', Object.keys(presetReplies));
  // Check if this question has a preset reply
  const preset = presetReplies[questionText as keyof typeof presetReplies];
  console.log('Found preset:', preset);
  if (preset && handlePresetReply) {
    console.log('✅ Using preset reply');
    handlePresetReply(questionText, preset.reply, preset.tool);
  } else {
    console.log('❌ No preset found, falling back to AI query');
    submitQuery(questionText);
  }
};

  // Animation variants for staggered animation
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as any, // ✅ Fixed: Use string easing instead of number array
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome message - Compact */}
      <motion.div className="mb-6 text-center" variants={itemVariants}>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          I'm Ayush's Digital Twin
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mx-auto max-w-md text-base">
          Your guide to my Product Management experience across FinTech, EdTech, and entrepreneurship.
        </p>
      </motion.div>

      {/* Available for Opportunities Button - Fixed question text */}
      <motion.div className="mb-6" variants={itemVariants}>
        <motion.button
          onClick={() => handleQuestionClick('Are You available for opportunities?')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          Available for Opportunities
          <Briefcase className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Suggested questions - Mobile Optimized */}
      <motion.div
        className="w-full max-w-md space-y-3"
        variants={containerVariants}
      >
        {suggestedQuestions.map((question, index) => {
          // Color schemes for mobile
          const colorSchemes = [
            {
              bg: 'bg-white dark:bg-gray-800',
              hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
              border: 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600',
              icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
            },
            {
              bg: 'bg-white dark:bg-gray-800',
              hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
              border: 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600',
              icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            },
            {
              bg: 'bg-white dark:bg-gray-800',
              hover: 'hover:bg-green-50 dark:hover:bg-green-900/20',
              border: 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600',
              icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            },
            {
              bg: 'bg-white dark:bg-gray-800',
              hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
              border: 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600',
              icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
            },
            {
              bg: 'bg-white dark:bg-gray-800',
              hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
              border: 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600',
              icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
            }
          ];

          const colors = colorSchemes[index] || colorSchemes[0];

          return (
            <motion.button
              key={index}
              className={`${colors.bg} ${colors.hover} ${colors.border} group flex w-full items-center rounded-xl border p-4 shadow-md hover:shadow-lg transition-all duration-300`}
              onClick={() => handleQuestionClick(question.text)}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`${colors.icon} mr-3 rounded-lg p-2 group-hover:scale-110 transition-transform duration-200`}>
                {React.cloneElement(question.icon, { className: "w-5 h-5" })}
              </span>
              <span className="flex-1 text-left text-base font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                {question.text}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
