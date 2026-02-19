// src/components/ui/Container.tsx
import React from "react";

export function Container({ children }: { children: React.ReactNode; className?: string }) {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}
