import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import { LangProvider } from '../context/LangContext'
import { OrdersProvider } from '../context/OrdersContext'
import { Guard } from './Guard'
import { PATHS } from './paths'

import LandingPage      from '../pages/LandingPage'
import AuthNavbar       from '../components/auth/Navbar'
import SignInPage       from '../pages/SignInPage'
import SignUpPage       from '../pages/SignUpPage'
import DashboardPage    from '../pages/DashboardPage'
import FleetDashboard   from '../pages/FleetDashboard'
import ClientDashboard  from '../pages/orders/ClientDashboard'
import OrdersListPage   from '../pages/orders/OrdersListPage'
import CreateOrderPage  from '../pages/orders/CreateOrderPage'
import RouteViewPage    from '../pages/orders/RouteViewPage'
import DepotPortalPage  from '../depot/DepotPortalPage'

function RootLayout() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Outlet />
      </LangProvider>
    </ThemeProvider>
  )
}

function AuthRouteWrapper() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
    </>
  )
}

function OrdersLayout() {
  return (
    <OrdersProvider>
      <Outlet />
    </OrdersProvider>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: PATHS.public.home, element: <LandingPage /> },

      {
        element: <AuthRouteWrapper />,
        children: [
          {
            element: <Guard publicOnly />,
            children: [
              { path: PATHS.public.signIn, element: <SignInPage /> },
              { path: PATHS.public.signUp, element: <SignUpPage /> },
            ],
          },
        ],
      },

      // Admin / fleet routes
      {
        element: <Guard requireAuth allowedRoles={['admin', 'dispatcher']} />,
        children: [
          { path: PATHS.app.dashboard, element: <DashboardPage /> },
          { path: PATHS.app.fleet,     element: <FleetDashboard /> },
        ],
      },

      // Client orders routes
      {
        element: <Guard requireAuth allowedRoles={['client']} />,
        children: [
          {
            element: <OrdersLayout />,
            children: [
              { path: PATHS.DASHBOARD,    element: <ClientDashboard /> },
              { path: PATHS.ORDERS,       element: <OrdersListPage /> },
              { path: PATHS.ORDER_NEW,    element: <CreateOrderPage /> },
              { path: PATHS.ORDER_ROUTE,  element: <RouteViewPage /> },
            ],
          },
        ],
      },

      // Depot — acces direct, fără autentificare (portal intern)
      {
        element: <OrdersLayout />,
        children: [
          { path: PATHS.DEPOT, element: <DepotPortalPage /> },
        ],
      },

      { path: '*', element: <Navigate to={PATHS.public.home} replace /> },
    ],
  },
])
