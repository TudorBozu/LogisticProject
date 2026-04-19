// src/App.tsx
import "./App.css";

import { Routes, Route, Outlet } from "react-router-dom";
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
import DriverLayout    from "./pages/driver/DriverLayout";
import DriverTripPage  from "./pages/driver/DriverPage";
import DriverVehiclePage from "./pages/driver/DriverVehiclePage";
import DriverHistoryPage from "./pages/driver/DriverHistoryPage";
import Page401         from "./pages/errors/Page401";
import Page403         from "./pages/errors/Page403";
import Page404         from "./pages/errors/Page404";
import Page500         from "./pages/errors/Page500";

function AuthWrapper() {
    return <><AuthNavbar /><Outlet /></>
}

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path={PATHS.public.home} element={<LandingPage />} />

            {/* Auth pages — blocate dacă ești deja autentificat, și fiecare cu entry-point propriu */}
            <Route element={<Guard publicOnly authTarget="signin" />}>
                <Route element={<AuthWrapper />}>
                    <Route path={PATHS.public.signIn} element={<SignInPage />} />
                </Route>
            </Route>
            <Route element={<Guard publicOnly authTarget="signup" />}>
                <Route element={<AuthWrapper />}>
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

            {/* Driver portal */}
            <Route element={<Guard requireAuth allowedRoles={['driver']} />}>
                <Route element={<DriverLayout />}>
                    <Route path={PATHS.DRIVER}         element={<DriverTripPage />} />
                    <Route path={PATHS.DRIVER_VEHICLE} element={<DriverVehiclePage />} />
                    <Route path={PATHS.DRIVER_HISTORY} element={<DriverHistoryPage />} />
                </Route>
            </Route>

            {/* Depot portal — acces intern direct */}
            <Route path={PATHS.DEPOT} element={<DepotPortalPage />} />

            {/* Error pages */}
            <Route path={PATHS.errors.e401} element={<Page401 />} />
            <Route path={PATHS.errors.e403} element={<Page403 />} />
            <Route path={PATHS.errors.e404} element={<Page404 />} />
            <Route path={PATHS.errors.e500} element={<Page500 />} />

            {/* 404 catch-all */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
