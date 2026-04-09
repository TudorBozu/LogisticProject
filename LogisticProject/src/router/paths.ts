export const PATHS = {
  public: {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  app: {
    dashboard: "/dashboard",
    fleet: "/fleet",
  },
  DASHBOARD:   "/orders",
  ORDERS:      "/orders/list",
  ORDER_NEW:   "/orders/new",
  ORDER_ROUTE: "/orders/:id/route",
  DEPOT:       "/depot",
} as const;

export function orderRoutePath(id: string) {
  return `/orders/${id}/route`
}
