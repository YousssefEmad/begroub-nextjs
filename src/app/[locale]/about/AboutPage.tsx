"use client";

import About from "@/components/about/About";
import SplitText from "@/components/SplitText";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";  
import { AboutResponse } from "@/types/aboutApiTypes";
import { AchievementTypes, Section } from "@/types/apiDataTypes";

export default function AboutPage({
  aboutData,
  achievementsData = [],
  achievementsSection,
}: {
  aboutData?: AboutResponse;
  achievementsData?: AchievementTypes[];
  achievementsSection?: Section;
}) {
  const locale = useLocale();
  const t = useTranslations("about");

  // Access nested data safely
  const about = aboutData?.data?.about ?? {
    title: "",
    title2: "",
    short_desc: "",
    text: "",
    image: "",
    alt_image: "",
    banner: "",
    alt_banner: "",
    banner2: "",
    alt_banner2: "",
  };

  const aboutStructs = aboutData?.data?.about_structs ?? [];

  return (
    <div className="flex flex-col bg-main-black">
      {/* Hero Section */}
      {/* <div className="w-full bg-main-black text-main-primary flex flex-col items-center justify-end xl:justify-center py-6 xl:py-0 h-[140px] sm:h-[180px] lg:h-[220px] xl:h-[40vh]">
        {locale === "en" ? (
          <SplitText
            text={about.title || t("About Be Group")}
            tag="h1"
            className="font-extrabold leading-[1.2] text-[clamp(44px,10vw,128px)] relative"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            initialHidden={true}
          />
        ) : (
          <motion.h1
            dir="rtl"
            className="font-extrabold text-[clamp(44px,10vw,128px)] relative bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {about.title || t("About Be Group")}
          </motion.h1>
        )}
      </div> */}

      {/* About Section */}
      <div className="py-20">
        {aboutStructs.length > 0 ? (
          <About
            aboutArray={aboutStructs.map((item) => ({
              id: item.order,
              title: item.title,
              desc: item.text,
              icon: item.icon,
              alt_icon: item.alt_icon,
            }))}
            aboutData={about}
            achievementsData={achievementsData}
            achievementsSection={achievementsSection}
          />
        ) : (
          <p className="text-center text-white py-10">{t("Loading...")}</p>
        )}
      </div>
    </div>
  );
}
