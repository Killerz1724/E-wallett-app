import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/transactions"];
const publicRoutes = ["/login"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(path);
  const isProtected = protectedRoutes.includes(path);
  const token = request.cookies.get("access_token");
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
