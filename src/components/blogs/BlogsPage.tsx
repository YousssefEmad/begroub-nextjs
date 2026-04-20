"use client";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import MultiLineUnderline from "../MultiLineUnderline";
import SplitText from "@/components/SplitText";
import { Link } from "@/navigations";

type BlogItem = {
  id: string | number;
  image: string | StaticImageData;
  desc: string;
  date: string;
  slug: string;
};

type BlogsPageProps = {
  items?: BlogItem[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export default function BlogsPage({
  items = [],
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}: BlogsPageProps) {
  const locale = useLocale();
  const t = useTranslations("blogs");
  const isRTL = locale === "ar";
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const cardVar: Variants = {
    hidden: { opacity: 0, x: isRTL ? 40 : -40, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay: 0.12 * i, ease: easeOut },
    }),
  };

  const paginationVar: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: easeOut },
    },
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  const generatePaginationNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) pages.push(i);
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <section className="w-full min-h-screen bg-main-black text-main-white flex flex-col items-center pb-12 border-b border-white/10">
      {/* Hero / Title */}
      <div className="w-full bg-main-black text-main-primary flex flex-col items-center justify-end xl:justify-center py-6 xl:py-0 h-[140px] sm:h-[180px] lg:h-[220px] xl:h-[50vh]">
        {locale === "en" ? (
          <SplitText
            text={t("Latest News")}
            tag="h1"
            className="font-extrabold leading-[1.2] text-[clamp(44px,10vw,128px)] relative"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="center"
            initialHidden
          />
        ) : (
          <motion.h1
            dir="rtl"
            className="font-extrabold text-[clamp(44px,10vw,128px)] relative bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-[#F18A1D]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {t("Latest News")}
          </motion.h1>
        )}
      </div>

      <div className="w-full sm:container mx-auto flex flex-col gap-8 px-4 md:px-6">
        {/* Blog Cards Grid */}
        <motion.div
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${
            isRTL ? "md:[direction:rtl]" : ""
          }`}
        >
          {items.map((item, index) => (
            <Link href={`/blogs/${item.slug}`} key={item.id + item.slug}>
              <motion.article
                custom={index}
                variants={cardVar}
                className="w-full cursor-pointer cursor-target"
              >
                <div className="group rounded-[6px] overflow-hidden">
                  {/* IMAGE */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.desc}
                        fill
                        className="object-cover transition-transform duration-500 md:group-hover:scale-105 rounded-[6px]"
                        sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <span className="text-white/50 text-sm">
                          Blog Image {index + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="py-4 sm:py-5 flex flex-col gap-2 sm:gap-3 mt-2">
                    <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                      <MultiLineUnderline
                        color="#fff"
                        thickness={1}
                        gap={6}
                        duration={500}
                        delay={140}
                        rtl={isRTL}
                      >
                        {item.desc}
                      </MultiLineUnderline>
                    </h3>
                    <div className="text-sm sm:text-base text-white/90">
                      {item.date}
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.nav
          aria-label="Pagination"
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          variants={paginationVar}
          className={`w-full flex items-center justify-center gap-2 mt-6 sm:mt-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Prev */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="group cursor-target relative overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-[4px] border border-white/80 text-white bg-transparent hover:bg-transparent focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40 transition-transform duration-200"
              size="icon"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-[4px] bg-white scale-0 transition-transform duration-500 group-hover:scale-100"
              />
              {isRTL ? (
                <ArrowRight className="relative z-[1] h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 group-hover:text-black" />
              ) : (
                <ArrowLeft className="relative z-[1] h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 group-hover:text-black" />
              )}
              <span className="sr-only">Previous page</span>
            </Button>
          </motion.div>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-2">
            {generatePaginationNumbers().map((page, index) => (
              <motion.div
                key={`${page}-${index}`}
                whileHover={typeof page === "number" ? { scale: 1.05 } : {}}
                whileTap={typeof page === "number" ? { scale: 0.95 } : {}}
              >
                {typeof page === "number" ? (
                  <Button
                    onClick={() => handlePageClick(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`group relative overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-[4px] border transition-all duration-200 cursor-target ${
                      page === currentPage
                        ? "border-white bg-white text-black"
                        : "border-white/80 !text-white bg-transparent hover:bg-transparent"
                    }`}
                    size="icon"
                  >
                    {page !== currentPage && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-[4px] bg-white scale-0 transition-transform duration-500 group-hover:scale-100"
                      />
                    )}
                    <span
                      className={`relative z-[1] font-medium transition-colors duration-300 ${
                        page === currentPage
                          ? "text-black"
                          : "group-hover:text-black"
                      }`}
                    >
                      {page}
                    </span>
                  </Button>
                ) : (
                  <span className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center text-white/50 font-medium">
                    {page}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Next */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="group cursor-target relative overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-[4px] border border-white/80 text-white bg-transparent hover:bg-transparent focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40 transition-transform duration-200"
              size="icon"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-[4px] bg-white scale-0 transition-transform duration-500 group-hover:scale-100"
              />
              {isRTL ? (
                <ArrowLeft className="relative z-[1] h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 group-hover:text-black" />
              ) : (
                <ArrowRight className="relative z-[1] h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 group-hover:text-black" />
              )}
              <span className="sr-only">Next page</span>
            </Button>
          </motion.div>
        </motion.nav>
      </div>
    </section>
  );
}
