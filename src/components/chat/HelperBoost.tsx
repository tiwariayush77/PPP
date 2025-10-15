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
  CodeIcon,
  FileText,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  Sparkles,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';
import { useState, useEffect } from 'react';
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

export default function HelperBoost({
  submitQuery,
  setInput,
  handlePresetReply,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [showPresetReply, setShowPresetReply] = useState<string | null>(null);

  // Force buttons to be visible on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        <div className="w-full bg-transparent">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-2 flex justify-center bg-transparent'
                : 'mb-0 flex justify-center bg-transparent'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700 bg-transparent"
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

          {/* FIXED: Always show horizontal buttons - removed isVisible condition */}
          <div className="w-full bg-transparent">
            {/* Subtle gradient wash for blending */}
            <div className="relative w-full bg-transparent">
              <div
                className="
                  flex w-full gap-2 md:gap-3
                  overflow-x-auto custom-scrollbar
                  snap-x snap-mandatory
                  bg-transparent
                  supports-[backdrop-filter]:backdrop-blur-sm
                  px-2 py-3
                "
                style={{ justifyContent: 'safe center' }}
              >
                {questionConfig.map(({ key, color, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => handleQuestionClick(key)}
                    variant="outline"
                    className="
                      group relative
                      h-10 md:h-11 min-w-[100px] flex-shrink-0
                      px-3.5 md:px-4 rounded-2xl
                      bg-white/30 dark:bg-gray-900/30
                      backdrop-blur-lg
                      border border-gray-200/50 dark:border-gray-800/50
                      shadow-sm hover:shadow-md 
                      hover:-translate-y-0.5 active:translate-y-0
                      hover:bg-white/40 dark:hover:bg-gray-900/40
                      transition-all duration-200 ease-out
                      focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    "
                  >
                    <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                      <Icon size={18} strokeWidth={2} color={color} className="transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-sm font-semibold">{key}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
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
