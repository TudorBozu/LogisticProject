import { useMemo } from "react";
import TruckCargoView from "../components/fleet/TruckCargoView";
import TruckList from "../components/fleet/TruckList";
import VehicleInfoCard from "../components/fleet/VehicleInfoCard";
import BottomWidgets from "../components/fleet/BottomWidgets";
import FleetMap from "../components/fleet/FleetMap";
import ActiveRoutes from "../components/fleet/ActiveRoutes";
import Navbar from "../components/layout/Navbar/Navbar";
import { trucks as mockTrucks } from "../mock/trucks";
import { FleetProvider, useFleet } from "../context/FleetContext";

function FleetDashboardContent() {
    const {
        selectedTruckId,
        setSelectedTruckId,
        activeBoxId,
        setActiveBoxId,
        activeTab,
        setActiveTab,
    } = useFleet();

    const selectedTruck = useMemo(
        () => mockTrucks.find((t) => t.id === selectedTruckId) ?? mockTrucks[0],
        [selectedTruckId]
    );

    function handleSelectTruck(id: string) {
        setSelectedTruckId(id);
        setActiveBoxId(null);
    }

    return (
        <div className="min-h-screen bg-[#eef2f8] p-6">
            <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={`max-w-[1400px] mx-auto mt-6 grid grid-cols-12 gap-6${activeTab === "map" ? " items-stretch" : ""}`}>
                {activeTab === "map" ? (
                    <>
                        <div className="col-span-3 max-[1200px]:col-span-12">
                            <ActiveRoutes
                                trucks={mockTrucks}
                                selectedId={selectedTruckId}
                                onSelect={handleSelectTruck}
                            />
                        </div>
                        <div className="col-span-9 max-[1200px]:col-span-12">
                            <FleetMap
                                trucks={mockTrucks}
                                selectedId={selectedTruckId}
                                onSelect={handleSelectTruck}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-span-3 max-[1200px]:col-span-12">
                            <VehicleInfoCard truck={selectedTruck} />
                        </div>
                        <div className="col-span-6 max-[1200px]:col-span-12">
                            <TruckCargoView
                                truck={selectedTruck}
                                activeBoxId={activeBoxId}
                                onSelectBox={setActiveBoxId}
                            />
                        </div>
                        <div className="col-span-3 max-[1200px]:col-span-12">
                            <TruckList
                                trucks={mockTrucks}
                                selectedId={selectedTruckId}
                                onSelect={handleSelectTruck}
                            />
                        </div>
                    </>
                )}
            </div>

            {activeTab !== "map" && (
                <div className="max-w-[1400px] mx-auto mt-6">
                    <BottomWidgets />
                </div>
            )}
        </div>
    );
}

export default function FleetDashboard() {
    return (
        <FleetProvider initialTruckId={mockTrucks[0].id}>
            <FleetDashboardContent />
        </FleetProvider>
    );
}
