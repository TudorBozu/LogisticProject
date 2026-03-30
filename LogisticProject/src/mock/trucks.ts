import type { Truck } from "../types/fleet";
import driverLD from "../assets/driver-ld.svg";
import driverAP from "../assets/driver-ap.svg";
import driverMK from "../assets/driver-mk.svg";
import driverVF from "../assets/driver-vf.svg";


const GAP_X = 0.02;
const GAP_Y = 0.03;

const BOX_W = 0.121;
const BOX_H = 0.20;

const pos = (baseX: number, baseY: number, col: number, row: number) => ({
    x: baseX + col * (BOX_W + GAP_X),
    y: baseY + row * (BOX_H + GAP_Y),
    w: BOX_W,
    h: BOX_H,
});

const mkBoxes = (seed: number): Truck["boxes"] => [
    // ── LEFT SECTION (2 cols × 2 rows, 400kg) ──────────────────────
    { id: `b-${seed}-01`, label: "BX-01", weightKg: 400, ...pos(0.02, 0.50, 0, 0) },
    { id: `b-${seed}-02`, label: "BX-02", weightKg: 400, ...pos(0.02, 0.50, 1, 0) },

    { id: `b-${seed}-03`, label: "BX-03", weightKg: 400, ...pos(0.02, 0.48, 0, 1) },
    { id: `b-${seed}-04`, label: "BX-04", weightKg: 400, ...pos(0.02, 0.48, 1, 1) },

    // ── CENTER BIG (1550kg) ───────────────────────────────────────
    {
        id: `b-${seed}-05`,
        label: "BX-07",
        weightKg: 1550,
        x: 0.32,
        y: 0.52,
        w: 0.30,
        h: 0.40,
    },

    // ── RIGHT SECTION (3 cols × 2 rows) ───────────────────────────
    { id: `b-${seed}-06`, label: "BX-10", weightKg: 400, ...pos(0.65, 0.50, 0, 0) },
    { id: `b-${seed}-07`, label: "BX-11", weightKg: 400, ...pos(0.65, 0.50, 1, 0) },
    { id: `b-${seed}-08`, label: "BX-12", weightKg: 400, ...pos(0.65, 0.50, 2, 0) },

    { id: `b-${seed}-09`, label: "BX-13", weightKg: 400, ...pos(0.65, 0.48, 0, 1) },
    { id: `b-${seed}-10`, label: "BX-14", weightKg: 400, ...pos(0.65, 0.48, 1, 1) },
    { id: `b-${seed}-11`, label: "BX-15", weightKg: 700, ...pos(0.65, 0.48, 2, 1) },
];
export const trucks: Truck[] = [
    {
        id: "t1",
        code: "TR-001",
        name: "MAN TGX",
        status: "En route",
        burden: { used: 5000, total: 10000, unit: "kg" },
        usedVolume: { used: 23, total: 45, unit: "m³" },
        usedCapacityPct: 50,
        fuelPct: 60,
        temperatureC: 24,
        driver: { id: "d1", name: "Luis Davidson", avatarSrc: driverLD },
        boxes: mkBoxes(1),
    },
    {
        id: "t2",
        code: "TR-002",
        name: "SCANIA R-SERIES",
        status: "En route",
        burden: { used: 8200, total: 10000, unit: "kg" },
        usedVolume: { used: 34, total: 45, unit: "m³" },
        usedCapacityPct: 82,
        fuelPct: 52,
        temperatureC: 22,
        driver: { id: "d2", name: "Ana Popescu", avatarSrc: driverAP },
        boxes: mkBoxes(2),
    },
    {
        id: "t3",
        code: "TR-003",
        name: "VOLVO FH",
        status: "En route",
        burden: { used: 7700, total: 10000, unit: "kg" },
        usedVolume: { used: 31, total: 45, unit: "m³" },
        usedCapacityPct: 77,
        fuelPct: 71,
        temperatureC: 23,
        driver: { id: "d3", name: "Mihai Koval", avatarSrc: driverMK },
        boxes: mkBoxes(3),
    },
    {
        id: "t4",
        code: "TR-004",
        name: "FREIGHTLINER M2",
        status: "En route",
        burden: { used: 7700, total: 10000, unit: "kg" },
        usedVolume: { used: 30, total: 45, unit: "m³" },
        usedCapacityPct: 77,
        fuelPct: 44,
        temperatureC: 21,
        driver: { id: "d4", name: "Vlad Frunză", avatarSrc: driverVF },
        boxes: mkBoxes(4),
    },
];