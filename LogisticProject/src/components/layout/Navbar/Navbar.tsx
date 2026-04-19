import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavIconButton } from "./NavIconButton";
import {
    AnalyticsIcon,
    BellIcon,
    CameraIcon,
    FleetIcon,
    HomeIcon,
    MapIcon,
    SearchIcon,
    SettingsIcon,
    UserIcon,
} from "./icons";
import { useLang } from "../../../context/LangContext";
import { useTheme } from "../../../context/ThemeContext";
import { logout } from "../../../utils/auth";

export type NavTab = "home" | "fleet" | "map" | "camera" | "analytics";

type Props = {
    activeTab?: NavTab;
    onTabChange?: (tab: NavTab) => void;
};

export default function Navbar({ activeTab, onTabChange }: Props = {}) {
    const [internalActive, setInternalActive] = useState<NavTab>("fleet");
    const active = activeTab ?? internalActive;
    const setActive = (tab: NavTab) => {
        setInternalActive(tab);
        onTabChange?.(tab);
    };
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langAnim, setLangAnim] = useState(false);
    const [themeAnim, setThemeAnim] = useState(false);
    const { lang, toggleLang } = useLang();
    const { theme, toggleTheme } = useTheme();
    const dark = theme === 'dark';
    const navRef = useRef<HTMLElement | null>(null);
    const navigate = useNavigate();

    function handleLangClick() { setLangAnim(true); setTimeout(() => setLangAnim(false), 300); toggleLang(); }
    function handleThemeClick() { setThemeAnim(true); setTimeout(() => setThemeAnim(false), 300); toggleTheme(); }

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!navRef.current) return;
            if (!navRef.current.contains(e.target as Node)) setMobileOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    return (
        <nav
            ref={(el) => { navRef.current = el }}
            className="w-full max-w-[1400px] mx-auto bg-white shadow-soft
                 h-[60px] flex items-center gap-1.5 relative
                 px-5 rounded-[999px]
                 max-[560px]:px-3.5 max-[560px]:rounded-2xl"
        >
            <a href="#" className="flex items-center gap-2.5 no-underline shrink-0 mr-2">
        <span className="w-[34px] h-[34px] bg-blue-500 rounded-[9px] grid place-items-center shrink-0">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path
                d="M4 16V4H12C13.1 4 14 4.9 14 6.5C14 8.1 13.1 9 12 9.2L15 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M4 9H11.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
                <span className="text-[15px] font-extrabold text-slate-900 tracking-[-0.3px] whitespace-nowrap max-[560px]:hidden">
          RoutaX
        </span>
            </a>

            <div className="contents max-[560px]:hidden">
                <NavIconButton title="Home" active={active === "home"} onClick={() => setActive("home")}>
                    <HomeIcon className="w-5 h-5" />
                </NavIconButton>

                <NavIconButton title="Fleet management" active={active === "fleet"} onClick={() => setActive("fleet")}>
                    <FleetIcon className="w-5 h-5" />
                </NavIconButton>

                <NavIconButton title="Map" active={active === "map"} onClick={() => setActive("map")}>
                    <MapIcon className="w-5 h-5" />
                </NavIconButton>

                <NavIconButton title="Camera" active={active === "camera"} onClick={() => setActive("camera")}>
                    <CameraIcon className="w-5 h-5" />
                </NavIconButton>

                <NavIconButton title="Analytics" active={active === "analytics"} onClick={() => setActive("analytics")}>
                    <AnalyticsIcon className="w-5 h-5" />
                </NavIconButton>
            </div>

            <div className="flex-1" />

            <div className="flex items-center shrink-0 mx-3 max-[820px]:hidden">
                {[
                    { dot: "bg-emerald-400", label1: "Active", label2: "vehicles", value: "56" },
                    { dot: "bg-rose-400", label1: "Vehicles in", label2: "Maintenance", value: "8" },
                    { dot: "bg-amber-400", label1: "Average", label2: "efficiency", value: "87%" },
                    { dot: "bg-sky-400", label1: "Cargo in", label2: "transit", value: "128" },
                ].map((s, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3.5 border-r border-slate-200 last:border-r-0 max-[1100px]:px-2.5"
                    >
                        <span className={`w-[7px] h-[7px] rounded-full ${s.dot}`} />
                        <span className="text-[10px] text-slate-400 leading-[1.3] max-[1100px]:hidden">
              {s.label1}
                            <br />
                            {s.label2}
            </span>
                        <span className="text-[22px] font-extrabold text-slate-900 tracking-[-0.5px] leading-none max-[1100px]:text-[19px]">
              {s.value}
            </span>
                    </div>
                ))}
            </div>

            <div className="w-px h-[22px] bg-slate-200 mx-1 shrink-0 max-[820px]:hidden" />

            <div className="relative shrink-0">
                <NavIconButton title="Notifications" onClick={() => {}}>
                    <BellIcon className="w-5 h-5" />
                </NavIconButton>
                <span className="absolute top-[3px] right-[2px] w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full grid place-items-center border-2 border-white pointer-events-none leading-none">
          2
        </span>
            </div>

            <NavIconButton title="Search" className="max-[560px]:hidden">
                <SearchIcon className="w-5 h-5" />
            </NavIconButton>

            <NavIconButton title="Settings" className="max-[560px]:hidden">
                <SettingsIcon className="w-5 h-5" />
            </NavIconButton>

            <button
                type="button"
                title="Toggle language"
                onClick={handleLangClick}
                className="h-[34px] px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-600 tracking-wide ml-0.5 max-[560px]:hidden focus:outline-none"
                style={{
                    transform: langAnim ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                }}
            >
                {lang}
            </button>
            <button
                type="button"
                title="Toggle theme"
                onClick={handleThemeClick}
                className="w-[34px] h-[34px] rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-600 ml-0.5 max-[560px]:hidden focus:outline-none"
                style={{
                    transform: themeAnim ? 'rotate(30deg) scale(1.2)' : 'rotate(0deg) scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                }}
            >
                {dark ? (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                ) : (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                )}
            </button>

            <button
                type="button"
                title="Profile"
                className="w-[34px] h-[34px] rounded-full bg-slate-200 hover:bg-slate-300 transition grid place-items-center text-slate-500 ml-0.5 max-[560px]:hidden"
            >
                <UserIcon className="w-[18px] h-[18px]" />
            </button>

            <button
                type="button"
                title="Deconectare"
                onClick={() => logout(navigate)}
                className="h-[34px] px-3 rounded-full border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition text-[11px] font-bold text-slate-500 tracking-wide ml-0.5 max-[560px]:hidden flex items-center gap-1.5"
            >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Ieșire
            </button>

            <button
                type="button"
                title="Menu"
                onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen((v) => !v);
                }}
                className="h-10 w-10 grid place-items-center text-slate-500 hover:text-slate-700 transition rounded-full hidden max-[560px]:grid"
            >
                {mobileOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                )}
            </button>

            {mobileOpen && (
                <div
                    className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-[22px] p-2.5 shadow-[0_8px_28px_rgba(0,0,0,.12),0_0_0_1px_rgba(0,0,0,.05)]
          z-[200] flex flex-col gap-0.5 hidden max-[560px]:flex"
                >
                    {[
                        { key: "home" as const, label: "Home", icon: <HomeIcon className="w-[18px] h-[18px]" /> },
                        { key: "fleet" as const, label: "Fleet management", icon: <FleetIcon className="w-[18px] h-[18px]" /> },
                        { key: "map" as const, label: "Map", icon: <MapIcon className="w-[18px] h-[18px]" /> },
                        { key: "camera" as const, label: "Camera", icon: <CameraIcon className="w-[18px] h-[18px]" /> },
                        { key: "analytics" as const, label: "Analytics", icon: <AnalyticsIcon className="w-[18px] h-[18px]" /> },
                    ].map((it) => (
                        <button
                            key={it.key}
                            type="button"
                            onClick={() => {
                                setActive(it.key);
                                setMobileOpen(false);
                            }}
                            className={[
                                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] text-left text-[13.5px] font-medium transition",
                                active === it.key ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50",
                            ].join(" ")}
                        >
                            <span className="shrink-0">{it.icon}</span>
                            {it.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] text-left text-[13.5px] font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                        <span className="w-[18px] h-[18px] grid place-items-center text-[12px]">🌐</span>
                        {lang === "EN" ? "Switch to RO" : "Switch to EN"}
                    </button>
                    <button
                        type="button"
                        onClick={() => logout(navigate)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] text-left text-[13.5px] font-medium text-red-600 hover:bg-red-50 transition"
                    >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                        </svg>
                        Ieșire
                    </button>
                </div>
            )}
        </nav>
    );
}
