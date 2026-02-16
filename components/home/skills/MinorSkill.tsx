'use client';

import { useTranslations } from 'next-intl';
import { Skill } from '@/hooks/useSkills';

interface MinorSkillProps {
  skill: Skill;
  showComma: boolean;
}

export default function MinorSkill({ skill, showComma }: MinorSkillProps) {
  const t = useTranslations('Skills');

  return (
    <span>
      <span
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-default transition-colors"
        title={`${skill.years} ${skill.years === 1 ? t('year') : t('years')}`}
      >
        {skill.name}
      </span>
      {showComma && <span className="text-gray-500">, </span>}
    </span>
  );
}
