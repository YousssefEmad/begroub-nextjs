/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-assign-module-variable */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ar"];
const namespaces = [
  "header",
  "hero",
  "about",
  "footer",
  "clients",
  "services",
  "portfolio",
  "whyus",
  "achievements",
  "blogs",
  "contact",
  "careers",
]; // Add more as needed

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => {
        const module = await import(`../../messages/${locale}/${ns}.json`);
        return [ns, module.default];
      })
    )
  );

  return {
    messages,
  };
});
