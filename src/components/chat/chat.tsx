'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies } from '@/lib/config-loader';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import HelperBoost from './HelperBoost';

// ClientOnly component for client-side rendering
//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      // Conditional rendering based on detection
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <img
              src="/avatar.png"
              alt="Avatar"
              className="h-full w-full object-cover object-[center_top_-5%] scale-95 rounded-full"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);

// Mobile-only floating action button + bottom sheet input
const MobileChatFab = ({
  inputValue,
  onChange,
  onSubmit,
  isLoading,
}: {
  inputValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmitAndClose = (e: React.FormEvent) => {
    onSubmit(e);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Floating Action Button */}
<button
  type="button"
  onClick={() => setOpen(true)}
  className="
    fixed bottom-20 right-4 z-[60]
    h-14 w-14 rounded-full
    backdrop-blur-md
    border border-white/30
    shadow-lg hover:shadow-xl active:scale-95
    flex items-center justify-center
    transition-all duration-300
    hover:scale-110
  "
  style={{
    background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 100%)',
    backdropFilter: 'blur(12px)'
  }}
  aria-label="Open chat input"
>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
</button>


      {/* Bottom Sheet Input */}
      {open && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Sheet Content */}
          <div className="absolute left-0 right-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl">
            <div className="p-4">
              {/* Handle bar */}
              <div className="mb-4 h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto" />
              
              {/* Input form */}
              <form onSubmit={handleSubmitAndClose} className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    value={inputValue}
                    onChange={onChange}
                    placeholder="Ask me anything..."
                    autoFocus
                    className="
                      flex-1 rounded-xl px-4 py-3
                      bg-gray-50 dark:bg-gray-800
                      text-gray-800 dark:text-gray-100
                      border border-gray-200 dark:border-gray-700
                      outline-none focus:ring-2 focus:ring-blue-500
                      text-base
                    "
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="
                      inline-flex items-center justify-center
                      h-12 w-12 rounded-xl
                      bg-gradient-to-r from-blue-500 to-purple-500 text-white
                      shadow-md hover:shadow-lg active:scale-95
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200
                    "
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4l20 12-20 8 7-8-7-4z"/>
                    </svg>
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="text-xs px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    onClick={() => {
                      const event = { target: { value: "Show your top projects" } } as React.ChangeEvent<HTMLInputElement>;
                      onChange(event);
                    }}
                  >
                    Show your top projects
                  </button>
                  <button
                    type="button"
                    className="text-xs px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    onClick={() => {
                      const event = { target: { value: "What roles are you open to?" } } as React.ChangeEvent<HTMLInputElement>;
                      onChange(event);
                    }}
                  >
                    What roles are you open to?
                  </button>
                </div>

                {/* Close button */}
                <button
                  type="button"
                  className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut' as any,
  },
};

