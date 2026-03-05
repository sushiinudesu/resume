'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import LocaleToggle from './LocaleToggle';
import DarkModeToggle from './DarkModeToggle';

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#portfolio", key: "portfolio" },
  { href: "#contact", key: "contact" },
];

export default function Header() {
  const t = useTranslations('Header');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      closeMenu();
      return;
    }

    const sectionId = href.slice(1);
    const sectionElement = document.getElementById(sectionId);

    if (!sectionElement) {
      closeMenu();
      return;
    }

    event.preventDefault();
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', href);
    closeMenu();
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 h-15 w-full shadow bg-[#f2eee8] dark:bg-[#d9dfec]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center relative min-h-15">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="sm:hidden absolute left-0 p-2 text-gray-700 dark:text-gray-700"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="max-sm:hidden">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="text-lg font-semibold text-gray-600 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-400 transition"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 items-center">
        <DarkModeToggle />
        <LocaleToggle />
      </div>
      {isMenuOpen && (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className="sm:hidden absolute left-0 right-0 top-15 rounded-b-lg shadow bg-[#f2eee8] dark:bg-[#d9dfec]"
        >
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="block px-4 py-2 text-base font-semibold text-gray-600 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-400 transition"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
