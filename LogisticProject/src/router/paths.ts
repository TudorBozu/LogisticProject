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
  DRIVER:         '/driver',
  DRIVER_VEHICLE: '/driver/vehicle',
  DRIVER_HISTORY: '/driver/history',
  errors: {
    e401: '/401',
    e403: '/403',
    e404: '/404',
    e500: '/500',
  },
} as const;

export function orderRoutePath(id: string) {
  return `/orders/${id}/route`
}
