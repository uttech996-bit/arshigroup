import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const started = Date.now();
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("services").select("id").eq("is_active", true).limit(1);
    if (error) throw error;
    return Response.json(
      { status: "ok", service: "ARSHI GROUP", database: "ok", latency_ms: Date.now() - started, timestamp: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "degraded", service: "ARSHI GROUP", database: "unavailable", timestamp: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
