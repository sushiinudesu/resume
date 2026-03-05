import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.map((locale) => {
    const pathname = locale === routing.defaultLocale ? '' : `/${locale}`;

    return {
      url: `${baseUrl}${pathname}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          ru: `${baseUrl}/ru`,
          'x-default': `${baseUrl}`,
        },
      },
    };
  });
}
