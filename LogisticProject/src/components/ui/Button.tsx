// src/components/ui/Button.tsx
import React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
};

const variants: Record<Variant, string> = {
    primary: "border-white/30 text-white hover:bg-white hover:text-blue-700 hover:border-white",
    secondary: "border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40",
    ghost: "border-transparent text-white/70 hover:bg-white/5 hover:text-white",
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
    return (
        <a
            {...props}
            className={[
                // Base styles converted from CSS
                "appearance-none",
                "bg-transparent",
                "border-2",
                "rounded-[1em]",
                "box-border",
                "cursor-pointer",
                "inline-flex items-center justify-center",
                "text-base",
                "font-semibold",
                "leading-normal",
                "m-0",
                "min-h-[3.75em]",
                "outline-none",
                "px-[2.3em] py-[1em]",
                "text-center",
                "no-underline",
                "select-none",
                "will-change-transform",
                // Hover & active
                "hover:shadow-[rgba(0,0,0,0.25)_0_8px_15px]",
                "hover:-translate-y-0.5",
                "active:shadow-none",
                "active:translate-y-0",
                // Variant specific
                variants[variant],
                className,
            ].join(" ")}
            style={{ transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)" }}
        />
    );
}
