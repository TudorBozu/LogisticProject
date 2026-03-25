// src/App.tsx
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import LandingPage from "./pages/LandingPage";

import AuthNavbar from "./components/auth/Navbar";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/sign-in"
                    element={
                        <>
                            <AuthNavbar />
                            <SignInPage />
                        </>
                    }
                />

                <Route
                    path="/sign-up"
                    element={
                        <>
                            <AuthNavbar />
                            <SignUpPage />
                        </>
                    }
                />

                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ThemeProvider>
    );
}git