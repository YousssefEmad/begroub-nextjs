/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { Metadata } from "next";

interface SeoContent {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

interface SeoContentMap {
  ar: SeoContent;
  en: SeoContent;
}

// One universal function that handles both static and dynamic metadata
export async function generatePageMetadata(
  content:
    | SeoContentMap
    | ((params?: any) => SeoContentMap | Promise<SeoContentMap>),
  params?: any
): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  // Handle both static content and dynamic content (functions)
  let seoContentMap: SeoContentMap;

  if (typeof content === "function") {
    // If content is a function, call it with params
    seoContentMap = await content(params);
  } else {
    // If content is static, use it directly
    seoContentMap = content;
  }

  const seoContent =
    seoContentMap[lang as keyof SeoContentMap] || seoContentMap.en;

  return {
    title: seoContent.title,
    description: seoContent.description,
    openGraph: {
      title: seoContent.title,
      description: seoContent.description,
      type: "website",
      ...(seoContent.image && {
        images: [
          {
            url: seoContent.image,
            width: 1200,
            height: 630,
            alt: seoContent.title,
          },
        ],
      }),
      ...(seoContent.url && { url: seoContent.url }),
    },
  };
}
