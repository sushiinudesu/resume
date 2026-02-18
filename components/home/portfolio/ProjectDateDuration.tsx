import { useTranslations } from 'next-intl';

type ProjectDateDurationProps = {
  startAt: unknown;
  endAt: unknown;
};

const CURRENT_TIMESTAMP = Date.now();

function getDateValue(dateValue: unknown): number {
  if (!dateValue) return 0;
  if (dateValue instanceof Date) return dateValue.getTime();
  if (typeof dateValue === 'object' && dateValue !== null && 'toDate' in dateValue) {
    const parsed = (dateValue as { toDate: () => Date }).toDate();
    return parsed.getTime();
  }
  return new Date(dateValue as string | number).getTime();
}

function formatDate(dateValue: unknown): string {
  const timestamp = getDateValue(dateValue);
  if (!Number.isFinite(timestamp) || timestamp <= 0) return '';
  return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(timestamp));
}

function getDurationInMonths(startTimestamp: number, endTimestamp: number): number {
  if (!Number.isFinite(startTimestamp) || !Number.isFinite(endTimestamp)) return 0;
  if (endTimestamp <= startTimestamp) return 0;

  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  return Math.max(0, totalMonths);
}

export default function ProjectDateDuration({
  startAt,
  endAt,
}: ProjectDateDurationProps) {
  const t = useTranslations('Portfolio');

  const start = formatDate(startAt);
  const end = formatDate(endAt);
  const parsedEndTimestamp = getDateValue(endAt);
  const endTimestamp = Number.isFinite(parsedEndTimestamp) && parsedEndTimestamp > 0 ? parsedEndTimestamp : CURRENT_TIMESTAMP;
  const totalMonths = getDurationInMonths(getDateValue(startAt), endTimestamp);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const durationParts: string[] = [];
  if (totalMonths === 0) {
    durationParts.push(t('durationLessThanMonth'));
  } else {
    if (years > 0) {
      durationParts.push(t('durationYears', { count: years }));
    }
    if (months > 0) {
      durationParts.push(t('durationMonths', { count: months }));
    }
  }

  const duration = durationParts.join(' ');

  if (!start && !end) {
    return null;
  }

  return (
    <span className="text-sm text-zinc-600 dark:text-zinc-400">
      {start}{start && end ? ' - ' : ''}{end}{duration ? ` (${duration})` : ''}
    </span>
  );
}