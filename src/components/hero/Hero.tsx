"use client";

// import { useLocale, useTranslations } from "next-intl";
// import SplitText from "../SplitText";
// import { Button } from "../ui/button";
// import { motion } from "framer-motion";
// import { Link } from "@/navigations";
// import { Download } from "lucide-react";
import { Banner } from "@/types/apiDataTypes";

export default function Hero({ banner }: { banner: Banner }) {
  // const t = useTranslations("hero");
  // const locale = useLocale();
  console.log(banner);
  return (
    <section className="relative min-h-screen text-main-primary overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <video
          src="/hero6.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-hidden="true"
          disableRemotePlayback
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* <div className="relative w-full h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <div className="inline-block">
            {locale === "en" ? (
              <SplitText
                text={t("We Provide Digital Marketing")}
                tag="p"
                className="font-semibold leading-[1.3] text-[clamp(20px,6.5vw,48px)] max-w-[90ch]"
                delay={100}
                duration={0.6}
                initialHidden
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            ) : (
              <motion.h1
                dir="rtl"
                className="font-semibold text-[clamp(20px,6.5vw,48px)] max-w-[90ch] bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {t("We Provide Digital Marketing")}
              </motion.h1>
            )}

            <motion.div
              className="flex flex-col justify-between items-center gap-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: locale === "en" ? 1.3 : 0,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <h4 className="uppercase text-main-white text-sm sm:text-xl font-base">
                {t("Digital Services has never been easier")}
              </h4>
              <div className="flex items-center gap-4">
                <Link href={"/contact"} prefetch>
                  <Button
                    className="uppercase bg-transparent border-2 border-main-primary text-main-primary hover:bg-main-primary hover:text-white lg:py-5 lg:px-8 !rounded-[4px] !font-semibold cursor-target text-xs lg:text-sm w-full h-[38px] lg:h-[48px] transition-colors duration-300 ease-in-out"
                    variant="outline"
                  >
                    {t("Contact Us")}
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    if (banner.company_profile) {
                      const link = document.createElement("a");
                      link.href = banner.company_profile;
                      link.target = "_blank";
                      link.download =
                        banner.company_profile.split("/").pop() ||
                        "company-profile.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                  className="uppercase bg-main-primary text-main-text hover:bg-white/90 border-2 border-main-primary hover:text-main-black lg:py-5 !rounded-[4px] !font-semibold cursor-target text-xs lg:text-sm w-full h-[38px] lg:h-[48px] transition-colors duration-300 ease-in-out"
                >
                  {t("Company Profile")}
                  <Download size={24} className="w-10 h-10 -mt-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
