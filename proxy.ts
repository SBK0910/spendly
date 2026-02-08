import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    '/',
])

const isSignInRoute = createRouteMatcher([
    '/signin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
    if (isPublicRoute(req)) return;

    const { isAuthenticated } = await auth();
    const onSignIn = isSignInRoute(req);

    if (onSignIn && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!onSignIn && !isAuthenticated) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};