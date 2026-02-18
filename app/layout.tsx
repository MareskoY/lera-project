import { Nunito, Rubik } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { I18nProvider } from "@/components/I18nProvider";
import { LANG_COOKIE, normalizeLang, t } from "@/lib/i18n";

const titleFont = Rubik({
  variable: "--font-title",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
});

const uiFont = Nunito({
  variable: "--font-ui",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = normalizeLang(cookieStore.get(LANG_COOKIE)?.value) ?? "ru";
  return {
    title: t(lang, "meta.title"),
    description: t(lang, "meta.description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = normalizeLang(cookieStore.get(LANG_COOKIE)?.value) ?? "ru";
  return (
    <html lang={lang}>
      <body className={`${titleFont.variable} ${uiFont.variable} antialiased`}>
        <I18nProvider lang={lang}>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
