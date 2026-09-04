import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
const roles = ["client", "super_admin", "admin", "manager", "support_agent", "editor"] as const;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!uuid.test(id)) return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: me } = await s.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "super_admin") return NextResponse.json({ error: "Only Super Admin can change roles" }, { status: 403 });
  if (id === user.id) return NextResponse.json({ error: "A Super Admin cannot change their own role." }, { status: 400 });
  const body = await req.json().catch(() => null);
  if (!roles.includes(body?.role)) return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  const { error } = await s.from("profiles").update({ role: body.role }).eq("id", id);
  if (error) return NextResponse.json({ error: "Unable to change role" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
