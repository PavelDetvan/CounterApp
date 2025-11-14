import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

/**
 * Client-side Supabase client for React components
 * This automatically handles auth sessions and cookies
 */
export const supabase = createClientComponentClient<Database>();

/**
 * Standalone Supabase client (for use outside React components)
 * Use this in server actions or API routes
 */
export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
