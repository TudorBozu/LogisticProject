// src/sections/Features.tsx
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/SectionHeading";

export function Features({
                             id,
                             title,
                             items,
                         }: {
    id: string;
    title: string;
    items: { title: string; text: string }[];
}) {
    return (
        <section id={id} className="bg-white dark:bg-[#0d0d14] relative hex-pattern transition-colors duration-300">
            {/* Top gradient */}
            <div
                className="absolute inset-x-0 top-0 h-48 z-0"
                style={{ background: "dark:linear-gradient(to bottom, rgba(13,13,20,0.85) 0%, transparent 100%)" }}
            />
            {/* Bottom gradient */}
            <div
                className="absolute inset-x-0 bottom-0 h-48 z-0"
                style={{ background: "linear-gradient(to top, rgba(0, 123, 255, 1) 0%, transparent 100% dark:linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)" }}
            />
            <Container>
                <div className="relative z-10 py-16 sm:py-20">
                    <SectionHeading title={title} />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map(function (f) {
                            return (
                                <div
                                    key={f.title}
                                    className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-6 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors duration-300"
                                >
                                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                                    </div>
                                    <div className="text-sm font-semibold text-[#0d0d14] dark:text-white">{f.title}</div>
                                    <p className="mt-2 text-sm leading-6 text-blue-700 dark:text-blue-200">{f.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
