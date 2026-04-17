import truckMain from "../../assets/truck_main.png";
import type { BoxCell, Truck } from "../../types/fleet";

type Props = {
    truck: Truck;
    activeBoxId: string | null;
    onSelectBox: (boxId: string | null) => void;
};

function Box({
                 cell,
                 active,
                 onClick,
             }: {
    cell: BoxCell;
    active: boolean;
    onClick: () => void;
}) {
    const isBig = cell.weightKg >= 1000;

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={[
                "absolute border transition-all duration-200",
                isBig ? "rounded-[22px]" : "rounded-[14px]",
                "shadow-[0_4px_12px_rgba(15,23,42,.10)]",
                active
                    ? "bg-[#2F6DF6] border-[#2A5FE0]"
                    : "bg-white/40 border-white/80 backdrop-blur-sm hover:bg-white/60",
            ].join(" ")}
            style={{
                left: `${cell.x * 100}%`,
                top: `${cell.y * 100}%`,
                width: `${cell.w * 100}%`,
                height: `${cell.h * 100}%`,
            }}
            title={`${cell.label} • ${cell.weightKg}kg`}
        >
            {/* Label top-left */}
            <div
                className="absolute top-1.5 left-2 text-[8px] font-bold tracking-tight"
                style={{ color: active ? "rgba(255,255,255,0.8)" : "#94a3b8" }}
            >
                {cell.label}
            </div>

            {/* Centre dot indicator */}
            <div className="absolute inset-0 grid place-items-center">
                <div
                    className={[
                        "rounded-full grid place-items-center border",
                        isBig ? "w-10 h-10" : "w-5 h-5",
                        active ? "border-white/60" : "border-slate-300/60",
                    ].join(" ")}
                >
                    <span
                        className={[
                            "rounded-full",
                            isBig ? "w-3 h-3" : "w-1.5 h-1.5",
                            active ? "bg-white" : "bg-slate-400/70",
                        ].join(" ")}
                    />
                </div>
            </div>

            {/* Weight label bottom */}
            <div
                className={[
                    "absolute font-bold leading-none",
                    isBig
                        ? "bottom-4 left-0 right-0 text-center text-[13px] tracking-tight"
                        : "bottom-1 left-0 right-0 text-center text-[8px]",
                ].join(" ")}
                style={{ color: active ? "rgba(255,255,255,0.95)" : "#94a3b8" }}
            >
                {cell.weightKg} kg
            </div>
        </button>
    );
}

export default function TruckCargoView({ truck, activeBoxId, onSelectBox }: Props) {
    return (
        <div className="relative">
            {/* Top controls */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center gap-3">
                <button className="h-12 px-4 rounded-full bg-[#2F6DF6] text-white text-[12px] font-semibold shadow-soft hover:bg-blue-600 transition flex items-center gap-3">
                    <span className="text-[16px] leading-none">+</span> Add vehicle
                </button>

                <div className="flex items-center gap-2 text-slate-500">
                    <button
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-100 hover:bg-white transition grid place-items-center"
                        title="Sortare"
                    >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-100 hover:bg-white transition grid place-items-center"
                        title="Duplică"
                    >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-100 hover:bg-white transition grid place-items-center"
                        title="Editează"
                    >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>
                    </button>
                </div>
            </div>

            <div className="rounded-[28px] bg-white/50 shadow-soft p-4 pt-4 overflow-hidden">
                <div className="relative select-none">
                    <img src={truckMain} alt="truck" className="w-full h-auto" />

                    {/* Overlay calibrat pe perimetrul rosu al remorci */}
                    <div
                        className="absolute"
                        style={{
                            left: "28%",
                            top: "3%",
                            width: "62%",
                            height: "60%",
                        }}
                        onClick={() => onSelectBox(null)}
                        role="presentation"
                    >
                        {truck.boxes.map((cell) => (
                            <Box
                                key={cell.id}
                                cell={cell}
                                active={activeBoxId === cell.id}
                                onClick={() =>
                                    onSelectBox(activeBoxId === cell.id ? null : cell.id)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}