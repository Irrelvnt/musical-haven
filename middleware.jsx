import { NextResponse } from "next/server";
import verifyAuth from "./utils/verifyAuth";
const { getCookies } = require("cookies-next");

export async function middleware(request) {
  const cookies = getCookies({ req: request });
  const refreshToken = cookies.get("refreshToken");

  let verifiedRefreshToken =
    refreshToken ||
    (await verifyAuth(refreshToken).catch((err) => console.error(err.message)));

  if (request.nextUrl.pathname.startsWith("/me") && !verifiedRefreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    (request.nextUrl.asPath === "/login" ||
      request.nextUrl.asPath === "/register") &&
    verifiedRefreshToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    verifiedRefreshToken &&
    ["/register", "/login", "/survey"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/playlist/:path*", "/me/:path*", "/register", "/login"],
};
