import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LANG_COOKIE, normalizeLang } from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const urlLang = normalizeLang(req.nextUrl.searchParams.get("lang"));
  if (!urlLang) return NextResponse.next();

  // Important: if the route returns a redirect (e.g. "/" -> "/achievements"),
  // cookies set on NextResponse.next() may not reach the browser.
  // So we redirect ourselves, set the cookie, and drop the `lang` param.
  const nextUrl = req.nextUrl.clone();
  nextUrl.searchParams.delete("lang");
  if (nextUrl.pathname === "/") nextUrl.pathname = "/achievements";

  const res = NextResponse.redirect(nextUrl);
  res.cookies.set(LANG_COOKIE, urlLang, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

