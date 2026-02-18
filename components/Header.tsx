'use client';

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

  return (
    <header className="sticky top-0 z-50 h-15 w-full shadow bg-[#f2eee8] dark:bg-[#d9dfec]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
        <nav className="max-sm:hidden">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
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
    </header>
  );
}
