'use client';

import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import LocaleToggle from './LocaleToggle';

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#portfolio", key: "portfolio" },
  { href: "#contact", key: "contact" },
];

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-50 w-full shadow bg-[#f2eee8] relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
        <nav>
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute right-4 top-4">
        <LocaleToggle />
      </div>
    </header>
  );
}
