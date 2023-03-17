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
    verifiedRefreshToken &&
    ["/", "/register", "/login", "/survey"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/me", request.url));
  }
}

export const config = {
  matcher: ["/", "/playlist/:path*", "/me/:path*"],
};
