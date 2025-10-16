'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { getConfig } from '@/lib/config-loader';
import { Briefcase, Layers3, Cpu, Award, ExternalLink } from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0.42, 0, 0.58, 1] as any // Cubic bezier equivalent of 'easeOut'
    } 
  }
};


const chipVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.25, 
      ease: [0.42, 0, 0.58, 1] as any // Cubic bezier equivalent of 'easeOut'
    } 
  }
};


const Skills: React.FC = () => {
  const config = getConfig();

  // Research-backed badge renderer with proper mobile text handling
  const renderSkillBadge = (skill: any, index: number, sectionKey: string, chipClass: string) => {
    const isClickable = typeof skill === 'object' && skill.url;
    const skillName = typeof skill === 'object' ? skill.name : skill;
    
    const badgeContent = (
      <Badge
        className={[
          'inline-flex items-center justify-center',
          'rounded-xl transition-all duration-200',
          // Mobile-first responsive sizing
          'px-2 py-1.5 sm:px-3 sm:py-2',
          'text-xs sm:text-sm font-medium',
          'min-h-[32px] sm:min-h-[36px]',
          // Critical mobile text handling from research
          'whitespace-normal text-center leading-tight',
          'max-w-full',
          chipClass,
          isClickable 
            ? 'cursor-pointer hover:opacity-80 hover:scale-[1.02] active:scale-95' 
            : 'hover:opacity-90',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500'
        ].join(' ')}
        style={{ 
          // Research-backed CSS for mobile text wrapping
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto',
          lineHeight: '1.3'
        }}
      >
        <span className="flex-1">{skillName}</span>
        {isClickable && <ExternalLink className="w-3 h-3 ml-1.5 flex-shrink-0" />}
      </Badge>
    );

    return isClickable ? (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        title={`View ${skillName} certificate`}
      >
        {badgeContent}
      </a>
    ) : badgeContent;
  };

  const categories = [
    {
      key: 'soft_skills',
      displayName: 'Product Management Skills',
      icon: <Briefcase className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
      chip: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200 border border-blue-200/60 dark:border-blue-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300',
      skills: config.skills?.soft_skills || []
    },
    {
      key: 'certifications',
      displayName: 'Certifications',
      icon: <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
      chip: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200/60 dark:border-amber-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300',
      skills: [
        {
          name: "Aha! Product Management Professional Certificate",
          url: "https://www.linkedin.com/learning/certificates/d66054295450d02fd23c43cefdf775cccf3df7ac69fb384cccb38c3694324a40"
        },
        {
          name: "Atlassian Agile Project Management Professional Certificate",
          url: "https://www.linkedin.com/learning/certificates/f5265267f7f4e17a98f8f51910c9c317a437312f343c446b4fee6cedc068034b"
        },
        {
          name: "Microsoft Azure AI Essentials Professional Certificate",
          url: "https://www.linkedin.com/learning/certificates/3c5352582556c206eb2de1287c49e483f95b6c9850467207bd6193bff4a296fa"
        }
      ]
    },
    {
      key: 'technical',
      displayName: 'Tools & Platforms',
      icon: <Cpu className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />,
      chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300',
      skills: [
        'Figma', 'Notion', 'Jira', 'Slack', 'Google Analytics', 'Mixpanel',
        'A/B Testing', 'SQL', 'Miro', 'Lovable', 'GitHub'
      ]
    },
    {
      key: 'domains',
      displayName: 'Domain Expertise',
      icon: <Layers3 className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
      chip: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-200 border border-purple-200/60 dark:border-purple-900/40',
      card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300',
      skills: [
        'FinTech', 'EdTech', 'B2B SaaS', 'Streaming Platforms',
        'E-commerce', 'Quick Commerce', '0→1 Products', 'Growth Products'
      ]
    }
  ].filter(c => c.skills && c.skills.length > 0);

  return (
    <section aria-labelledby="skills-title" className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xl sm:text-2xl">🧠</span>
        </div>
        <h2 id="skills-title" className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
      </div>
      
      {/* Skills Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 sm:space-y-6"
      >
        {categories.map((section) => (
          <motion.div
            key={section.key}
            variants={sectionVariants}
            className={`${section.card} p-4 sm:p-6`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
                {section.key === 'soft_skills' && <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />}
                {section.key === 'certifications' && <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />}
                {section.key === 'technical' && <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />}
                {section.key === 'domains' && <Layers3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {section.displayName}
              </h3>
            </div>
            
            {/* INDUSTRY STANDARD: Flex wrap layout - NO GRIDS */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {section.skills.map((skill, idx) => (
                <motion.div
                  key={`${section.key}-${typeof skill === 'object' ? skill.name : skill}-${idx}`}
                  variants={chipVariants}
                  className="flex-shrink-0"
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
