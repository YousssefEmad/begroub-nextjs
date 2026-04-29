"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, usePathname } from "@/navigations";
import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type {
  AboutType,
  AchievementTypes,
  Section,
} from "@/types/apiDataTypes";
// import ModernTextEffect from "../ModernTextEffect";

export default function About({
  aboutArray,
  aboutData,
  achievementsData = [],
  achievementsSection,
}: {
  aboutArray?: { id: number; title: string; desc: string }[];
  aboutData?: AboutType;
  achievementsData?: AchievementTypes[];
  achievementsSection?: Section;
}) {
  const t = useTranslations("about");
  const locale = useLocale();
  const pathname = usePathname();
  const isAboutPage = pathname.includes("about");
  const [openId, setOpenId] = useState<number | null>(null);
  const isRtl = locale === "ar";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full bg-main-black text-main-white overflow-hidden pb-6 border-b border-white/10"
    >
      {/* --- Modern Hero Section --- */}
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 py-20 lg:py-32">
        <div className="container mx-auto grid lg:grid-cols-2 gap-6 items-center px-6">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:gap-8 z-10"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 border border-main-primary/30 rounded-full bg-main-primary/5 text-main-primary text-sm font-bold uppercase tracking-widest"
              >
                {aboutData?.title}
              </motion.div>

              <h2 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                {aboutData?.title2}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-4xl font-semibold text-main-primary">
                {t("Digital Services has never been easier")}
              </h3>
              <div
                className="text-white/70 leading-relaxed text-sm md:text-base lg:text-2xl max-w-xl text-justify font-inter"
                dangerouslySetInnerHTML={{ __html: aboutData?.text ?? "" }}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Link href={isAboutPage ? "/services" : "/about"}>
                <Button className="group relative overflow-hidden bg-main-primary cursor-target text-main-black hover:bg-white w-full sm:w-[90%] lg:w-[80%] px-8 py-7 rounded-none font-bold uppercase tracking-tighter transition-all duration-500">
                  <span className="relative z-10 text-lg font-medium">
                    {isAboutPage ? t("View Services") : t("Learn More")}
                  </span>
                  {/* <div className="absolute inset-0 bg-main-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" /> */}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <div className="relative h-[400px] md:h-[600px] xl:h-[700px] w-full mt-12 lg:mt-0 lg:ms-10 2xl:ms-0">
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 right-0 lg:right-10 w-full h-full z-10 rounded-2xl overflow-hidden transition-all duration-700"
            >
              <Image
                src={aboutData?.image ?? ""}
                alt={aboutData?.alt_image ?? "about image"}
                fill
                className="object-contian"
              />
            </motion.div>

            {/* <motion.div
              style={{ y: y2 }}
              className={`absolute ${isAboutPage ? "-bottom-8" : "bottom-0 lg:-bottom-6 xl:bottom-8 2xl:bottom-0"} -left-10 lg:-left-16
               xl:-left-8 w-[75%] h-[75%] sm:w-[60%] sm:h-[60%] lg:w-[70%] lg:h-[70%] xl:w-[58%] xl:h-[58%] 2xl:w-[55%] 2xl:h-[55%] z-20 overflow-hidden`}
            >
              <Image
                src={aboutData?.banner ?? ""}
                alt={aboutData?.alt_banner ?? "about banner"}
                fill
                className="object-cover"
              />
            </motion.div> */}

            {/* <div
              className={`absolute ${isAboutPage ? "bottom-5 -right-4" : "bottom-10 -right-2"} bottom-10 lg:bottom-0 lg:right-0 w-32 h-32 border-r-2 border-b-2 border-main-primary/30`}
            />
            <div
              className={`absolute ${isAboutPage ? "-top-6" : "-top-14"} lg:-top-10 left-0 lg:-left-10 w-32 h-32 border-l-2 border-t-2 border-main-primary/30`}
            /> */}
          </div>
        </div>
      </div>

      {/* --- REDESIGNED: Thread-Connected Achievement Section --- */}
      {achievementsData.length > 0 && (
        <div className="w-full py-6 bg-main-black relative overflow-hidden px-6">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-main-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-main-primary/30 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-main-primary/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center mb-24 lg:mb-36 text-center"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-px w-20 bg-main-primary mb-6"
              />
              <span className="text-main-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">
                {achievementsSection?.title || "Statistics"}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                {achievementsSection?.second_title ||
                  "Our achievements in numbers"}
              </h2>
            </motion.div>

            {/* Thread-Connected Layout */}
            <div className="relative">
              {/* Central Spine Line (desktop) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-b from-transparent via-main-primary/40 to-transparent origin-top"
                />
              </div>

              {/* Achievement Nodes */}
              <div className="flex flex-col gap-0">
                {achievementsData.map((item, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: idx * 0.1 }}
                      className={`relative flex items-center w-full ${
                        isEven ? "lg:justify-start" : "lg:justify-end"
                      } justify-center`}
                    >
                      {/* The Card — takes up ~45% width on desktop */}
                      <div
                        className={`relative w-full lg:w-[45%] group ${
                          isEven ? "lg:pe-16" : "lg:ps-16"
                        } py-6`}
                      >
                        {/* Horizontal thread connecting card to spine */}
                        <div
                          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-16 bg-gradient-to-r ${
                            isEven
                              ? "right-0 from-main-primary/60 to-transparent"
                              : "left-0 from-transparent to-main-primary/60"
                          }`}
                        />

                        {/* Node dot on the spine */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: idx * 0.1 + 0.4,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${
                            isEven
                              ? "right-0 translate-x-1/2"
                              : "left-0 -translate-x-1/2"
                          } w-4 h-4 z-20`}
                          style={{ [isEven ? "right" : "left"]: "-2rem" }}
                        >
                          <span className="block w-4 h-4 rounded-full bg-main-primary shadow-[0_0_16px_4px_var(--color-main-primary,#f0a500)] animate-pulse" />
                        </motion.div>

                        {/* Card Body */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 xl:p-10 transition-all duration-500 group-hover:border-main-primary/40 group-hover:bg-white/[0.06]">
                          {/* Corner accent */}
                          <div
                            className={`absolute top-0 ${isEven ? "right-0" : "left-0"} w-20 h-20 bg-main-primary/10 blur-2xl rounded-full pointer-events-none`}
                          />

                          {/* Ghost index number */}
                          <span className="absolute bottom-2 right-4 text-[80px] font-black text-white/[0.04] leading-none select-none pointer-events-none italic">
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <div className="relative z-10 flex items-start gap-6">
                            {/* Stat Bubble */}
                            <div className="flex-shrink-0">
                              <div className="relative w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
                                {/* Rotating ring */}
                                <svg
                                  className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite] opacity-40"
                                  viewBox="0 0 100 100"
                                >
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="46"
                                    fill="none"
                                    stroke="url(#grad)"
                                    strokeWidth="1.5"
                                    strokeDasharray="12 8"
                                    strokeLinecap="round"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="grad"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="100%"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="var(--color-main-primary, #f0a500)"
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="transparent"
                                      />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                {/* Solid inner ring */}
                                <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full border border-main-primary/30 bg-main-primary/5 flex items-center justify-center">
                                  <span className="text-main-primary font-black text-lg xl:text-xl tracking-tighter">
                                    +{item.number}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-2 pt-1 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-px bg-main-primary/50" />
                                <h4 className="text-lg xl:text-xl font-bold text-white group-hover:text-main-primary transition-colors duration-300">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-white/60 text-sm leading-relaxed">
                                {item.text}
                              </p>
                            </div>
                          </div>

                          {/* Bottom slide-in bar */}
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-main-primary to-main-primary/20 transition-all duration-700 ease-out rounded-b-2xl" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile vertical thread */}
              <div className="lg:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-main-primary/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* --- Values Section (Unchanged) --- */}
      {isAboutPage && (
        <div className="container mx-auto px-4 mt-20 lg:mt-32 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              {t("Our Core")}{" "}
              <span className="text-main-primary">{t("Values")}</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4 max-w-6xl mx-auto">
            {aboutArray?.map(({ id, title, desc }, index) => {
              const isOpen = openId === id;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className={`group relative ${
                    isOpen ? "bg-white/5" : "bg-main-black2"
                  }  border border-white/10 rounded-xl overflow-hidden hover:border-main-primary/30 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-main-primary/10 border border-main-primary/20 flex items-center justify-center text-main-primary font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-semibold text-white ${
                          isOpen && "!text-main-primary"
                        } group-hover:text-main-primary transition-colors duration-300`}
                      >
                        {title}
                      </h3>
                    </div>

                    <div
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-main-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, delay: isOpen ? 0.15 : 0 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          y: isOpen ? 0 : -10,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isOpen ? 0.2 : 0,
                        }}
                      >
                        <div
                          className="text-white/80 text-sm md:text-base leading-relaxed [text-justify:inter-word]"
                          dangerouslySetInnerHTML={{
                            __html: desc?.replace(
                              /style="text-align:\s*justify;?"/g,
                              "",
                            ),
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-main-primary ${
                      isOpen && "w-full"
                    } group-hover:w-full transition-all duration-500`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
