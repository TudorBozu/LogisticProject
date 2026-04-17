import Progress from "../ui/Progress";
import Pill from "../ui/Pill";
import type { Truck } from "../../types/fleet";
import truckThumb from "../../assets/truck_main.png";
import { useFleet } from "../../context/FleetContext";
import { useLang } from "../../context/LangContext";
import { fleetT } from "../../data/fleetTranslations";

type Props = {
    trucks: Truck[];
    selectedId: string;
    onSelect: (id: string) => void;
};

const statusDot: Record<Truck["status"], string> = {
    "En route": "bg-emerald-400",
    "Stopped": "bg-amber-400",
    "Loading": "bg-sky-400",
};

const ALL_STATUSES: Array<Truck["status"] | "All"> = ["All", "En route", "Stopped", "Loading"];

export default function TruckList({ trucks, selectedId, onSelect }: Props) {
    const { filterStatus, setFilterStatus } = useFleet();
    const { lang } = useLang();
    const t = fleetT[lang];

    const visible = filterStatus === "All"
        ? trucks
        : trucks.filter((tr) => tr.status === filterStatus);

    return (
        <div
            className={[
                "bg-white/70 backdrop-blur rounded-[28px] shadow-soft p-4 border border-white/40",
                "flex flex-col",
                "h-[calc(100vh-44px)]",
                "min-h-0",
            ].join(" ")}
        >
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="text-[16px] font-extrabold text-slate-900">{t.truckList}</div>

                <div className="relative group">
                    <button
                        className="w-10 h-10 rounded-full bg-white border border-slate-100 grid place-items-center text-slate-500 hover:bg-slate-50 transition"
                        title={t.filter}
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

                    {/* Filter dropdown on hover */}
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-[14px] border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,.10)] p-1.5 z-30 hidden group-hover:flex flex-col gap-0.5 min-w-[130px]">
                        {ALL_STATUSES.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setFilterStatus(s)}
                                className={[
                                    "w-full text-left px-3 py-1.5 rounded-[9px] text-[12px] font-medium transition flex items-center gap-2",
                                    filterStatus === s
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-slate-600 hover:bg-slate-50",
                                ].join(" ")}
                            >
                                {s !== "All" && (
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[s as Truck["status"]]}`} />
                                )}
                                {s === "All" ? t.filter : s === "En route" ? t.enRoute : s === "Stopped" ? t.stopped : t.loading}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List (scrollable) */}
            <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                {visible.map((tr) => {
                    const selected = tr.id === selectedId;

                    return (
                        <button
                            key={tr.id}
                            type="button"
                            onClick={() => onSelect(tr.id)}
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
                                        {tr.name}
                                    </div>
                                    <Pill
                                        label={tr.status === "En route" ? t.enRoute : tr.status === "Stopped" ? t.stopped : t.loading}
                                        dotClassName={statusDot[tr.status]}
                                        className="shrink-0"
                                    />
                                </div>

                                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                                    <div>
                                        <div className="font-semibold text-slate-500">{tr.code}</div>
                                        <div>{t.burden}</div>
                                        <div className="text-slate-600 font-semibold">
                                            {tr.burden.used.toLocaleString()} / {tr.burden.total.toLocaleString()}
                                            {tr.burden.unit}
                                        </div>
                                    </div>

                                    <div>
                                        <div>{t.usedVolume}</div>
                                        <div className="text-slate-600 font-semibold">
                                            {tr.usedVolume.used} / {tr.usedVolume.total} {tr.usedVolume.unit}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div>{t.usedCapacity}</div>
                                        <div className="text-slate-600 font-bold">{tr.usedCapacityPct}%</div>
                                        {(tr.alertCount ?? 0) > 0 && (
                                            <div className="mt-0.5 inline-flex items-center gap-1 text-amber-600 font-semibold">
                                                ⚠ {tr.alertCount}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Progress value={tr.usedCapacityPct} />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
