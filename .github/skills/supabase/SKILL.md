---
name: supabase
description: "Use for any Supabase work in ARSHI GROUP, including Next.js SSR, Auth, RLS, database changes, MCP, debugging, security, and performance."
metadata:
  author: supabase
  source: "supabase/agent-skills"
  upstream_version: "0.1.2"
---

# Supabase project skill

Use current Supabase documentation and the project-scoped Supabase MCP server before implementing Supabase changes. Verify every fix with a real test query or an application-level check.

## Non-negotiable security rules

- Never expose a Supabase secret or `service_role` key to browser code or `NEXT_PUBLIC_*` variables.
- Use publishable keys for browser/server SSR clients. Legacy `anon` is compatibility-only.
- Never use user-editable `raw_user_meta_data` for authorization. Use trusted database state or `app_metadata`.
- Every exposed `public` table must have RLS enabled and policies must enforce ownership/role authorization, not merely `TO authenticated`.
- UPDATE policies need both `USING` and `WITH CHECK` ownership constraints.
- Prefer `TO authenticated` / `TO anon` over deprecated `auth.role()` checks.
- Treat `SECURITY DEFINER` as privileged code: keep it in a private/non-exposed schema, pin its search path, and restrict EXECUTE grants.
- Views exposed through the Data API should use `security_invoker = true` on supported PostgreSQL versions.
- Do not weaken RLS to make an error disappear. Diagnose the actual access path first.

## ARSHI GROUP conventions

- Supabase project ref: `tadrqecrqvenoferfjhh`.
- Project URL is supplied at runtime through `NEXT_PUBLIC_SUPABASE_URL`.
- Prefer `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; keep legacy anon fallback only for migration compatibility.
- Never commit `.env`, `.env.local`, Vercel secrets, service-role keys, or OAuth credentials.
- Keep Supabase access behind the existing `src/lib/supabase/` clients and preserve SSR cookie handling.
- For authorization, rely on server-side Supabase claims/database role checks and RLS; never trust client-only role state.

## Workflow

1. Check current Supabase docs/changelog for the feature or error.
2. Inspect the existing schema, policies, indexes, triggers, and application access pattern before changing them.
3. Prefer the project-scoped MCP tools for database inspection, logs, advisors, docs, and generated types.
4. Make the smallest secure change that solves the problem.
5. Run security/performance advisors after schema or policy changes.
6. Verify the affected API, auth flow, RLS behavior, and build/runtime behavior before declaring the task complete.

## MCP

The repository contains `.github/mcp.json` with the Supabase remote MCP server scoped to this project. Authentication is OAuth-based and must be completed by the developer in their Copilot client/browser; never commit credentials or tokens.

## Current Supabase references

- MCP: https://supabase.com/docs/guides/ai-tools/mcp
- Agent Skills: https://supabase.com/docs/guides/ai-tools/ai-skills
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- API keys: https://supabase.com/docs/guides/api/api-keys
