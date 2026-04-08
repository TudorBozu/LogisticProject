// src/App.tsx
import "./App.css";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Guard } from "./router/Guard";
import { PATHS } from "./router/paths";

import LandingPage     from "./pages/LandingPage";
import AuthNavbar      from "./components/auth/Navbar";
import SignInPage      from "./pages/SignInPage";
import SignUpPage      from "./pages/SignUpPage";
import DashboardPage   from "./pages/DashboardPage";
import FleetDashboard  from "./pages/FleetDashboard";
import ClientDashboard from "./pages/orders/ClientDashboard";
import OrdersListPage  from "./pages/orders/OrdersListPage";
import CreateOrderPage from "./pages/orders/CreateOrderPage";
import RouteViewPage   from "./pages/orders/RouteViewPage";
import DepotPortalPage from "./depot/DepotPortalPage";

function AuthWrapper() {
    return <><AuthNavbar /><Outlet /></>
}

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path={PATHS.public.home} element={<LandingPage />} />

            {/* Auth pages — blocate dacă ești deja autentificat */}
            <Route element={<Guard publicOnly />}>
                <Route element={<AuthWrapper />}>
                    <Route path={PATHS.public.signIn} element={<SignInPage />} />
                    <Route path={PATHS.public.signUp} element={<SignUpPage />} />
                </Route>
            </Route>

            {/* Admin / Dispatcher */}
            <Route element={<Guard requireAuth allowedRoles={['admin', 'dispatcher']} />}>
                <Route path={PATHS.app.dashboard} element={<DashboardPage />} />
                <Route path={PATHS.app.fleet}     element={<FleetDashboard />} />
            </Route>

            {/* Client orders */}
            <Route element={<Guard requireAuth allowedRoles={['client']} />}>
                <Route path={PATHS.DASHBOARD}   element={<ClientDashboard />} />
                <Route path={PATHS.ORDERS}       element={<OrdersListPage />} />
                <Route path={PATHS.ORDER_NEW}    element={<CreateOrderPage />} />
                <Route path={PATHS.ORDER_ROUTE}  element={<RouteViewPage />} />
            </Route>

            {/* Depot portal — acces intern direct */}
            <Route path={PATHS.DEPOT} element={<DepotPortalPage />} />

            <Route path="*" element={<Navigate to={PATHS.public.home} replace />} />
        </Routes>
    );
}