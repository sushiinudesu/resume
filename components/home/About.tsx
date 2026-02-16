import { useTranslations } from 'next-intl';
import { MapPin, Cake, Globe, User, Heart } from 'lucide-react';
import { BY } from 'country-flag-icons/react/3x2';
import { useAge } from '@/hooks/useAge';

const iconMap: { [key: string]: React.ReactNode } = {
  location: <MapPin size={18} />,
  age: <Cake size={18} />,
  nationality: <Globe size={18} />,
  gender: <User size={18} />,
  interests: <Heart size={18} />
};

export default function About() {
  const t = useTranslations('About');
  const age = useAge(new Date(1994, 9, 31));

  const aboutItems = [
    { label: t('location'), value: t('locationValue'), icon: 'location', flag: <BY title="Belarus" style={{ width: '20px', height: '15px', marginLeft: '8px' }} /> },
    { label: t('age'), value: age, icon: 'age' },
    { label: t('nationality'), value: t('nationalityValue'), icon: 'nationality', flag: <BY title="Belarus" style={{ width: '20px', height: '15px', marginLeft: '8px' }} /> },
    { label: t('gender'), value: t('genderValue'), icon: 'gender' }
  ];

  const interests = { label: t('interests'), value: t('interestsValue'), icon: 'interests' };
  
  return (
    <section id="about" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="min-w-3xl max-w-5xl bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {aboutItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-zinc-700 dark:text-zinc-300">{iconMap[item.icon]}</span>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{item.label}</p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-zinc-900 dark:text-zinc-100">{item.value}</p>
                {item.flag && item.flag}
              </div>
            </div>
          ))}
          <div className="col-span-2 flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-700 dark:text-zinc-300">{iconMap[interests.icon]}</span>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{interests.label}</p>
            </div>
            <div className="flex items-center">
              <p className="text-base text-zinc-900 dark:text-zinc-100">{interests.value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
