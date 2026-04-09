import { Navigate, Route, Routes } from 'react-router-dom'
import { PATHS } from './paths'
import FleetDashboard  from '../pages/FleetDashboard'
import ClientDashboard from '../pages/orders/ClientDashboard'
import CreateOrderPage from '../pages/orders/CreateOrderPage'
import OrdersListPage  from '../pages/orders/OrdersListPage'
import RouteViewPage   from '../pages/orders/RouteViewPage'
import DepotPortalPage from '../depot/DepotPortalPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"                  element={<Navigate to="/fleet" replace />} />
      <Route path="/fleet"             element={<FleetDashboard />} />
      <Route path={PATHS.DASHBOARD}    element={<ClientDashboard />} />
      <Route path={PATHS.ORDERS}       element={<OrdersListPage />} />
      <Route path={PATHS.ORDER_NEW}    element={<CreateOrderPage />} />
      <Route path={PATHS.ORDER_ROUTE}  element={<RouteViewPage />} />
      <Route path={PATHS.DEPOT}        element={<DepotPortalPage />} />
      <Route path="*"                  element={<Navigate to="/fleet" replace />} />
    </Routes>
  )
}
