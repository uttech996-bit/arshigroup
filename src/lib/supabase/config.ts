const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const legacyAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Prefer the current Supabase publishable key. A stale legacy anon key must
// never override a valid publishable key in Vercel. Legacy anon is only the
// fallback for older deployments that have not migrated yet.
export const supabaseKey = publishableKey || legacyAnonKey;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseKey);
}
