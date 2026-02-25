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
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d14] dark:text-white transition-colors duration-300">
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-3 text-blue-700 dark:text-blue-200 transition-colors duration-300">{subtitle}</p>
            ) : null}
        </div>
    );
}
