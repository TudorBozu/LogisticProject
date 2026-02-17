// src/components/Footer.tsx
import { Container } from "./ui/Container";

export function Footer({
                           brand,
                           note,
                       }: {
    brand: string;
    note: string;
}) {
    return (
        <footer className="border-t border-neutral-200 bg-white">
        <Container>
            <div className="flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-neutral-600">
        <span className="font-semibold text-black">{brand}</span> — {note}
            </div>
            <div className="text-sm text-neutral-600">
            © {new Date().getFullYear()}
    </div>
    </div>
    </Container>
    </footer>
);
}
