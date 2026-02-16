import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations('Skills');
  
  return (
    <section id="skills" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="max-w-4xl bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h2 className="text-4xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
