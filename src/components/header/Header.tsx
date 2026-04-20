"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link, usePathname } from "@/navigations";
import Image from "next/image";
import logo from "@/app/assets/20879.webp";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const shellVar: Variants = {
  hidden: { y: -14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

const navVar: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const linkVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  // const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // const locale = useLocale();
  // const router = useRouter();
  const pathname = usePathname();
  // const isAR = locale === "ar";
  // const langLabel = isAR ? "AR" : "EN";

  const langRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const ticking = useRef(false);
  const THRESHOLD = 12;

  const LINKS = [
    { href: "/", label: t("Home") },
    { href: "/about", label: t("About") },
    { href: "/services", label: t("Services") },
    { href: "/our-work", label: t("Our Work") },
    { href: "/portfolio", label: t("Portfolio") },
    { href: "/blogs", label: t("Blogs") },
    { href: "/careers", label: t("Careers") },
    { href: "/contact", label: t("Contact") },
  ];

  // Scroll effect
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > THRESHOLD);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langRef.current && !langRef.current.contains(target))
        // setLangOpen(false);
      if (
        mobileRef.current &&
        !mobileRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Switch locale and translate slug on detail pages
  // const switchLocale = async (target: "en" | "ar") => {
  //   if (target === locale) return setLangOpen(false);

  //   try {
  //     // Try to detect detail routes and translate slug using hreflang
  //     const detailMatch = pathname.match(/^\/(services|blogs)\/([^\/]+)$/);
  //     if (detailMatch) {
  //       const [, type, currentSlug] = detailMatch;

  //       if (type === "services") {
  //         const res = await fetchServiceDetailsData(locale, currentSlug);
  //         const href = res?.data?.seo?.meta?.hreflang_tags?.[target];
  //         if (href) {
  //           // Extract pathname and remove the locale prefix
  //           const fullPath = new URL(href).pathname; // e.g. /ar/services/خدمة
  //           const pathWithoutLocale = fullPath.replace(/^\/(en|ar)/, ""); // e.g. /services/خدمة
  //           router.replace(pathWithoutLocale, { locale: target });
  //           setLangOpen(false);
  //           return;
  //         }
  //       } else if (type === "blogs") {
  //         const res = await fetchBlogsDetailsData(locale, currentSlug);
  //         const href = res?.data?.seo?.meta?.hreflang_tags?.[target];
  //         if (href) {
  //           const fullPath = new URL(href).pathname;
  //           const pathWithoutLocale = fullPath.replace(/^\/(en|ar)/, "");
  //           router.replace(pathWithoutLocale, { locale: target });
  //           setLangOpen(false);
  //           return;
  //         }
  //       }
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (e) {
  //     // Fall through to default behavior if translation fails
  //   }

  //   // Fallback: keep same path and just change locale prefix
  //   router.replace(pathname, { locale: target });
  //   setLangOpen(false);
  // };

  return (
    <motion.header
      variants={shellVar}
      initial="hidden"
      animate="show"
      className={clsx(
        "fixed top-0 left-0 w-full z-[100]",
        "flex items-center justify-between",
        "px-6 py-4 transition-[padding,background,backdrop-filter,border-color,box-shadow] duration-500",
        scrolled
          ? "backdrop-blur-md bg-black/35 border-b border-white/10 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      )}
    >
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
        className="flex items-center gap-3 cursor-pointer cursor-target"
      >
        {pathname === "/" ? (
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src={logo}
              alt="Be Group Logo"
              width={120}
              height={120}
              priority
            />
          </div>
        ) : (
          <Link href="/" prefetch>
            <Image
              src={logo}
              alt="Be Group Logo"
              width={120}
              height={120}
              priority
            />
          </Link>
        )}
      </motion.div>

      {/* Desktop nav (xl and up) */}
      <motion.nav
        variants={navVar}
        initial="hidden"
        animate="show"
        className="hidden xl:flex items-center gap-8 uppercase tracking-wide text-main-white"
      >
        {LINKS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <motion.div key={item.href} variants={linkVar}>
              <Link
                href={item.href}
                prefetch
                className={clsx(
                  "group relative text-sm py-1 transition-colors cursor-target",
                  isActive && "text-main-primary font-bold"
                )}
              >
                <span className="transition-opacity duration-300 group-hover:opacity-90">
                  {item.label}
                </span>
                {/* underline */}
                <span
                  className={clsx(
                    "pointer-events-none absolute -bottom-1 left-0 h-[1.5px] transition-all duration-400 bg-current",
                    isActive
                      ? "w-full opacity-80"
                      : "w-0 opacity-60 group-hover:w-full"
                  )}
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <div className="flex items-center gap-2">
        {/* Mobile menu toggle (lg & smaller => show; xl hides) */}
        <motion.button
          ref={toggleRef} // ✅ added
          onClick={() => setMobileOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          className="xl:hidden relative flex flex-col items-center justify-center w-8 h-8 cursor-target"
        >
          {/* Top line */}
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="block w-6 h-[2px] rounded bg-main-primary"
          />
          {/* Middle line (hidden when open) */}
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="block w-6 h-[2px] rounded bg-main-primary my-1"
          />
          {/* Bottom line */}
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="block w-6 h-[2px] rounded bg-main-primary"
          />
        </motion.button>

        {/* Language dropdown */}
        {/* <div className="relative" ref={langRef}>
          <motion.button
            onClick={() => setLangOpen((v) => !v)}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1 text-sm uppercase tracking-wide px-2 py-1 rounded text-main-white hover:bg-white/10 transition cursor-target"
            aria-haspopup="menu"
            aria-expanded={langOpen}
          >
            {langLabel}
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform duration-300 text-main-secondary",
                langOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </motion.button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                key="lang-menu"
                role="menu"
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 6 }}
                transition={{ duration: 0.18, ease: easeOut }}
                className={clsx(
                  "absolute top-full mt-2 w-28 rounded-md shadow-lg border border-white/10",
                  "bg-black/70 backdrop-blur-md text-main-white overflow-hidden",
                  locale === "en" ? "right-0" : "left-0"
                )}
              >
                <motion.button
                  role="menuitem"
                  onClick={() => switchLocale("en")}
                  className={clsx(
                    "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between cursor-target",
                    locale === "en" && "bg-white/10"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("English")}
                  <Globe size={16} className="text-main-secondary" />
                </motion.button>

                <motion.button
                  role="menuitem"
                  onClick={() => switchLocale("ar")}
                  className={clsx(
                    "w-full text-start px-3 py-2 text-sm hover:bg-white/15 flex items-center justify-between cursor-target",
                    locale === "ar" && "bg-white/10"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("Arabic")}
                  <Globe size={16} className="text-main-secondary" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div> */}
      </div>

      {/* Mobile menu panel (lg & smaller) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            ref={mobileRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className={clsx(
              "xl:hidden absolute top-full inset-x-4 mt-2 rounded-md shadow-lg border border-white/10",
              "bg-black/70 backdrop-blur-md text-main-white overflow-hidden"
            )}
          >
            <nav className="flex flex-col">
              {LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "px-4 py-3 text-sm uppercase tracking-wide transition text-start border-b border-white/10 flex items-center justify-between cursor-target",
                      isActive
                        ? "bg-white/10 font-bold text-main-primary"
                        : "hover:bg-white/15"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
