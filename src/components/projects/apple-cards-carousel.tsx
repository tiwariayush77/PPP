'use client';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// Simple icon components
const IconArrowNarrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M5 12l6 6" />
    <path d="M5 12l6-6" />
  </svg>
);

const IconArrowNarrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 18l6-6" />
    <path d="M13 6l6 6" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

// Card type definition
type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  links?: {
    live?: string;
    github?: string;
  };
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
}: {
  items: React.ReactNode[];
  initialScroll?: number;
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const getScrollDistance = () => {
    const cardWidth = 320; // w-80 = 320px
    const gap = 16; // gap-4 = 16px
    return cardWidth + gap;
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getScrollDistance(),
        behavior: 'smooth',
      });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 320;
      const gap = 16;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  };

  // Animation variants for mobile grid
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
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      {/* Mobile Grid Layout */}
      <div className="block md:hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
        >
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <motion.div
                key={`mobile-card-${index}`}
                variants={itemVariants}
                className="w-full flex justify-center"
              >
                {item}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No projects to display
            </div>
          )}
        </motion.div>
      </div>

      {/* Desktop Carousel Layout - UNCHANGED */}
      <div className="hidden md:block relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          ></div>
          <div
            className={cn(
              'flex flex-row justify-start gap-4',
              'mx-auto max-w-7xl pl-4'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut' as any,
                   
                  },
                }}
                key={'desktop-card-' + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%] flex-shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="mr-10 flex justify-end gap-2 md:mr-20">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }
    
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  //@ts-ignore
  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white font-sans dark:bg-neutral-900"
            >
              {/* Close button */}
              <div className="sticky top-4 z-50 flex justify-end px-8 pt-8 md:px-14 md:pt-8">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/90 shadow-md dark:bg-white/90 hover:scale-110 transition-transform"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                </button>
              </div>

              {/* Modal header */}
              <div className="relative px-8 pt-2 pb-0 md:px-14">
                <div>
                  <motion.p
                    layoutId={layout ? `category-${card.title}` : undefined}
                    className="text-base font-medium text-purple-600 dark:text-purple-400"
                  >
                    {card.category}
                  </motion.p>
                  <motion.p
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
                  >
                    {card.title}
                  </motion.p>
                </div>
              </div>

              {/* Modal content */}
              <div className="px-8 pt-8 pb-14 md:px-14">
                {card.content}
                
                {/* Project Links */}
                {card.links && (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {card.links.live && (
                      <a
                        href={card.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live
                      </a>
                    )}
                    {card.links.github && (
                      <a
                        href={card.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-xl transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Button - Responsive Design */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative z-10 flex flex-col items-start justify-start overflow-hidden transition-all duration-300 group",
          // Mobile styling (Contact-section inspired)
          "w-full max-w-[280px] mx-auto aspect-[4/5] rounded-2xl shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          // Desktop styling (original carousel - UNCHANGED)
          "md:w-80 md:h-48 md:max-w-none md:aspect-auto md:rounded-3xl md:bg-gray-100 md:dark:bg-neutral-900 md:border-0"
        )}
      >
        {/* Background Image */}
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />

        {/* Gradient Overlay - Responsive */}
        <div className={cn(
          "absolute inset-0 z-20 group-hover:opacity-90 transition-opacity",
          // Mobile: Subtle bottom gradient
          "bg-gradient-to-t from-black/70 via-transparent to-transparent",
          // Desktop: Original strong gradient
          "md:bg-gradient-to-b md:from-black md:via-transparent md:to-transparent"
        )} />

        {/* Content - Responsive positioning */}
        <div className={cn(
          "relative z-40 p-4 w-full h-full flex flex-col",
          "sm:p-6 md:p-8",
          // Mobile: Bottom-aligned
          "justify-end",
          // Desktop: Top-aligned (original)
          "md:justify-start"
        )}>
          {/* Category */}
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base mb-1 md:mb-2"
          >
            {card.category}
          </motion.p>

          {/* Title */}
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className={cn(
              "text-left font-sans font-semibold text-white [text-wrap:balance]",
              // Mobile: Readable size
              "text-lg leading-tight max-w-full",
              // Desktop: Original styling
              "md:text-xl lg:text-3xl md:max-w-xs"
            )}
          >
            {card.title}
          </motion.p>

          {/* Action Links */}
          {card.links && (
            <div className="flex gap-2 mt-3">
              {card.links?.live && (
                <a
                  href={card.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center font-medium rounded transition-all duration-200",
                    // Mobile: More prominent
                    "px-3 py-1.5 bg-white/90 hover:bg-white text-blue-600 text-sm shadow-sm",
                    // Desktop: Original badge style
                    "md:px-2 md:py-1 md:bg-blue-500/80 md:hover:bg-blue-600/90 md:text-white md:text-xs md:shadow-none"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live
                </a>
              )}
              {card.links?.github && (
                <a
                  href={card.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center font-medium rounded transition-all duration-200",
                    // Mobile: More prominent
                    "px-3 py-1.5 bg-white/90 hover:bg-white text-gray-700 text-sm shadow-sm",
                    // Desktop: Original badge style
                    "md:px-2 md:py-1 md:bg-gray-700/80 md:hover:bg-gray-800/90 md:text-white md:text-xs md:shadow-none"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        'transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Project background'}
      {...rest}
    />
  );
};
