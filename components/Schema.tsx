import { JsonLd as SchemaJsonLd } from "react-schemaorg";
import type { Person, WebSite, WithContext } from "schema-dts";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { GITHUB_PROFILE_URL, getGitHubAvatarUrl, schemaSocialProfiles } from "@/lib/socialProfiles";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const profileImage = getGitHubAvatarUrl(GITHUB_PROFILE_URL);

export default async function Schema() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const localizedPath = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const localizedUrl = `${siteUrl}${localizedPath}`;

  const personJsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("name"),
    url: localizedUrl,
    jobTitle: t("jobTitle"),
    description: t("description"),
    image: profileImage,
    sameAs: schemaSocialProfiles,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
    ],
  };

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteName"),
    url: siteUrl,
    inLanguage: routing.locales,
    description: t("description"),
  };

  return (
    <>
      <SchemaJsonLd<Person> item={personJsonLd} />
      <SchemaJsonLd<WebSite> item={websiteJsonLd} />
    </>
  );
}