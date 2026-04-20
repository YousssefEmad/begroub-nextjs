"use client";
import { motion } from "motion/react";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { useTranslations } from "next-intl";
import { ClientTypes, Section } from "@/types/apiDataTypes";
import ModernTextEffect from "@/components/ModernTextEffect";

type LogoCarouselProps = {
  clients: ClientTypes[];
  locale?: "ar" | "en" | string;
  delayMs?: number;
  className?: string;
  pauseOnHover?: boolean;
  section: Section;
};

export default function LogoCarousel({
  clients,
  section,
  locale = typeof window !== "undefined"
    ? document.documentElement.lang || "en"
    : "en",
  delayMs = 2500,
  className = "",
  pauseOnHover = true,
}: LogoCarouselProps) {
  const isRTL = locale?.toLowerCase().startsWith("ar");
  // const t = useTranslations("clients");

  const autoplay = React.useRef(
    Autoplay({
      delay: delayMs,
      stopOnInteraction: false,
      stopOnMouseEnter: pauseOnHover,
      playOnInit: true,
    })
  );

  React.useEffect(() => {
    autoplay.current.options.delay = delayMs;
    autoplay.current.options.stopOnMouseEnter = pauseOnHover;
  }, [delayMs, pauseOnHover]);

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className={className}>
      <div className="w-full flex justify-center items-center flex-col text-main-white gap-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="uppercase py-3 px-4 border rounded-full text-main-primary"
        >
          <ModernTextEffect
            text={section.title}
            lang={locale}
            className="uppercase text-main-primary"
            animationType={locale === "ar" ? "wordWave" : "particle"}
            delay={0.1}
          />
        </motion.div>
        <ModernTextEffect
          text={section.second_title}
          lang={locale}
          className="text-4xl md:text-7xl font-bold text-center !mt-0"
          animationType={locale === "ar" ? "wordWave" : "particle"}
          delay={0.1}
          fontStyle={"capitalize"}
        />
      </div>

      <Carousel
        opts={{
          align: "center",
          containScroll: "trimSnaps",
          loop: true,
          direction: isRTL ? "rtl" : "ltr",
          dragFree: false,
          skipSnaps: false,
        }}
        plugins={[autoplay.current]}
        className="w-full"
      >
        <CarouselContent className="ms-0 gap-2 [&>div]:ps-0">
          {clients?.map((client) => (
            <CarouselItem
              key={`${client.name}`}
              className="ps-0 basis-[55%] md:basis-[30%] lg:basis-[25%] xl:basis-[18%] 2xl:basis-[12%]"
            >
              <div className="flex min-h-[15rem] w-full items-center justify-center">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center w-full">
                    <div className="relative flex items-center justify-center w-full hover:-translate-y-3 transition-transform">
                      <img       
                        src={client.logo}
                        alt={"Logo"}
                        width={250}
                        height={250} // Make sure height equals width for circular effect
                        className="h-[300px] w-[300px] object-cover rounded-full relative z-10" // Ensure it's a circle
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent rounded-full border-t-[3px] border-main-primary" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
