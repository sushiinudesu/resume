'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { sendContactMessage } from '@/actions/sendContactMessage';

function SubmitButton({ label, disabled }: { label: string; disabled: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="cursor-pointer mt-2 self-start rounded-md bg-zinc-900 dark:bg-zinc-100 px-5 py-2 text-sm xs:text-base font-semibold text-zinc-100 dark:text-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:text-zinc-100 dark:disabled:text-zinc-200"
      aria-busy={pending}
    >
      {pending ? (
        <span className="inline-flex items-center gap-1" aria-label="Loading">
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:240ms]" />
        </span>
      ) : (
        label
      )}
    </button>
  );
}

export default function Contact() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const form = formRef.current;
    if (!form) return;
    setIsFormValid(form.checkValidity());
  };
  
  return (
    <section id="contact" className="flex flex-col items-center justify-center gap-6 px-3 py-6 xs:px-4 xs:py-8">
      <div className="w-full max-w-4xl bg-white/50 dark:bg-zinc-900/50 px-4 py-8 2xs:px-6 2xs:py-10 xs:px-8 xs:py-12 rounded-lg">
        <h2 className="text-2xl xs:text-3xl font-bold mb-6 text-black dark:text-zinc-50">{t('title')}</h2>
        <form
          ref={formRef}
          action={sendContactMessage}
          className="flex flex-col gap-4"
          onInput={validateForm}
          onChange={validateForm}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs xs:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm xs:text-base text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs xs:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm xs:text-base text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs xs:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm xs:text-base text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <SubmitButton label={t('submit')} disabled={!isFormValid} />
        </form>
      </div>
    </section>
  );
}
