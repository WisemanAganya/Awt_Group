import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
// Use fallbacks to prevent crash if environment variables are missing
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn("Missing Supabase environment variables! Using placeholders to prevent crash.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
