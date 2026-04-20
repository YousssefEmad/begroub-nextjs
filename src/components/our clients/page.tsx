import LogoCarousel from "@/components/LogoCarousel";
import { useLocale } from "next-intl";
import { ClientTypes, Section } from "@/types/apiDataTypes";

export default function ClientsSection({
  clients,
  section,
}: {
  clients: ClientTypes[];
  section: Section;
}) {
  const locale = useLocale();
  return (
    <LogoCarousel
      clients={clients}
      section={section}
      locale={locale}
      delayMs={2200}
      className="bg-main-black2 border-b border-white/10 pb-10"
    />
  );
}
