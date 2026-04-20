import { locales } from "@/navigations";
import { unstable_setRequestLocale } from "next-intl/server";
import CareersPage from "./CareersPage";
import { fetchCareerData } from "@/api/careerSerivce";

export function generateStaticParams() {
  return locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === "ar" ? "الوظائف | بي جروب" : "Careers | Be Group";
  const description = locale === "ar" 
    ? "انضم إلى فريقنا المبدع والمبتكر. استكشف الفرص الوظيفية المتاحة في بي جروب." 
    : "Join our creative and innovative team. Explore career opportunities at Be Group.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const careerData = await fetchCareerData(locale)
  const seo = careerData?.data?.seo;

  return (
    <>
      {seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      )}
      <CareersPage careerData={careerData} />
    </>
  );
}
