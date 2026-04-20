import { Button } from "@/components/ui/button";
import { Link } from "@/navigations";
import { getLocale } from "next-intl/server";
import { Home } from "lucide-react";

const copy = {
  en: {
    badge: "404",
    title: "Oops, this page drifted into the void.",
    description:
      "The link might be broken or the page may have been moved. Let’s get you back on track.",
    homeCta: "Back To Home Page",
    contactCta: "Talk to our team",
    helper: "If you typed the address, double‑check the spelling.",
  },
  ar: {
    badge: "٤٠٤",
    title: "يبدو أن هذه الصفحة ضاعت في الفراغ.",
    description:
      "قد يكون الرابط غير صالح أو تم نقل الصفحة. دعنا نعيدك إلى المسار الصحيح.",
    homeCta: "العودة للصفحة الرئيسية",
    helper: "إذا كتبت العنوان يدويًا، يرجى التحقق من صحة الكتابة.",
  },
};

export default async function NotFound() {
  const locale = await getLocale();
  const t = locale === "ar" ? copy.ar : copy.en;

  return (
    <section className="relative min-h-[75vh] overflow-hidden px-6 py-40 text-main-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-main-black to-main-black2 opacity-95" />
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-main-primary/25 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-main-secondary/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-main-primary/40 bg-main-primary/10 px-4 py-1 text-xl font-semibold uppercase tracking-[0.25em] text-main-primary">
          {t.badge}
        </span>

        <h1 className="text-[clamp(32px,4vw,56px)] font-semibold leading-tight text-main-white">
          {t.title}
        </h1>

        <p className="text-base leading-relaxed text-main-text2">
          {t.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button className="flex items-center gap-2 border-2 border-main-primary bg-main-primary px-5 py-2 text-sm font-semibold text-main-black transition hover:bg-main-primary/90 hover:text-main-black !rounded-[6px] h-auto">
              <Home className="h-4 w-4" />
              {t.homeCta}
            </Button>
          </Link>
        </div>

        <p className="text-xs text-main-text2/80">{t.helper}</p>
      </div>
    </section>
  );
}

