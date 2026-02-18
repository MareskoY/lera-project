import { redirect } from "next/navigation";
import { normalizeLang } from "@/lib/i18n";

export default function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const langParam = searchParams?.lang;
  const lang = normalizeLang(Array.isArray(langParam) ? langParam[0] : langParam);
  redirect(lang ? `/achievements?lang=${lang}` : "/achievements");
}
