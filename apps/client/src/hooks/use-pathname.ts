import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePathname = () => {
  const [cleanPathname, setCleanPathname] = useState('');

  const location = useLocation();
  const pathname = location.pathname;
  const segments = location.pathname.split('/').filter(Boolean);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCleanPathname(segments[0]); // get pathname without '/'
  }, [setCleanPathname, segments]);

  return { cleanPathname, pathname };
};
