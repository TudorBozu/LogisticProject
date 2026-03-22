type Props = {
    label: string;
    dotClassName?: string;
    className?: string;
};

export default function Pill({ label, dotClassName, className }: Props) {
    return (
        <span
            className={[
                "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-slate-100 text-[11px] font-semibold text-slate-600",
                className ?? "",
            ].join(" ")}
        >
      <span className={["w-2 h-2 rounded-full", dotClassName ?? "bg-emerald-400"].join(" ")} />
            {label}
    </span>
    );
}
