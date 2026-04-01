import type { ButtonHTMLAttributes } from 'react'

type Provider = 'google' | 'facebook' | 'apple' | 'microsoft'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    provider: Provider
    label: string
}

const icons: Record<Provider, React.ReactNode> = {
    google: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1805l-2.9087-2.2581c-.8064.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5832-5.036-3.7105H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71C3.7841 10.17 3.6818 9.5932 3.6818 9c0-.5932.1023-1.17.2822-1.71V4.9582H.9573A8.9961 8.9961 0 0 0 0 9c0 1.4518.3477 2.8268.9573 4.0418L3.964 10.71Z" fill="#FBBC05"/>
            <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795Z" fill="#EA4335"/>
        </svg>
    ),
    facebook: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="#1877F2"/>
            <path d="M12.375 11.625l.421-2.744H10.17V7.25c0-.75.367-1.482 1.546-1.482H12.9V3.389S11.852 3.2 10.854 3.2c-2.03 0-3.355 1.23-3.355 3.46v1.221H5.1v2.744H7.5V18c.494.078 1.002.118 1.52.118s1.026-.04 1.52-.118v-6.375h2.835Z" fill="white"/>
        </svg>
    ),
    apple: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path className="fill-slate-900 dark:fill-white" d="M14.07 9.54c-.02-2.02 1.65-3 1.72-3.04-1-1.45-2.54-1.64-3.08-1.66-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.75-2.8-.73-1.44.02-2.77.84-3.51 2.12-1.5 2.6-.38 6.43 1.07 8.54.72 1.03 1.57 2.19 2.69 2.15 1.09-.04 1.49-.7 2.8-.7 1.3 0 1.66.7 2.8.68 1.16-.02 1.9-1.05 2.6-2.09.83-1.18 1.17-2.33 1.19-2.39-.03-.01-2.27-.87-2.25-3.65ZM11.81 3.34C12.4 2.63 12.79 1.64 12.68.64c-.85.04-1.9.57-2.51 1.27-.55.63-.99 1.62-.87 2.58.94.07 1.91-.47 2.51-1.15Z"/>
        </svg>
    ),
    microsoft: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="7.5" height="7.5" fill="#F25022"/>
            <rect x="9.5" y="1" width="7.5" height="7.5" fill="#7FBA00"/>
            <rect x="1" y="9.5" width="7.5" height="7.5" fill="#00A4EF"/>
            <rect x="9.5" y="9.5" width="7.5" height="7.5" fill="#FFB900"/>
        </svg>
    ),
}

export default function SocialButton({ provider, label, ...props }: SocialButtonProps) {
    return (
        <button
            type="button"
            className="
        theme-transition flex w-full items-center justify-center gap-2.5
        rounded-xl border border-slate-200 bg-white px-3 py-2.5
        text-sm font-medium text-slate-700
        hover:border-slate-300 hover:bg-slate-50
        active:scale-[0.97]
        dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300
        dark:hover:border-slate-600 dark:hover:bg-slate-800
      "
            {...props}
        >
            {icons[provider]}
            <span className="hidden sm:inline">{label}</span>
        </button>
    )
}
