import { useMemo, useState } from "react";
import TruckCargoView from "../components/fleet/TruckCargoView";
import TruckList from "../components/fleet/TruckList";
import VehicleInfoCard from "../components/fleet/VehicleInfoCard";
import BottomWidgets from "../components/fleet/BottomWidgets";
import Navbar from "../components/layout/Navbar/Navbar";
import { trucks as mockTrucks } from "../mock/trucks";

export default function FleetDashboard() {
    const [selectedTruckId, setSelectedTruckId] = useState(mockTrucks[0].id);
    const [activeBoxId, setActiveBoxId] = useState<string | null>(null);

    const selectedTruck = useMemo(
        () => mockTrucks.find((t) => t.id === selectedTruckId) ?? mockTrucks[0],
        [selectedTruckId]
    );

    return (
        <div className="min-h-screen bg-[#eef2f8] p-6">
            <Navbar />

            <div className="max-w-[1400px] mx-auto mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-3 max-[1200px]:col-span-12">
                    <VehicleInfoCard truck={selectedTruck} />
                </div>

                <div className="col-span-6 max-[1200px]:col-span-12">
                    <TruckCargoView truck={selectedTruck} activeBoxId={activeBoxId} onSelectBox={setActiveBoxId} />
                </div>

                <div className="col-span-3 max-[1200px]:col-span-12">
                    <TruckList
                        trucks={mockTrucks}
                        selectedId={selectedTruckId}
                        onSelect={(id) => {
                            setSelectedTruckId(id);
                            setActiveBoxId(null);
                        }}
                    />
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-6">
                <BottomWidgets />
            </div>
        </div>
    );
}
