// src/sections/Why.tsx
import { useState, useEffect } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/SectionHeading";
import { useInView} from "../hooks/useInView.tsx";

// Add screenshot imports here when ready, e.g.:
// import dashboardImg from "../assets/screenshots/dashboard.jpg";

const slides = [
    { id: 1, label: "Dashboard", bg: "linear-gradient(135deg, #1e2a4a 0%, #1a1f6e 100%)", glow: "37,99,235" },
    { id: 2, label: "Shipments", bg: "linear-gradient(135deg, #1a2d3a 0%, #0d3349 100%)", glow: "6,182,212" },
    { id: 3, label: "Analytics", bg: "linear-gradient(135deg, #1e1a3a 0%, #2d1a4a 100%)", glow: "139,92,246" },
];

export function Why({
                        id,
                        title,
                        bullets,
                    }: {
    id: string;
    title: string;
    bullets: { title: string; text: string }[];
}) {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const { ref: laptopRef, inView: laptopInView } = useInView(0.5, "-100px");
    
    function pauseAndResume() {
        setAutoplay(false);
        setTimeout(function () { setAutoplay(true); }, 6000);
    }

    function prev() {
        pauseAndResume();
        setActive(function (i) { return (i - 1 + slides.length) % slides.length; });
    }

    function next() {
        pauseAndResume();
        setActive(function (i) { return (i + 1) % slides.length; });
    }

    useEffect(function () {
        if (!autoplay) return;
        const timer = setInterval(function () {
            setActive(function (i) { return (i + 1) % slides.length; });
        }, 3000);
        return function () { clearInterval(timer); };
    }, [autoplay]);

    return (
        <section id={id} className="bg-[#0d0d14] min-h-screen relative hex-pattern">
            {/* Bottom gradient to blend into Why section */}
            <div
                className="absolute inset-x-0 bottom-0 h-48"
                style={{ background: "linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)" }}
            />
            <Container>
                <div className="pt-8 pb-16 sm:pt-12 sm:pb-24 flex flex-col justify-center min-h-screen">
                    <SectionHeading title={title} />

                    {/* 2-col grid */}
                    <div className="mt-24 grid gap-20 lg:grid-cols-2 lg:gap-20 items-center max-w-7xl mx-auto w-full">

                        {/* Left — numbered bullets */}
                        <div className="flex flex-col gap-8">
                            {bullets.map(function (b, i) {
                                return (
                                    <div key={b.title} className="flex gap-5 items-start">
                                        <span className="flex-shrink-0 inline-flex h-9 w-9 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-sm lg:text-base font-bold text-blue-300">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <div className="text-base lg:text-xl font-semibold text-white">{b.title}</div>
                                            <p className="mt-1 text-sm lg:text-base leading-6 text-blue-200">{b.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right — laptop mockup */}
                        <div
                            ref={laptopRef}
                            className="relative mx-auto w-full max-w-2xl px-10 lg:max-w-none lg:px-0"
                            style={{
                                opacity: laptopInView ? 1 : 0,
                                transform: laptopInView ? "translateY(0)" : "translateY(24px)",
                                transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                            }}>
                            {/* Screen */}
                            <div
                                className="relative overflow-hidden rounded-t-3xl bg-zinc-950 p-3"
                                style={{
                                    boxShadow: `0 0 80px 8px rgba(${slides[active].glow},0.15), 0 0 0 1px rgba(255,255,255,0.06)`,
                                    transition: "box-shadow 0.5s ease",
                                    clipPath: "inset(-100px -100px 0px -100px)",
                                }}
                            >
                                {/* Camera notch */}
                                <div className="absolute inset-x-0 top-0 flex items-center justify-center z-10">
                                    <div className="flex h-6 w-20 items-center justify-center rounded-b-md bg-zinc-950">
                                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-800 ring-2 ring-zinc-700/75" />
                                    </div>
                                </div>

                                {/* Keyboard glow */}
                                <div className="absolute inset-x-10 bottom-0 h-2 bg-white blur-xl" />

                                {/* Screen content — slideshow */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">

                                    {slides.map(function (slide, i) {
                                        return (
                                            <div
                                                key={slide.id}
                                                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                                                style={{
                                                    background: slide.bg,
                                                    opacity: i === active ? 1 : 0,
                                                    pointerEvents: i === active ? "auto" : "none",
                                                }}
                                            >
                                                {/*
                                                  Replace this placeholder with your screenshot:
                                                  <img src={dashboardImg} alt={slide.label} className="w-full h-full object-cover" />
                                                */}
                                                <div className="text-center select-none">
                                                    <div className="text-white/20 text-xs uppercase tracking-widest mb-2">Preview</div>
                                                    <div className="text-white/40 text-lg font-semibold">{slide.label}</div>
                                                    <div className="text-white/20 text-xs mt-1">Screenshot coming soon</div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Prev / next arrows */}
                                    <button
                                        onClick={prev}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center"
                                        aria-label="Previous slide"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={next}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 border border-white/10 text-white/70 hover:bg-black/60 hover:text-white transition-all flex items-center justify-center"
                                        aria-label="Next slide"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* END Screen */}

                            {/* Base */}
                            <div className="-mx-10 pb-1">
                                <div className="relative h-4 w-full rounded-b-2xl bg-gradient-to-r from-zinc-800 via-zinc-950 to-zinc-800">
                                    <div className="absolute inset-0 flex items-start justify-center">
                                        <div className="h-1.5 w-20 rounded-b-md border-x border-b border-zinc-600/25 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 opacity-75" />
                                    </div>
                                    <div className="absolute -bottom-1 left-8 h-1 w-10 rounded-b-full bg-zinc-900" />
                                    <div className="absolute right-8 -bottom-1 h-1 w-10 rounded-b-full bg-zinc-900" />
                                </div>
                            </div>
                            {/* END Base */}

                            {/* Dot indicators */}
                            <div className="mt-5 flex justify-center gap-2">
                                {slides.map(function (_, i) {
                                    return (
                                        <button
                                            key={i}
                                            onClick={function () {
                                                pauseAndResume();
                                                setActive(i);
                                            }}
                                            className="h-1.5 rounded-full transition-all duration-300"
                                            style={{
                                                width: i === active ? "1.5rem" : "0.375rem",
                                                background: i === active ? "#3b82f6" : "rgba(255,255,255,0.2)",
                                            }}
                                            aria-label={"Go to slide " + (i + 1)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Container>
        </section>
    );
}
