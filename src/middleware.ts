import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
