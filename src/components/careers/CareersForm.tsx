"use client";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Upload, FileText, X } from "lucide-react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { sendCareerData } from "@/api/careerSerivce";
import { JobPosition } from "@/types/careersApiTypes";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export default function CareersForm({ jobPositions }: { jobPositions?: JobPosition[] }) {
  const t = useTranslations("careers");
  const locale = useLocale();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const CareersSchema = z.object({
    name: z.string().min(3, t("Please Enter Your Full Name")),
    email: z.string().email(t("Enter A Valid Email")),
    phone: z.string().min(10, t("Enter A Valid Phone Number")),
    job_position_id: z.string().min(1, t("Please Select A Job Position")),
    position: z.string().min(3, t("Please Enter Your Position")),
    cv: z
      .any()
      .refine((file) => file instanceof File, t("Please Upload Your Resume"))
      .refine((file) => file?.size <= MAX_FILE_SIZE, t("Max file size is 5MB"))
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        t("Only PDF and DOCX files are allowed")
      ),
    cover_letter: z.string().min(50, t("Message Should Be At Least 50 Characters")),
  });

  type CareersFormValues = z.infer<typeof CareersSchema>;

  const form = useForm<CareersFormValues>({
    resolver: zodResolver(CareersSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      job_position_id: "",
      position: "",
      cover_letter: "",
    },
    mode: "onChange",
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 85%", "end 35%"],
  });
  const yLift = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const fadeIn = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const onSubmit = async (values: CareersFormValues) => {
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("job_position_id", values.job_position_id);
      formData.append("position", values.position);
      formData.append("cv", values.cv);
      formData.append("cover_letter", values.cover_letter);

      const response = await sendCareerData(formData);

      if (response.success) {
        setSuccessMsg(t("Your Application Has Been Sent Successfully"));
        form.reset();
        setFileName(null);
      } else {
        setErrorMsg(response.message || t("Something Went Wrong Please Try Again Later"));
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  const removeFile = () => {
    setFileName(null);
    form.setValue("cv", undefined as any);
  };

  return (
    <motion.div
      ref={wrapRef}
      style={{ y: yLift, opacity: fadeIn }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVar}
      className="max-w-4xl mx-auto"
    >
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-white/5 p-6 sm:p-10 rounded-2xl border border-white/10"
          variants={sectionVar}
        >
          {/* ===== Feedback messages ===== */}
          {successMsg && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-4 rounded-md bg-green-500/20 text-green-400 border border-green-500/30"
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
              className="flex items-center gap-2 p-4 rounded-md bg-red-500/20 text-red-400 border border-red-500/30"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{errorMsg}</p>
            </motion.div>
          )}

          {/* ===== Fields ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base">
                      {t("Name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Enter Your Name")}
                        className="cursor-target bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-[8px] focus:border-main-primary/50 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
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
                    <FormLabel className="text-white/90 text-base">
                      {t("Email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("Enter Your Email")}
                        className="cursor-target bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-[8px] focus:border-main-primary/50 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </motion.div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base">
                      {t("Phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        type="tel"
                        placeholder={t("Enter Your Phone")}
                        className="cursor-target bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-[8px] focus:border-main-primary/50 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </motion.div>
                </FormItem>
              )}
            />

            {/* Job Position Selector */}
            <FormField
              control={form.control}
              name="job_position_id"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base">
                      {t("Job Position")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-target bg-white/5 border-white/10 h-12 rounded-[8px] text-white focus:ring-0 focus:border-main-primary/50 transition-colors [&>span:not([data-placeholder])]:text-white [&>span[data-placeholder]]:text-white/30 [&>svg]:text-white [&>svg]:opacity-100">
                          <SelectValue placeholder={t("Select A Job Position")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1a1a] border-white/10 text-white rounded-[8px]">
                        {jobPositions?.map((job) => (
                          <SelectItem key={job.id} value={job.id.toString()} className="cursor-target focus:bg-main-primary focus:text-main-black cursor-pointer transition-colors">
                            {job.title}
                          </SelectItem>
                        ))}
                        {/* Fallback items if no dynamic data */}
                        {!jobPositions && (
                          <>
                            <SelectItem value="web" className="cursor-target focus:bg-main-primary focus:text-main-black cursor-pointer transition-colors">{t("Web Development")}</SelectItem>
                            <SelectItem value="social" className="cursor-target focus:bg-main-primary focus:text-main-black cursor-pointer transition-colors">{t("Social Media")}</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </motion.div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <motion.div variants={fadeUpVar}>
                    <FormLabel className="text-white/90 text-base">
                      {t("Position")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        type="text"
                        placeholder={t("Enter Your Position")}
                        className="cursor-target bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-[8px] focus:border-main-primary/50 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </motion.div>
                </FormItem>
              )}
            />
          </div>

          {/* Resume Upload */}
          <FormField
            control={form.control}
            name="cv"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <motion.div variants={fadeUpVar}>
                  <FormLabel className="text-white/90 text-base">
                    {t("Resume")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {!fileName ? (
                        <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-main-primary/50 transition-all cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, onChange)}
                          />
                          <Upload className="w-8 h-8 text-white/30 group-hover:text-main-primary transition-colors mb-2" />
                          <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors px-4 text-center">
                            {t("Upload Your Resume")}
                          </p>
                          <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">
                            PDF, DOCX (MAX 5MB)
                          </p>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-main-primary/30">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-[8px] bg-main-primary/20 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-main-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-white font-medium truncate max-w-[200px]">
                                {fileName}
                              </span>
                              <span className="text-[10px] text-white/50 uppercase">
                                Ready to upload
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-red-400 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </motion.div>
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="cover_letter"
            render={({ field }) => (
              <FormItem>
                <motion.div variants={fadeUpVar}>
                  <FormLabel className="text-white/90 text-base">
                    {t("Message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder={t("Enter Your Message")}
                      className="cursor-target bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none rounded-[8px] focus:border-main-primary/50 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </motion.div>
              </FormItem>
            )}
          />

          {/* ===== Footer ===== */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10"
            variants={fadeUpVar}
          >
            <div className="flex items-start gap-3 max-w-md">
              <AlertCircle className="w-5 h-5 text-main-primary shrink-0 mt-0.5" />
              <p className="text-xs text-white/50 leading-relaxed">
                {t("By sending the form you agree to the")}{" "}
                <Link href="/terms" className="text-main-primary hover:underline transition-all">
                  {t("Terms")} & {t("Conditions")}
                </Link>{" "}
                {t("and")}{" "}
                <Link href="/privacy" className="text-main-primary hover:underline transition-all">
                  {t("Privacy Policy")}
                </Link>
                . {t("All the fields are required")}.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="cursor-target w-full sm:w-auto px-10 h-14 bg-main-primary rounded-[6px] text-main-black hover:bg-white transition-all duration-300 font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-main-black/30 border-t-main-black rounded-full animate-spin" />
                  {t("Sending")}
                </div>
              ) : (
                t("Send Application")
              )}
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
}