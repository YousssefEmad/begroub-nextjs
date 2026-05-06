"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BlogDetailsResponse } from "@/types/apiDataTypes";

const DEFAULT_IMAGE = "https://newapi.be-group.com/assets/dashboard/images/noimage.png";

export default function BlogDetails({
  blogDetalisData,
}: {
  blogDetalisData: BlogDetailsResponse;
}) {
  const { blog } = blogDetalisData.data;
  const { name, date, short_desc, long_desc, image, alt_image } = blog;

  const rawDate =
    date ||
    blogDetalisData.data?.seo?.schema?.find(
      (s: { "@type": string; datePublished?: string }) =>
        s["@type"] === "Article"
    )?.datePublished;

  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const hasImage = image && image !== DEFAULT_IMAGE;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  return (
    <>
      <style>{`
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
          border-bottom: 2px solid var(--main-colors-primary, #f97316);
          padding-bottom: 0.4rem;
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--main-colors-primary, #f97316);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-content p {
          color: #9ca3af;
          line-height: 1.8;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
        .blog-content a {
          color: var(--main-colors-primary, #f97316);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        .blog-content a:hover {
          opacity: 0.8;
        }
        .blog-content ol,
        .blog-content ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #9ca3af;
        }
        .blog-content ol { list-style-type: decimal; }
        .blog-content ul { list-style-type: disc; }
        .blog-content li {
          margin-bottom: 0.4rem;
          line-height: 1.7;
        }
        .blog-content strong,
        .blog-content b {
          color: #ffffff;
          font-weight: 600;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--main-colors-primary, #f97316);
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background-color: rgba(255,255,255,0.04);
          border-radius: 0 8px 8px 0;
          color: #ffffff;
          font-style: italic;
        }
        .blog-content img {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        .blog-content .MsoNormal {
          margin: 0 0 0.75rem 0;
        }
      `}</style>

      <section className="min-h-screen text-white px-4 py-8 mx-auto container mt-[75px]">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8"
            >
              <Image
                src={image}
                alt={alt_image ?? name}
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141415] via-transparent to-transparent opacity-60" />
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ color: "var(--main-colors-white)" }}
            >
              {name}
            </motion.h1>

            <motion.div
              className="flex items-center gap-4 text-sm"
              style={{ color: "var(--main-colors-text-secondary)" }}
            >
              {formattedDate && (
                <>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formattedDate}
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            {/* short_desc كعنوان */}
            {short_desc && (
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--main-colors-primary)" }}
              >
                {short_desc}
              </motion.h2>
            )}

            {long_desc && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: long_desc }}
              />
            )}
          </motion.article>
        </motion.div>
      </section>
    </>
  );
}