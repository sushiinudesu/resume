import { useTranslations } from 'next-intl';

export default function Preview() {
  const t = useTranslations('Preview');
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4 py-8">
      <div className="bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
