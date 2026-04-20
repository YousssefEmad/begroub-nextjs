"use client";

import { useLocale } from "next-intl";
import { motion, type Variants, cubicBezier } from "framer-motion";
import { Phone, UserRound } from "lucide-react";
import { Link } from "@/navigations";
import { useState } from "react";

const WhatsAppIcon = ({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.77 11.77 0 0 0 12.02 0C5.42 0 .06 5.36.06 11.96c0 2.11.56 4.14 1.62 5.94L0 24l6.28-1.65c1.73.94 3.68 1.43 5.7 1.43 6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.22-3.42-8.34ZM11.98 21.2a9.2 9.2 0 0 1-4.68-1.27l-.34-.2-3.74.98 1-3.64-.22-.36A9.17 9.17 0 1 1 11.98 21.2Z" />
    <path d="M16.89 13.62c-.22-.12-1.31-.68-1.52-.76-.2-.07-.34-.11-.49.11-.14.2-.55.74-.67.9-.12.15-.24.17-.45.06-.22-.12-.87-.32-1.66-1.03-.61-.54-1.02-1.2-1.14-1.4-.12-.2-.01-.31.09-.41.1-.1.2-.24.3-.36.1-.12.13-.21.2-.36.07-.15.03-.27-.02-.38-.06-.11-.46-1.18-.63-1.61-.17-.42-.33-.36-.45-.36h-.52c-.17 0-.39.06-.58.28-.2.22-.75.73-.75 1.78 0 1.05.76 2.04.87 2.18.12.14 1.49 2.27 3.64 3.2.51.22.91.35 1.22.45.51.17.98.14 1.35.08.41-.06 1.3-.52 1.48-1.01.18-.5.18-.92.13-1.01-.05-.08-.2-.14-.42-.25Z" />
  </svg>
);

export default function FloatingCTA() {
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  const dir = locale === "ar" ? 1 : -1;
  const easeOut = cubicBezier(0.22, 1, 0.36, 1);

  const R = 80;
  const DIAG = 40;

  const ctaContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const ctaItem: Variants = {
    hidden: { opacity: 0, x: 20 * dir, y: 20 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  return (
    <motion.div
      variants={ctaContainer}
      initial="hidden"
      animate="show"
      className={`fixed ${
        locale === "en" ? "left-8" : "right-8"
      } bottom-10 z-[100]`}
    >
      <div className="relative w-[48px] h-[48px]">
        {/* WhatsApp button */}
        <motion.div
          variants={ctaItem}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0,
            x: locale === "ar" ? (isExpanded ? 30 * dir - 70 : 0) : 0,
            y: isExpanded ? -R - 5 : 0,
          }}
          transition={{
            duration: 0.28,
            ease: "easeOut",
            delay: isExpanded ? 0.03 : 0,
          }}
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <button className="!rounded-full w-11 h-11 bg-main-secondary cursor-target text-black hover:bg-[#F18A1D]/90 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] p-0">
            <Link
              href="https://wa.me/201009957000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-full h-full"
            >
              <WhatsAppIcon size={20} className="text-black" />
            </Link>
          </button>
        </motion.div>

        {/* Phone button */}
        <motion.div
          variants={ctaItem}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0,
            x:
              locale === "ar"
                ? isExpanded
                  ? DIAG * -dir - 45
                  : 0
                : isExpanded
                ? DIAG * dir + 85
                : 0,
            y: isExpanded ? -DIAG : 0,
          }}
          transition={{
            duration: 0.28,
            ease: "easeOut",
            delay: isExpanded ? 0.08 : 0,
          }}
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <button className="!rounded-full w-11 h-11 bg-main-secondary cursor-target text-black hover:bg-[#F18A1D]/90 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] p-0">
            <Link
              href="tel:+201009957000"
              aria-label="Call us"
              className="flex items-center justify-center w-full h-full"
            >
              <Phone size={20} className="text-black" />
            </Link>
          </button>
        </motion.div>

        {/* Main toggle button */}
        <motion.div variants={ctaItem} className="absolute inset-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex justify-center items-center !rounded-full w-12 h-12 bg-main-secondary cursor-target text-black hover:bg-[#F18A1D]/90 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] p-0"
            aria-label={
              isExpanded ? "Close quick actions" : "Open quick actions"
            }
          >
            <UserRound size={24} className="text-black" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
