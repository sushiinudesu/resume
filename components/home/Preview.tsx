import { useTranslations } from 'next-intl';
import { Github, Linkedin } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/sushiinudesu',
    icon: Github,
    label: 'GitHub'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/sushiinudesu',
    icon: Linkedin,
    label: 'LinkedIn'
  }
];

export default function Preview() {
  const t = useTranslations('Preview');
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4 py-8">
      <div className="bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-300 whitespace-pre-line mt-6">
          {t('description')}
        </p>
      </div>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/50 dark:bg-zinc-900/50 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors"
              aria-label={link.label}
            >
              <IconComponent size={28} className="text-black dark:text-zinc-50" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
