export default function Divider({ label = 'or' }: { label?: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
        {label}
      </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>
    )
}
