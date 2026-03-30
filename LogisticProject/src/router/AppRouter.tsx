import { Navigate, Route, Routes } from "react-router-dom";
import FleetDashboard from "../pages/FleetDashboard";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/fleet" replace />} />
            <Route path="/fleet" element={<FleetDashboard />} />
            <Route path="*" element={<Navigate to="/fleet" replace />} />
        </Routes>
    );
}
