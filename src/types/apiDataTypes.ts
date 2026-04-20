// types/home.ts

export interface HomeData {
  banner: Banner;
  about: AboutType;
  clients: ClientTypes[];
  services: ServicesResponse;
  projects: ProjectTypes[];
  benefits: BenefitTypes[];
  achievements: AchievementTypes[];
  blogs: BlogTypes[];
  contact_section: ContactSectionTypes;
  contact_data: ContactDataTypes;
  social_media: SocialMediaTypes;
  partners: PartnerTypes[];
  seo: SEOTypes;
}

// --- Individual Sections ---

export interface Banner {
  title: string;
  title2?: string | null;
  text?: string | null;
  second_text?: string | null;
  image: string;
  alt_image?: string | null;
  company_profile: string | null;
}

export interface AboutType {
  title: string;
  title2?: string | null;
  short_desc: string;
  text: string;
  image: string;
  alt_image?: string | null;
  banner?: string | null;
  alt_banner?: string | null;
  banner2?: string;
  alt_banner2?: string | null;
}

export interface ClientTypes {
  name: string;
  description?: string | null;
  logo: string;
}

export interface ServiceTab {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string; // HTML content as string
  icon: string;
  alt_icon: string | null;
  status: boolean;
  order: number;
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
  meta_title: string;
  meta_description: string | null;
  index: number;
  tabs: ServiceTab[];
}

export interface ServicesResponse {
  services: Service[];
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
  meta_title: string;
  meta_description: string | null;
  index: number;
  tabs: ServiceTab[];
  sub_services?: SubService[];
}

export interface ServiceTab {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  icon: string;
  alt_icon: string | null;
  status: boolean;
  order: number;
  image: string;
}

export interface ProjectTypes {
  name: string;
  order: number;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string;
  icon: string;
  alt_icon: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  index: number;
}

export interface BenefitTypes {
  title: string;
  order: number;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image?: string | null;
  icon: string;
  alt_icon?: string | null;
}

export interface AchievementTypes {
  title: string;
  number: string;
  text: string;
}

export interface BlogTypes {
  name: string;
  date?: string;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image?: string | null;
  slug: string;
  meta_title: string;
  meta_description?: string | null;
  index: number;
}

export interface ContactSectionTypes {
  title: string;
  second_title?: string | null;
  short_desc?: string | null;
  long_desc?: string | null;
  image: string;
  alt_image?: string | null;
}

export interface ContactDataTypes {
  email: string;
  phone: string;
  address: string;
}

export interface SocialMediaTypes {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  snapchat?: string;
  whatsapp?: string;
}

export interface PartnerTypes {
  name: string;
  logo: string;
  alt_logo?: string | null;
  description?: string | null;
}

export interface SEOTypes {
  meta_tags: MetaTags;
  open_graph: OpenGraph;
  twitter_card: TwitterCard;
  hreflang_tags: HreflangTags;
  schema: Schema[];
}

export interface MetaTags {
  content_type: string;
  title: string;
  author: string;
  description: string;
  canonical: string;
  robots: string;
}

export interface OpenGraph {
  "og:title": string;
  "og:description": string;
  "og:url": string;
  "og:image": string;
  "og:type": string;
}

export interface TwitterCard {
  "twitter:card": string;
  "twitter:title": string;
  "twitter:description": string;
  "twitter:image": string;
}

export interface HreflangTags {
  en: string;
  ar: string;
  "x-default": string;
}

// Base schema
export interface BaseSchema {
  "@context": string;
  "@type": string;
}

// WebSite
export interface WebSiteSchema extends BaseSchema {
  "@type": "WebSite";
  name: string;
  url: string;
}

// Contact Point
export interface ContactPoint {
  "@type": "ContactPoint";
  contactType: string;
  telephone: string;
  email: string;
}

// Organization
export interface OrganizationSchema extends BaseSchema {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  contactPoint: ContactPoint;
}

// WebPage
export interface WebPageSchema extends BaseSchema {
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  isPartOf: {
    "@type": "WebSite";
    "@id": string;
  };
}

// Breadcrumb List Item
export interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

