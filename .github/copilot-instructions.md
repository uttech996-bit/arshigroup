# ARSHI GROUP Copilot instructions

## Project
- Next.js 16 + React 19 + TypeScript + Tailwind CSS.
- Supabase project ref: `tadrqecrqvenoferfjhh`.
- Deployment target: Vercel.
- Keep production behavior secure, accessible, responsive, and performant.

## Supabase
- Use the project-scoped Supabase MCP configured in `.github/mcp.json` for Supabase inspection and verification when available.
- Use the `/supabase` and `/supabase-postgres-best-practices` skills for Supabase/database work.
- Never commit secrets, service-role keys, access tokens, passwords, or `.env*` files other than `.env.example`.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for the application. Keep legacy anon compatibility only where already implemented.
- Preserve RLS and server-side authorization. Never replace secure policies with client-side checks.

## Validation
- Before declaring a change complete, inspect the affected files, run type/lint/build checks when the environment allows, verify Supabase behavior, and check the resulting Vercel deployment status.
- For auth problems, verify the runtime environment variables and Supabase Auth/API logs before changing application security boundaries.
- Do not claim production is fixed until the deployed application is actually verified.

## Code quality
- Prefer small, reviewable changes over rewrites.
- Keep existing design language and responsive behavior unless the task explicitly requests a redesign.
- Use accessible labels, keyboard focus states, semantic HTML, and reduced-motion support.
