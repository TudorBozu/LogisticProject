import type { Truck } from "../../types/fleet";
import {AlertIcon, MapIcon} from "../layout/Navbar/icons";

type Props = { truck: Truck };

export default function VehicleInfoCard({ truck }: Props) {
    const cap = Math.max(0, Math.min(100, truck.usedCapacityPct));
    const fuel = Math.max(0, Math.min(100, truck.fuelPct));

    return (
        <div className="bg-white rounded-[28px] shadow-soft border border-slate-100 overflow-hidden">
            <div className="p-5">
                {/* top row */}
                <div className="flex items-center justify-between">
                    <div className="text-[12px] text-slate-400">Vehicle</div>

                    <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[12px] font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Active
            </span>
                        <div className="text-[12px] font-semibold text-slate-500">{truck.code}</div>
                    </div>
                </div>

                {/* title */}
                <div className="mt-3 text-[26px] font-extrabold tracking-[-0.6px] text-slate-900">
                    {truck.name}
                </div>

                {/* burden / volume */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-[12px] text-slate-400">Burden</div>
                        <div className="mt-1 text-[12.5px] font-semibold text-slate-700">
                            {truck.burden.used.toLocaleString()} / {truck.burden.total.toLocaleString()}
                            {truck.burden.unit}
                        </div>
                    </div>

                    <div className="relative pl-4">
                        <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                        <div className="text-[12px] text-slate-400">Used volume</div>
                        <div className="mt-1 text-[12.5px] font-semibold text-slate-700">
                            {truck.usedVolume.used} / {truck.usedVolume.total} {truck.usedVolume.unit}
                        </div>
                    </div>
                </div>

                {/* used capacity (inline like screenshot) */}
                <div className="mt-4 grid grid-cols-[1fr,120px,42px] items-center gap-3">
                    <div className="text-[12px] text-slate-400">Used capacity</div>

                    <div className="h-[6px] rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cap}%` }} />
                    </div>

                    <div className="text-right text-[12px] font-semibold text-slate-500">{cap}%</div>
                </div>

                {/* driver row */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={truck.driver.avatarSrc}
                            alt="driver"
                            className="w-10 h-10 rounded-full border border-slate-100 bg-white object-cover"
                        />
                        <div className="leading-tight">
                            <div className="text-[11px] text-slate-400">Driver</div>
                            <div className="text-[12.5px] font-semibold text-slate-800">{truck.driver.name}</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-12 h-12 rounded-full bg-blue-500 text-white grid place-items-center shadow-sm hover:bg-blue-600 transition"
                        title="Call"
                    >
                        {/* simple “phone” glyph similar vibe */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                            <path
                                d="M22 16.9v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.1 9.4a16 16 0 0 0 6 6l1.07-1.12a2 2 0 0 1 2.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0 1 22 16.9Z"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* bottom “Fuel / Temperature” area like screenshot (soft blue gradient) */}
                <div className="mt-4 rounded-[22px] bg-gradient-to-b from-white to-blue-50 border border-slate-100 p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Fuel */}
                        <div className="rounded-[18px] bg-white/70 border border-white/70 p-4">
                            <div className="text-[12px] text-slate-400">Fuel</div>
                            <div className="mt-2 text-[22px] font-extrabold text-slate-900">{fuel}%</div>

                            <div className="mt-3 h-[62px] rounded-[16px] bg-white border border-slate-100 overflow-hidden relative">
                                <div
                                    className="absolute left-0 right-0 bottom-0 bg-blue-500/18"
                                    style={{ height: `${fuel}%` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#6FAEFF] to-[#2F6DEB]" />
                            </div>
                        </div>

                        {/* Temperature */}
                        <div className="rounded-[18px] bg-white/70 border border-white/70 p-4">
                            <div className="text-[12px] text-slate-400">Temperature</div>
                            <div className="mt-2 text-[22px] font-extrabold text-slate-900">
                                {truck.temperatureC}°C
                            </div>

                            <div
                                className="mt-3 h-[62px] rounded-[16px] 
             bg-gradient-to-b from-[#00B7FF] to-[#5393ED]
             border border-white/40
             grid place-items-center 
             text-[12px] text-white font-medium"
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom pill buttons (Map / Alerts) */}
            <div className="px-5 pb-5">
                <div className="rounded-[22px] bg-slate-50 border border-slate-100 p-2 flex gap-2">
                    <button className="flex-1 h-12 rounded-[18px] bg-white border border-slate-100 text-[14px] font-semibold text-slate-800 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                        <MapIcon className="w-5 h-5  text-slate-500" />
                        Map
                    </button>

                    <button className="flex-1 h-12 rounded-[18px] bg-white border border-slate-100 text-[14px] font-semibold text-slate-800 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                        <AlertIcon className="w-5 h-5 text-slate-500" />
                        Alerts
                        <span className="ml-1 w-6 h-6 rounded-full bg-amber-100 text-amber-700 grid place-items-center text-[12px] font-extrabold">
              2
            </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
