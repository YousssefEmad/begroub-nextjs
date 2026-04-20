"use client";

import Image from "next/image";
import whyUsImage from "@/app/assets/whyUs.avif";
import { Gem, Palette, Pencil, Star } from "lucide-react";
import { motion } from "motion/react";
// import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BenefitTypes, Section } from "@/types/apiDataTypes";
import ModernTextEffect from "../ModernTextEffect";
import { useLocale } from "next-intl";

export default function WhyChooseUs({
  benefitsData,
  section,
}: {
  benefitsData: BenefitTypes[];
  section: Section;
}) {
  // const t = useTranslations("whyus");
  const [isClient, setIsClient] = useState(false);
  const locale = useLocale();

  // Ensure we only render after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a stable server render skeleton
    return (
      <section className="w-full min-h-fit xl:min-h-screen bg-main-black text-main-white py-8 xl:py-20 border-b border-white/10 overflow-hidden" />
    );
  }

  const renderTitle = (title: string) => {
    const words = title?.trim().split(" ") || [];
    const firstWord = words[0] || "";
    const secondWord = words.slice(1).join(" ");
    return (
      <div className="flex">
        <div className="hidden sm:block w-12" />
        <div className="flex flex-col gap-1">
          <h3 className="text-5xl font-bold">{firstWord}</h3>
          {secondWord && (
            <h3 className="text-5xl font-normal text-main-primary">
              {secondWord}
            </h3>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full min-h-fit xl:min-h-screen bg-main-black text-main-white py-8 xl:py-20 border-b border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col justify-center items-center text-main-white gap-6 mb-10">
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
          />
        </motion.div>

        <ModernTextEffect
          text={section.second_title}
          lang={locale}
          animationType={locale === "ar" ? "wordWave" : "particle"}
          delay={0.1}
          fontStyle={"capitalize"}
          className="text-4xl md:text-7xl lg:max-w-[80%] xl:max-w-[50%] font-bold text-center"
        />
      </div>

     <div className="px-4 sm:px-0 sm:container pt-24 md:pt-32 lg:pt-40 flex flex-col gap-24 mx-auto xl:ps-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center sm:justify-start sm:ps-4"
        >
          {/* <Image
            src={section.image || whyUsImage}
            alt={section.alt_image || "Why Choose Us Image"}
            className="rounded-[150px] sm:max-w-[50%] max-h-[120px] lg:max-h-[180px] lg:max-w-full object-cover"
            width={525}
            height={100}
          /> */}
        </motion.div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl sm:px-6 lg:px-8">
            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-24 sm:gap-16 lg:gap-32">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col gap-6 ${
                    i === 1 ? "md:translate-y-[-150px]" : ""
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <h5 className="self-start font-medium text-xl">0{i + 1}</h5>
                    {i === 0 ? (
                      <Gem
                        size={65}
                        strokeWidth={1}
                        className="text-main-primary"
                      />
                    ) : (
                      <Pencil
                        size={65}
                        strokeWidth={1}
                        className="text-main-primary"
                      />
                    )}
                  </div>

                  {renderTitle(benefitsData[i]?.title || "")}

                  <div className="flex mt-6 sm:mt-8 lg:mt-10 xl:mt-12">
                    <div className="hidden sm:block w-12" />
                    <p
                      className="w-full leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: benefitsData[i]?.short_desc || "",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-24 sm:gap-16 lg:gap-32 mt-24">
              {[2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col gap-6 ${
                    i === 3 ? "md:translate-y-[-150px]" : ""
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <h5 className="self-start font-medium text-xl">0{i + 1}</h5>
                    {i === 2 ? (
                      <Palette
                        size={65}
                        strokeWidth={1}
                        className="text-main-primary"
                      />
                    ) : (
                      <Star
                        size={65}
                        strokeWidth={1}
                        className="text-main-primary"
                      />
                    )}
                  </div>

                  {renderTitle(benefitsData[i]?.title || "")}

                  <div className="flex mt-6 sm:mt-8 lg:mt-10 xl:mt-12">
                    <div className="hidden sm:block w-12" />
                    <p
                      className="w-full leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: benefitsData[i]?.short_desc || "",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
