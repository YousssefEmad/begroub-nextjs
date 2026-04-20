"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import TiltedCard from "@/components/TittedCard";
import SplitText from "@/components/SplitText";
import { Link } from "@/navigations";
import { useLocale, useTranslations } from "next-intl";
import { ServicesApiResponse } from "@/types/servicesApiTypes";

export default function ServicesPage({
  ServicesApiData,
}: {
  ServicesApiData: ServicesApiResponse;
}) {
  const locale = useLocale();
  const t = useTranslations("services");

  // scroll-motion variants
  const easeOut = [0.22, 1, 0.36, 1] as const;
  const listVar = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
      },
    }),
    []
  );
  const itemVar = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24, scale: 0.98 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: easeOut },
      },
    }),
    []
  );

  const CARDS = useMemo(
    () =>
      ServicesApiData.data.services.map((service) => {
        const localizedSlug =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((service as any)?.slugs?.[locale as "en" | "ar"]) ?? service.slug;

        return {
          id: service.id,
          title: service.name,
          blurb: service.short_desc,
          image: service.image,
          icon: service.image,
          slug: localizedSlug,
          sub_services: service.sub_services,
        };
      }),
    [ServicesApiData, locale]
  );

  return (
    <section className="min-h-screen bg-main-black2 text-main-white flex flex-col items-center">
      <div className="w-full bg-main-black text-main-primary flex flex-col items-center justify-end xl:justify-center py-6 xl:py-0 h-[140px] sm:h-[180px] lg:h-[220px] xl:h-[50vh]">
        {locale === "en" ? (
          <SplitText
            text={t("Our Services")}
            tag="h1"
            className="font-extrabold leading-[1.2] text-[clamp(44px,10vw,128px)] relative"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="center"
            initialHidden
          />
        ) : (
          <motion.h1
            dir="rtl"
            className="font-extrabold text-[clamp(44px,10vw,128px)] relative bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t("Our Services")}
          </motion.h1>
        )}
      </div>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-10 pb-12"
        variants={listVar}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {CARDS.map(({ id, title, icon, slug, sub_services }) => (
          <motion.div key={id} variants={itemVar}>
            <Link
              href={
                sub_services && sub_services.length > 0
                  ? `/services-family/${slug}`
                  : `/services/${slug}`
              }
            >
              <TiltedCard
                altText={title}
                containerHeight="320px"
                containerWidth="320px"
                imageHeight="320px"
                imageWidth="320px"
                rotateAmplitude={12}
                scaleOnHover={1.12}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent
                overlayContent={
                  <div className="relative h-[320px] w-[320px] rounded-[15px] overflow-hidden">
                    <img
                      src={icon}
                      alt={title}
                      className="absolute inset-0 h-full w-full object-cover rounded-[15px]"
                    />

                    <div className="relative z-10 h-full w-full rounded-[15px] border-[2px] border-main-secondary flex flex-col items-center pt-6 justify-start gap-4 text-center">
                      <div className="flex flex-col items-center gap-2"></div>

                      <div className="text-base uppercase w-full tracking-wide text-main-primary mt-auto mb-5 bg-black/85 p-2">
                        {title}
                      </div>
                    </div>
                  </div>
                }
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
