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
        <section id={id} className="bg-[#0d0d14]">
            <Container>
                <div className="py-16 sm:py-20">
                    <SectionHeading title={title} />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map(function (f) {
                            return (
                                <div
                                    key={f.title}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                                    </div>
                                    <div className="text-sm font-semibold text-white">{f.title}</div>
                                    <p className="mt-2 text-sm leading-6 text-blue-200">{f.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
