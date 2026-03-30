// src/components/Footer.tsx
import { useState } from "react";
import { Container } from "./ui/Container";
import { useLang } from "../context/LangContext";
import { landingData } from "../data/landing";

export function Footer() {
    const [email, setEmail] = useState("");
    const { lang } = useLang();
    const d = lang === 'RO' ? landingData.ro.footer : landingData.en.footer;

    function handleSubmit() {
        if (!email) return;
        setEmail("");
    }

    return (
        <footer className="relative bg-neutral-50 dark:bg-[#0d0d14] border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-300">

            <div
                className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(37,99,235,0.12) 0%, transparent 70%)" }}
            />

            <Container>
                <div className="pt-16 pb-10 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">

                    {/* Product */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-4">
                            {d.columns.product.title}
                        </div>
                        <ul className="space-y-3">
                            {d.columns.product.links.map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-700 dark:text-blue-200/70 hover:text-blue-900 dark:hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-4">
                            {d.columns.company.title}
                        </div>
                        <ul className="space-y-3">
                            {d.columns.company.links.map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-700 dark:text-blue-200/70 hover:text-blue-900 dark:hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-4">
                            {d.columns.legal.title}
                        </div>
                        <ul className="space-y-3">
                            {d.columns.legal.links.map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-700 dark:text-blue-200/70 hover:text-blue-900 dark:hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-4">
                            {d.columns.connect.title}
                        </div>
                        <ul className="space-y-3">
                            {d.columns.connect.links.map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-700 dark:text-blue-200/70 hover:text-blue-900 dark:hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Request info */}
                    <div className="col-span-2 sm:col-span-4 lg:col-span-1">
                        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/40 mb-4">
                            {d.requestInfo.title}
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-200/70 leading-relaxed mb-4">
                            {d.requestInfo.description}
                        </p>
                        <div className="flex items-center rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 focus-within:border-blue-500/50 transition-colors">
                            <input
                                type="email"
                                value={email}
                                onChange={function (e) { setEmail(e.target.value); }}
                                placeholder={d.requestInfo.placeholder}
                                className="flex-1 bg-transparent py-2.5 text-sm text-[#0d0d14] dark:text-white placeholder-neutral-400 dark:placeholder-white/20 focus:outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-white transition-colors ml-2"
                                aria-label="Submit email"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 2L11 13" />
                                    <path d="M22 2L15 22 11 13 2 9l20-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-white/10" />

                <div className="py-8 flex flex-col items-center gap-4">
                    <span className="text-2xl font-semibold text-[#0d0d14] dark:text-white">{d.brand}</span>
                    <div className="w-24 border-t border-neutral-200 dark:border-white/10" />
                    <p className="text-xs text-neutral-400 dark:text-white/30 text-center max-w-sm">{d.note}</p>
                    <p className="text-xs text-neutral-300 dark:text-white/20">
                        © {new Date().getFullYear()} {d.copyright}
                    </p>
                </div>
            </Container>
        </footer>
    );
}