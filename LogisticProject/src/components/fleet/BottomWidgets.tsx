import Pill from "../ui/Pill";
import routeImg from "../../assets/route-map.png";
import cameraImg from "../../assets/camera.png";
import Progress from "../ui/Progress";
import { useLang } from "../../context/LangContext";
import { fleetT } from "../../data/fleetTranslations";

export default function BottomWidgets() {
    const { lang } = useLang();
    const t = fleetT[lang];

    const mechanicItems = [
        { key: "engine",     v: 90 },
        { key: "brakes",     v: 90 },
        { key: "tires",      v: 80 },
        { key: "oil",        v: 89 },
        { key: "suspension", v: 92 },
    ] as const;

    const mechanicLabel: Record<typeof mechanicItems[number]["key"], string> = {
        engine:     t.engine,
        brakes:     t.brakes,
        tires:      t.tires,
        oil:        t.oil,
        suspension: t.suspension,
    };

    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Route map */}
            <div className="col-span-4 max-[1100px]:col-span-12 bg-white/70 backdrop-blur rounded-[28px] shadow-soft p-5 border border-white/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-[16px] font-extrabold text-slate-900">{t.routeMap}</div>
                        <Pill label={t.inRoute} dotClassName="bg-emerald-400" />
                    </div>
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full bg-white border border-slate-100 grid place-items-center text-slate-500 hover:bg-slate-50 transition"
                        title={t.expand}
                    >
                        ↗
                    </button>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 bg-white">
                    <img src={routeImg} alt={t.routeMap} className="w-full h-[220px] object-cover" />
                </div>
            </div>

            {/* Stats + mechanics */}
            <div className="col-span-4 max-[1100px]:col-span-12 bg-white/70 backdrop-blur rounded-[28px] shadow-soft p-5 border border-white/40">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="text-[11px] font-semibold text-slate-400">{t.dailyActiveTime}</div>
                        <div className="text-[10px] text-slate-400 mt-1">8h 40min / 10h max</div>
                        <div className="mt-3 flex items-center justify-between text-[11px]">
                            <Progress value={80} />
                            <span className="ml-3 font-bold text-slate-600">80%</span>
                        </div>
                        <div className="mt-2">
                            <Pill label="Normal day" dotClassName="bg-emerald-400" />
                        </div>
                    </div>
                    <div>
                        <div className="text-[11px] font-semibold text-slate-400">{t.averageSpeed}</div>
                        <div className="text-[10px] text-slate-400 mt-1">60–80 km/h</div>
                        <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-[linear-gradient(90deg,#fb7185,#fbbf24,#34d399)]" style={{ width: "72%" }} />
                        </div>
                        <div className="mt-2">
                            <Pill label="Optimal" dotClassName="bg-emerald-400" />
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <div className="text-[12px] font-extrabold text-slate-900">{t.mechanicalCondition}</div>
                    <div className="flex items-center gap-2">
                        <div className="text-[18px] font-extrabold text-slate-900">91%</div>
                        <Pill label="Optimal" dotClassName="bg-emerald-400" />
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-3 mt-4">
                    {mechanicItems.map((it) => (
                        <div key={it.key} className="flex flex-col items-center gap-2">
                            <div className="w-full h-14 rounded-2xl bg-white border border-slate-100 overflow-hidden relative">
                                <div className="absolute inset-x-0 bottom-0 bg-[#2F6DF6]/35" style={{ height: `${it.v}%` }} />
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,109,246,.18)_0%,rgba(47,109,246,0)_55%)]" />
                            </div>
                            <div className="text-[10px] font-bold text-slate-600">{it.v}%</div>
                            <div className="text-[10px] text-slate-400">{mechanicLabel[it.key]}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Camera */}
            <div className="col-span-4 max-[1100px]:col-span-12 bg-white/70 backdrop-blur rounded-[28px] shadow-soft p-5 border border-white/40">
                <div className="flex items-center justify-between">
                    <div className="text-[16px] font-extrabold text-slate-900">{t.camera}</div>
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full bg-white border border-slate-100 grid place-items-center text-slate-500 hover:bg-slate-50 transition"
                        title={t.expand}
                    >
                        ↗
                    </button>
                </div>
                <div className="mt-4 rounded-3xl overflow-hidden relative border border-slate-100 bg-white">
                    <img src={cameraImg} alt={t.camera} className="w-full h-[240px] object-cover" />
                    <span className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full bg-rose-500/90 text-white text-[11px] font-bold">
                        Live
                    </span>
                    <span className="absolute right-4 bottom-4 text-[11px] font-semibold text-white/80">04:39:16</span>
                </div>
            </div>
        </div>
    );
}
