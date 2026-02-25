// src/components/ui/Card.tsx

export function Card({
                         title,
                         text,
                     }: {
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-6 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors duration-300">
            <div className="text-sm font-semibold text-[#0d0d14] dark:text-white">{title}</div>
            <p className="mt-2 text-sm leading-6 text-blue-700 dark:text-blue-200">{text}</p>
        </div>
    );
}
