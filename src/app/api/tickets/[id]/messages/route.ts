import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const json = await request.json().catch(() => null);
  const body = String(json?.body || "").trim().slice(0, 5000);
  if (!body) return NextResponse.json({ error: "Message required" }, { status: 400 });
  const { data: ticket } = await supabase.from("support_tickets").select("id,client_id").eq("id", id).maybeSingle();
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const staff = ["super_admin", "admin", "manager", "support_agent"].includes(profile?.role || "");
  if (ticket.client_id !== user.id && !staff) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { error } = await supabase.from("ticket_messages").insert({ ticket_id: id, sender_id: user.id, body, is_internal: false });
  if (error) return NextResponse.json({ error: "Unable to send message" }, { status: 400 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
