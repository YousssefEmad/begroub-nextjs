import { Almarai, Cairo } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "../styles/globals.css";
import "flag-icons/css/flag-icons.min.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import TargetCursor from "@/components/TargetCursor";
import { fetchHomeData } from "@/api/homeService";
import FloatingCTA from "@/components/FloatingCTA";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// const objektiv = localFont({
//   src: [
//     {
//       path: "../fonts/ObjektivMk3_Trial_Hair.ttf",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Th.ttf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Lt.ttf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Rg.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Md.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_SBd.ttf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Bd.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_XBd.ttf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../fonts/ObjektivMk3_Trial_Blk.ttf",
//       weight: "900",
//       style: "normal",
//     },
//   ],
//   variable: "--en-font-family",
//   display: "swap",
// });

const noeDisplay = localFont({
  src: [
    {
      path: "../fonts/fonnts.com-NoeDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--noe-font-family",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin"], // English
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--en-font-family",
  display: "swap",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--ar-font-family",
  display: "swap",
});

export const metadata = {
  title: "Be Group - Digital Marketing Agency",
  description: "We Provide Digital Marketing Solutions For Your Business",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  const homeData = await fetchHomeData(locale);
  const contact_data = homeData?.contact_data || { email: "", phone: "", address: "" };
  const social_media = homeData?.social_media || {};
  const partners = homeData?.partners || [];

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${locale === "ar" ? almarai.variable : cairo.variable} ${
        noeDisplay.variable
      }`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Keep the custom cursor outside the smooth scroll wrapper
              so it's not affected by ScrollSmoother's transforms */}
          <TargetCursor spinDuration={2} hideDefaultCursor={true} />
          <Header />
          <FloatingCTA />
          <SmoothScrollProvider>
            {children}
            <Footer
              socialMediaData={social_media}
              partnersData={partners}
              contactData={contact_data}
            />
          </SmoothScrollProvider>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