// BreadcrumbList
export interface BreadcrumbListSchema extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

// Union type for all schemas
export type Schema =
  | WebSiteSchema
  | OrganizationSchema
  | WebPageSchema
  | BreadcrumbListSchema;

export interface CategoryResponse {
  data: {
    categories: {
      id: number;
      name: string;
      order: number | null;
      short_desc: string | null;
      long_desc: string | null;
      image: string;
      alt_image: string | null;
      icon: string;
      alt_icon: string | null;
      slug: string;
      meta_title: string | null;
      meta_description: string | null;
      index: number;
      projects: {
        id: number;
        name: string;
        order: number;
        short_desc: string;
        long_desc: string;
        image: string;
        alt_image: string;
        icon: string;
        alt_icon: string;
        slug: string;
        meta_title: string | null;
        meta_description: string | null;
        index: number;
        project_link: null | string;
      }[];
    }[];
    seo: {
      meta: {
        meta_tags: {
          content_type: string;
          title: string;
          author: string;
          description: string;
          canonical: string;
          robots: string;
        };
        open_graph: {
          "og:title": string;
          "og:description": string;
          "og:url": string;
          "og:image": string;
          "og:type": string;
        };
        twitter_card: {
          "twitter:card": string;
          "twitter:title": string;
          "twitter:description": string;
          "twitter:image": string;
        };
        hreflang_tags: {
          en: string;
          ar: string;
          "x-default": string;
        };
      };
      schema: {
        "@context": string;
        "@type": string;
        name: string;
        url: string;
      }[];
    };
  };
}

export interface BlogDetailsResponse {
  data: {
    blog: {
      id: number;
      name: string;
      date: string;
      order: number;
      short_desc: string;
      long_desc: string;
      image: string;
      alt_image: string | null;
      icon: string;
      alt_icon: string | null;
      slug: string;
      slugs: {
        en: string;
        ar: string;
      };
      meta_title: string;
      meta_description: string;
      index: number;
      category_id: number | null;
      author_id: number | null;
    };
    seo: {
      meta: {
        meta_tags: {
          content_type: string;
          title: string;
          description: string;
          canonical: string;
          robots: string;
        };
        open_graph: {
          "og:title": string;
          "og:description": string;
          "og:url": string;
          "og:image": string;
          "og:type": string;
        };
        twitter_card: {
          "twitter:card": string;
          "twitter:title": string;
          "twitter:description": string;
          "twitter:image": string;
        };
        hreflang_tags: {
          en: string;
          ar: string;
          "x-default": string;
        };
      };
      schema: Array<{
        "@context": string;
        "@type": string;
        name?: string;
        url: string;
        headline?: string;
        description?: string;
        image?: string;
        datePublished?: string;
      }>;
    };
  };
}

export interface BlogsListResponse {
  data: BlogItem[];
  links: PaginationLinks;
  meta: PaginationMeta;
  seo: SEOBlogsData;
}

export interface BlogItem {
  id: number;
  name: string;
  date: string;
  order: number;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  slug: string;
  meta_title: string;
  meta_description: string;
  index: number;
  category_id: number | null;
  author_id: number | null;
  author: unknown | null; // Use a proper type if author data is expected later
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface SEOBlogsData {
  meta: {
    meta_tags: {
      content_type: string;
      title: string;
      author: string;
      description: string;
      canonical: string;
      robots: string;
    };
    open_graph: {
      "og:title": string;
      "og:description": string;
      "og:url": string;
      "og:image": string;
      "og:type": string;
    };
    twitter_card: {
      "twitter:card": string;
      "twitter:title": string;
      "twitter:description": string;
      "twitter:image": string;
    };
    hreflang_tags: {
      en: string;
      ar: string;
      "x-default": string;
    };
  };
  schema: Array<{
    "@context": string;
    "@type": string;
    name?: string;
    url: string;
  }>;
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

export interface Section {
  key: string;
  title: string;
  second_title: string;
  short_desc: string | null;
  long_desc: string | null;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  status: 0 | 1;
}

export interface SectionsResponse {
  sections: Section[];
}

export type SectionsByKey = Record<string, Section>;
