import { supabaseKey, supabaseUrl } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ ok: false, service: "ARSHI GROUP", supabase: { configured: false } }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      cache: "no-store",
    });
    return Response.json({
      ok: response.ok,
      service: "ARSHI GROUP",
      supabase: {
        configured: true,
        reachable: true,
        authenticated: response.ok,
        keyType: supabaseKey.startsWith("sb_publishable_") ? "publishable" : supabaseKey.startsWith("eyJ") ? "legacy-jwt" : "unknown",
        status: response.status,
      },
    }, { status: response.ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false, service: "ARSHI GROUP", supabase: { configured: true, reachable: false } }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
