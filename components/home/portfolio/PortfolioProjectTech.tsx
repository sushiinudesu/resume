import { useTranslations } from 'next-intl';
import { useFirebaseData } from '@/providers/FirebaseProvider';

type PortfolioProjectTechProps = {
  tech: string[];
};

export default function PortfolioProjectTech({ tech }: PortfolioProjectTechProps) {
  const t = useTranslations('Portfolio');
  const {
    skills: { getSkill },
  } = useFirebaseData();

  const projectTech = tech.map((techId) => getSkill(techId)?.name ?? techId);

  if (projectTech.length === 0) {
    return null;
  }

  return (
    <p className="col-start-2 text-sm text-zinc-600 dark:text-zinc-400">{`${t('tech')}: ${projectTech.join(', ')}`}</p>
  );
}