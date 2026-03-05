import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import type { Project } from '@/hooks/useProjects';
import ProjectIcon from '@/components/home/portfolio/ProjectIcon';
import PortfolioCompanyItem from '@/components/home/portfolio/PortfolioCompanyItem';
import ProjectDateDuration from '@/components/home/portfolio/ProjectDateDuration';
import PortfolioProjectTech from '@/components/home/portfolio/PortfolioProjectTech';
import ProjectFireReaction from '@/components/home/portfolio/ProjectFireReaction';

type PortfolioProjectItemProps = {
  project: Project;
  showCompany: boolean;
};

export default function PortfolioProjectItem({
  project,
  showCompany,
}: PortfolioProjectItemProps) {
  const t = useTranslations('Portfolio');
  const locale = useLocale();

  const localizedProject = project.locales?.[locale as keyof typeof project.locales] ?? project.locales?.en;
  const projectName = localizedProject?.name || project.id;
  const projectDesc = localizedProject?.desc;
  const projectRole = t(`projectRoleValues.${project.role}`);

  return (
    <li key={project.id}>
      {showCompany && <PortfolioCompanyItem companyId={project.companyId} />}
      <div className="relative mx-auto lg:mx-0 lg:ml-8 max-w-3xl">
        <div className="max-w-3xl rounded-lg max-2xs:rounded-none border border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-4">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
            <ProjectIcon icon={project.icon} className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-0">{projectName}</h4>
            <div className="col-start-2 max-lg:col-start-1 max-lg:col-span-2 lg:col-start-3 lg:col-span-1 lg:justify-self-end">
              <ProjectDateDuration startAt={project.startAt} endAt={project.endAt} />
            </div>
            {projectRole && (
              <p className="col-start-2 max-lg:col-start-1 max-lg:col-span-2 text-sm text-zinc-600 dark:text-zinc-400">{`${t('role')}: ${projectRole}`}</p>
            )}
            <PortfolioProjectTech tech={project.tech ?? []} />
            {projectDesc && (
              <p className="col-start-2 max-lg:col-start-1 max-lg:col-span-2 -col-end-1 mt-2 max-w-prose whitespace-pre-line border-l-4 border-zinc-400/70 dark:border-zinc-500 px-3 py-2 text-sm leading-6 sm:text-[15px] sm:leading-7 font-medium tracking-[0.01em] text-zinc-800 dark:text-zinc-200">{projectDesc}</p>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-end lg:mt-0 lg:absolute lg:left-full lg:top-1 lg:ml-3">
          <ProjectFireReaction projectId={project.id} initialLikes={project.likes ?? 0} />
        </div>
      </div>
    </li>
  );
}