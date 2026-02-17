// src/sections/CTA.tsx
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

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
    return (
        <section id={id} className="bg-white">
            <Container>
                <div className="py-16 sm:py-20">
                    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
                            {title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-neutral-600">{subtitle}</p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Button href={primary.href}>{primary.label}</Button>
                            <Button href={secondary.href} variant="secondary">
                                {secondary.label}
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
