'use client';

import { Skill } from "@/hooks/useSkills";

interface InterestedSkillProps {
  skill: Skill;
  showComma: boolean;
}

export default function InterestedSkill({ skill, showComma }: InterestedSkillProps) {
  return (
    <span>
      <span className="text-gray-700 dark:text-gray-300">
        {skill.name}
      </span>
      {showComma && <span className="text-gray-500">, </span>}
    </span>
  );
}
