import AboutPage from "./AboutPage";
import { fetchAboutData } from "@/api/aboutService";
import { fetchHomeData } from "@/api/homeService";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

// 1. ✅ Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const aboutApiData = await fetchAboutData(params.locale);
  const { seo } = aboutApiData.data;

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

// 2. ✅ Page Component
export default async function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const [aboutApiData, homeApiData] = await Promise.all([
    fetchAboutData(params.locale),
    fetchHomeData(params.locale),
  ]);

  // Handle different potential API response structures
  const getHomeData = (apiResult: any) => {
    if (apiResult?.data?.achievements) return apiResult.data;
    if (apiResult?.achievements) return apiResult;
    return apiResult?.data || apiResult;
  };
  
  const homeDataContent = getHomeData(homeApiData);
  
  const achievementsSection = homeDataContent?.sections?.find(
    (s: any) => s.key === "achievements"
  );

  const { seo } = aboutApiData.data;

  return (
    <>
      {seo.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <AboutPage
        aboutData={aboutApiData}
        achievementsData={homeDataContent?.achievements ?? []}
        achievementsSection={achievementsSection}
      />
    </>
  );
}
