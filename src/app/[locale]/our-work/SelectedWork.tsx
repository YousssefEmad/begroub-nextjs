"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import { CategoryResponse } from "@/types/apiDataTypes";
import { Link } from "@/navigations";

type WorkItem = {
  id: number;
  image: string;
  title: string;
  desc: string;
  type: string;
  slug: string;
};

export default function SelectedWork({
  projectsApiData,
}: {
  projectsApiData: CategoryResponse;
}) {
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<"all" | string>("all");

  // Flatten and normalize project data
  const selectedWorks: WorkItem[] = useMemo(() => {
    const categories = projectsApiData?.data?.categories ?? [];

    return categories.flatMap((category) =>
      category.projects.map((project) => ({
        id: project.id,
        image: project.image,
        title: project.name,
        desc: project.short_desc ?? "",
        type: category.slug ?? "unknown",
        slug: project.slug,
      }))
    );
  }, [projectsApiData]);

  // Generate unique types for filters
  const uniqueTypes = useMemo(() => {
    const allTypes = selectedWorks.map((item) => item.type);
    return Array.from(new Set(allTypes));
  }, [selectedWorks]);

  // Filter projects by type
  const filteredWorks =
    activeFilter === "all"
      ? selectedWorks
      : selectedWorks.filter((item) => item.type === activeFilter);

  // Animation settings
  const baseHidden = { opacity: 0, y: 30 };
  const baseShow = { opacity: 1, y: 0 };

  return (
    <motion.div className="w-full xl:py-12 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col gap-8 lg:gap-12">
        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {["all", ...uniqueTypes].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium border border-main-primary transition-colors duration-200 cursor-target ${
                activeFilter === filter
                  ? "bg-main-primary text-black"
                  : "border-white text-white hover:bg-white/10"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredWorks.map((item, index) => {
            const isFirstTwo = index < 2;

            return (
              <motion.div
                key={item.id}
                {...(isFirstTwo
                  ? {
                      initial: baseHidden,
                      animate: baseShow,
                      transition: { duration: 0.6, delay: index * 0.12 },
                    }
                  : {
                      initial: baseHidden,
                      whileInView: baseShow,
                      viewport: { once: true, amount: 0.25 },
                      transition: { duration: 0.6, delay: 0.08 },
                    })}
              >
                <Link href={item.slug} target="_blank">
                  <Card className="group h-full rounded-[4px] border-none overflow-hidden bg-transparent cursor-pointer shadow-none cursor-target">
                    <CardContent className="p-0 flex flex-col">
                      {/* Image */}
                      <div className="relative w-full overflow-hidden rounded-[4px]">
                        <div className="relative w-full aspect-[16/10]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                            sizes="(min-width:768px) 50vw, 100vw"
                            priority={isFirstTwo}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div
                        className={`py-4 flex flex-col gap-2 mt-2 transform transition-transform duration-500 ease-out ${
                          locale === "en"
                            ? "group-hover:translate-x-3"
                            : "group-hover:-translate-x-3"
                        }`}
                      >
                        <h3 className="text-white text-base sm:text-xl font-semibold leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
