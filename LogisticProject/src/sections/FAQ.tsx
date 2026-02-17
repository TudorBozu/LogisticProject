// src/sections/FAQ.tsx
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
    return (
        <section id={id} className="bg-neutral-50">
            <Container>
                <div className="py-16 sm:py-20">
                    <SectionHeading title={title} />
                    <div className="mt-8 space-y-3">
                        {items.map((x) => (
                            <details
                                key={x.q}
                                className="group rounded-2xl border border-neutral-200 bg-white p-5"
                            >
                                <summary className="cursor-pointer list-none text-sm font-semibold text-black flex items-center justify-between">
                                    {x.q}
                                    <span className="ml-4 text-neutral-400 group-open:rotate-45 transition">
                    +
                  </span>
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-neutral-600">
                                    {x.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
