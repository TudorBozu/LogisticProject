// src/components/ui/Button.tsx
import React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
};

const styles: Record<Variant, string> = {
    primary:
        "bg-black text-white hover:bg-neutral-800 focus-visible:outline-neutral-400",
    secondary:
        "bg-white text-black border border-neutral-200 hover:bg-neutral-50 focus-visible:outline-neutral-300",
    ghost:
        "text-black hover:bg-neutral-100 focus-visible:outline-neutral-300",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
    return (
        <a
            {...props}
            className={[
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
                "transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                styles[variant],
                className,
            ].join(" ")}
        />
    );
}
