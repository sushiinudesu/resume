import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full shadow bg-[#af7455] dark:bg-[#6b6a79]">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-700 dark:text-gray-300">
        <a
          href="https://github.com/sushiinudesu/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block underline hover:opacity-80"
        >
          {t('viewSourceCodeOnGitHub')}
        </a>
        <p className="mt-1">{t('madeWithReactHostedByVercel')}</p>
        <p className="mt-1">{t('copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
