'use client';

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from 'next-intl';

import { GB, RU } from 'country-flag-icons/react/3x2';

const localeFlags: Record<string, React.ComponentType> = {
  en: GB,
  ru: RU,
};

const localeOrder = ['en', 'ru'];

export default function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleToggle = () => {
    const currentIndex = localeOrder.indexOf(locale);
    const nextIndex = (currentIndex + 1) % localeOrder.length;
    const nextLocale = localeOrder[nextIndex];
    router.replace(pathname, { locale: nextLocale });
  };

  const FlagComponent = localeFlags[locale];

  return (
    <button
      onClick={handleLocaleToggle}
      className="w-12 h-8 hover:scale-110 transition-transform rounded overflow-hidden"
      aria-label="Toggle language"
    >
      <FlagComponent />
    </button>
  );
}
