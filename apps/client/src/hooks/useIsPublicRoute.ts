import { useLocation } from 'react-router-dom';

const publicRoutePatterns = [
  /^\/$/,
  /^\/about/,
  /^\/pricing/,
  /^\/contact/,
  /^\/login/,
  /^\/register/,
];

export const useIsPublicRoute = () => {
  const location = useLocation();

  return publicRoutePatterns.some((r) => r.test(location.pathname));
};
