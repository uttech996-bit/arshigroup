import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/config";

const STAFF_ROLES = new Set(["super_admin", "admin", "manager", "support_agent", "editor"]);

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");

  if (!supabaseUrl || !supabaseKey) {
    if (isDashboard || isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("error", "configuration");
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;
  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  const emailConfirmed = Boolean(claims?.email_confirmed_at);

  if ((isDashboard || isAdmin) && !userId) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if ((isDashboard || isAdmin) && userId && !emailConfirmed) {
    return NextResponse.redirect(new URL("/auth/verify", request.url));
  }

  if (isAdmin && userId) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
    const role = typeof profile?.role === "string" ? profile.role : null;
    if (!role || !STAFF_ROLES.has(role)) return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/auth/login" && userId) return NextResponse.redirect(new URL("/dashboard", request.url));
  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/login"] };
