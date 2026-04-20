"use client";

import { useMemo, useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Link } from "@/navigations";
import {
  ServicesResponse,
  Service,
  ServiceTab,
  Section,
} from "@/types/apiDataTypes";
import Image from "next/image";
import ModernTextEffect from "../ModernTextEffect";

export default function Services({
  servicesData,
  section,
}: {
  servicesData: Service[] | ServicesResponse | ServicesResponse[];
  section: Section;
}) {
  
  const locale = useLocale();
  const t = useTranslations("services");
  const isRTL = locale === "ar";

  const services: Service[] = useMemo(() => {
    if (!servicesData) return [];

    // If it's an array
    if (Array.isArray(servicesData)) {
      if (servicesData.length === 0) return [];

      // Check if first item has a 'services' property (ServicesResponse[])
      if ("services" in servicesData[0]) {
        const data = servicesData[0] as ServicesResponse;
        return [...data.services].sort((a, b) => a.order - b.order);
      }

      // Otherwise it's Service[] directly
      return [...(servicesData as Service[])].sort((a, b) => a.order - b.order);
    }

    // If it's a single ServicesResponse object
    if ("services" in servicesData) {
      return [...(servicesData as ServicesResponse).services].sort(
        (a, b) => a.order - b.order
      );
    }

    return [];
  }, [servicesData]);

  const windowSize =
    typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 5;
  const maxStart = services.length - windowSize;

  const [start, setStart] = useState(0);
  const [active, setActive] = useState(0);

  const move = useCallback(
    (dir: -1 | 1) => {
      const newStart = start + dir;
      if (newStart >= 0 && newStart <= maxStart) {
        setStart(newStart);
      }
    },
    [start, maxStart]
  );

  const select = useCallback(
    (i: number) => {
      setActive(i);
      setStart((prevStart) => {
        if (i < prevStart) return i;
        if (i > prevStart + windowSize - 1) return i - windowSize + 1;
        return prevStart;
      });
    },
    [windowSize]
  );

  const shiftPct = (isRTL ? start : -start) * (100 / windowSize);

  if (!services.length) return null;

  const activeService = services[active];

  // Render tabs content with icons
  const renderTabsContent = (tabs: ServiceTab[]) => {
    if (!tabs || tabs.length === 0) return null;

    const sortedTabs = [...tabs]
      .sort((a, b) => a.order - b.order)
      .filter((tab) => tab.status);

    return (
      <div className="mt-8">
        <div
          className={`grid ${
            sortedTabs.length <= 2
              ? "md:grid-cols-2 max-w-lg"
              : sortedTabs.length === 3
              ? "md:grid-cols-3 max-w-3xl"
              : "grid-cols-1 md:grid-cols-3 max-w-3xl"
          } gap-4 mx-auto`}
        >
          {sortedTabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <Image
                  width={32}
                  height={32}
                  src={tab.image}
                  alt={tab.name}
                  className="max-w-full max-h-full object-contain"
                />
                <span className="text-sm font-medium">{tab.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full min-h-fit xl:min-h-screen bg-main-black text-main-white py-8 xl:py-20 border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="uppercase py-3 px-4 border rounded-full w-fit mx-auto text-main-primary"
          >
            <ModernTextEffect
              text={section.title}
              lang={locale}
              animationType={locale === "ar" ? "wordWave" : "particle"}
              delay={0.1}
              fontStyle={"uppercase"}
            />
          </motion.div>

          <ModernTextEffect
            text={section.second_title}
            lang={locale}
            animationType={locale === "ar" ? "wordWave" : "particle"}
            delay={0.1}
            fontStyle={"capitalize"}
            className={`text-4xl md:text-7xl lg:max-w-[80%] xl:max-w-[65%] font-bold text-center capitalize mx-auto ${
              locale === "ar" && "!leading-[1.2]"
            }`}
          />
        </div>

        {/* Carousel */}
        <motion.div
  className="relative"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  {/* arrows */}
  <button
    aria-label="Previous"
    onClick={() => move(isRTL ? 1 : -1)}
    className={`absolute left-2 md:left-4 xl:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full border w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${
      start === (isRTL ? maxStart : 0)
        ? "border-gray-600 bg-gray-800/60 cursor-not-allowed opacity-50"
        : "border-main-primary bg-black/70 hover:bg-main-primary hover:scale-110 cursor-pointer"
    }`}
    disabled={start === (isRTL ? maxStart : 0)}
  >
    <ChevronLeft
      className={`w-6 h-6 ${
        start === (isRTL ? maxStart : 0)
          ? "text-gray-500"
          : "text-white"
      }`}
    />
  </button>

  <button
    aria-label="Next"
    onClick={() => move(isRTL ? -1 : 1)}
    className={`absolute right-2 md:right-4 xl:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full border w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${
      start === (isRTL ? 0 : maxStart)
        ? "border-gray-600 bg-gray-800/60 cursor-not-allowed opacity-50"
        : "border-main-primary bg-black/70 hover:bg-main-primary hover:scale-110 cursor-pointer"
    }`}
    disabled={start === (isRTL ? 0 : maxStart)}
  >
    <ChevronRight
      className={`w-6 h-6 ${
        start === (isRTL ? 0 : maxStart)
          ? "text-gray-500"
          : "text-white"
      }`}
    />
  </button>

  {/* track */}
  <div className="overflow-hidden border-b border-white/10 px-14">
    <div
      className="flex transition-transform duration-500"
      style={{
        transform: `translateX(${shiftPct}%)`,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {services.map((s, i) => {
        const activeItem = i === active;
        return (
          <button
            key={s.id}
            onClick={() => select(i)}
            className="group basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5 shrink-0 px-4 pt-6 pb-4 text-center relative focus:outline-none flex items-center justify-center"
            dir={locale === "en" ? "ltr" : "rtl"}
          >
            <div
              className={`text-sm md:text-base font-medium transition-all duration-300 ${
                activeItem
                  ? "text-white opacity-100"
                  : "text-gray-400 opacity-70 group-hover:text-white group-hover:opacity-100"
              }`}
            >
              {s.name}
            </div>

            {/* underline */}
            <span
              className={`pointer-events-none absolute bottom-0 left-0 h-[2px] w-full transition-all duration-300 ${
                activeItem
                  ? "bg-main-primary"
                  : "bg-transparent group-hover:bg-white/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  </div>
</motion.div>

        {/* Content panel */}
        <motion.div
          className="mt-12 flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* icon + heading */}
          <motion.div
            className="mb-0"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-col items-center gap-4">
              <motion.span
                className="inline-flex h-[300px] w-full lg:w-[600px] items-center justify-center border border-[2px] rounded-[12px] border-none bg-main-primary/10"
                //border-main-secondary
                // whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={activeService.image!}
                  alt={activeService.alt_icon || "icon"}
                  className="h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.span>

              <div>
                <motion.h3
                  className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent !leading-[1.5]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {activeService.name}
                </motion.h3>

                <motion.p
                  className="text-base text-main-primary/80 mt-2 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {activeService.short_desc}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* body */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-6"
              >
                <motion.div
                  className="prose prose-invert prose-lg max-w-none mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div
                    className="text-lg leading-relaxed opacity-95 font-medium"
                    dangerouslySetInnerHTML={{
                      __html: activeService.long_desc,
                    }}
                  />

                  {renderTabsContent(activeService.tabs)}
                </motion.div>

                {/* Enhanced call-to-action area */}
                <motion.div
                  className="flex items-center justify-center gap-3 pt-6 border-t border-white/10 max-w-full mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link
                    href={
                      activeService.sub_services &&
                      activeService.sub_services.length > 0
                        ? `/services-family/${activeService.slug}`
                        : `/services/${activeService.slug}`
                    }
                    className="w-full"
                  >
                    <Button
                      className="uppercase bg-main-primary text-main-text hover:bg-main-secondary p-6 !rounded-[4px] w-full sm:w-[20%] cursor-target"
                      variant="default"
                    >
                      {t("More Details")}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
