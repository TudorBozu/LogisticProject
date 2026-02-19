// src/components/Footer.tsx
import { useState } from "react";
import { Container } from "./ui/Container";

export function Footer({
                           brand,
                           note,
                       }: {
    brand: string;
    note: string;
}) {
    const [email, setEmail] = useState("");

    function handleSubmit() {
        if (!email) return;
        // Wire up to your backend / mailing list later
        setEmail("");
    }

    return (
        <footer className="relative bg-[#0d0d14] border-t border-white/10 overflow-hidden">

            {/* Subtle top glow */}
            <div
                className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(37,99,235,0.12) 0%, transparent 70%)" }}
            />

            <Container>
                {/* Main columns */}
                <div className="pt-16 pb-10 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">

                    {/* Product */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Product</div>
                        <ul className="space-y-3">
                            {["Why RoutaX", "Features", "Values", "FAQ"].map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href={"#" + item.toLowerCase().replace(" routax", "").replace(" ", "-")} className="text-sm text-blue-200/70 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Company</div>
                        <ul className="space-y-3">
                            {["About", "Careers", "Blog", "Press"].map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Legal</div>
                        <ul className="space-y-3">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Connect</div>
                        <ul className="space-y-3">
                            {["GitHub", "LinkedIn", "Twitter / X", "Contact Us"].map(function (item) {
                                return (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Request info */}
                    <div className="col-span-2 sm:col-span-4 lg:col-span-1">
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Request info</div>
                        <p className="text-sm text-blue-200/70 leading-relaxed mb-4">
                            Interested in RoutaX for your fleet? Leave your email and we will reach out.
                        </p>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 focus-within:border-blue-500/50 transition-colors">
                            <input
                                type="email"
                                value={email}
                                onChange={function (e) { setEmail(e.target.value); }}
                                placeholder="your@company.com"
                                className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-white/20 focus:outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                className="text-blue-400 hover:text-white transition-colors ml-2"
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

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Bottom bar */}
                <div className="py-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white text-sm font-bold">
                            R
                        </span>
                        <span className="text-lg font-semibold text-white">{brand}</span>
                    </div>
                    <div className="w-24 border-t border-white/10" />
                    <p className="text-xs text-white/30 text-center max-w-sm">{note}</p>
                    <p className="text-xs text-white/20">
                        © {new Date().getFullYear()} RoutaX Technologies SRL · All rights reserved
                    </p>
                </div>
            </Container>
        </footer>
    );
}