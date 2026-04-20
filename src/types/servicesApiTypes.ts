export interface ServicesApiResponse {
  data: ServicesData;
}

export interface ServicesData {
  services: Service[];
  seo: SEO;
}

export interface Service {
  id: number;
  name: string;
  order: number;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  slug: string;
  slugs?: {
    en?: string;
    ar?: string;
    [key: string]: string | undefined;
  };
  meta_title: string;
  meta_description: string | null;
  index: number;
  sub_services?: SubService[];
}

export interface SEO {
  meta: Meta;
  schema: SchemaItem[];
}

export interface Meta {
  meta_tags: MetaTags;
  open_graph: OpenGraph;
  twitter_card: TwitterCard;
  hreflang_tags: HreflangTags;
}

export interface MetaTags {
  content_type: string;
  title: string;
  author: string;
  description: string;
  canonical: string;
  robots: string;
  // optional additional tags
  [key: string]: string;
}

export interface OpenGraph {
  "og:title": string;
  "og:description": string;
  "og:url": string;
  "og:image": string;
  "og:type": string;
  // optional additional og keys
  [key: string]: string;
}

export interface TwitterCard {
  "twitter:card": string;
  "twitter:title": string;
  "twitter:description": string;
  "twitter:image": string;
  // optional additional twitter keys
  [key: string]: string;
}

export interface HreflangTags {
  en?: string;
  ar?: string;
  "x-default"?: string;
  // any other language codes
  [lang: string]: string | undefined;
}

/**
 * SchemaItem is kept flexible because schema.org objects vary a lot.
 * It types common properties found in your example, but allows extra keys.
 */
export interface SchemaItem {
  /** e.g. "https://schema.org" */
  "@context": string;
  /** e.g. "WebSite", "Organization", etc. */
  "@type": string;
  name?: string;
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ServiceDetailsApiResponse {
  data: {
    service: {
      id: number;
      name: string;
      order: number;
      short_desc: string;
      long_desc: string;
      image: string;
      alt_image: string | null;
      icon: string;
      alt_icon: string | null;
      images: {
        id: number;
        image: string;
        alt_image: string | null;
      }[];
      slug: string;
      slugs: {
        en: string;
        ar: string;
      };
      sub_services?: SubService[];
      meta_title: string;
      meta_description: string | null;
      index: number;
      tabs: {
        id: number;
        name: string;
        short_desc: string;
        long_desc: string;
        icon: string;
        alt_icon: string | null;
        status: boolean;
        order: number;
      }[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      benefits: any[];
    };
    seo: {
      meta: {
        meta_tags: {
          content_type: string;
          title: string;
          description: string;
          canonical: string;
          robots: string;
          [key: string]: string;
        };
        open_graph: {
          "og:title": string;
          "og:description": string;
          "og:url": string;
          "og:image": string;
          "og:type": string;
          [key: string]: string;
        };
        twitter_card: {
          "twitter:card": string;
          "twitter:title": string;
          "twitter:description": string;
          "twitter:image": string;
          [key: string]: string;
        };
        hreflang_tags: {
          en?: string;
          ar?: string;
          "x-default"?: string;
          [lang: string]: string | undefined;
        };
      };
      schema: {
        "@context": string;
        "@type": string;
        name?: string;
        url?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }[];
    };
  };
}

export interface SubService {
  id: number;
  name: string;
  slug: string;
  slugs: {
    en: string;
    ar: string;
  };
  alt_icon: string | null;
  alt_image: string | null;
  icon: string;
  image: string;
  index: number;
  order: number;
  parent_id: number;
  short_desc: string | null;
  long_desc: string;
  meta_title: string | null;
  meta_description: string | null;
}
