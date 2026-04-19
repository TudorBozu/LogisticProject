// src/components/ui/Button.tsx
import React from "react";
import { Link } from "react-router-dom";
import { allowAuthNav } from "../../router/Guard";
import { PATHS } from "../../router/paths";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    href?: string;
};

const variants: Record<Variant, string> = {
    primary: "border-white/30 text-white hover:bg-white hover:text-blue-700 hover:border-white",
    secondary: "border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40",
    ghost: "border-transparent text-white/70 hover:bg-white/5 hover:text-white",
};

function scrollToSection(id: string) {
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}

export function Button({ variant = "primary", className = "", href, ...props }: Props) {
    const classes = [
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
        "hover:shadow-[rgba(0,0,0,0.25)_0_8px_15px]",
        "hover:-translate-y-0.5",
        "active:shadow-none",
        "active:translate-y-0",
        variants[variant],
        className,
    ].join(" ");

    if (href && href.startsWith("#")) {
        return (
            <button
                onClick={() => scrollToSection(href)}
                className={classes}
                style={{ transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)" }}
            >
                {props.children}
            </button>
        );
    }

    if (href && href.startsWith("/")) {
        const target = href === PATHS.public.signIn ? 'signin' : href === PATHS.public.signUp ? 'signup' : null
        return (
            <Link
                to={href}
                onClick={target ? () => allowAuthNav(target) : undefined}
                className={classes}
                style={{ transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)" }}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            {...props}
            className={classes}
            style={{ transition: "all 300ms cubic-bezier(0.23, 1, 0.32, 1)" }}
        />
    );
}
