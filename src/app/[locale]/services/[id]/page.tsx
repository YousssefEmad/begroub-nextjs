import React from "react";
import ServiceDetailPage from "./ServiceDetailPage";
import { fetchServiceDetailsData } from "@/api/ServicesService";

import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const serviceDetailsApiData = await fetchServiceDetailsData(
    params.locale,
    params.id
  );
  const { seo } = serviceDetailsApiData.data;

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

export default async function page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(params.locale);
  const serviceDetailsApiData = await fetchServiceDetailsData(
    params.locale,
    params.id
  );
  const { seo } = serviceDetailsApiData.data;

  return (
    <>
      {seo.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <ServiceDetailPage serviceDetailsApiData={serviceDetailsApiData} />
    </>
  );
}
