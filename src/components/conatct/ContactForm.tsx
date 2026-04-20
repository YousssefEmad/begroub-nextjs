"use client";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigations";
import { sendContactData } from "@/api/contactService";
import { Service } from "@/types/apiDataTypes";

// ===== Motion settings =====
const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVar: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUpVar: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function ContactForm({ servicesData }: { servicesData: Service[] }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const ContactSchema = z.object({
    name: z.string().min(3, t("Please Enter Your Full Name")),
    email: z.string().email(t("Enter A Valid Email")),
    phone: z.string().min(10, t("Enter A Valid Phone Number")),
    service: z.string().min(1, t("Please Select A Service")),
    message: z.string().min(50, t("Message Should Be At Least 50 Characters")),
  });

  type ContactFormValues = z.infer<typeof ContactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
    mode: "onChange",
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 85%", "end 35%"],
  });
  const yLift = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const fadeIn = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const onSubmit = async (values: ContactFormValues) => {
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await sendContactData(values);

      if (res.success) {
        setSuccessMsg(t("Your Message Has Been Sent Successfully"));
        form.reset();
      } else {
        const serverMsg =
          res.message ||
          Object.values(
            (res as { errors?: Record<string, string[]> }).errors || {},
          )
            ?.flat()
            ?.join(", ") ||
          "Something went wrong.";
        setErrorMsg(serverMsg);
      }
    } catch {
      setErrorMsg(t("Something Went Wrong Please Try Again Later"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  return (
    <motion.div
      ref={wrapRef}
      style={{ y: yLift, opacity: fadeIn }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVar}
    >
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          variants={sectionVar}
        >
          {/* ===== Feedback messages ===== */}
          {successMsg && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-4 rounded-md bg-green-100 text-green-800 border border-green-300"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="font-medium">{successMsg}</p>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-4 rounded-md bg-red-100 text-red-700 border border-red-300"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{errorMsg}</p>
            </motion.div>
          )}

          {/* ===== Fields ===== */}

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <motion.div variants={fadeUpVar}>
                  <FormLabel className="text-white/90 text-base sm:text-lg">
                    {t("Name")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("Enter Your Name")}
                      className="cursor-target bg-transparent border-white/70 text-white placeholder:text-white/40 h-14 rounded-[6px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </motion.div>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <motion.div variants={fadeUpVar}>
                  <FormLabel className="text-white/90 text-base sm:text-lg">
                    {t("Email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("Enter Your Email")}
                      className="cursor-target bg-transparent border-white/70 text-white placeholder:text-white/40 h-14 rounded-[6px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </motion.div>
              </FormItem>
            )}
          />

          {/* Phone + Service Type — same row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base sm:text-lg">
                      {t("Phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        type="tel"
                        placeholder={t("Enter Your Phone")}
                        inputMode="tel"
                        pattern="^[0-9+]*$"
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(
                            /[^0-9+]/g,
                            "",
                          );
                          field.onChange(cleaned);
                        }}
                        value={field.value}
                        name={field.name}
                        ref={field.ref}
                        className="cursor-target bg-transparent border-white/70 text-white placeholder:text-white/40 h-14 rounded-[6px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </motion.div>
                </FormItem>
              )}
            />

            {/* Service Type */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base sm:text-lg">
                      {t("Service Type")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-target bg-transparent border-white/70 h-14 rounded-[6px] focus:ring-0 focus:ring-offset-0 text-white [&>span:not([data-placeholder])]:text-white [&>span[data-placeholder]]:text-white/40">
                          <SelectValue placeholder={t("Select A Service")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1a1a] border-white/20 text-white rounded-[6px]">
                        {servicesData.map((service: Service) => (
                          <SelectItem
                            key={service.id}
                            value={service.id.toString()}
                            className="cursor-target text-white/80 focus:bg-white/10 focus:text-white cursor-pointer"
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </motion.div>
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <motion.div variants={fadeUpVar}>
                  <FormLabel className="text-white/90 text-base sm:text-lg">
                    {t("Message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={7}
                      placeholder={t("Enter Your Message")}
                      className="cursor-target bg-transparent border-white/70 text-white placeholder:text-white/40 resize-y rounded-[6px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </motion.div>
              </FormItem>
            )}
          />

          {/* ===== Footer ===== */}
          <motion.div
            className="flex lg:justify-between flex-col lg:flex-row items-center gap-6 lg:gap-0"
            variants={fadeUpVar}
          >
            <motion.div
              className="flex items-center gap-4 text-sm text-white/70 w-fit"
              variants={fadeUpVar}
            >
              <AlertCircle className="mt-0.5 h-5 w-5 text-main-primary shrink-0" />
              <p>
                <span className="font-medium">
                  {t("All the fields are required")}
                </span>{" "}
                {t("By sending the form you agree to the")}{" "}
                <Link href="/terms" className="underline hover:opacity-80">
                  {t("Terms")} &amp; {t("Conditions")}
                </Link>{" "}
                {t("and")}{" "}
                <Link href="/privacy" className="underline hover:opacity-80">
                  {t("Privacy Policy")}
                </Link>
                .
              </p>
            </motion.div>

            <motion.div variants={fadeUpVar}>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="cursor-target uppercase bg-main-primary text-main-text hover:bg-white/90 p-6 !rounded-[4px] w-full lg:w-auto"
                  variant="default"
                  disabled={loading}
                >
                  {loading ? t("Sending") : t("Send Message")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
}
