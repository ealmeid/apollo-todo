export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  manage: "/manage",
} as const;

export type Route = keyof typeof routes;
export type RoutePath = (typeof routes)[Route];
