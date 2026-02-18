import { BY, US } from 'country-flag-icons/react/3x2';
import { useTranslations } from 'next-intl';
import { useFirebaseData } from '@/providers/FirebaseProvider';

type PortfolioCompanyItemProps = {
  companyId: string;
};

function getPlaceFlag(place?: string) {
  const normalizedPlace = place?.trim().toLowerCase();
  if (normalizedPlace === 'usa') return <US title="USA" className="w-4 h-3" />;
  if (normalizedPlace === 'belarus') return <BY title="Belarus" className="w-4 h-3" />;
  return null;
}

export default function PortfolioCompanyItem({
  companyId,
}: PortfolioCompanyItemProps) {
  const t = useTranslations('Portfolio');
  const {
    companies: { getCompany },
  } = useFirebaseData();
  const company = getCompany(companyId);

  const companyName = company?.name ?? companyId;
  const companyUrl = company?.url;
  const companyRole = company ? t(`roleValues.${company.role}`) : '';
  const companyLocation = company ? `${t(`locationValues.${company.location}`)}${company.place ? `, ${company.place}` : ''}` : '';
  const placeFlag = getPlaceFlag(company?.place);

  const normalizedCompanyUrl = companyUrl?.trim();
  const href =
    normalizedCompanyUrl &&
    (normalizedCompanyUrl.startsWith('http://') || normalizedCompanyUrl.startsWith('https://')
      ? normalizedCompanyUrl
      : `https://${normalizedCompanyUrl}`);

  return (
    <div className="mb-3 mt-2 rounded-md max-2xs:rounded-none border border-zinc-200/80 dark:border-zinc-800/90 bg-rose-50/90 dark:bg-slate-800/90 px-4 py-3 text-center">
      <h3 className="text-lg font-bold tracking-wide text-zinc-800 dark:text-zinc-100">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {companyName}
          </a>
        ) : (
          companyName
        )}
      </h3>
      {(companyRole || companyLocation) && (
        <div className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300 space-y-0.5">
          {companyRole && <p>{`${t('role')}: ${companyRole}`}</p>}
          {companyLocation && (
            <p className="inline-flex items-center justify-center gap-1 align-middle">
              {`${t('location')}: ${companyLocation}`}
              {placeFlag && <span className="inline-flex items-center">{placeFlag}</span>}
            </p>
          )}
        </div>
      )}
    </div>
  );
}