// src/sections/Hero.tsx
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import heroBg from "../assets/hero-bg.jpg";

export function Hero({
                         kicker,
                         title,
                         subtitle,
                         primaryCta,
                         secondaryCta,
                     }: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
}) {
    return (
        <section className="relative w-full min-h-screen overflow-hidden">

            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src={heroBg}
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-blue-900/65" />
                {/* Top gradient to blend seamlessly with navbar */}
                <div
                    className="absolute inset-x-0 top-0 h-48"
                    style={{ background: "linear-gradient(to bottom, rgba(13,13,20,0.85) 0%, transparent 100%)" }}
                />
                {/* Bottom gradient to blend into Why section */}
                <div
                    className="absolute inset-x-0 bottom-0 h-48 z-0"
                    style={{ background: "linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)" }}
                />
            </div>

            <Container>
                <div className="relative z-10 relative flex flex-col justify-center min-h-screen py-24 sm:py-32 -mt-10">
                    <div className="mx-auto max-w-3xl text-center">

                        {/* Kicker badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-blue-100 backdrop-blur-sm animate-zoom-in">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                            {kicker}
                        </div>

                        {/* Headline */}
                        <h1 className="mt-6 mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight animate-zoom-in animation-delay-200">
                            {title}
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 mx-auto max-w-2xl text-base text-blue-100 leading-relaxed animate-zoom-in animation-delay-300">
                            {subtitle}
                        </p>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center animate-zoom-in animation-delay-400">
                            <Button
                                href={primaryCta.href}
                                className="!bg-white !text-blue-700 hover:!bg-blue-50 !px-6 !py-2.5 !font-semibold"
                            >
                                {primaryCta.label}
                            </Button>
                            <Button
                                href={secondaryCta.href}
                                variant="secondary"
                                className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 !px-6 !py-2.5"
                            >
                                {secondaryCta.label}
                            </Button>
                        </div>
                    </div>

                    {/* Stats cards */}
                    <div className="mx-auto mt-16 w-full max-w-4xl grid gap-4 sm:grid-cols-3 animate-zoom-in animation-delay-500">
                        {[
                            { stat: "98.6%", label: "Fleet uptime guaranteed" },
                            { stat: "2,400+", label: "Vehicles tracked globally" },
                            { stat: "34%", label: "Average fuel cost reduction" },
                        ].map(function (card) {
                            return (
                                <div
                                    key={card.stat}
                                    className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-sm"
                                >
                                    <div className="text-2xl font-bold text-white">{card.stat}</div>
                                    <div className="mt-1 text-sm text-blue-200">{card.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
