// src/components/Navbar.tsx
import { Container } from "./ui/Container";
import type { NavItem } from "../data/landing";
import { Button } from "./ui/Button";

export function Navbar({ links }: { links: NavItem[] }) {
    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
            <Container>
                <div className="flex h-16 items-center justify-between">

                    {/* Left: Logo + Nav */}
                    <div className="flex items-center gap-10">
                        <a href="#top" className="flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white text-sm">
                                L
                            </span>
                            <span className="text-sm font-semibold tracking-tight">
                                LogisticProject
                            </span>
                        </a>
                    </div>
                    
                    <nav className="hidden md:flex justify-center gap-6">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="text-sm text-neutral-600 hover:text-black"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right: Buttons */}
                    <div className="flex items-center gap-2">
                        <Button
                            href="#cta"
                            variant="secondary"
                            className="hidden sm:inline-flex"
                        >
                            Contact
                        </Button>
                        <Button href="#cta">
                            Get started
                        </Button>
                    </div>
                </div>

            </Container>
        </header>
    );
}
