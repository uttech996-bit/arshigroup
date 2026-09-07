---
name: supabase-postgres-best-practices
description: "Use before changing ARSHI GROUP PostgreSQL schema, migrations, RLS policies, indexes, triggers, functions, queries, or database performance."
license: MIT
metadata:
  author: supabase
  source: "supabase/agent-skills"
  upstream_version: "1.1.1"
---

# Supabase PostgreSQL best practices

Apply these rules before changing the ARSHI GROUP Supabase database.

## Priority order

1. Query performance and correct indexes
2. Connection management
3. Security and RLS
4. Schema design
5. Concurrency and locking
6. Data-access patterns
7. Monitoring and diagnostics
8. Advanced PostgreSQL features

## Security and RLS

- Enable RLS on every table in exposed schemas.
- Policies must express both role and authorization/ownership.
- Use `(select auth.uid())` for stable ownership predicates where appropriate.
- UPDATE policies require matching `USING` and `WITH CHECK` conditions.
- Never use `auth.role()` for authorization.
- Do not expose privileged functions through `public` without a deliberate access model.
- Review views for `security_invoker = true` when they are exposed through the Data API.
- After policy/schema changes, verify access with both an authenticated user context and an unrelated user context.

## Performance

- Index foreign-key columns used in joins, ownership filters, and cascading relationships when justified by workload.
- Avoid duplicate indexes.
- Prefer selective/partial indexes for common filtered access paths when appropriate.
- Inspect query plans before adding broad indexes.
- Avoid unbounded result sets; paginate or cap application queries.
- Keep RLS predicates simple and index the columns used by frequent ownership/role checks.

## Change workflow

1. Inspect current schema, constraints, policies, indexes, triggers, and functions.
2. Check current Supabase/PostgreSQL documentation.
3. Make the smallest safe change.
4. Run security and performance advisors.
5. Test the changed behavior and verify that unrelated users cannot access protected rows.
6. Keep migrations and schema history reproducible.
