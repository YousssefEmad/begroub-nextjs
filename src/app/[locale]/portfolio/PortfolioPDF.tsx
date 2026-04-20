"use client";
import SplitText from "@/components/SplitText";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PDFViewerPage from "./PDFViewerPage";

export default function PortfolioPDF() {
  const locale = useLocale();
  const t = useTranslations("portfolio");
  return (
    <div className="w-full min-h-screen bg-main-black text-main-white flex flex-col items-center border-b border-white/10">
      <div className="w-full bg-main-black text-main-primary flex flex-col items-center justify-end xl:justify-center py-6 xl:py-0 h-[140px] sm:h-[180px] lg:h-[220px] xl:h-[35vh]">
        {locale === "en" ? (
          <SplitText
            text={"Our Portfolio"}
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
            {"Our Portfolio"}
          </motion.h1>
        )}
      </div>

      <PDFViewerPage />
    </div>
  );
}
