import type { Metadata } from "next";
import { Nunito, Rubik } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

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

export const metadata: Metadata = {
  title: "С Днём рождения, Лерик",
  description: "Интерактивная открытка — история, расписание и подарки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${titleFont.variable} ${uiFont.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
