import type { Truck } from "../../types/fleet";
import { truckRoutes } from "../../mock/truckRoutes";
import { useLang } from "../../context/LangContext";
import { fleetT } from "../../data/fleetTranslations";

type Props = {
    trucks: Truck[];
    selectedId: string;
    onSelect: (id: string) => void;
};

export default function ActiveRoutes({ trucks, selectedId, onSelect }: Props) {
    const { lang } = useLang();
    const t = fleetT[lang];

    return (
        <div className="bg-white rounded-[28px] shadow-soft border border-slate-100 overflow-hidden h-full">
            <div className="p-5">
                {/* header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-[15px] font-extrabold text-slate-900">{t.activeRoutes}</div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {trucks.length} {t.live}
                    </span>
                </div>

                {/* route cards */}
                <div className="flex flex-col gap-3">
                    {trucks.map((truck) => {
                        const route = truckRoutes.find((r) => r.truckId === truck.id);
                        if (!route) return null;
                        const isSelected = truck.id === selectedId;

                        return (
                            <button
                                key={truck.id}
                                type="button"
                                onClick={() => onSelect(truck.id)}
                                className={[
                                    "w-full text-left rounded-[20px] p-4 border transition-all",
                                    isSelected
                                        ? "border-blue-200 bg-blue-50/60 shadow-sm"
                                        : "border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200",
                                ].join(" ")}
                            >
                                {/* top row */}
                                <div className="flex items-center justify-between mb-2.5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                            style={{ background: route.color }}
                                        />
                                        <span className="text-[13px] font-bold text-slate-800">
                                            {truck.code}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-medium">
                                            {truck.name}
                                        </span>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                        style={{
                                            background: `${route.color}18`,
                                            color: route.color,
                                        }}
                                    >
                                        {truck.status === "En route" ? t.enRoute : truck.status === "Stopped" ? t.stopped : t.loading}
                                    </span>
                                </div>

                                {/* route label */}
                                <div className="flex items-center gap-1.5 mb-3">
                                    <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-[11px] text-slate-500">
                                        {route.from}
                                        <span className="mx-1 text-slate-300">→</span>
                                        {route.to}
                                    </span>
                                </div>

                                {/* driver */}
                                <div className="flex items-center gap-2 mb-3">
                                    <img
                                        src={truck.driver.avatarSrc}
                                        alt={truck.driver.name}
                                        className="w-6 h-6 rounded-full border border-slate-100 bg-white object-cover flex-shrink-0"
                                    />
                                    <span className="text-[11px] text-slate-500">{truck.driver.name}</span>
                                </div>

                                {/* fuel + capacity bars */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[10px] text-slate-400">{t.fuel}</span>
                                            <span className="text-[10px] font-semibold text-slate-600">{truck.fuelPct}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${truck.fuelPct}%`,
                                                    background: truck.fuelPct > 40 ? "#10b981" : "#f59e0b",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[10px] text-slate-400">Load</span>
                                            <span className="text-[10px] font-semibold text-slate-600">{truck.usedCapacityPct}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${truck.usedCapacityPct}%`,
                                                    background: route.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
