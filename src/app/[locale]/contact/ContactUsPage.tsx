"use client";
import ContactUs from "@/components/conatct/ContactUs";
import { useTranslations } from "next-intl";
import { ContactDataTypes, ContactSectionTypes, Service } from "@/types/apiDataTypes";
import { BranchLocation } from "@/types/contactApiTypes";

export default function ContactUsPage({
  contactData,
  contactSection,
  servicesData,
  branchLocations
}: {
  contactData: ContactDataTypes;
  contactSection: ContactSectionTypes;
  servicesData: Service[];
  branchLocations: BranchLocation[];
}) {
  const t = useTranslations("contact");
  return (
    <div className="flex flex-col bg-main-black">
      <div className="w-full relative bg-main-black text-main-primary flex items-center justify-center h-[140px] sm:h-[180px] lg:h-[260px] xl:h-[50vh]">
        <img
          src={contactSection?.image}
          alt={contactSection?.alt_image || t("Contact us image")}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          {locale === "en" ? (
            <SplitText
              text={t("Contact Us")}
              tag="h1"
              className="font-extrabold leading-[1.2] text-[clamp(44px,10vw,128px)]"
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
              className="font-extrabold text-[clamp(44px,10vw,128px)] bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t("Contact Us")}
            </motion.h1>
          )}
        </div> */}
      </div>
      <ContactUs contactData={contactData} contactSection={contactSection} servicesData={servicesData} branchLocations={branchLocations}/>;
    </div>
  );
}
