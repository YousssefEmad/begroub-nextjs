"use client";

import { useState, useEffect } from "react";
import { MapPin, Mail, Smartphone, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { motion, type Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  ContactDataTypes,
  ContactSectionTypes,
  Service,
} from "@/types/apiDataTypes";
import ModernTextEffect from "../ModernTextEffect";
import { Link } from "@/navigations";
import { BranchLocation } from "@/types/contactApiTypes";

// ===== Easing / shared timing =====
const easeOut = [0.22, 1, 0.36, 1] as const;

// ===== Variants =====
const containerVar: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const leftInSpring: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 },
  },
};

const rightInSpring: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 },
  },
};

const popBlurIn: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
};


// ===== InfoCard Component =====
function InfoCard({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default flex-1"
      style={{ perspective: "800px" }}
    >
      {/* Outer glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-main-primary, #d4af37) 30%, transparent), transparent 70%)",
        }}
      />

      {/* Card body */}
      <motion.div
        animate={{ rotateX: hovered ? -2 : 0, scale: hovered ? 1.015 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center gap-5 px-6 py-5 rounded-2xl overflow-hidden h-full"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? "0 0 0 1px color-mix(in srgb, var(--color-main-primary, #d4af37) 35%, transparent), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: hovered ? "200%" : "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            width: "60%",
          }}
        />

        {/* Icon container — larger, with background pill */}
        <div className="relative shrink-0">
          {/* Ambient glow blob */}
          <motion.div
            animate={{
              opacity: hovered ? 0.7 : 0.25,
              scale: hovered ? 1.4 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-xl blur-lg"
            style={{
              background:
                "color-mix(in srgb, var(--color-main-primary, #d4af37) 80%, transparent)",
            }}
          />

          {/* Icon pill bg */}
          <motion.div
            animate={{
              backgroundColor: hovered
                ? "color-mix(in srgb, var(--color-main-primary, #d4af37) 18%, transparent)"
                : "rgba(255,255,255,0.05)",
              borderColor: hovered
                ? "color-mix(in srgb, var(--color-main-primary, #d4af37) 35%, transparent)"
                : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center border"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
              className="text-main-primary"
              style={{
                filter:
                  "drop-shadow(0 0 10px color-mix(in srgb, var(--color-main-primary, #d4af37) 70%, transparent))",
              }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="shrink-0 self-stretch w-px"
          style={{
            background: hovered
              ? "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-main-primary, #d4af37) 40%, transparent), transparent)"
              : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Text */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <motion.span
            animate={{
              color: hovered
                ? "color-mix(in srgb, var(--color-main-primary, #d4af37) 90%, white)"
                : "rgba(255,255,255,0.35)",
            }}
            transition={{ duration: 0.3 }}
            className="text-base font-bold uppercase tracking-[0.22em] leading-none"
          >
            {label}
          </motion.span>
          <motion.span
            animate={{
              color: hovered
                ? "rgba(255,255,255,0.97)"
                : "rgba(255,255,255,0.75)",
            }}
            transition={{ duration: 0.3 }}
            className="text-base sm:text-lg font-medium leading-snug break-words tracking-tight"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {value}
          </motion.span>
        </div>

        {/* Corner dot */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{
            background: "var(--color-main-primary, #d4af37)",
            boxShadow: "0 0 8px var(--color-main-primary, #d4af37)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ===== Main Component =====
export default function ContactUs({
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
  const locale = useLocale();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="contact-us"
      className="w-full min-h-fit bg-main-black2 text-main-white border-b border-white/10 px-4 py-12"
    >
      <motion.div
        className="flex flex-col gap-8 justify-start items-center container mx-auto"
        variants={containerVar}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ── Header ── */}
        <motion.div
          className="w-full flex flex-col gap-4 items-center text-center"
          variants={leftInSpring}
        >
          <h2 className="text-7xl capitalize">
            {(() => {
              const [firstWord, ...rest] = contactSection.title.split(" ");
              return (
                <>
                  <ModernTextEffect
                    text={firstWord}
                    lang={locale}
                    animationType={locale === "ar" ? "wordWave" : "particle"}
                    delay={0.1}
                    fontStyle="uppercase"
                    className="text-main-primary inline-block"
                    triggerStart="50%"
                  />{" "}
                  <ModernTextEffect
                    text={rest.join(" ")}
                    lang={locale}
                    animationType={locale === "ar" ? "wordWave" : "particle"}
                    delay={0.2}
                    fontStyle="uppercase"
                    className="inline-block"
                    triggerStart="50%"
                  />
                </>
              );
            })()}
          </h2>

          {mounted && contactSection?.long_desc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/80 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: contactSection.long_desc }}
            />
          )}

          {mounted && contactSection?.short_desc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: contactSection.short_desc }}
            />
          )}
        </motion.div>

        {/* ── Main row ── */}
        <motion.div
          className="flex flex-col xl:flex-row-reverse gap-8 xl:gap-16 w-full items-stretch"
          variants={containerVar}
        >
          {/* Contact Form — RIGHT */}
          <motion.div
            className="w-full xl:w-[55%]"
            variants={rightInSpring}
            inherit={false}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ContactForm servicesData={servicesData} />
          </motion.div>

          {/* Info cards — LEFT */}
          <motion.div
            className="w-full xl:w-[45%] flex flex-col gap-4 xl:self-stretch"
            variants={leftInSpring}
            inherit={false}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: <MapPin size={28} />,
                label: t("Address"),
                value: (
                  <Link
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      contactData?.address ||
                      "25 Asmaa Fahmy, Ard El Golf, Heliopolis, Cairo, Egypt",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target hover:text-main-primary transition-colors"
                  >
                    <span>
                      {contactData?.address ||
                        t(
                          "25 Asmaa Fahmy, Ard El Golf, Heliopolis, Cairo, Egypt",
                        )}
                    </span>
                  </Link>
                ),
                delay: 0,
              },
              {
                icon: <Mail size={28} />,
                label: t("Email"),
                value: (
                  <Link
                    href={`mailto:${contactData?.email || "info@begroup.com"}`}
                    className="hover:text-main-primary transition-colors cursor-target"
                  >
                    {contactData?.email || "info@begroup.com"}
                  </Link>
                ),
                delay: 0.1,
              },
              {
                icon: <Smartphone size={28} />,
                label: t("Phone"),
                value: (
                  <Link
                    href={`tel:${contactData?.phone || "+201009957000"}`}
                    className="hover:text-main-primary transition-colors cursor-target"
                    dir="ltr"
                  >
                    {contactData?.phone || "+20 100 995 7000"}
                  </Link>
                ),
                delay: 0.2,
              },
            ].map(({ icon, label, value, delay }) => (
              <InfoCard
                key={label}
                icon={icon}
                label={label}
                value={value}
                delay={delay}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Office Locations Cards ── */}
        <motion.div
          className="w-full mt-8"
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div className="text-center mb-10" variants={popBlurIn}>
            <h3 className="text-3xl sm:text-4xl font-bold">
              <span className="text-main-primary">
                {locale === "ar" ? "مكاتبنا" : "Our"}
              </span>{" "}
              <span className="text-white">
                {locale === "ar" ? "حول العالم" : "Offices"}
              </span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-main-primary to-main-primary/30 rounded-full mx-auto mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVar}
          >
            {branchLocations.map((location, locIdx) => (
              <motion.div
                key={locIdx}
                variants={popBlurIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: locIdx * 0.08 }}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden
                           hover:border-main-primary/40 transition-all duration-500${location.offices.length > 1
                    ? " sm:col-span-2 lg:col-span-3"
                    : ""
                  }`}
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-main-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-main-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={location.country}
                    >
                      {location.flag}
                    </span>
                    <span className="text-lg font-bold text-white group-hover:text-main-primary transition-colors duration-300">
                      {location.country}
                    </span>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  <div
                    className={`${location.offices.length > 1
                        ? "grid grid-cols-1 md:grid-cols-3 gap-5"
                        : "flex flex-col gap-3"
                      }`}
                  >
                    {location.offices.map((office) => (
                      <div
                        key={office.name}
                        className={`flex flex-col gap-3 ${location.offices.length > 1
                            ? "md:border-e md:border-white/10 md:pe-5 md:last:border-e-0 md:last:pe-0"
                            : ""
                          }`}
                      >
                        {location.offices.length > 1 && (
                          <span className="text-xs font-semibold text-main-primary/70 uppercase tracking-wider">
                            {office.name}
                          </span>
                        )}

                        <div className="flex items-start gap-3">
                          <MapPin
                            size={16}
                            className="shrink-0 mt-0.5 text-main-primary/70"
                          />
                          <p className="text-sm text-white/70 leading-relaxed">
                            {office.address}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone
                            size={16}
                            className="shrink-0 text-main-primary/70"
                          />
                          <Link
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            dir="ltr"
                            className="text-sm text-white/70 hover:text-main-primary transition-colors duration-300 font-mono cursor-target"
                          >
                            {office.phone}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
