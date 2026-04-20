import About from "@/components/about/About";
import OurBlogs from "@/components/blogs/OurBlogs";
import Hero from "@/components/hero/Hero";
import Portfolio from "@/components/our-work/OurWork";

import ContactUs from "@/components/conatct/ContactUs";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import Services from "@/components/services/Services";
import ClientsSection from "@/components/our clients/page";
import AchievementSection from "@/components/achievements/AchievementSection";
import { fetchHomeData } from "@/api/homeService";
import { fetchProjectsData } from "@/api/projectsService";
import { Metadata } from "next";
import { Section, SectionsByKey } from "@/types/apiDataTypes";
import { unstable_setRequestLocale } from "next-intl/server";
import { fetchContactData } from "@/api/contactService";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const homeApiData = await fetchHomeData(params.locale);
  const { seo } = homeApiData;

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

export default async function Home({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const homeData = await fetchHomeData(params.locale);
  const contactUsData = await fetchContactData(params.locale);

  function mapSectionsByKey(sections: Section[]): SectionsByKey {
    return sections.reduce<SectionsByKey>((acc, section) => {
      acc[section.key] = section;
      return acc;
    }, {});
  }

  const {
    banner,
    about,
    clients,
    services,
    benefits,
    achievements,
    blogs,
    contact_section,
    contact_data,
    sections,
    seo,
  } = homeData;

  const sectionsByKey = mapSectionsByKey(sections);

  const projectsApiData = await fetchProjectsData(params.locale);

  return (
    <div className="relative overflow-hidden">
      {seo.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <Hero
        banner={banner}
      // section={sectionsByKey.banner}
      />

      <About aboutData={about} />

      <Services servicesData={services} section={sectionsByKey.services} />

      <ClientsSection clients={clients} section={sectionsByKey.clients} />

      <Portfolio
        projectsData={projectsApiData}
        section={sectionsByKey.projects}
      />

      <WhyChooseUs
        benefitsData={benefits}
        section={sectionsByKey.why_choose_us}
      />

      <AchievementSection
        achievementsData={achievements}
        section={sectionsByKey.achievements}
      />

      <OurBlogs blogsData={blogs} section={sectionsByKey.blogs} />

      <ContactUs
        contactData={contact_data}
        contactSection={contact_section}
        servicesData={services}
        branchLocations={contactUsData.data.branch_locations}
      // section={sectionsByKey.contact_section}
      />
    </div>
  );
}
