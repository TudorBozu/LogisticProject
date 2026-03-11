// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../router/paths";
import { allowAuthNav } from "../router/Guard";
import { Container } from "./ui/Container";
import type { NavItem } from "../data/landing";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";

export function Navbar({ links }: { links: NavItem[] }) {
    const [langAnim, setLangAnim] = useState(false);
    const [themeAnim, setThemeAnim] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLang } = useLang();

    function handleLangClick() {
        setLangAnim(true);
        setTimeout(function () { setLangAnim(false); }, 300);
        toggleLang();
    }

    function handleThemeClick() {
        setThemeAnim(true);
        setTimeout(function () { setThemeAnim(false); }, 300);
        toggleTheme();
    }

    return (
        <header
            className="sticky top-0 z-50 w-full"
            style={{ background: "linear-gradient(to right, rgba(26,31,110,0.5) 0%, rgba(13,13,20,0.8) 100%)", backdropFilter: "blur(12px)" }}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">

                    {/* Left: Logo + Nav inline */}
                    <div className="flex items-center gap-12">
                        <a href="#top" className="flex items-center gap-2.5">
                            <span className="text-2xl font-semibold tracking-tight text-white">
                                Routa<span className="text-brand-400">X</span>
                            </span>
                        </a>

                        <nav className="hidden md:flex items-center gap-10">
                            {links.map(function (l) {
                                return (
                                    <a
                                        key={l.href}
                                        href={l.href}
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        {l.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right: Lang + Theme + Sign in */}
                    <div className="flex items-center gap-8">

                        {/* Language toggle */}
                        <button
                            onClick={handleLangClick}
                            className="text-sm font-medium text-blue-200 hover:text-white focus:outline-none"
                            aria-label="Toggle language"
                            style={{
                                transform: langAnim ? "scale(1.3)" : "scale(1)",
                                transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.2s"
                            }}
                        >
                            {lang}
                        </button>

                        {/* Theme toggle */}
                        <button
                            onClick={handleThemeClick}
                            className="text-blue-200 hover:text-white focus:outline-none"
                            aria-label="Toggle theme"
                            style={{
                                transform: themeAnim ? "rotate(30deg) scale(1.2)" : "rotate(0deg) scale(1)",
                                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s"
                            }}
                        >
                            {theme === "dark" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* Sign in */}
                        <Link
                            to={PATHS.public.signIn}
                            onClick={allowAuthNav}
                            className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors"
                        >
                            {lang === 'RO' ? 'Autentificare' : 'Sign in'}
                        </Link>
                    </div>
                </div>
            </Container>
        </header>
    );
}
