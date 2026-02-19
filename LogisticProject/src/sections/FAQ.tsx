// src/sections/FAQ.tsx
import { useState } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/SectionHeading";

export function FAQ({
                        id,
                        title,
                        items,
                    }: {
    id: string;
    title: string;
    items: { q: string; a: string }[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    function toggle(i: number) {
        setOpenIndex(function (prev) { return prev === i ? null : i; });
    }

    return (
        <section id={id} style={{ background: "linear-gradient(135deg, #111827 0%, #0d0d14 100%)" }}>
            <Container>
                <div className="py-16 sm:py-20">
                    <SectionHeading title={title} />
                    <div className="mt-8 mx-auto max-w-3xl space-y-3 min-h-[600px]">
                        {items.map(function (x, i) {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={x.q}
                                    className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm"
                                >
                                    {/* Question row */}
                                    <button
                                        onClick={function () { toggle(i); }}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                                    >
                                        <span className="text-sm font-semibold text-white pr-4">
                                            {x.q}
                                        </span>
                                        <span
                                            className="flex-shrink-0 text-blue-300 text-lg leading-none"
                                            style={{
                                                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                                                display: "inline-block",
                                            }}
                                        >
                                            +
                                        </span>
                                    </button>

                                    {/* Answer — animated height */}
                                    <div
                                        style={{
                                            maxHeight: isOpen ? "400px" : "0px",
                                            opacity: isOpen ? 1 : 0,
                                            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <p className="px-5 pb-5 text-sm leading-6 text-blue-200">
                                            {x.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
