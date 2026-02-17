// src/sections/Why.tsx
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Card } from "../components/ui/Card";

export function Why({
                        id,
                        title,
                        bullets,
                    }: {
    id: string;
    title: string;
    bullets: { title: string; text: string }[];
}) {
    return (
        <section id={id} className="bg-white">
            <Container>
                <div className="py-16 sm:py-20">

                    <SectionHeading title={title} />

                    <div className="mx-auto mt-10 max-w-6xl grid gap-6 sm:grid-cols-3">
                        {bullets.map((b) => (
                            <Card key={b.title} title={b.title} text={b.text} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
