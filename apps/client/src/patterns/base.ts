const publicRoutePatterns = [/^\/$/, /^\/login/, /^\/register/];

export const isPublicRoute = publicRoutePatterns.some((r) =>
  r.test(location.pathname)
);
