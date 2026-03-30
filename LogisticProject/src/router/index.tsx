import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import { LangProvider } from '../context/LangContext'
import { Guard } from './Guard'
import { PATHS } from './paths'

import LandingPage from '../pages/LandingPage'
import AuthNavbar from '../components/auth/Navbar'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import DashboardPage from '../pages/DashboardPage'
import FleetDashboard from '../pages/FleetDashboard'

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

      {
        element: <Guard requireAuth />,
        children: [
          { path: PATHS.app.dashboard, element: <DashboardPage /> },
          { path: PATHS.app.fleet, element: <FleetDashboard /> },
        ],
      },

      { path: '*', element: <Navigate to={PATHS.public.home} replace /> },
    ],
  },
])
