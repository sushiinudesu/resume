'use client';

import { useTranslations } from 'next-intl';
import { useFirebaseData } from '@/providers/FirebaseProvider';
import MajorSkill from './MajorSkill';
import MinorSkill from './MinorSkill';
import InterestedSkill from './InterestedSkill';

export default function Skills() {
  const t = useTranslations('Skills');
  const { skills: { skills, loading, error } } = useFirebaseData();

  if (loading) {
    return (
      <section id="skills" className="flex flex-col items-center justify-center gap-6 px-4 py-6 xs:py-8">
        <div className="max-w-4xl bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
          <h2 className="text-2xl xs:text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
          <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="flex flex-col items-center justify-center gap-6 px-4 py-6 xs:py-8">
        <div className="max-w-4xl bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
          <h2 className="text-2xl xs:text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
          <p className="text-sm xs:text-base text-red-600 dark:text-red-400">{t('error')}</p>
        </div>
      </section>
    );
  }

  // Sort major skills by years descending
  const sortedMajorSkills = [...skills.major].sort((a, b) => (b.years || 0) - (a.years || 0));
  
  // Get max years for progress bar scaling
  const maxYears = sortedMajorSkills.length > 0 
    ? Math.max(...sortedMajorSkills.map(s => s.years || 0))
    : 1;
  
  return (
    <section id="skills" className="flex flex-col items-center justify-center gap-6 px-4 py-6 xs:py-8">
      <div className="max-w-4xl w-full bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h2 className="text-2xl xs:text-3xl font-bold mb-8 text-black dark:text-zinc-50">{t('title')}</h2>

        {sortedMajorSkills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg xs:text-xl font-semibold mb-4 text-black dark:text-zinc-50">{t('majorSkills')}</h3>
            <div className="space-y-4">
              {sortedMajorSkills.map((skill) => (
                <MajorSkill key={skill.id} skill={skill} maxYears={maxYears} />
              ))}
            </div>
          </div>
        )}

        {skills.minor.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg xs:text-xl font-semibold mb-4 text-black dark:text-zinc-50">{t('minorSkills')}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.minor.map((skill, index) => (
                <MinorSkill key={skill.id} skill={skill} showComma={index < skills.minor.length - 1} />
              ))}
            </div>
          </div>
        )}

        {skills.interested.length > 0 && (
          <div>
            <h3 className="text-lg xs:text-xl font-semibold mb-4 text-black dark:text-zinc-50">{t('interestedSkills')}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.interested.map((skill, index) => (
                <InterestedSkill key={skill.id} skill={skill} showComma={index < skills.interested.length - 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
