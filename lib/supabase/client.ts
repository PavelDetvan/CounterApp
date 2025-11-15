import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

/**
 * Client-side Supabase client for React components
 * This automatically handles auth sessions and cookies
 */
export const supabase = createClientComponentClient<Database>();
