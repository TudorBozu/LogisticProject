import Progress from "../ui/Progress";
import Pill from "../ui/Pill";
import type { Truck } from "../../types/fleet";
import truckThumb from "../../assets/truck_main.png";

type Props = {
    trucks: Truck[];
    selectedId: string;
    onSelect: (id: string) => void;
};

export default function TruckList({ trucks, selectedId, onSelect }: Props) {
    return (
        <div
            className={[
                "bg-white/70 backdrop-blur rounded-[28px] shadow-soft p-1 border border-white/40",
                "flex flex-col",
                "h-[calc(100vh-44px)]",
                "min-h-0",
            ].join(" ")}
        >
            {/* Header (fix) */}
            <div className="flex items-center justify-between shrink-0">
                <div className="text-[16px] font-extrabold text-slate-900">Truck list</div>

                <button
                    className="w-10 h-10 rounded-full bg-white border border-slate-100 grid place-items-center text-slate-500 hover:bg-slate-50 transition"
                    title="Filter"
                    type="button"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path
                            d="M4 6h16M7 12h10M10 18h4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Lista (scroll) */}
            <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                {trucks.map((t) => {
                    const selected = t.id === selectedId;

                    return (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => onSelect(t.id)}
                            className={[
                                "w-full text-left rounded-[18px] border p-4 flex gap-4 items-center transition bg-white",
                                selected
                                    ? "border-[#BBD3FF] shadow-[0_10px_24px_rgba(47,109,246,.12)]"
                                    : "border-slate-100 hover:bg-slate-50",
                            ].join(" ")}
                        >
                            <img
                                src={truckThumb}
                                alt="truck"
                                className="w-[85px] h-[85px] shrink-0 opacity-95 object-contain"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="text-[12px] font-extrabold text-slate-900 truncate">
                                        {t.name}
                                    </div>
                                    <Pill label={t.status} dotClassName="bg-emerald-400" className="shrink-0" />
                                </div>

                                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                                    <div>
                                        <div className="font-semibold text-slate-500">{t.code}</div>
                                        <div>Burden</div>
                                        <div className="text-slate-600 font-semibold">
                                            {t.burden.used.toLocaleString()} / {t.burden.total.toLocaleString()}
                                            {t.burden.unit}
                                        </div>
                                    </div>

                                    <div>
                                        <div>Used volume</div>
                                        <div className="text-slate-600 font-semibold">
                                            {t.usedVolume.used} / {t.usedVolume.total} {t.usedVolume.unit}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div>Used capacity</div>
                                        <div className="text-slate-600 font-bold">{t.usedCapacityPct}%</div>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Progress value={t.usedCapacityPct} />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
