import { fetchBlogsData } from "@/api/blogsService";
import BlogsPageRoute from "./BlogsPageRoute";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const blogApiData = await fetchBlogsData(params.locale);
  const { seo } = blogApiData;

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
  const blogApiData = await fetchBlogsData(params.locale);
  const { seo } = blogApiData;

  return (
    <>
      {seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <BlogsPageRoute blogApiData={blogApiData} />
    </>
  );
}