const Chat = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [presetReply, setPresetReply] = useState<{
    question: string;
    reply: string;
    tool: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    onResponse: (response) => {
      if (response) {
        setLoadingSubmit(false);
      }
    },
    onFinish: () => {
      setLoadingSubmit(false);
    },
    onError: (error) => {
      setLoadingSubmit(false);
      console.error('Chat error:', error.message, error.cause);
      
      // Handle specific error types
      if (error.message?.includes('quota') || error.message?.includes('exceeded') || error.message?.includes('429')) {
        // Show a friendly notification for quota issues
        toast.error('⚠️ API Quota Exhausted! Free Gemini API limit reached. Please contact Anuj directly or use preset questions. Thank you for understanding! 🙏', {
          duration: 6000, // Show for 6 seconds
          style: {
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            color: '#92400e',
            fontSize: '14px',
            fontWeight: '500',
          },
        });
        
        // Set error message state for frontend display
        setErrorMessage('quota_exhausted');
        
        // Try to add a chat bubble with the error message
        try {
          append({
            role: 'assistant',
            content: '⚠️ **API Quota Exhausted**\n\nFree Gemini API limit reached. Please contact Anuj directly or use preset questions below.',
          });
        } catch (appendError) {
          console.error('Failed to append error message:', appendError);
        }
      } else if (error.message?.includes('network')) {
        toast.error('Network error. Please check your connection and try again.');
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        toast.error(`Error: ${error.message}`);
        setErrorMessage(`Error: ${error.message}`);
      }
    },
    onToolCall: (tool) => {
      const toolName = tool.toolCall.toolName;
      console.log('Tool call:', toolName);
    },
  });

  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: false,
    };

    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.parts?.some(
          (part) =>
            part.type === 'tool-invocation' &&
            part.toolInvocation?.state === 'result'
        ) || false;
    }

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state !== 'result'
      )
  );

  //@ts-ignore
  const submitQuery = (query) => {
    if (!query.trim() || isToolInProgress) return;
    
    // Clear any previous error message
    setErrorMessage(null);
    
    // Check if this is a preset question first
    if (presetReplies[query]) {
      const preset = presetReplies[query];
      setPresetReply({ question: query, reply: preset.reply, tool: preset.tool });
      setLoadingSubmit(false);
      return;
    }
    
    setLoadingSubmit(true);
    setPresetReply(null); // Clear any preset reply when submitting new query
    append({
      role: 'user',
      content: query,
    });
  };

  //@ts-ignore
  const submitQueryToAI = (query) => {
    if (!query.trim() || isToolInProgress) return;
    
    // Clear any previous error message
    setErrorMessage(null);
    
    // Force AI response, bypass preset checking
    setLoadingSubmit(true);
    setPresetReply(null);
    append({
      role: 'user',
      content: query,
    });
  };

  //@ts-ignore
  const handlePresetReply = (question, reply, tool) => {
    setPresetReply({ question, reply, tool });
    setLoadingSubmit(false);
  };

  //@ts-ignore
  const handleGetAIResponse = (question, tool) => {
    setPresetReply(null);
    submitQueryToAI(question); // Use the new function that bypasses presets
  };

  useEffect(() => {
    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      setInput('');
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    submitQueryToAI(input); // User input should go directly to AI
    setInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
  };

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit && !presetReply && !errorMessage;

  // Calculate header height based on hasActiveTool
  const headerHeight = hasActiveTool ? 100 : 180;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fixed Avatar Header with Gradient */}
      <div
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar
                hasActiveTool={hasActiveTool}
              />
            </ClientOnly>
          </div>

          <AnimatePresence>
            {latestUserMessage && !currentAIMessage && (
              <motion.div
                {...MOTION_CONFIG}
                className="mx-auto flex max-w-3xl px-4"
              >
                <ChatBubble variant="sent">
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        {/* Scrollable Chat Content */}
        <div
          className="flex-1 overflow-y-auto px-2 pb-4"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                {...MOTION_CONFIG}
              >
                <ChatLanding 
                  submitQuery={submitQuery} 
                  handlePresetReply={handlePresetReply}
                />
              </motion.div>
            ) : presetReply ? (
              <div className="pb-4">
                <PresetReply
                  question={presetReply.question}
                  reply={presetReply.reply}
                  tool={presetReply.tool}
                  onGetAIResponse={handleGetAIResponse}
                  onClose={() => setPresetReply(null)}
                />
              </div>
            ) : errorMessage ? (
              <motion.div
                key="error"
                {...MOTION_CONFIG}
                className="px-4 pt-4"
              >
                <ChatBubble variant="received">
                  <ChatBubbleMessage className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <div className="space-y-4 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
                          <span className="text-white text-lg">⚠️</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                            API Quota Exhausted
                          </h3>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            Free Gemini API limit reached
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                        <p>
                          Hi! I'm currently using the <strong>free version</strong> of Google's Gemini API, 
                          and today's quota has been reached.
                        </p>
                        
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mt-3">
                          <p className="font-medium mb-2">What you can do:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Contact me directly for a live demo</li>
                            <li>Use the preset questions below for instant responses</li>
                            <li>Come back tomorrow when the quota resets</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            setErrorMessage(null);
                            const preset = presetReplies["How can I reach you?"];
                            if (preset) {
                              setPresetReply({ 
                                question: "How can I reach you?", 
                                reply: preset.reply, 
                                tool: preset.tool 
                              });
                            }
                          }}
                          className="px-4 py-2 bg-amber-500 text-white text-sm rounded-md hover:bg-amber-600 transition-colors font-medium"
                        >
                          Contact me
                        </button>
                        <button
                          onClick={() => {
                            setErrorMessage(null);
                            window.location.href = '/';
                          }}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Use Presets
                        </button>
                      </div>
                      
                      <p className="text-xs text-amber-600 dark:text-amber-400 text-center mt-3">
                        Thank you for your patience! 🙏
                      </p>
                    </div>
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            ) : currentAIMessage ? (
              <div className="pb-4">
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                />
              </div>
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  {...MOTION_CONFIG}
                  className="px-4 pt-18"
                >
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar - Mobile Optimized */}
        <div className="sticky bottom-0 bg-transparent px-2 pt-2 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-2 md:gap-3">
            <HelperBoost 
              submitQuery={submitQuery} 
              setInput={setInput} 
              handlePresetReply={handlePresetReply}
            />
            
            {/* Desktop input only (hidden on mobile) */}
            <div className="hidden md:block w-full">
              <ChatBottombar
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={onSubmit}
                isLoading={isLoading}
                stop={handleStop}
                isToolInProgress={isToolInProgress}
              />
            </div>
          </div>
        </div>

        {/* Mobile FAB (shows only on mobile) */}
        <MobileChatFab
          inputValue={input}
          onChange={handleInputChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
