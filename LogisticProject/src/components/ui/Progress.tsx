type Props = {
    value: number; // 0..100
    className?: string;
};

export default function Progress({ value, className }: Props) {
    const clamped = Math.max(0, Math.min(100, value));
    return (
        <div className={["h-2 w-full rounded-full bg-slate-100 overflow-hidden", className ?? ""].join(" ")}>
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${clamped}%` }} />
        </div>
    );
}
