import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

const configuredLastModified =
  process.env.NEXT_PUBLIC_SITEMAP_LASTMOD ?? process.env.VERCEL_GIT_COMMIT_DATE;

const parsedLastModified =
  configuredLastModified && !Number.isNaN(Date.parse(configuredLastModified))
    ? new Date(configuredLastModified)
    : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const pathname = locale === routing.defaultLocale ? '' : `/${locale}`;

    return {
      url: `${baseUrl}${pathname}`,
      ...(parsedLastModified ? { lastModified: parsedLastModified } : {}),
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
