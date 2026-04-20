"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ModernTextEffect from "@/components/ModernTextEffect";
import CareersForm from "@/components/careers/CareersForm";
import { Briefcase, Users, Zap } from "lucide-react";
import Image from "next/image";
import { CareersResponse } from "@/types/careersApiTypes";

const fadeUpVar: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeatureCard = ({ icon: Icon, title, desc, delay, index }: { icon: any, title: string, desc: string, delay: number, index: string }) => (
  <motion.div
    variants={fadeUpVar}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ delay }}
    className="group relative p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-main-primary/50 transition-all duration-700 hover:-translate-y-3 overflow-hidden"
  >
    {/* Background Glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-main-primary/5 group-hover:bg-main-primary/10 transition-all duration-700" />
    
    {/* Index Indicator */}
    <div className="absolute top-8 right-8 text-7xl font-black text-white/5 group-hover:text-main-primary/10 transition-colors duration-700 font-mono">
      {index}
    </div>

    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-main-primary/30 group-hover:scale-110 transition-all duration-500 shadow-xl">
        <Icon className="w-8 h-8 text-white group-hover:text-main-primary transition-colors duration-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-main-primary transition-colors duration-500">{title}</h3>
      
      <div className="w-12 h-0.5 bg-white/10 mb-6 group-hover:w-full group-hover:bg-main-primary/30 transition-all duration-700" />
      
      <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-500">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default function CareersPage({ careerData }: { careerData: CareersResponse }) {
  const t = useTranslations("careers");
  const locale = useLocale();

  if (!careerData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Title") || "Careers"}</h1>
          <p>{t("Failed to load career data") || "Unable to load career opportunities at this time."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-main-black min-h-screen">
      {/* Hero Section */}
      {careerData.data.careers_breadcrumb && (
        <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <Image
                src={careerData.data.careers_breadcrumb.image || "/career.jpg"}
                alt={careerData.data.careers_breadcrumb.alt_image || t("Careers image")}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            className="relative z-20 text-center px-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
              <ModernTextEffect
                text={careerData.data.careers_breadcrumb.title}
                lang={locale}
                animationType={locale === "ar" ? "wordWave" : "particle"}
                delay={0.1}
                fontStyle="uppercase"
                className="text-main-primary inline-block"
              />
            </h1>
            <p className="text-lg sm:text-2xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
              {careerData.data.careers_breadcrumb.short_desc}
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-main-primary/50 to-transparent" />
        </section>
      )}

      {/* Why Join Us */}
      {careerData.data.benefits && careerData.data.benefits.length > 0 && (
        <section className="relative py-11 px-4 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-main-primary/5 rounded-full -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-main-primary/5 rounded-full -z-10" />

          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {careerData.data.benefits.slice(0, 3).map((benefit, index) => (
                <FeatureCard
                  key={index}
                  index={`0${index + 1}`}
                  icon={index === 0 ? Briefcase : index === 1 ? Users : Zap}
                  title={benefit.title}
                  desc={benefit.short_desc}
                  delay={(index + 1) * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section className="py-10 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-2">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
              {locale === "ar" ? "قدم الآن" : "Apply Now"}
            </h2>
            <div className="w-24 h-1.5 bg-main-primary mx-auto rounded-full" />
          </div>

          <CareersForm jobPositions={careerData.data.jobPositions || []} />
        </div>
      </section>
    </div>
  );
}
