// src/components/SectionHeading.tsx

export function SectionHeading({
                                   title,
                                   subtitle,
                               }: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-3 text-neutral-600">{subtitle}</p>
            ) : null}
        </div>
    );
}
