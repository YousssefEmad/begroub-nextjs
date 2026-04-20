"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { CategoryResponse } from "@/types/apiDataTypes";
import { Link } from "@/navigations";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionVar: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeOut },
  },
};

const controlsContainerVar: Variants = {
  hidden: (isRTL: boolean) => ({
    opacity: 0,
    x: isRTL ? -24 : 24,
    y: 12,
    rotate: isRTL ? -1.5 : 1.5,
    scale: 0.98,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const controlsItemVar: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
};

type Props = {
  projectsData: CategoryResponse;
  className?: string;
};

export default function CarouselComponent({ projectsData, className }: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
      variants={sectionVar}
      className={`w-full bg-main-black2 py-6 px-4 sm:px-6 ${className ?? ""}`}
    >
      <Carousel
        className="w-full flex flex-col"
        opts={{
          slidesToScroll: 1,
          align: "start",
          containScroll: "trimSnaps",
          loop: false,
          dragFree: false,
          skipSnaps: false,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* logical start margin so two full cards are visible with 40% width */}
        <CarouselContent className="-ms-4">
          {projectsData.data.categories
            .flatMap((category) => category.projects)
            .map((project, index) => (
              <CarouselItem
                key={project.index}
                className={[
                  "ps-4", // gap between cards (logical start)
                  "basis-full", // sm & below: 1 card
                  "md:basis-[40%]", // md–lg: ~2.5 cards
                  "xl:basis-[30%] cursor-target", // xl+: ~3.5 cards
                ].join(" ")}
              >
                {/* group enables hover effects on children */}
                {project.project_link && (
                <Link href={project.project_link} target="_blank">
                  <Card className="group h-full rounded-[4px] border-none overflow-hidden bg-transparent cursor-pointer">
                    <CardContent className="p-0 flex flex-col">
                      {/* Image (full-width) with hover scale */}
                      <div className="relative w-full overflow-hidden rounded-[4px]">
                        {/* slightly shorter aspect */}
                        <div className="relative w-full aspect-[16/10]">
                          <Image
                            src={project.image}
                            alt={project.name || `Card ${index + 1}`}
                            fill
                            className="object-fill transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                            sizes="(min-width:1280px) 40vw, (min-width:768px) 40vw, 100vw"
                            priority={index < 2}
                          />
                        </div>
                      </div>

                      {/* Text slides smoothly on card hover (dir-aware) */}
                      <div
                        className={`py-4 flex flex-col gap-2 mt-2 transform transition-transform duration-500 ease-out ${
                          locale === "en"
                            ? "group-hover:translate-x-3"
                            : "group-hover:-translate-x-3"
                        }`}
                      >
                        <h3 className="text-white text-base sm:text-xl font-semibold leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2">
                          {project.short_desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                )}
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* Controls BELOW (inside Carousel for context) */}
        <motion.div
          custom={isRTL}
          variants={controlsContainerVar}
          className={`sm:h-20 flex items-center gap-4 sm:me-20 xl:me-40 justify-end`}
        >
          <motion.div
            variants={controlsItemVar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CarouselPrevious className="static translate-y-0 top-auto left-auto cursor-target" />
          </motion.div>
          <motion.div
            variants={controlsItemVar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CarouselNext className="static translate-y-0 top-auto right-auto cursor-target" />
          </motion.div>
        </motion.div>
      </Carousel>
    </motion.section>
  );
}
