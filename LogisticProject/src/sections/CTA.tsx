// src/sections/CTA.tsx
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useInView } from "../hooks/useInView";

// Add your PNG import here when ready:
import ctaBg from "../assets/cta-bg.jpg";

export function CTA({
                        id,
                        title,
                        subtitle,
                        primary,
                        secondary,
                    }: {
    id: string;
    title: string;
    subtitle: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
}) {
    const { ref: ctaRef, inView: ctaInView } = useInView(0.3, "");
    return (
        <section id={id} className="bg-[#0d0d14] relative hex-pattern">
            {/* Top gradient */}
            <div
                className="absolute inset-x-0 top-0 h-48 z-0"
                style={{ background: "linear-gradient(to bottom, rgba(13,13,20,0.85) 0%, transparent 100%)" }}
            />
            {/* Bottom gradient */}
            <div
                className="absolute inset-x-0 bottom-0 h-48 z-0"
                style={{ background: "linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)" }}
            />
            <Container>
                <div className="relative z-10 py-16 sm:py-20">
                    <div
                        ref={ctaRef}
                        className="relative overflow-hidden rounded-3xl text-center py-20 sm:py-28 px-8"
                        style={{
                            background: "linear-gradient(135deg, #1a1f6e 0%, #2d3aad 50%, #1e3a8a 100%)",
                            opacity: ctaInView ? 1 : 0,
                            transform: ctaInView ? "translateY(0)" : "translateY(24px)",
                            transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                        }}
                    >
                        <img
                            src={ctaBg}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
                        />

                        {/* Dark vignette over image edges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-blue-950/40 pointer-events-none" />

                        {/* Content */}
                        <div className="relative">
                            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                                {title}
                            </h3>
                            <p className="mt-4 max-w-2xl mx-auto text-blue-100 leading-relaxed">
                                {subtitle}
                            </p>

                            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <Button
                                    href={primary.href}
                                    className="!bg-white !text-blue-700 hover:!bg-blue-50 !px-8 !py-3 !font-semibold !text-base"
                                >
                                    {primary.label}
                                </Button>
                                <Button
                                    href={secondary.href}
                                    variant="secondary"
                                    className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 !px-8 !py-3 !text-base"
                                >
                                    {secondary.label}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
