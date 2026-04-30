export interface ContactPageData {
  data: {
    contact_section: ContactSection;
    contact_data: ContactData;
    branch_locations: BranchLocation[];
    seo: Seo;
  };
}

export interface ContactSection {
  title: string;
  second_title: string;
  short_desc: string | null;
  long_desc: string | null;
  image: string;
  alt_image: string | null;
}

export interface ContactData {
  email: string;
  phone: string;
  address: string;
}

interface Office {
  name: string;
  address: string;
  phone: string;
  code_1?: string;
  code_2?: string;
  email: string | null;
  map_url: string | null;
  map_link: string | null;
}

export interface BranchLocation {
  country: string;
  flag: string;
  offices: Office[];
}

export interface Seo {
  meta: Meta;
  schema: Schema[];
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

export interface Schema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
}
