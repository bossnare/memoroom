import { supabase } from '@/auth-services/clients.service';
import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const publicRoutePatterns = [/^\/$/, /^\/login/, /^\/register/];

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const location = useLocation();

  const isPublicRoute = publicRoutePatterns.some((r) =>
    r.test(location.pathname)
  );

  const navigate = useNavigate();

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
  }, [navigate]);

  useEffect(() => {
    // redirect
    if (session && isPublicRoute) navigate('/dashboard', { replace: true });
  }, [session, navigate, isPublicRoute]);

  return { session, user, pending };
};
