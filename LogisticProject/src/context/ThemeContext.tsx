// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: function () {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(function () {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
        return "dark";
    });

    useEffect(function () {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(function (prev) { return prev === "dark" ? "light" : "dark"; });
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}