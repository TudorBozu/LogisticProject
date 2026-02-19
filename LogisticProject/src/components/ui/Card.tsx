// src/components/ui/Card.tsx

export function Card({
                         title,
                         text,
                     }: {
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="text-sm font-semibold text-white">{title}</div>
            <p className="mt-2 text-sm leading-6 text-blue-200">{text}</p>
        </div>
    );
}
