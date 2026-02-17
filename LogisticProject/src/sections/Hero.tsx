// src/sections/Hero.tsx
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

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
        <section className="relative overflow-hidden bg-white">
            <Container>
                <div className="py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
                        <span className="h-2 w-2 rounded-full bg-black" />
                        {kicker}
                    </div>

                    <h1 className="mt-6 mx-auto max-w-3xl text-4xl sm:text-5xl font-semibold tracking-tight text-black">
                        {title}
                    </h1>

                    <p className="mt-4 mx-auto max-w-2xl text-neutral-600">
                        {subtitle}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button href={primaryCta.href}>{primaryCta.label}</Button>
                        <Button href={secondaryCta.href} variant="secondary">
                            {secondaryCta.label}
                        </Button>
                    </div>
                    </div>

                    <div className="mx-auto mt-10 max-w-5xl grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700">
                            <div className="font-semibold text-black">Predictable layout</div>
                            <div className="mt-1">Sections + content arrays.</div>
                        </div>
                        <div className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700">
                            <div className="font-semibold text-black">Fast edits</div>
                            <div className="mt-1">Change copy in one file.</div>
                        </div>
                        <div className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700">
                            <div className="font-semibold text-black">Deploy-ready</div>
                            <div className="mt-1">No backend required.</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
