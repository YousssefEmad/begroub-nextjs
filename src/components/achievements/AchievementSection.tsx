"use client";
import { AchievementTypes, Section } from "@/types/apiDataTypes";
import { motion } from "framer-motion";
import ModernTextEffect from "../ModernTextEffect";
import { useLocale } from "next-intl";
// import { useTranslations } from "next-intl";

export default function AchievementSection({
  achievementsData,
  section,
}: {
  achievementsData: AchievementTypes[];
  section: Section;
}) {
  // const t = useTranslations("achievements");
  const locale = useLocale();

  return (
    <section className="bg-main-black2 min-h-[45vh] w-full flex justify-center items-center border-b border-white/10 py-8">
      <div className="w-full mx-auto px-4">
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
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 xl:gap-0 w-full flex-wrap">
          {achievementsData?.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="py-4 xl:py-8 flex flex-col gap-2 justify-center items-center text-center"
            >
              <h3 className="text-4xl text-main-primary font-bold">
                +
                {achievement.number}
              </h3>
              <p className="text-gray-600 text-lg sm:text-base lg:text-lg">
                {achievement.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
