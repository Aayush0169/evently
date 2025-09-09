import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  // The matcher tells the middleware which paths to handle.
  matcher: [
    // This regex excludes the paths you want to be public or ignored.
    // The `(?!...)` is a negative lookahead.
    '/((?!sign-in|sign-up|api/webhook|api/uploadthing|_next/static|_next/image|favicon.ico).*)',
  ],
};