'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function FloatingNavButtons() {
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  
  const previewSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previewSectionRef.current = document.getElementById('preview');
    aboutSectionRef.current = document.getElementById('about');
    headerRef.current = document.querySelector('header');

    if (!previewSectionRef.current || !aboutSectionRef.current) {
      return;
    }

    const updatePreviewVisibility = () => {
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const previewRect = previewSectionRef.current?.getBoundingClientRect();
      const aboutRect = aboutSectionRef.current?.getBoundingClientRect();

      if (!previewRect || !aboutRect) {
        return;
      }

      const isPreviewInView =
        previewRect.bottom > headerBottom &&
        previewRect.top < window.innerHeight;

      const isAboutInView =
        aboutRect.bottom > headerBottom &&
        aboutRect.top < window.innerHeight;

      setIsPreviewVisible(isPreviewInView);
      setIsAboutVisible(isAboutInView);
    };

    updatePreviewVisibility();
    window.addEventListener('scroll', updatePreviewVisibility, { passive: true });
    window.addEventListener('resize', updatePreviewVisibility);

    return () => {
      window.removeEventListener('scroll', updatePreviewVisibility);
      window.removeEventListener('resize', updatePreviewVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-60">
      {!isPreviewVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto absolute left-1/2 top-15 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/70 p-3 text-zinc-800 shadow transition hover:bg-white dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-900 sm:top-19 sm:translate-y-0 lg:left-4 lg:translate-x-0"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {isPreviewVisible && !isAboutVisible && (
        <button
          type="button"
          onClick={scrollToAbout}
          aria-label="Scroll to about"
          className="pointer-events-auto absolute bottom-6 right-4 rounded-lg bg-white/70 p-3 text-zinc-800 shadow transition hover:bg-white dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-900 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
        >
          <ArrowDown size={20} />
        </button>
      )}
    </div>
  );
}
