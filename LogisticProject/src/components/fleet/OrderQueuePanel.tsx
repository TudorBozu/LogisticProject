import { useState } from 'react';
import { trucks as mockTrucks } from '../../mock/trucks';
import { useLang } from '../../context/LangContext';
import { fleetT } from '../../data/fleetTranslations';
import BarcodeCanvas from '../orders/BarcodeCanvas';
import truckThumb from '../../assets/truck_main.png';

type Priority = 'high' | 'normal' | 'low';
type DispatchStatus = 'pending' | 'assigned' | 'qr_active' | 'loading';

type DispatchOrder = {
    id: string;
    storeId: string;
    destination: string;
    address: string;
    itemCount: number;
    weightKg: number;
    priority: Priority;
    window: string;
    status: DispatchStatus;
    assignedTruckId?: string;
};

const INITIAL_ORDERS: DispatchOrder[] = [
    {
        id: 'RX-2026-0047',
        storeId: 'LIDL-CHI-005',
        destination: 'Lidl Chișinău – Bd. Moscova',
        address: 'Bd. Moscova 14, Chișinău',
        itemCount: 4,
        weightKg: 2400,
        priority: 'high',
        window: 'Today 12:00 – 16:00',
        status: 'pending',
    },
    {
        id: 'RX-2026-0046',
        storeId: 'METRO-IAS-001',
        destination: 'Metro Cash & Carry Iași',
        address: 'Șos. Păcurari 130, Iași',
        itemCount: 2,
        weightKg: 1300,
        priority: 'high',
        window: 'Today 14:00 – 18:00',
        status: 'pending',
    },
    {
        id: 'RX-2026-0045',
        storeId: 'CARR-SUC-002',
        destination: 'Carrefour Suceava',
        address: 'Calea Unirii 27, Suceava',
        itemCount: 3,
        weightKg: 1850,
        priority: 'normal',
        window: 'Tomorrow 08:00 – 12:00',
        status: 'assigned',
        assignedTruckId: 't3',
    },
    {
        id: 'RX-2026-0044',
        storeId: 'PENNY-BAL-003',
        destination: 'Penny Market Bălți',
        address: 'Str. Ștefan cel Mare 5, Bălți',
        itemCount: 5,
        weightKg: 3200,
        priority: 'normal',
        window: 'Tomorrow 10:00 – 14:00',
        status: 'qr_active',
        assignedTruckId: 't4',
    },
    {
        id: 'RX-2026-0043',
        storeId: 'OLIMP-CAH-001',
        destination: 'Olimp Cahul',
        address: 'Str. Republicii 45, Cahul',
        itemCount: 2,
        weightKg: 900,
        priority: 'low',
        window: 'Tomorrow 14:00 – 18:00',
        status: 'loading',
        assignedTruckId: 't1',
    },
];

