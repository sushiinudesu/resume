import { JsonLd as SchemaJsonLd } from "react-schemaorg";
import type { Person, WebSite, WithContext } from "schema-dts";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
  };

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteName"),
    url: siteUrl,
    inLanguage: locale,
    description: t("description"),
  };

  return (
    <>
      <SchemaJsonLd<Person> item={personJsonLd} />
      <SchemaJsonLd<WebSite> item={websiteJsonLd} />
    </>
  );
}