const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const legacyAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Prefer the modern publishable key. If an older Vercel environment still
// exposes the legacy anon key, keep the deployment compatible during migration.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseKey =
  publishableKey?.startsWith("sb_publishable_") || publishableKey?.startsWith("eyJ")
    ? publishableKey
    : legacyAnonKey;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseKey);
}