const PRIORITY_CFG: Record<Priority, { label: string; labelRO: string; bg: string; text: string; border: string; dot: string }> = {
    high:   { label: 'High',   labelRO: 'Ridicată', bg: 'bg-rose-50',  text: 'text-rose-600',  border: 'border-rose-100',  dot: 'bg-rose-400'  },
    normal: { label: 'Normal', labelRO: 'Normală',  bg: 'bg-blue-50',  text: 'text-blue-600',  border: 'border-blue-100',  dot: 'bg-blue-400'  },
    low:    { label: 'Low',    labelRO: 'Scăzută',  bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-100', dot: 'bg-slate-300' },
};

const STATUS_CFG: Record<DispatchStatus, { label: string; labelRO: string; bg: string; text: string; dot: string }> = {
    pending:   { label: 'Pending',   labelRO: 'În așteptare', bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
    assigned:  { label: 'Assigned',  labelRO: 'Atribuit',     bg: 'bg-blue-50',    text: 'text-blue-700',    dot: 'bg-blue-400'    },
    qr_active: { label: 'QR Active', labelRO: 'QR Activ',     bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
    loading:   { label: 'Loading',   labelRO: 'Încărcare',    bg: 'bg-sky-50',     text: 'text-sky-700',     dot: 'bg-sky-400'     },
};

const TRUCK_STATUS_DOT: Record<string, string> = {
    'En route': 'bg-emerald-400',
    'Stopped':  'bg-amber-400',
    'Loading':  'bg-sky-400',
};

export default function OrderQueuePanel() {
    const [orders, setOrders] = useState<DispatchOrder[]>(INITIAL_ORDERS);
    const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);
    const [viewingQrId, setViewingQrId] = useState<string | null>(null);
    const [justActivatedId, setJustActivatedId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<DispatchStatus | 'all'>('all');
    const { lang } = useLang();
    const t = fleetT[lang];
    const isRO = lang === 'RO';

    const countByStatus = {
        pending:   orders.filter(o => o.status === 'pending').length,
        assigned:  orders.filter(o => o.status === 'assigned').length,
        qr_active: orders.filter(o => o.status === 'qr_active').length,
        loading:   orders.filter(o => o.status === 'loading').length,
    };

    const visibleOrders = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    const assigningOrder = assigningOrderId ? orders.find(o => o.id === assigningOrderId) : null;
    const viewingQrOrder = viewingQrId ? orders.find(o => o.id === viewingQrId) : null;

    function handleAssignTruck(orderId: string, truckId: string) {
        setOrders(prev => prev.map(o =>
            o.id === orderId ? { ...o, status: 'assigned', assignedTruckId: truckId } : o
        ));
        setAssigningOrderId(null);
    }

    function handleActivateQr(orderId: string) {
        setOrders(prev => prev.map(o =>
            o.id === orderId ? { ...o, status: 'qr_active' } : o
        ));
        setJustActivatedId(orderId);
        setTimeout(() => setJustActivatedId(null), 2000);
    }

    function getTruckOrders(truckId: string) {
        return orders.filter(o => o.assignedTruckId === truckId);
    }

    return (
        <div className="space-y-5">
            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-4 max-[700px]:grid-cols-2">
                {([
                    { key: 'pending'   as const, label: t.pendingOrders,  value: countByStatus.pending,   dot: 'bg-amber-400'   },
                    { key: 'assigned'  as const, label: t.assignedOrders, value: countByStatus.assigned,  dot: 'bg-blue-400'    },
                    { key: 'qr_active' as const, label: t.qrActive,       value: countByStatus.qr_active, dot: 'bg-emerald-400' },
                    { key: 'loading'   as const, label: t.loading,        value: countByStatus.loading,   dot: 'bg-sky-400'     },
                ] as const).map(({ key, label, value, dot }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
                        className={[
                            'bg-white rounded-[22px] p-4 border shadow-soft text-left transition',
                            filterStatus === key
                                ? 'border-blue-200 ring-2 ring-blue-100'
                                : 'border-slate-100 hover:border-slate-200',
                        ].join(' ')}
                    >
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={`w-2 h-2 rounded-full ${dot}`} />
                            <span className="text-[11px] text-slate-400 font-medium">{label}</span>
                        </div>
                        <div className="text-[30px] font-extrabold text-slate-900 leading-none tracking-tight">
                            {value}
                        </div>
                    </button>
                ))}
            </div>

            {/* Main layout */}
            <div className="grid grid-cols-12 gap-5">

                {/* ── Order list ── */}
                <div className="col-span-7 max-[1100px]:col-span-12">
                    <div className="bg-white rounded-[28px] border border-slate-100 shadow-soft overflow-hidden">
                        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-50">
                            <div className="text-[15px] font-extrabold text-slate-900">{t.dispatchQueue}</div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <span>{visibleOrders.length} {isRO ? 'comenzi' : 'orders'}</span>
                                {filterStatus !== 'all' && (
                                    <button
                                        type="button"
                                        onClick={() => setFilterStatus('all')}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {isRO ? '× șterge filtru' : '× clear filter'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50 max-h-[calc(100vh-320px)] overflow-y-auto">
                            {visibleOrders.length === 0 && (
                                <div className="px-5 py-14 text-center text-slate-400 text-[13px]">
                                    {isRO ? 'Nicio comandă în această categorie' : 'No orders in this category'}
                                </div>
                            )}

                            {visibleOrders.map((order) => {
                                const sc = STATUS_CFG[order.status];
                                const pc = PRIORITY_CFG[order.priority];
                                const truck = order.assignedTruckId
                                    ? mockTrucks.find(tr => tr.id === order.assignedTruckId)
                                    : null;
                                const isJustActivated = justActivatedId === order.id;
                                const isAssigning = assigningOrderId === order.id;

                                return (
                                    <div
                                        key={order.id}
                                        className={[
                                            'px-5 py-4 transition-colors',
                                            isJustActivated ? 'bg-emerald-50/60' : '',
                                            isAssigning ? 'bg-blue-50/40' : 'hover:bg-slate-50/50',
                                        ].join(' ')}
                                    >
                                        {/* Top row: ID + badges */}
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[12px] font-extrabold text-slate-700 font-mono tracking-tight">
                                                    {order.id}
                                                </span>
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${pc.bg} ${pc.text} ${pc.border}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                                                    {isRO ? pc.labelRO : pc.label}
                                                </span>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${isJustActivated ? 'animate-pulse' : ''}`} />
                                                {isRO ? sc.labelRO : sc.label}
                                            </span>
                                        </div>

                                        {/* Destination */}
                                        <div className="flex items-start gap-2 mb-2">
                                            <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <div className="text-[13px] font-bold text-slate-800 leading-tight">{order.destination}</div>
                                                <div className="text-[10px] text-slate-400 mt-0.5">{order.address}</div>
                                            </div>
                                        </div>

                                        {/* Meta row */}
                                        <div className="flex items-center gap-4 mb-3 text-[11px] text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/>
                                                </svg>
                                                {order.itemCount} {isRO ? 'produse' : 'items'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                                                </svg>
                                                {order.weightKg.toLocaleString()} kg
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                                </svg>
                                                {order.window}
                                            </span>
                                        </div>

                                        {/* Assigned truck chip */}
                                        {truck && (
                                            <div className="flex items-center gap-2 mb-3 px-2.5 py-1.5 bg-slate-50 rounded-[10px] w-fit border border-slate-100">
                                                <img src={truckThumb} alt="" className="w-5 h-5 object-contain" />
                                                <span className="text-[11px] font-semibold text-slate-600">{truck.code} · {truck.name}</span>
                                                <span className="text-[10px] text-slate-400">{truck.driver.name}</span>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-2">
                                            {order.status === 'pending' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setAssigningOrderId(isAssigning ? null : order.id)}
                                                    className={[
                                                        'flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold transition',
                                                        isAssigning
                                                            ? 'bg-blue-500 text-white shadow-sm'
                                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100',
                                                    ].join(' ')}
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
                                                        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                                                    </svg>
                                                    {t.assignTruck}
                                                </button>
                                            )}

                                            {order.status === 'assigned' && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleActivateQr(order.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 transition"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                                                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                                                            <path d="M14 14h3m0 0h4m-4 0v3m0 3h4m-7-3h1m3 0v4" strokeLinecap="round"/>
                                                        </svg>
                                                        {t.activateQr}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setAssigningOrderId(isAssigning ? null : order.id)}
                                                        className={[
                                                            'flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold transition border',
                                                            isAssigning
                                                                ? 'bg-blue-500 text-white border-blue-500'
                                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-100',
                                                        ].join(' ')}
                                                    >
                                                        {isRO ? 'Schimbă camion' : 'Change Truck'}
                                                    </button>
                                                </>
                                            )}

                                            {order.status === 'qr_active' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingQrId(viewingQrId === order.id ? null : order.id)}
                                                    className={[
                                                        'flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold transition',
                                                        viewingQrId === order.id
                                                            ? 'bg-emerald-500 text-white shadow-sm'
                                                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100',
                                                    ].join(' ')}
                                                >
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                                                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                                                        <path d="M14 14h3m0 0h4m-4 0v3m0 3h4m-7-3h1m3 0v4" strokeLinecap="round"/>
                                                    </svg>
                                                    {t.viewBarcode}
                                                </button>
                                            )}

                                            {order.status === 'loading' && (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                                                    {isRO ? 'Încărcare în curs...' : 'Loading in progress...'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Right panel ── */}
                <div className="col-span-5 max-[1100px]:col-span-12">

                    {assigningOrder ? (
                        /* Truck picker */
                        <div className="bg-white rounded-[28px] border border-blue-100 shadow-soft overflow-hidden">
                            <div className="px-5 pt-5 pb-4 border-b border-slate-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[11px] text-slate-400 mb-0.5">{t.assignTruck}</div>
                                        <div className="text-[14px] font-extrabold text-slate-900">{assigningOrder.id}</div>
                                        <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                                            {assigningOrder.destination}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAssigningOrderId(null)}
                                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500 transition shrink-0"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-[10px] border border-amber-100">
                                    <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                                    </svg>
                                    <span className="text-[11px] text-amber-700 font-medium">
                                        {assigningOrder.weightKg.toLocaleString()} kg · {assigningOrder.itemCount} {isRO ? 'produse' : 'items'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 space-y-3 max-h-[480px] overflow-y-auto">
                                {mockTrucks.map(truck => {
                                    const addedPct = Math.round((assigningOrder.weightKg / truck.burden.total) * 100);
                                    const newPct = Math.min(100, truck.usedCapacityPct + addedPct);
                                    const overCapacity = newPct > 95;

                                    return (
                                        <div
                                            key={truck.id}
                                            className={[
                                                'rounded-[18px] border p-3.5 transition',
                                                overCapacity
                                                    ? 'border-rose-100 bg-rose-50/30 opacity-60'
                                                    : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/20',
                                            ].join(' ')}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={truckThumb} alt="" className="w-10 h-10 object-contain shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="text-[12px] font-extrabold text-slate-800 truncate">{truck.name}</div>
                                                        <span className="text-[10px] font-bold text-slate-400 shrink-0">{truck.code}</span>
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 truncate">{truck.driver.name}</div>

                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                                            <span>{isRO ? 'Capacitate după' : 'After load'}</span>
                                                            <span className={newPct > 85 ? 'text-rose-500 font-bold' : 'font-semibold text-slate-600'}>
                                                                {newPct}%
                                                            </span>
                                                        </div>
                                                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all"
                                                                style={{
                                                                    width: `${newPct}%`,
                                                                    background: newPct > 85 ? '#f87171' : '#2F6DF6',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {overCapacity ? (
                                                <div className="mt-2.5 text-center text-[10px] text-rose-500 font-semibold">
                                                    {isRO ? 'Capacitate insuficientă' : 'Insufficient capacity'}
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleAssignTruck(assigningOrder.id, truck.id)}
                                                    className="mt-3 w-full h-9 rounded-[12px] bg-blue-500 text-white text-[12px] font-semibold hover:bg-blue-600 transition"
                                                >
                                                    {t.selectTruck}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    ) : viewingQrOrder ? (
                        /* QR / Barcode viewer */
                        <div className="bg-white rounded-[28px] border border-emerald-100 shadow-soft overflow-hidden">
                            <div className="px-5 pt-5 pb-4 border-b border-slate-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] font-semibold text-emerald-600">
                                                {isRO ? 'Cod activ' : 'Code active'}
                                            </span>
                                        </div>
                                        <div className="text-[14px] font-extrabold text-slate-900">{viewingQrOrder.id}</div>
                                        <div className="text-[11px] text-slate-500 truncate max-w-[220px]">{viewingQrOrder.destination}</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setViewingQrId(null)}
                                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500 transition shrink-0"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="rounded-[18px] bg-slate-50 border border-slate-100 p-4 mb-4">
                                    <BarcodeCanvas
                                        value={viewingQrOrder.id.replace(/-/g, '')}
                                        className="w-full"
                                    />
                                    <div className="text-center text-[10px] text-slate-400 mt-2 font-mono tracking-widest">
                                        {viewingQrOrder.id}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                                    {[
                                        { label: isRO ? 'Destinație' : 'Destination', value: viewingQrOrder.destination },
                                        { label: isRO ? 'Greutate' : 'Weight',       value: `${viewingQrOrder.weightKg.toLocaleString()} kg` },
                                        { label: isRO ? 'Fereastră' : 'Window',      value: viewingQrOrder.window },
                                        { label: isRO ? 'Magazin ID' : 'Store ID',   value: viewingQrOrder.storeId },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="rounded-[12px] bg-slate-50 border border-slate-100 p-3">
                                            <div className="text-slate-400 mb-0.5">{label}</div>
                                            <div className="font-semibold text-slate-700 truncate">{value}</div>
                                        </div>
                                    ))}
                                </div>

                                {viewingQrOrder.assignedTruckId && (() => {
                                    const truck = mockTrucks.find(tr => tr.id === viewingQrOrder.assignedTruckId);
                                    if (!truck) return null;
                                    return (
                                        <div className="mt-3 flex items-center gap-3 p-3 rounded-[12px] bg-slate-50 border border-slate-100">
                                            <img src={truckThumb} alt="" className="w-8 h-8 object-contain shrink-0" />
                                            <div className="min-w-0">
                                                <div className="text-[12px] font-bold text-slate-800 truncate">{truck.code} · {truck.name}</div>
                                                <div className="text-[10px] text-slate-400">{truck.driver.name} · {truck.driver.phone}</div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <button
                                    type="button"
                                    className="mt-4 w-full h-10 rounded-[14px] bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                                    </svg>
                                    {isRO ? 'Printează cod' : 'Print barcode'}
                                </button>
                            </div>
                        </div>

                    ) : (
                        /* Load planner (default) */
                        <div className="bg-white rounded-[28px] border border-slate-100 shadow-soft overflow-hidden">
                            <div className="px-5 pt-5 pb-4 border-b border-slate-50">
                                <div className="text-[15px] font-extrabold text-slate-900">{t.loadPlanner}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                    {isRO ? 'Camioane și manifestele de încărcare' : 'Trucks and their load manifests'}
                                </div>
                            </div>

                            <div className="p-4 space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto">
                                {mockTrucks.map(truck => {
                                    const truckOrders = getTruckOrders(truck.id);
                                    const totalWeight = truckOrders.reduce((sum, o) => sum + o.weightKg, 0);

                                    return (
                                        <div key={truck.id} className="rounded-[18px] border border-slate-100 bg-white p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img src={truckThumb} alt="" className="w-10 h-10 object-contain shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="text-[12px] font-extrabold text-slate-800 truncate">{truck.name}</div>
                                                        <span className={`w-2 h-2 rounded-full shrink-0 ${TRUCK_STATUS_DOT[truck.status] ?? 'bg-slate-300'}`} />
                                                    </div>
                                                    <div className="text-[10px] text-slate-400">{truck.code} · {truck.driver.name}</div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                                    <span>{t.usedCapacity}</span>
                                                    <span className="font-semibold text-slate-600">{truck.usedCapacityPct}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${truck.usedCapacityPct}%`,
                                                            background: truck.usedCapacityPct > 85 ? '#f87171' : '#2F6DF6',
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {truckOrders.length > 0 ? (
                                                <div className="space-y-1.5">
                                                    {truckOrders.map(o => {
                                                        const sc = STATUS_CFG[o.status];
                                                        return (
                                                            <div key={o.id} className="flex items-center justify-between px-2.5 py-1.5 rounded-[8px] bg-slate-50 border border-slate-100">
                                                                <span className="text-[10px] font-mono font-semibold text-slate-600">{o.id}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] text-slate-400">{o.weightKg.toLocaleString()} kg</span>
                                                                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="text-right text-[10px] text-slate-400 pt-0.5">
                                                        {isRO ? 'Total:' : 'Total:'} <span className="font-semibold text-slate-600">{totalWeight.toLocaleString()} kg</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-slate-400 text-center py-1.5">
                                                    {isRO ? 'Nicio comandă atribuită' : 'No orders assigned'}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
