'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, BarChart3, TrendingUp, Rocket, Building2, Smartphone, 
  Lightbulb, Zap, Users, Globe, Heart, Crown,
  ExternalLink, Eye, X, Calendar, Award, Code2 
} from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import Image from 'next/image';

export default function AllProjects() {
  const config = getConfig();
  const projects = config.projects || [];
  const [selectedProject, setSelectedProject] = useState(null);

  // UNIQUE SYMBOL FOR EACH PROJECT TILE (No duplicates!) - WITH PROPER TYPING
  const getUniqueProjectSymbol = (projectTitle: string, category: string, index: number) => {
    // Define unique symbol combinations for each potential project - FIXED WITH STRING INDEX SIGNATURE
    const projectSymbols: { 
      [key: string]: { 
        icon: React.ComponentType<any>; 
        gradient: string; 
        bgColor: string; 
      } 
    } = {
      // Product Management projects - distinct icons
      'B2C Product Sprint - Truecaller Recognition': { 
        icon: Target, 
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'group-hover:border-blue-300 dark:group-hover:border-blue-600'
      },
      'SaaS Feature Adoption Optimization': { 
        icon: TrendingUp, 
        gradient: 'from-purple-500 to-pink-500',
        bgColor: 'group-hover:border-purple-300 dark:group-hover:border-purple-600'
      },
      'QwikPik - AI Shopping Assistant': { 
        icon: Zap, 
        gradient: 'from-violet-500 to-purple-500',
        bgColor: 'group-hover:border-violet-300 dark:group-hover:border-violet-600'
      },
      'AI Order Assistant - n8n Workflow Automation': { 
        icon: Zap, 
        gradient: 'from-cyan-500 to-blue-500',
        bgColor: 'group-hover:border-cyan-300 dark:group-hover:border-cyan-600'
      },
      'Nykaa Virtual Try-On - AR Makeup Experience': { 
        icon: Smartphone,
        gradient: 'from-pink-500 to-rose-500',
        bgColor: 'group-hover:border-pink-300 dark:group-hover:border-pink-600'
      },
      
      // Entrepreneurship projects - distinct icons
      'BrightBunny - EdTech Career Discovery Platform': { 
        icon: Lightbulb, 
        gradient: 'from-orange-500 to-red-500',
        bgColor: 'group-hover:border-orange-300 dark:group-hover:border-orange-600'
      },
      
      // Data Analytics projects - distinct icons  
      'Customer Behavior Analytics Dashboard': { 
        icon: BarChart3, 
        gradient: 'from-indigo-500 to-purple-500',
        bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600'
      },
      'Growth Metrics Optimization': { 
        icon: Zap, 
        gradient: 'from-yellow-500 to-orange-500',
        bgColor: 'group-hover:border-yellow-300 dark:group-hover:border-yellow-600'
      },
      
      // Growth & Strategy projects - distinct icons
      'Market Expansion Strategy': { 
        icon: Globe, 
        gradient: 'from-emerald-500 to-green-500',
        bgColor: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-600'
      },
      'User Acquisition Funnel': { 
        icon: Users, 
        gradient: 'from-teal-500 to-cyan-500',
        bgColor: 'group-hover:border-teal-300 dark:group-hover:border-teal-600'
      },
      
      // SaaS/B2B projects - distinct icons
      'Enterprise Dashboard Redesign': { 
        icon: Building2, 
        gradient: 'from-slate-500 to-gray-600',
        bgColor: 'group-hover:border-slate-300 dark:group-hover:border-slate-600'
      },
      
      // Mobile/App projects - distinct icons
      'Mobile App User Experience': { 
        icon: Smartphone, 
        gradient: 'from-pink-500 to-rose-500',
        bgColor: 'group-hover:border-pink-300 dark:group-hover:border-pink-600'
      },
      
      // FinTech projects - distinct icons
      'Vance Inc. - FinTech B2B Pipeline Development': {
        icon: Building2,
        gradient: 'from-indigo-500 to-blue-500', 
        bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600'
      },
      
      // WebMobi project - distinct icon
      'WebMobi - Customer Engagement Optimization': {
        icon: TrendingUp,
        gradient: 'from-emerald-500 to-teal-500',
        bgColor: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-600'  
      },
      
      // Exampeer project - distinct icon
      'Exampeer - Market Research & UX Strategy': {
        icon: BarChart3,
        gradient: 'from-indigo-500 to-purple-500',
        bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600'
      },
      
      // Additional unique icons for any other projects
      'Premium Feature Strategy': { 
        icon: Crown, 
        gradient: 'from-amber-500 to-yellow-500',
        bgColor: 'group-hover:border-amber-300 dark:group-hover:border-amber-600'
      },
      'User Engagement Optimization': { 
        icon: Heart, 
        gradient: 'from-red-500 to-pink-500',
        bgColor: 'group-hover:border-red-300 dark:group-hover:border-red-600'
      }
    };

    // If exact title match found, use it
    if (projectSymbols[projectTitle]) {
      return projectSymbols[projectTitle];
    }

    // Fallback: category-based symbols with index variation to ensure uniqueness
    const categorySymbols: { 
      [key: string]: Array<{ 
        icon: React.ComponentType<any>; 
        gradient: string; 
        bgColor: string; 
      }> 
    } = {
      'Product Management': [
        { icon: Target, gradient: 'from-blue-500 to-cyan-500', bgColor: 'group-hover:border-blue-300 dark:group-hover:border-blue-600' },
        { icon: Zap, gradient: 'from-violet-500 to-purple-500', bgColor: 'group-hover:border-violet-300 dark:group-hover:border-violet-600' },
        { icon: Users, gradient: 'from-blue-600 to-indigo-600', bgColor: 'group-hover:border-blue-400 dark:group-hover:border-blue-500' }
      ],
      'Data Analytics': [
        { icon: BarChart3, gradient: 'from-purple-500 to-pink-500', bgColor: 'group-hover:border-purple-300 dark:group-hover:border-purple-600' },
        { icon: TrendingUp, gradient: 'from-indigo-500 to-blue-500', bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600' },
        { icon: Zap, gradient: 'from-yellow-500 to-orange-500', bgColor: 'group-hover:border-yellow-300 dark:group-hover:border-yellow-600' }
      ],
      'Growth & Strategy': [
        { icon: TrendingUp, gradient: 'from-emerald-500 to-green-500', bgColor: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-600' },
        { icon: Globe, gradient: 'from-teal-500 to-cyan-500', bgColor: 'group-hover:border-teal-300 dark:group-hover:border-teal-600' },
        { icon: Users, gradient: 'from-green-500 to-emerald-500', bgColor: 'group-hover:border-green-300 dark:group-hover:border-green-600' }
      ],
      'Entrepreneurship': [
        { icon: Rocket, gradient: 'from-orange-500 to-red-500', bgColor: 'group-hover:border-orange-300 dark:group-hover:border-orange-600' },
        { icon: Lightbulb, gradient: 'from-yellow-500 to-orange-500', bgColor: 'group-hover:border-yellow-300 dark:group-hover:border-yellow-600' },
        { icon: Crown, gradient: 'from-amber-500 to-yellow-500', bgColor: 'group-hover:border-amber-300 dark:group-hover:border-amber-600' }
      ],
      'SaaS/B2B': [
        { icon: Building2, gradient: 'from-indigo-500 to-purple-500', bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600' },
        { icon: Globe, gradient: 'from-slate-500 to-gray-600', bgColor: 'group-hover:border-slate-300 dark:group-hover:border-slate-600' },
        { icon: Users, gradient: 'from-indigo-600 to-blue-600', bgColor: 'group-hover:border-indigo-400 dark:group-hover:border-indigo-500' }
      ],
      'Mobile/App': [
        { icon: Smartphone, gradient: 'from-teal-500 to-cyan-500', bgColor: 'group-hover:border-teal-300 dark:group-hover:border-teal-600' },
        { icon: Zap, gradient: 'from-pink-500 to-rose-500', bgColor: 'group-hover:border-pink-300 dark:group-hover:border-pink-600' },
        { icon: Heart, gradient: 'from-red-500 to-pink-500', bgColor: 'group-hover:border-red-300 dark:group-hover:border-red-600' }
      ],
      'FinTech Product Strategy': [
        { icon: Building2, gradient: 'from-indigo-500 to-blue-500', bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600' },
        { icon: TrendingUp, gradient: 'from-blue-500 to-cyan-500', bgColor: 'group-hover:border-blue-300 dark:group-hover:border-blue-600' }
      ],
      'EdTech Business Development': [
        { icon: BarChart3, gradient: 'from-indigo-500 to-purple-500', bgColor: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-600' },
        { icon: Users, gradient: 'from-purple-500 to-pink-500', bgColor: 'group-hover:border-purple-300 dark:group-hover:border-purple-600' }
      ]
    };

    // Get symbols for category, use index to ensure uniqueness
    const categoryOptions = categorySymbols[category] || categorySymbols['Product Management'];
    return categoryOptions[index % categoryOptions.length];
  };

  // Animation variants matching Contact/Availability sections
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

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const openProjectModal = (project: any) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Featured Work
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Projects</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Product initiatives that drove measurable impact. Click to explore details or try live demos.
            </motion.p>
          </motion.div>

          {/* Projects Grid - UNIQUE SYMBOL FOR EACH TILE */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {projects.map((project: any, index: number) => {
              const symbolConfig = getUniqueProjectSymbol(project.title, project.category, index);
              const IconComponent = symbolConfig.icon;
              
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full h-80 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${symbolConfig.bgColor} flex flex-col items-center cursor-pointer`}
                    onClick={() => openProjectModal(project)}
                  >
                    {/* UNIQUE Professional Lucide Icon for Each Tile */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className={`w-14 h-14 mb-4 bg-gradient-to-r ${symbolConfig.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Project Name - PROMINENT like Availability Cards */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors text-center">
                        {project.title}
                      </h3>
                      
                      {/* Category - Subtle */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2 mb-4">
                        {project.category}
                      </p>
                    </div>

                    {/* Minimal CTAs at Bottom */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                      {/* Live Demo - Minimal Icon */}
                      {project.links && project.links.length > 0 && (
                        <motion.a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e: any) => e.stopPropagation()}
                          className="inline-flex items-center text-blue-500 font-medium text-sm hover:text-blue-600 transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </motion.a>
                      )}
                      
                      {/* Walk-through - Minimal Icon */}
                      <div className="inline-flex items-center text-gray-500 font-medium text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal remains the same */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e: any) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getUniqueProjectSymbol(selectedProject.title, selectedProject.category, 0).gradient} rounded-xl flex items-center justify-center`}>
                    {React.createElement(getUniqueProjectSymbol(selectedProject.title, selectedProject.category, 0).icon, {
                      className: "w-5 h-5 text-white",
                      strokeWidth: 2
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.category} • {selectedProject.date}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overview</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Metrics */}
                  {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProject.metrics.map((metric: string, index: number) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/*Skills / Tools Used */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills / Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {selectedProject.links && selectedProject.links.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Links</h4>
                      <div className="flex gap-3">
                        {selectedProject.links.map((link: any, index: number) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
