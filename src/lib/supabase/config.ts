const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const legacyAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Prefer a known-good legacy anon key when it is still configured. This keeps
// existing Vercel deployments working while the project migrates to the new
// publishable-key format. The modern key is used when no legacy key exists.
export const supabaseKey = legacyAnonKey || publishableKey;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseKey);
}
