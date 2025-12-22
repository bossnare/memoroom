import { supabase } from '@/services/supabase.service';
import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  // OAuth
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      setPending(false);
    };

    checkSession();

    // Listen auth change
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setPending(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { session, user, pending };
};
