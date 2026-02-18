import { useTranslations } from 'next-intl';
import { sendContactMessage } from '@/actions/sendContactMessage';

export default function Contact() {
  const t = useTranslations('Contact');
  
  return (
    <section id="contact" className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="w-full max-w-4xl bg-white/50 dark:bg-zinc-900/50 px-8 py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
        <form action={sendContactMessage} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 self-start rounded-md bg-zinc-900 dark:bg-zinc-100 px-5 py-2 font-semibold text-zinc-100 dark:text-zinc-900"
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </section>
  );
}
