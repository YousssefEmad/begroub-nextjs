"use client";
import SplitText from "@/components/SplitText";
import SelectedWork from "./SelectedWork";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CategoryResponse } from "@/types/apiDataTypes";

export default function ProjectsPage({
  projectsApiData,
}: {
  projectsApiData: CategoryResponse;
}) {
  const locale = useLocale();
  const t = useTranslations("portfolio");
  return (
    <div className="w-full min-h-screen bg-main-black text-main-white flex flex-col items-center border-b border-white/10">
      <div className="w-full bg-main-black text-main-primary flex flex-col items-center justify-end xl:justify-center py-6 xl:py-0 h-[140px] sm:h-[180px] lg:h-[220px] xl:h-[50vh]">
        {locale === "en" ? (
          <SplitText
            text={t("Selected Work")}
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
            {t("Selected Work")}
          </motion.h1>
        )}
      </div>

      <SelectedWork projectsApiData={projectsApiData} />

      <div className="w-full bg-main-black2 min-h-[60vh] flex justify-center items-center border-t border-white/10 px-4 py-6">
        <div className="mx-auto container flex justify-center items-center gap-6 sm:gap-8 xl:gap-12 flex-col xl:flex-row">
          {/* Left column */}
          <div className="flex flex-col gap-12 text-start w-full xl:w-1/2">
            <h2
              className={`text-5xl xl:text-7xl ${
                locale === "ar" && "!leading-[1.2]"
              }`}
            >
              {t("Creativity meets")} <br /> {t("technology here")}
            </h2>

            <Link href={"contact"}>
              <Button
                className="uppercase bg-main-primary text-main-text hover:bg-white/90 p-6 !rounded-[4px] cursor-target"
                variant="default"
              >
                {t("Start A Project")}
              </Button>
            </Link>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8 text-start w-full xl:w-1/2">
            <p className="text-lg text-white/80 leading-relaxed">
              {t(
                "Every project we deliver is built on the perfect balance between bold creativity and cutting-edge technology From strategy to execution, our team transforms ideas into digital experiences that inspire, engage, and perform Whether it’s redefining a brand, designing seamless user journeys, or building scalable platforms",
              )}
            </p>

            <div className="grid grid-cols-2 gap-8 items-start">
              <span className="flex items-center gap-3">
                <span className="flex justify-center items-center w-6 h-6 rounded-full bg-white">
                  <Check className="text-black w-4 h-4" strokeWidth={3} />
                </span>
                {t("Agency Website")}
              </span>
              <span className="flex items-center gap-3">
                <span className="flex justify-center items-center w-6 h-6 rounded-full bg-white">
                  <Check className="text-black w-4 h-4" strokeWidth={3} />
                </span>
                {t("Landing Page")}
              </span>
              <span className="flex items-center gap-3">
                <span className="flex justify-center items-center w-6 h-6 rounded-full bg-white">
                  <Check className="text-black w-4 h-4" strokeWidth={3} />
                </span>
                {t("E-Commerce")}
              </span>
              <span className="flex items-center gap-3">
                <span className="flex justify-center items-center w-6 h-6 rounded-full bg-white">
                  <Check className="text-black w-4 h-4" strokeWidth={3} />
                </span>
                {t("Dashboard")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
