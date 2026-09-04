import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = clean(body?.name, 120), email = clean(body?.email, 254).toLowerCase(), phone = clean(body?.phone, 40), message = clean(body?.message, 5000);
  if (!name || !email || !message) return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  if (!emailPattern.test(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  if (name.length < 2 || message.length < 10) return NextResponse.json({ error: "Please provide more complete information." }, { status: 400 });
  const source = ["website_contact", "website"].includes(clean(body?.source, 40)) ? clean(body?.source, 40) : "website_contact";
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({ name, email, phone: phone || null, message, source, status: "new" });
  if (error) return NextResponse.json({ error: "Unable to submit your inquiry." }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
