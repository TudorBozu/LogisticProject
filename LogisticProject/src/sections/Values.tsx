// src/sections/Values.tsx
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Card } from "../components/ui/Card";

export function Values({
                           id,
                           title,
                           items,
                       }: {
    id: string;
    title: string;
    items: { title: string; text: string }[];
}) {
    return (
        <section id={id} style={{ background: "linear-gradient(135deg, #111827 0%, #0d0d14 100%)" }}>
            <Container>
                <div className="py-16 sm:py-20">
                    <SectionHeading
                        title={title}
                        subtitle="The principles that guide everything we build."
                    />
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {items.map(function (x) {
                            return <Card key={x.title} title={x.title} text={x.text} />;
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
