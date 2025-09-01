
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  FileText,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  PartyPopper,
  Sparkles,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies } from '@/lib/config-loader';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Resume: 'Can I see your resume?',
  Contact:
    'How can I reach you? What kind of project would make you say "yes" immediately?',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Resume', color: '#D97856', icon: FileText },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

// Helper drawer data
const specialQuestions = [
  'Who are you?',
  'Can I see your resume?',
  'What projects are you most proud of?',
  'What are your skills?',
  'How can I reach you?',
];

const questionsByCategory = [
  {
    id: 'me',
    name: 'Me',
    icon: UserSearch,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    hoverColor: 'hover:border-cyan-300',
    textColor: 'text-cyan-700',
    questions: [
      'Who are you?',
      'What are your passions?',
      'How did you get started in Product Management?',
      'Where do you see yourself in Product Domain?',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: BriefcaseIcon,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:border-blue-300',
    textColor: 'text-blue-700',
    questions: [
      'Can I see your resume?',
      'What makes you a valuable team member?',
      'Where are you working now?',
      'Why should I hire you?',
      "What's your educational background?",
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: CodeIcon,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    hoverColor: 'hover:border-green-300',
    textColor: 'text-green-700',
    questions: ['What projects are you most proud of?'],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    hoverColor: 'hover:border-purple-300',
    textColor: 'text-purple-700',
    questions: [
      'What are your skills?',
      'How was your experience working as Business Domain?',
    ],
  },
  {
    id: 'contact',
    name: 'Contact & Future',
    icon: MailIcon,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    hoverColor: 'hover:border-amber-300',
    textColor: 'text-amber-700',
    questions: [
      'How can I reach you?',
      "What kind of project would make you say 'yes' immediately?",
      'Where are you located?',
    ],
  },
];

// Animated Chevron component
const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0], // Subtle up and down motion
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-primary mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};

export default function HelperBoost({
  submitQuery,
  setInput,
  handlePresetReply,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [showPresetReply, setShowPresetReply] = useState<string | null>(null);

  const handleQuestionClick = (questionKey: string) => {
    const question = questions[questionKey as keyof typeof questions];
    
    // Map question keys to preset replies that match our config exactly
    const presetMapping: { [key: string]: string } = {
      'Me': 'Who are you?',
      'Projects': 'What projects are you most proud of?',
      'Skills': 'What are your skills?',
      'Resume': 'Can I see your resume?',
      'Contact': 'How can I reach you?'
    };
    
    const presetKey = presetMapping[questionKey];
    if (presetKey && presetReplies[presetKey] && handlePresetReply) {
      const preset = presetReplies[presetKey];
      handlePresetReply(presetKey, preset.reply, preset.tool);
    } else if (submitQuery) {
      submitQuery(question);
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    // For drawer questions, always use AI response (no presets)
    if (submitQuery) {
      submitQuery(question);
    }
    setOpen(false);
  };

  const handleGetAiResponse = (question: string) => {
    setShowPresetReply(null);
    if (submitQuery) {
      submitQuery(question);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-2 flex justify-center'
                : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={14} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={14} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* ORIGINAL HelperBoost Content - UNCHANGED */}
          {isVisible && (
            <div className="w-full">
              <div
                className="flex w-full flex-wrap gap-1 md:gap-3"
                style={{ justifyContent: 'safe center' }}
              >
                {questionConfig.map(({ key, color, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => handleQuestionClick(key)}
                    variant="outline"
                    className="border-border hover:bg-border/30 h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl border bg-white/80 px-4 py-3 shadow-none backdrop-blur-sm transition-none active:scale-95"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon size={18} strokeWidth={2} color={color} />
                      <span className="text-sm font-medium">{key}</span>
                    </div>
                  </Button>
                ))}

                {/* Need Inspiration Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                        <motion.div
                          className="hover:bg-border/30 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900"
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 text-gray-700">
                            <CircleEllipsis
                              className="h-[20px] w-[18px]"
                              strokeWidth={2}
                            />
                          </div>
                        </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Drawer Content with Contact-Style Hover Effects */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-gray-100 outline-none lg:h-[60%]">
            <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white p-4">
              <div className="mx-auto max-w-md space-y-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
                />
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-8 pb-16">
                    {questionsByCategory.map((category) => (
                      <CategorySection
                        key={category.id}
                        name={category.name}
                        Icon={category.icon}
                        questions={category.questions}
                        onQuestionClick={handleDrawerQuestionClick}
                        color={category.color}
                        bgColor={category.bgColor}
                        borderColor={category.borderColor}
                        hoverColor={category.hoverColor}
                        textColor={category.textColor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Component for each category section with Contact-style design
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: string[];
  onQuestionClick: (question: string) => void;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  textColor: string;
}

function CategorySection({
  name,
  Icon,
  questions,
  onQuestionClick,
  color,
  bgColor,
  borderColor,
  hoverColor,
  textColor,
}: CategorySectionProps) {
  return (
    <div className="space-y-4">
      {/* Category Header - Contact Style */}
      <div className="flex items-center gap-3 px-1">
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center shadow-sm`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <Drawer.Title className={`text-xl font-semibold ${textColor}`}>
          {name}
        </Drawer.Title>
      </div>

      <Separator className="my-4" />

      {/* Questions with Contact-Style Cards and Hover Effects */}
      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
            bgColor={bgColor}
            borderColor={borderColor}
            hoverColor={hoverColor}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  );
}

// Component for each question item with CONTACT-STYLE hover effects
interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  textColor: string;
}

function QuestionItem({ 
  question, 
  onClick, 
  isSpecial, 
  bgColor, 
  borderColor, 
  hoverColor, 
  textColor 
}: QuestionItemProps) {
  return (
    <motion.button
      className={cn(
        'group relative flex w-full items-center justify-between rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300',
        'text-sm px-6 py-4 text-left font-medium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSpecial 
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600' 
          : `${bgColor} dark:bg-gray-800 border-2 ${borderColor} dark:border-gray-700 ${hoverColor} dark:hover:border-blue-600`
      )}
      onClick={onClick}
      // CONTACT-STYLE hover effects
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center">
        {isSpecial && <Sparkles className="mr-3 h-5 w-5 text-white" />}
        <span className={cn(
          'font-medium group-hover:text-blue-500 transition-colors duration-300',
          isSpecial ? 'text-white group-hover:text-white' : `${textColor} dark:text-white`
        )}>
          {question}
        </span>
      </div>
      
      {/* CONTACT-STYLE animated chevron */}
      <div className="inline-flex items-center text-blue-500 font-medium text-sm">
        <ChevronRight
          className={cn(
            'h-5 w-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300',
            isSpecial ? 'text-white' : `${textColor} dark:text-gray-300`
          )}
        />
      </div>
    </motion.button>
  );
}
