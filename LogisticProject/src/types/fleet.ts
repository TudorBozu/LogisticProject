export type BoxSlotStatus = 'free' | 'occupied' | 'problem';

export type BoxCell = {
    id: string;
    x: number; // 0..1 relative to cargo overlay
    y: number; // 0..1
    w: number; // 0..1
    h: number; // 0..1
    label: string;
    weightKg: number;
    status: BoxSlotStatus;
};

export type Driver = {
    id: string;
    name: string;
    avatarSrc: string;
    phone?: string;
};

export type Truck = {
    id: string;
    code: string; // TR-001
    name: string; // MAN TGX
    status: "En route" | "Stopped" | "Loading";
    burden: { used: number; total: number; unit: string };
    usedVolume: { used: number; total: number; unit: string };
    usedCapacityPct: number; // 0..100
    fuelPct: number;
    temperatureC: number;
    driver: Driver;
    boxes: BoxCell[];
    alertCount?: number;
};
