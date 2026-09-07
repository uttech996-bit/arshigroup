import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const secret = process.env.ARSHI_BOOTSTRAP_SECRET;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ARSHI_BOOTSTRAP_ADMIN_EMAIL || "admin@arshigroup.com";
  const password = process.env.ARSHI_BOOTSTRAP_ADMIN_PASSWORD;
  const provided = request.headers.get("x-bootstrap-secret");

  if (!secret || !serviceKey || !password || provided !== secret) {
    return NextResponse.json({ error: "Bootstrap is not configured." }, { status: 404 });
  }
  if (password.length < 8) return NextResponse.json({ error: "Bootstrap password must be at least 8 characters." }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return NextResponse.json({ error: "Supabase URL is not configured." }, { status: 500 });

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const match = existing.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  let userId = match?.id;

  if (userId) {
    const { error } = await admin.auth.admin.updateUserById(userId, { email, password, email_confirm: true, user_metadata: { full_name: "Admin" } });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  } else {
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: "Admin" } });
    if (error || !data.user) return NextResponse.json({ error: error?.message || "Unable to create admin." }, { status: 400 });
    userId = data.user.id;
  }

  const { error: profileError } = await admin.from("profiles").upsert({ id: userId, full_name: "Admin", role: "super_admin" }, { onConflict: "id" });
  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 });

  return NextResponse.json({ ok: true, email, role: "super_admin", message: "Temporary admin account is ready. Remove the bootstrap environment variables after first login and change the password from Admin Settings." });
}
