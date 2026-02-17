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
        <section id={id} className="bg-white">
            <Container>
                <div className="py-16 sm:py-20">
                    <SectionHeading title={title} />
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map((f) => (
                            <div
                                key={f.title}
                                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                            >
                                <div className="text-sm font-semibold text-black">{f.title}</div>
                                <p className="mt-2 text-sm leading-6 text-neutral-600">
                                    {f.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
