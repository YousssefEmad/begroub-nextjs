"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import Image from "next/image";
import MultiLineUnderline from "../MultiLineUnderline";
import { Link } from "@/navigations";
import { BlogTypes, Section } from "@/types/apiDataTypes";
import ModernTextEffect from "../ModernTextEffect";

export default function OurBlogs({
  blogsData,
  section,
}: {
  blogsData?: BlogTypes[];
  section: Section;
}) {
  const t = useTranslations("blogs");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // cards enter animation
  const cardVar = {
    hidden: { opacity: 0, x: isRTL ? 40 : -40, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay: 0.15 * i, ease: easeOut },
    }),
  };

  // Measure card height for step transform
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [cardH, setCardH] = React.useState(0);
  const [isLg, setIsLg] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const updateIsLg = () => setIsLg(mql.matches);
    updateIsLg();
    mql.addEventListener("change", updateIsLg);
    return () => mql.removeEventListener("change", updateIsLg);
  }, []);

  React.useEffect(() => {
    if (!gridRef.current) return;

    const measure = () => {
      const cards = Array.from(
        gridRef.current!.querySelectorAll<HTMLElement>(".js-card")
      );
      if (!cards.length) return;
      const maxH = Math.max(...cards.map((el) => el.offsetHeight));
      setCardH(maxH);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(gridRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  // Helper for step positioning
  const stepStyle = (step: 0 | 1 | 2): React.CSSProperties =>
    isLg && cardH
      ? {
          transform: `translateY(${cardH * 0.35 * step}px)`,
          willChange: "transform",
        }
      : {};

  // Helper to safely read blog fields
  const get = (idx: number) => blogsData?.[idx];

  return (
    <section className="w-full min-h-fit lg:max-h-screen bg-main-black text-main-white flex flex-col gap-6 md:gap-8 xl:gap-0 justify-start items-center py-10 xl:pt-16 border-b border-white/10">
      <div className="sm:container mx-auto flex flex-col gap-6">
        <div className="w-full flex flex-col gap-8 items-start px-4 xl:px-6">
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
              animationType={locale === "ar" ? "wordWave" : "particle"}
              delay={0.1}
              fontStyle={"uppercase"}
              triggerStart="50%"
            />
          </motion.div>

          <ModernTextEffect
            text={section.second_title}
            lang={locale}
            animationType={locale === "ar" ? "wordWave" : "particle"}
            delay={0.1}
            fontStyle={"capitalize"}
            className="text-4xl md:text-7xl lg:max-w-[80%] xl:max-w-[65%] font-bold text-center"
            triggerStart="50%"
          />

          {/* Short description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/70 text-base md:text-lg text-start lg:max-w-[60%] xl:max-w-[50%]"
          >
            {t(
              "Insights, tips, and updates from our team covering design, development, and product growth Dive in for quick reads and practical take aways"
            )}
          </motion.p>

          <Link href={"/blogs"} className="z-50">
            <Button
              className="uppercase bg-main-primary text-main-text hover:bg-white/90 p-6 !rounded-[4px] z-50 cursor-target"
              variant="default"
            >
              {t("VIEW BLOGS")}
            </Button>
          </Link>
        </div>

        {/* Blog cards */}
        <div
          ref={gridRef}
          className={`w-full px-4 xl:px-6 lg:-mt-32 xl:-mt-48 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isRTL ? "md:[direction:rtl]" : ""
          }`}
          style={
            cardH
              ? ({
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--card-h" as any]: `${cardH}px`,
                } as React.CSSProperties)
              : undefined
          }
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={stepStyle((2 - i) as 0 | 1 | 2)}>
              <Link href={`/blogs/${get(i)?.slug || "blog-details"}`}>
                <motion.article
                  custom={i}
                  variants={cardVar}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  className="w-full js-card cursor-pointer"
                >
                  <div className="group rounded-[6px] overflow-hidden cursor-target">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {get(i)?.image ? (
                        <Image
                          src={get(i)!.image}
                          alt={get(i)?.name ?? "Blog image"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-[6px]"
                          sizes="(min-width:1024px) 33vw, 100vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10" />
                      )}
                    </div>

                    <div className="py-5 flex flex-col gap-4 mt-2">
                      <h3 className="text-xl font-semibold leading-tight cursor-pointer">
                        <MultiLineUnderline
                          color="#fff"
                          thickness={1}
                          gap={6}
                          duration={500}
                          delay={140}
                          rtl={isRTL}
                        >
                          {get(i)?.name}
                        </MultiLineUnderline>
                      </h3>
                      <div className="text-base text-white/90">
                        {get(i)?.date || ""}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          ))}

          {/* Spacer for last stepped card */}
          {isLg && cardH > 0 && (
            <div
              aria-hidden
              className="col-span-full"
              style={{ height: `${cardH * 0.7}px` }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
