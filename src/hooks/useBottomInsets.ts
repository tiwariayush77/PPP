'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook to measure and track bottom viewport insets for mobile-friendly fixed footers
 * Handles: Visual viewport changes, safe areas, keyboard overlays, browser chrome
 * 
 * @returns {
 *   bottomInset: number - Total bottom inset (visual viewport + safe area)
 *   barHeight: number - Current measured height of the fixed bar
 *   barRef: RefObject - Ref to attach to the fixed bar element for measurement
 * }
 */
export function useBottomInsets() {
  const [bottomInset, setBottomInset] = useState(0);
  const [barHeight, setBarHeight] = useState(120); // Default fallback height
  const barRef = useRef<HTMLDivElement>(null);
  const measurementTimeoutRef = useRef<NodeJS.Timeout>();

  const measureInsets = useCallback(() => {
    // Clear any pending measurements to debounce rapid changes
    if (measurementTimeoutRef.current) {
      clearTimeout(measurementTimeoutRef.current);
    }

    measurementTimeoutRef.current = setTimeout(() => {
      let totalInset = 0;

      // 1. Measure visual viewport bottom inset (keyboard, browser chrome)
      const visualViewport = (window as any).visualViewport;
      if (visualViewport && typeof visualViewport.height === 'number') {
        const viewportInset = Math.max(0, 
          window.innerHeight - (visualViewport.height + (visualViewport.offsetTop || 0))
        );
        totalInset += viewportInset;
      }

      // 2. Add safe area inset (iOS gesture bar, Android navigation)
      // Note: This is handled via CSS env() in the component, so we don't add it to JS calculation
      // to avoid double-counting. The CSS will handle safe-area-inset-bottom automatically.

      // 3. Measure fixed bar height if ref is available
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const measuredHeight = Math.ceil(rect.height);
        if (measuredHeight > 0 && measuredHeight !== barHeight) {
          setBarHeight(measuredHeight);
        }
      }

      // Update the bottom inset if it changed significantly (avoid micro-adjustments)
      if (Math.abs(totalInset - bottomInset) > 2) {
        setBottomInset(totalInset);
      }
    }, 16); // Debounce to next frame
  }, [bottomInset, barHeight]);

  useEffect(() => {
    // Initial measurement
    measureInsets();

    // Listen for viewport changes
    const events = ['resize', 'orientationchange'];
    events.forEach(event => window.addEventListener(event, measureInsets, { passive: true }));

    // Listen for visual viewport changes (keyboard, browser chrome)
    const visualViewport = (window as any).visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', measureInsets, { passive: true });
      visualViewport.addEventListener('scroll', measureInsets, { passive: true });
    }

    // Cleanup
    return () => {
      if (measurementTimeoutRef.current) {
        clearTimeout(measurementTimeoutRef.current);
      }
      events.forEach(event => window.removeEventListener(event, measureInsets));
      if (visualViewport) {
        visualViewport.removeEventListener('resize', measureInsets);
        visualViewport.removeEventListener('scroll', measureInsets);
      }
    };
  }, [measureInsets]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (measurementTimeoutRef.current) {
        clearTimeout(measurementTimeoutRef.current);
      }
    };
  }, []);

  return {
    bottomInset,
    barHeight,
    barRef,
  };
}
