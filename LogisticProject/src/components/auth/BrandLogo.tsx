

interface BrandLogoProps {
    inverted?: boolean
}

export default function BrandLogo({ inverted = false }: BrandLogoProps) {
    return (
        <div className="flex items-center gap-2">
            <span className={`font-bold text-lg tracking-tight ${inverted ? 'text-slate-900' : 'text-white'}`}>
                Routa<span className="text-purple-600">X</span>
            </span>
        </div>
    )
}
