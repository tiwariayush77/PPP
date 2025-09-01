'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, MessageCircle, Send } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

export function Contact() {
  const config = getConfig();
  const { personal, social } = config;

  // Function to handle opening links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Function to handle phone calls
  const makeCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Function to handle email
  const sendEmail = () => {
    const subject = "Product Management Opportunity";
    const body = "Hi Ayush,\n\nI came across your portfolio and would like to discuss a Product Management opportunity.\n\nBest regards,";
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl sm:max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-medium mb-4">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Get In Touch
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
          >
            Let&apos;s <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12"
          >
            Ready to discuss Product Management opportunities? I&apos;m open to relocation and always excited to explore new possibilities.
          </motion.p>
        </motion.div>

        {/* Contact Methods - Mobile Optimized + Desktop Original */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-4xl mx-auto">
          {/* Email Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.button
              onClick={sendEmail}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[240px] mx-auto sm:max-w-none aspect-square sm:aspect-auto sm:h-80 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border-0 sm:border sm:border-gray-200 sm:dark:border-gray-700 group-hover:shadow-blue-500/10 sm:group-hover:border-blue-300 sm:dark:group-hover:border-blue-600 flex flex-col items-center justify-between sm:justify-center relative overflow-hidden"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  Send Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
                  Drop me a message about opportunities
                </p>
              </div>
              <div className="inline-flex items-center text-blue-500 font-medium text-xs sm:text-sm mt-3 sm:mt-4 px-2 py-1 sm:px-0 sm:py-0 bg-blue-50 sm:bg-transparent dark:bg-blue-900/20 sm:dark:bg-transparent rounded-lg sm:rounded-none">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="sm:hidden">Email</span>
                <span className="hidden sm:inline">Compose Message</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.button
              onClick={() => makeCall(personal.phone)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[240px] mx-auto sm:max-w-none aspect-square sm:aspect-auto sm:h-80 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border-0 sm:border sm:border-gray-200 sm:dark:border-gray-700 group-hover:shadow-green-500/10 sm:group-hover:border-green-300 sm:dark:group-hover:border-green-600 flex flex-col items-center justify-between sm:justify-center relative overflow-hidden"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors">
                  Call Direct
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
                  Let&apos;s discuss over a quick call
                </p>
              </div>
              <div className="inline-flex items-center text-green-500 font-medium text-xs sm:text-sm mt-3 sm:mt-4 px-2 py-1 sm:px-0 sm:py-0 bg-green-50 sm:bg-transparent dark:bg-green-900/20 sm:dark:bg-transparent rounded-lg sm:rounded-none">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">Start Call</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative sm:col-span-2 md:col-span-1"
          >
            <motion.button
              onClick={() => openLink(social.linkedin)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[240px] mx-auto sm:max-w-none aspect-square sm:aspect-auto sm:h-80 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border-0 sm:border sm:border-gray-200 sm:dark:border-gray-700 group-hover:shadow-blue-600/10 sm:group-hover:border-blue-300 sm:dark:group-hover:border-blue-600 flex flex-col items-center justify-between sm:justify-center relative overflow-hidden"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  LinkedIn Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
                  Professional networking & updates
                </p>
              </div>
              <div className="inline-flex items-center text-blue-600 font-medium text-xs sm:text-sm mt-3 sm:mt-4 px-2 py-1 sm:px-0 sm:py-0 bg-blue-50 sm:bg-transparent dark:bg-blue-900/20 sm:dark:bg-transparent rounded-lg sm:rounded-none">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="sm:hidden">LinkedIn</span>
                <span className="hidden sm:inline">Connect Now</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Call to Action - Original Desktop Style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendEmail}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Email Me Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLink(social.linkedin)}
              className="w-full sm:w-auto px-8 py-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-xl transition-all duration-200"
            >
              Connect on LinkedIn
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
