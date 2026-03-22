type Props = {
    title: string;
    active?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

export function NavIconButton({ title, active, onClick, children, className }: Props) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={[
                "h-10 w-10 grid place-items-center text-slate-500 hover:text-slate-700 transition",
                active ? "bg-slate-100 text-slate-700 rounded-xl w-[42px] hover:bg-slate-200" : "rounded-full",
                className ?? "",
            ].join(" ")}
        >
            <span className="h-5 w-5">{children}</span>
        </button>
    );
}
