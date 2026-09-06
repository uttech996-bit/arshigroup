import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./config";

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase is not configured for this deployment.");
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}
