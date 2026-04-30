"use client";

import Image from "next/image";
import { Link } from "@/navigations";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";

import logo from "@/app/assets/20879.webp";
import xLogoWhite from "@/app/assets/x-logo-white.svg";
import xLogo from "@/app/assets/x-logo.svg";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ContactDataTypes,
  PartnerTypes,
  SocialMediaTypes,
} from "@/types/apiDataTypes";
const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.16 8.16 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
  </svg>
);

const SocialIcon: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={clsx(
        "group relative w-12 h-12 rounded-full flex items-center justify-center",
        "border border-white/80 text-white overflow-hidden",
        "transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-target",
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 rounded-full bg-white",
          "scale-0 group-hover:scale-100 transition-transform duration-500",
        )}
      />
      <span
        className={clsx(
          "relative z-[1] transition-colors duration-300 group-hover:text-black",
        )}
      >
        {children}
      </span>
    </Link>
  );
};

export default function Footer({
  contactData,
  socialMediaData,
  partnersData,
}: {
  contactData: ContactDataTypes;
  socialMediaData: SocialMediaTypes;
  partnersData: PartnerTypes[];
}) {
  const t = useTranslations("footer");
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  return (
    <footer className="w-full flex flex-col justify-center items-center gap-5 bg-main-black text-white px-4 md:px-8 xl:px-20 py-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center"
      >
        <Image
          src={logo}
          alt="Be Group Logo"
          width={150}
          height={150}
          className="rounded-md"
          priority
        />
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex gap-4 flex-wrap items-center justify-center text-center"
      >
        <div className="flex items-center gap-2 cursor-target">
          <Mail size={18} className="text-main-secondary shrink-0" />
          <Link
            href={`mailto:${contactData?.email || ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-xs sm:text-sm md:text-base"
          >
            {contactData?.email || ""}
          </Link>
        </div>
        <div className="flex items-center gap-2 cursor-target">
          <Phone size={18} className="text-main-secondary shrink-0" />
          <Link
            href={`tel:${contactData?.phone || ""}`}
            className="text-xs sm:text-sm md:text-base"
            dir="ltr"
          >
            {contactData?.phone || ""}
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-center cursor-target">
          <MapPin size={18} className="text-main-secondary shrink-0" />
          <Link
          href={contactData?.map_link || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contactData?.address || ""}
        </Link>
        </div>
      </motion.div>

      {/* Social */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 items-center"
      >
        <div className="text-white/90 font-medium">{t("Follow us")}</div>
        <div className="flex items-center gap-3">
          {socialMediaData?.youtube && (
            <SocialIcon href={socialMediaData.youtube} label="YouTube">
              <Youtube size={22} />
            </SocialIcon>
          )}
          {socialMediaData?.facebook && (
            <SocialIcon href={socialMediaData.facebook} label="Facebook">
              <Facebook size={22} />
            </SocialIcon>
          )}
          {socialMediaData?.linkedin && (
            <SocialIcon href={socialMediaData.linkedin} label="LinkedIn">
              <Linkedin size={22} />
            </SocialIcon>
          )}
          {socialMediaData?.twitter && (
            <div
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <SocialIcon href={socialMediaData.twitter} label="Twitter">
                <Image
                  src={isHoveringLogo ? xLogo : xLogoWhite}
                  alt="Twitter"
                  width={23}
                  height={23}
                  className="rounded-md transition-opacity duration-300 object-contain"
                  priority
                />
              </SocialIcon>
            </div>
          )}
          {socialMediaData?.instagram && (
            <SocialIcon href={socialMediaData.instagram} label="Instagram">
              <Instagram size={22} />
            </SocialIcon>
          )}
          {socialMediaData?.tiktok && (
          <SocialIcon href={socialMediaData.tiktok} label="TikTok">
            <TikTokIcon size={22} />
          </SocialIcon>
        )}
        </div>
      </motion.div>

      {/* Partners */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-4 items-center"
      >
        <div className="text-white/90 font-medium">{t("Our Partners")}</div>
        <div className="flex items-center justify-center gap-4 lg:gap-5 flex-wrap">
          {partnersData?.map((partner, index) => (
            <motion.div key={index}>
              <Image
                src={partner.logo}
                alt={partner.alt_logo || partner.name}
                width={100}
                height={40}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="w-full flex flex-col lg:flex-row justify-center items-center gap-2 border-t border-white/10 pt-6"
      >
        <div className="text-white/70 text-xs sm:text-sm text-center">
          {t("Made By")} <span className="text-main-primary">Be Group</span> ©
          2026 {t("All Rights Reserved")}
        </div>
        {/* <div className="flex items-center gap-6 text-white/60 text-xs sm:text-sm">
          <Link href="#" className="hover:underline cursor-target">
            {t("Privacy Policy")}
          </Link>
          <Link href="#" className="hover:underline cursor-target">
            {t("Terms")}
          </Link>
        </div> */}
      </motion.div>
    </footer>
  );
}
