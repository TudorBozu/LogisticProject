export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const box  = size === 'sm' ? 'h-8 w-8'  : size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'
    const text = size === 'sm' ? 'text-lg'  : size === 'lg' ? 'text-2xl'  : 'text-xl'

    return (
        <div className="flex items-center gap-2.5">
            <div className={`flex ${box} items-center justify-center rounded-xl bg-brand-600 shadow-soft`}>
                {/* Stylized R — route arrow shape matching the screenshot */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className={`font-display ${text} font-bold tracking-tight text-slate-900 dark:text-white`}>
        Routa<span className="text-brand-600">X</span>
      </span>
        </div>
    )
}
