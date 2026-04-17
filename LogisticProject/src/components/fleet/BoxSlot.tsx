import type { BoxCell, BoxSlotStatus } from '../../types/fleet';

const statusConfig: Record<
    BoxSlotStatus,
    { bg: string; border: string; dot: string; textColor: string }
> = {
    free: {
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-200/80',
        dot: 'bg-emerald-400',
        textColor: 'text-emerald-600',
    },
    occupied: {
        bg: 'bg-white/40',
        border: 'border-white/80',
        dot: 'bg-slate-400/70',
        textColor: 'text-slate-400',
    },
    problem: {
        bg: 'bg-rose-50/70',
        border: 'border-rose-300/80',
        dot: 'bg-rose-500',
        textColor: 'text-rose-500',
    },
};

type Props = {
    cell: BoxCell;
    active: boolean;
    onClick: () => void;
};

export default function BoxSlot({ cell, active, onClick }: Props) {
    const isBig = cell.weightKg >= 1000;
    const cfg = statusConfig[cell.status];

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={[
                'absolute border transition-all duration-200',
                isBig ? 'rounded-[22px]' : 'rounded-[14px]',
                'shadow-[0_4px_12px_rgba(15,23,42,.10)]',
                'backdrop-blur-sm',
                active
                    ? 'bg-[#2F6DF6] border-[#2A5FE0]'
                    : `${cfg.bg} ${cfg.border} hover:brightness-105`,
            ].join(' ')}
            style={{
                left: `${cell.x * 100}%`,
                top: `${cell.y * 100}%`,
                width: `${cell.w * 100}%`,
                height: `${cell.h * 100}%`,
            }}
            title={`${cell.label} • ${cell.weightKg} kg • ${cell.status}`}
        >
            {/* Label top-left */}
            <div
                className={[
                    'absolute top-1.5 left-2 text-[8px] font-bold tracking-tight',
                    active ? 'text-white/80' : cfg.textColor,
                ].join(' ')}
            >
                {cell.label}
            </div>

            {/* Status dot top-right (hidden when active/selected) */}
            {!active && (
                <div className="absolute top-1.5 right-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                </div>
            )}

            {/* Centre indicator */}
            <div className="absolute inset-0 grid place-items-center">
                <div
                    className={[
                        'rounded-full grid place-items-center border',
                        isBig ? 'w-10 h-10' : 'w-5 h-5',
                        active ? 'border-white/60' : 'border-slate-300/60',
                    ].join(' ')}
                >
                    <span
                        className={[
                            'rounded-full',
                            isBig ? 'w-3 h-3' : 'w-1.5 h-1.5',
                            active ? 'bg-white' : cfg.dot,
                        ].join(' ')}
                    />
                </div>
            </div>

            {/* Weight bottom */}
            <div
                className={[
                    'absolute font-bold leading-none',
                    isBig
                        ? 'bottom-4 left-0 right-0 text-center text-[13px] tracking-tight'
                        : 'bottom-1 left-0 right-0 text-center text-[8px]',
                    active ? 'text-white/95' : cfg.textColor,
                ].join(' ')}
            >
                {cell.weightKg} kg
            </div>
        </button>
    );
}
