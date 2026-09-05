import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const isAdmin = pathname.startsWith("/admin");
  const response = NextResponse.next();

  if (isAdmin) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  if (isAdmin && !isLogin && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl.origin));
  }

  if (isLogin && req.auth) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return response;
});

export const config = {
  matcher: ["/admin/:path*"],
};
