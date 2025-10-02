import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Movie {
  id?: string;
  title: string;
  description: string;
  poster_url: string;
  rating: number;
  trailer_url?: string;
  created_at?: string;
}
