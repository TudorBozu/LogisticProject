import truckMain from "../../assets/truck_main.png";
import type { Truck } from "../../types/fleet";
import BoxSlot from "./BoxSlot";
import { useFleet } from "../../context/FleetContext";
import { useLang } from "../../context/LangContext";
import { fleetT } from "../../data/fleetTranslations";

// Calibrated to align with the trailer outline in truck_main.png
const CARGO_OVERLAY = {
    left: "28%",
    top: "3%",
    width: "62%",
    height: "60%",
} as const;

type Props = {
    truck: Truck;
    activeBoxId: string | null;
    onSelectBox: (boxId: string | null) => void;
};

export default function TruckCargoView({ truck, activeBoxId, onSelectBox }: Props) {
    const { editMode, toggleEditMode } = useFleet();
    const { lang } = useLang();
    const t = fleetT[lang];

    return (
        <div className="relative">
            {/* Top controls */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center gap-3">
                <button
                    type="button"
                    className="h-12 px-4 rounded-full bg-[#2F6DF6] text-white text-[12px] font-semibold shadow-soft hover:bg-blue-600 transition flex items-center gap-3"
                    onClick={() => alert(t.addVehicle)}
                >
                    <span className="text-[16px] leading-none">+</span>
                    {t.addVehicle}
                </button>

                <div className="flex items-center gap-2 text-slate-500">
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-100 hover:bg-white transition grid place-items-center"
                        title="Refresh cargo"
                        onClick={() => onSelectBox(null)}
                    >
                        <span className="text-[12px] font-bold">⌁</span>
                    </button>
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-slate-100 hover:bg-white transition grid place-items-center"
                        title={t.addOrder}
                        onClick={() => alert(t.addOrder)}
                    >
                        <span className="text-[12px] font-bold">⎘</span>
                    </button>
                    <button
                        type="button"
                        className={[
                            "w-10 h-10 rounded-full backdrop-blur border transition grid place-items-center",
                            editMode
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "bg-white/80 border-slate-100 hover:bg-white text-slate-500",
                        ].join(" ")}
                        title={t.editCargo}
                        onClick={toggleEditMode}
                    >
                        <span className="text-[12px] font-bold">✎</span>
                    </button>
                </div>
            </div>

            <div className="rounded-[28px] bg-white/50 shadow-soft p-4 pt-4 overflow-hidden">
                {/* Slot status legend */}
                <div className="flex justify-end gap-3 mb-2 pr-1">
                    {(["occupied", "free", "problem"] as const).map((s) => {
                        const colors = {
                            occupied: "bg-slate-400",
                            free: "bg-emerald-400",
                            problem: "bg-rose-500",
                        };
                        const labels = {
                            occupied: t.slotOccupied,
                            free: t.slotFree,
                            problem: t.slotProblem,
                        };
                        return (
                            <div key={s} className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${colors[s]}`} />
                                <span className="text-[9px] text-slate-400 font-medium">{labels[s]}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="relative select-none">
                    <img src={truckMain} alt="truck" className="w-full h-auto" />

                    <div
                        className="absolute"
                        style={CARGO_OVERLAY}
                        onClick={() => onSelectBox(null)}
                        role="presentation"
                    >
                        {truck.boxes.map((cell) => (
                            <BoxSlot
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
