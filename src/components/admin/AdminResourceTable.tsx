'use client';

import Link from "next/link";
import { useMemo, useState } from "react";

type Row = Record<string, unknown> & { id: string };

export default function AdminResourceTable({ resource, columns, rows }: { resource: string; columns: string[]; rows: Row[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filterColumn = columns.find((c) => ["status", "role", "source", "priority"].includes(c));
  const options = useMemo(() => filterColumn ? ["all", ...Array.from(new Set(rows.map((r) => String(r[filterColumn] ?? "")).filter(Boolean))).sort()] : ["all"], [rows, filterColumn]);
  const filtered = useMemo(() => rows.filter((row) => {
    const matchesQuery = !query || columns.some((column) => String(row[column] ?? "").toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = filter === "all" || String(row[filterColumn ?? ""] ?? "") === filter;
    return matchesQuery && matchesFilter;
  }), [rows, query, filter, columns, filterColumn]);

  return <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
    <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.03] p-4 sm:flex-row">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search records…" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500" />
      {filterColumn && <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500">{options.map((option) => <option key={option} value={option}>{option === "all" ? `All ${filterColumn}` : option}</option>)}</select>}
    </div>
    <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500"><span>Showing {filtered.length} of {rows.length}</span>{query || filter !== "all" ? <button onClick={() => { setQuery(""); setFilter("all"); }} className="text-blue-400 hover:text-blue-300">Clear filters</button> : null}</div>
    <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-white/[0.04] text-slate-400"><tr>{columns.map((column) => <th key={column} className="px-4 py-4 capitalize">{column.replaceAll("_", " ")}</th>)}<th className="px-4 py-4">Actions</th></tr></thead>
      <tbody className="divide-y divide-white/10">{filtered.map((row) => <tr key={row.id} className="hover:bg-white/[0.02]">{columns.map((column) => <td key={column} className="max-w-xs px-4 py-4 text-slate-300">{typeof row[column] === "boolean" ? (row[column] ? "Yes" : "No") : String(row[column] ?? "—")}</td>)}<td className="px-4 py-4"><div className="flex gap-2"><Link href={`/admin/${resource}/${row.id}/edit`} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/5">Edit</Link>{resource !== "clients" && <form action={`/api/admin/${resource}/${row.id}`} method="post"><input type="hidden" name="_method" value="delete" /><button className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10">Delete</button></form>}</div></td></tr>)}</tbody>
    </table></div>
    {!filtered.length && <div className="p-8 text-center text-slate-400">No matching records found.</div>}
  </div>;
}
