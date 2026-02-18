"use client";

import { useTranslations } from 'next-intl';
import { useFirebaseData } from '@/providers/FirebaseProvider';
import PortfolioProjectItem from '@/components/home/portfolio/PortfolioProjectItem';

export default function Portfolio() {
  const t = useTranslations('Portfolio');
  const {
    projects: { projects, loading, error },
  } = useFirebaseData();

  if (loading) {
    return (
      <section id="portfolio" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
        <div className="max-w-4xl w-full bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
        <div className="max-w-4xl w-full bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
          <p className="text-red-600 dark:text-red-400">Failed to load projects</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="portfolio" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="max-w-4xl w-full bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
        <ul className="space-y-4">
          {projects.map((project, index) => {
            const companyId = project.companyId;
            const previousCompanyId = index > 0 ? projects[index - 1].companyId : null;
            const showCompany = companyId !== previousCompanyId;

            return (
              <PortfolioProjectItem
                key={project.id}
                project={project}
                showCompany={showCompany}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
