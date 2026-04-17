import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { NavTab } from '../components/layout/Navbar/Navbar';
import type { Truck } from '../types/fleet';

type FilterStatus = Truck['status'] | 'All';

interface FleetContextType {
    selectedTruckId: string;
    setSelectedTruckId: (id: string) => void;
    activeBoxId: string | null;
    setActiveBoxId: (id: string | null) => void;
    activeTab: NavTab;
    setActiveTab: (tab: NavTab) => void;
    editMode: boolean;
    toggleEditMode: () => void;
    filterStatus: FilterStatus;
    setFilterStatus: (s: FilterStatus) => void;
}

const FleetContext = createContext<FleetContextType | null>(null);

export function FleetProvider({
    children,
    initialTruckId,
}: {
    children: ReactNode;
    initialTruckId: string;
}) {
    const [selectedTruckId, setSelectedTruckId] = useState(initialTruckId);
    const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<NavTab>('fleet');
    const [editMode, setEditMode] = useState(false);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

    return (
        <FleetContext.Provider
            value={{
                selectedTruckId,
                setSelectedTruckId,
                activeBoxId,
                setActiveBoxId,
                activeTab,
                setActiveTab,
                editMode,
                toggleEditMode: () => setEditMode((v) => !v),
                filterStatus,
                setFilterStatus,
            }}
        >
            {children}
        </FleetContext.Provider>
    );
}

export function useFleet() {
    const ctx = useContext(FleetContext);
    if (!ctx) throw new Error('useFleet must be used inside FleetProvider');
    return ctx;
}
