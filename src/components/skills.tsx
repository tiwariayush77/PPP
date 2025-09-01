'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { getConfig } from '@/lib/config-loader';
import { Briefcase, Layers3, Cpu, Award, ExternalLink } from 'lucide-react';

// Animation Variants - Keep original
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.10 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.20, ease: 'easeOut' } }
};

const Skills: React.FC = () => {
  const config = getConfig();

  // Helper function to render badges (clickable or static) - Keep original
  const renderSkillBadge = (skill: any, index: number, sectionKey: string, chipClass: string) => {
    const isClickable = typeof skill === 'object' && skill.url;
    const skillName = typeof skill === 'object' ? skill.name : skill;
    
    const badgeContent = (
      <Badge
        className={[
          'rounded-xl',
          'px-3 py-2 md:px-3.5 md:py-2',
          'text-[13px] md:text-sm font-medium leading-none',
          chipClass,
          isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : 'transition-colors duration-200 hover:opacity-90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600'
        ].join(' ')}
      >
        {skillName}
        {isClickable && <ExternalLink className="w-3 h-3 ml-1 inline-block" />}
      </Badge>
    );

    if (isClickable) {
      return (
        <a
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          title={`View ${skillName} certificate`}
        >
          {badgeContent}
        </a>
      );
    }
    return badgeContent;
  };

  const categories = [
    {
      key: 'product_management',
      displayName: 'Product Management',
      icon: <Briefcase className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
      chip: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200 border border-blue-200/60 dark:border-blue-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300'
    },
    {
      key: 'business_strategy',
      displayName: 'Business Strategy',
      icon: <Layers3 className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
      chip: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-200 border border-purple-200/60 dark:border-purple-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300'
    },
    {
      key: 'technical_skills',
      displayName: 'Technical Skills',
      icon: <Cpu className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />,
      chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300'
    },
    {
      key: 'certifications',
      displayName: 'Certifications',
      icon: <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
      chip: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200/60 dark:border-amber-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300'
    }
  ].map(c => ({
    ...c,
    skills: (config.skills?.[c.key] as string[]) || []
  })).filter(c => c.skills.length > 0);

  return (
    <section aria-labelledby="skills-title" className="w-full">
      {/* Header - Keep Original Desktop, Add Mobile Section Header */}
      <div className="mb-6 flex items-center gap-3 md:hidden">
        <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
        <h2 id="skills-title-mobile" className="text-2xl font-semibold text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
      </div>

      {/* Desktop Header - Original */}
      <div className="mb-6 hidden md:flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
        <h2 id="skills-title" className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
      </div>
      
      {/* Skills Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {categories.map((section) => (
          <motion.div
            key={section.key}
            variants={sectionVariants}
            className={`${section.card} p-6`}
          >
            {/* Category Header - MOBILE ICON ENHANCEMENT */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-12 w-12 sm:h-9 sm:w-9 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                {/* Mobile: Larger icons with better contrast */}
                <div className="block sm:hidden">
                  {section.key === 'product_management' && <Briefcase className="h-7 w-7 text-blue-600 dark:text-blue-400" />}
                  {section.key === 'business_strategy' && <Layers3 className="h-7 w-7 text-purple-600 dark:text-purple-400" />}
                  {section.key === 'technical_skills' && <Cpu className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />}
                  {section.key === 'certifications' && <Award className="h-7 w-7 text-amber-600 dark:text-amber-400" />}
                </div>
                {/* Desktop: Original icons */}
                <div className="hidden sm:block">
                  {section.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.displayName}
              </h3>
            </div>
            
            {/* Skill Badges - Keep Original */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {section.skills.map((skill, idx) => (
                <motion.div
                  key={`${section.key}-${typeof skill === 'object' ? skill.name : skill}-${idx}`}
                  variants={chipVariants}
                >
                  {renderSkillBadge(skill, idx, section.key, section.chip)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
