export async function GET() {
  return Response.json({ status: "ok", service: "ARSHI GROUP", timestamp: new Date().toISOString() });
}
