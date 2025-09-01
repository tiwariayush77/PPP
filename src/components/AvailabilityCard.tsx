'use client';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, TrendingUp, Users, Award, ExternalLink, User, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getConfig } from '@/lib/config-loader';

interface AvailabilityData {
  availability: string;
  preferences: {
    roleTypes: string[];
    industries: string[];
    workMode: string;
    location: string;
  };
  experience: {
    internshipCompleted: string;
    freelanceWork: string;
    projectExperience: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  achievements: string[];
  lookingFor: {
    growthOpportunities: string;
    mentorship: string;
    impactfulWork: string;
    technicalChallenges: string;
    collaboration: string;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

interface AvailabilityCardProps {
  data?: AvailabilityData;
}

const AvailabilityCard = ({ data }: AvailabilityCardProps) => {
  const router = useRouter();
  const config = getConfig();
  
  const handleContactClick = () => {
    router.push('/?query=How can I reach you?');
  };

  // Animation variants matching Contact section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-300 text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4 mr-2" />
              Available for Opportunities
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Ayush <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Tiwari</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Product Manager & Data Analytics Professional ready to drive growth and innovation through data-driven decision making and strategic product development.
          </motion.p>
        </motion.div>

        {/* Availability Status Cards - Same Height */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Current Status */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-80 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600 flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors">
                  Available Now
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2">
                  Ready for immediate start on Product Management & Analytics roles
                </p>
              </div>
              <div className="inline-flex items-center text-green-500 font-medium text-sm mt-4 justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Immediate Start
              </div>
            </motion.div>
          </motion.div>

          {/* Location & Preferences */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-80 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  Location & Remote
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2">
                  Based in India, open to remote work and relocation globally 🌎
                </p>
              </div>
              <div className="inline-flex items-center text-blue-500 font-medium text-sm mt-4 justify-center">
                <Building2 className="w-4 h-4 mr-2" />
                Remote Ready
              </div>
            </motion.div>
          </motion.div>

          {/* Role Focus */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-80 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
                  Seeking Roles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2">
                  Product Manager, Data Analyst, Growth roles & strategic internships
                </p>
              </div>
              <div className="inline-flex items-center text-purple-500 font-medium text-sm mt-4 justify-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Growth Focused
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Skills & Experience - Same Height */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Core Competencies */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  Core Skills
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "Product Strategy & Roadmapping",
                  "Data Analytics & A/B Testing", 
                  "User Research & Market Analysis",
                  "SQL, Python & JavaScript",
                  "Agile & Cross-functional Leadership"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => router.push('/?query=What are your skills?')}
                className="mt-6 inline-flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors"
              >
                <span>View all skills</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* What I Bring */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-600"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  What I Bring
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    <strong className="text-emerald-600">Proven Track Record:</strong> Led product initiatives resulting in 40% user engagement increase
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    <strong className="text-blue-600">Data-Driven Approach:</strong> Expert in analytics tools and frameworks for actionable insights
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    <strong className="text-purple-600">Strategic Vision:</strong> Experience in 0→1 product development and market analysis
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Goal & Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 mb-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Goal</h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Looking to join innovative teams where I can leverage data analytics and product strategy to drive meaningful business impact. 
              I'm passionate about building user-centric products that solve real problems and create lasting value in collaborative, growth-oriented environments! 🚀
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactClick}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailabilityCard;
