import { fetchContactData } from "@/api/contactService";
import ContactUsPage from "./ContactUsPage";
import { fetchHomeData } from "@/api/homeService";

import { Metadata } from "next";
import { fetchServicesData } from "@/api/ServicesService";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const contactApiData = await fetchContactData(params.locale);
  const { seo } = contactApiData.data;

  const metaTags = seo.meta.meta_tags;
  const openGraph = seo.meta.open_graph;
  const twitterCard = seo.meta.twitter_card;
  const hreflang = seo.meta.hreflang_tags;

  return {
    title: metaTags.title,
    description: metaTags.description,
    openGraph: {
      title: openGraph["og:title"],
      description: openGraph["og:description"],
      url: openGraph["og:url"],
      images: [
        {
          url: openGraph["og:image"],
          alt: metaTags.title,
        },
      ],
      type: openGraph["og:type"],
    },
    twitter: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      card: twitterCard["twitter:card"] as any,
      title: twitterCard["twitter:title"],
      description: twitterCard["twitter:description"],
      images: [twitterCard["twitter:image"]],
    },
    metadataBase: new URL(metaTags.canonical),
    robots: metaTags.robots,
    alternates: {
      canonical: metaTags.canonical,
      languages: {
        en: hreflang.en,
        ar: hreflang.ar,
        "x-default": hreflang["x-default"],
      },
    },
  };
}

export default async function page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const [homeData, contactApiData, ServicesApiData] = await Promise.all([
    fetchHomeData(params.locale),
    fetchContactData(params.locale),
    fetchServicesData(params.locale),
  ]);

  const { contact_section, contact_data } = homeData;
  const { seo } = contactApiData.data;

  return (
    <>
      {seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <ContactUsPage
        contactData={contact_data}
        contactSection={contact_section}
        servicesData={ServicesApiData.data.services}
        branchLocations={contactApiData.data.branch_locations}
      />
    </>
  );
}
