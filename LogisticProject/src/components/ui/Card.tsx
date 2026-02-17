// src/components/ui/Card.tsx

export function Card({
                         title,
                         text,
                     }: {
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-black">{title}</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
        </div>
    );
}
