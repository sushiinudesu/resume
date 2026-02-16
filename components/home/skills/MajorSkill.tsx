'use client';

import { Skill } from '@/hooks/useSkills';
import { useTranslations } from 'next-intl';

interface MajorSkillProps {
  skill: Skill;
  maxYears: number;
}

export default function MajorSkill({ skill, maxYears }: MajorSkillProps) {
  const t = useTranslations('Skills');

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={`/icons/${skill.id}.png`}
            alt={skill.name}
            className="w-6 h-6 object-contain"
          />
          <span className="font-medium text-black dark:text-zinc-50">{skill.name}</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {skill.years} {skill.years === 1 ? t('year') : t('years')}
        </span>
      </div>
      <div className="w-full bg-[#f1ede9] dark:bg-[#353a4f] rounded-full h-2.5">
        <div
          className="bg-[#d1b29d] dark:bg-[#ebf0f4] h-2.5 rounded-full transition-all"
          style={{ width: `${((skill.years || 0) / maxYears) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
