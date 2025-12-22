import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_PUBLIC_ANON_KEY!
);

export const AuthService = {
  async googleSign() {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  },
  async githubSign() {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  },
  async signOut() {
    await supabase.auth.signOut();
  },
};
