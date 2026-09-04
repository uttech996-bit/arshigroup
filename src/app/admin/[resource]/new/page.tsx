import Link from "next/link";
import AdminRecordForm from "@/components/admin/AdminRecordForm";

const fields: Record<string, string[]> = {
  leads: ["name", "email", "phone", "company_name", "message", "status", "source"],
  projects: ["client_id", "name", "slug", "description", "status", "start_date", "due_date"],
  invoices: ["client_id", "invoice_number", "amount", "currency", "status", "due_date", "notes"],
  tickets: ["client_id", "subject", "description", "status", "priority"],
  services: ["name", "slug", "short_description", "description", "is_active"],
  portfolio: ["title", "slug", "description", "image_url", "project_url", "service_id", "is_featured", "is_published"],
};

export default async function NewAdminRecordPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const names = fields[resource];
  if (!names) return <main className="min-h-screen bg-slate-950 p-10 text-white">Resource not found.</main>;
  return <main className="min-h-screen bg-slate-950 px-5 py-10 text-white"><div className="mx-auto max-w-3xl"><Link href={`/admin/${resource}`} className="text-sm text-slate-400 hover:text-white">← Back</Link><h1 className="mt-8 text-4xl font-bold">Add {resource}</h1><AdminRecordForm resource={resource} fields={names} /></div></main>;
}
