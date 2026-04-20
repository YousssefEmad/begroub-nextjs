"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BlogDetailsResponse } from "@/types/apiDataTypes";

export default function BlogDetails({
  blogDetalisData,
}: {
  blogDetalisData: BlogDetailsResponse;
}) {
  const {
    blog: { name, date, short_desc, long_desc, image, alt_image },
  } = blogDetalisData.data;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Format date nicely (optional)
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="min-h-screen text-white px-4 py-8 mx-auto container mt-[75px]">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Hero Image */}
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

        {/* Header Section */}
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
            <span className="w-1 h-1 rounded-full bg-[#6E717E]" />
            {/* Assuming 8 min read is static, keep as is */}
            <span>8 min read</span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <motion.div
            className="space-y-6 leading-relaxed"
            style={{ color: "var(--main-colors-text-secondary)" }}
          >
            {/* Use short_desc or long_desc dynamically, plus keep static text */}
            <p className="text-xl leading-relaxed">{short_desc}</p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="border-l-4 pl-6 py-4 my-8"
              style={{
                borderColor: "var(--main-colors-primary)",
                backgroundColor: "var(--main-colors-black-secondary)",
              }}
            >
              <p
                className="text-lg italic"
                style={{ color: "var(--main-colors-white)" }}
              >
                Good design is obvious. Great design is transparent. — Joe
                Sparano
              </p>
            </motion.div>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              1. Clarity is King
            </h2>
            <p>
              Users should never have to guess what an element does or where to
              find information. Every interaction should be self-explanatory.
              Use clear labels, intuitive icons, and maintain visual hierarchy
              to guide users effortlessly through your interface.
            </p>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              2. Consistency Creates Comfort
            </h2>
            <p>
              Maintain consistent patterns throughout your design. When buttons,
              colors, typography, and interactions behave predictably, users
              build mental models that reduce cognitive load. Consistency breeds
              familiarity, and familiarity breeds confidence.
            </p>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              3. Feedback Loops Matter
            </h2>
            <p>
              Every action should have a reaction. Whether it is a button press,
              form submission, or loading state, users need immediate feedback
              that confirms their actions. Subtle animations,
              micro-interactions, and status indicators transform static
              interfaces into living, breathing experiences.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="rounded-xl p-8 my-12"
              style={{ backgroundColor: "var(--main-colors-black-secondary)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--main-colors-primary)" }}
              >
                Pro Tip: The 5-Second Rule
              </h3>
              <p style={{ color: "var(--main-colors-text-secondary)" }}>
                Can users understand your interface is purpose within 5 seconds?
                If not, simplify. Remove unnecessary elements, strengthen your
                visual hierarchy, and focus on what truly matters.
              </p>
            </motion.div>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              4. Accessibility is Non-Negotiable
            </h2>
            <p>
              Design for everyone, not just the majority. Consider color
              contrast, keyboard navigation, screen reader compatibility, and
              alternative text. Accessible design is not just ethical it is
              better design for all users.
            </p>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              5. Less is More (Most of the Time)
            </h2>
            <p>
              Embrace white space. Every element in your design should earn its
              place. Cluttered interfaces overwhelm users and hide important
              content. Strip away the unnecessary and let your core features
              shine.
            </p>

            <h2
              className="text-3xl font-bold mt-12 mb-4"
              style={{ color: "var(--main-colors-white)" }}
            >
              Final Thoughts
            </h2>
            <p className="text-lg">{long_desc}</p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-12 pt-8 border-t"
              style={{ borderColor: "var(--main-colors-black-secondary)" }}
            >
              <p style={{ color: "var(--main-colors-text-secondary)" }}>
                Want to dive deeper into UX design? Follow our blog for weekly
                insights, case studies, and practical tips you can implement
                today.
              </p>
            </motion.div>
          </motion.div>
        </motion.article>
      </motion.div>
    </section>
  );
}
