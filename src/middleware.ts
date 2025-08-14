import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "./api-helper/verify-token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Define public routes that don't require authentication
  // const publicRoutes = ["/login", "/register", "/", "/about", "/contact", "/profile"];
  // console.log("token: ", token);
  const privateRoutes : string[] = ['/profile'];

  const isPrivateRoute = privateRoutes.includes(pathname)
  const isPublicRoute = !isPrivateRoute;

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check if user has token
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { valid } : { valid : boolean } = await verifyTokenEdge(token, request)

  console.log("Is Valid Token? ", valid);

  if(!valid){
    request.cookies.delete('token');
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
  // runtime: 'nodejs', // Force Node.js runtime instead of Edge Runtime
};
