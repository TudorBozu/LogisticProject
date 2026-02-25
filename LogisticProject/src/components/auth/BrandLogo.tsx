import styles from './BrandLogo.module.css'

interface BrandLogoProps {
    inverted?: boolean
}

export default function BrandLogo({ inverted = false }: BrandLogoProps) {
    return (
        <div className={styles.brand}>
            <div className={`${styles.icon} ${inverted ? styles.iconInverted : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 12L12 3L21 12"
                        stroke={inverted ? '#2563EB' : 'white'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 10V19C5 19.55 5.45 20 6 20H10V15H14V20H18C18.55 20 19 19.55 19 19V10"
                        stroke={inverted ? '#2563EB' : 'white'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span className={`${styles.name} ${inverted ? styles.nameInverted : ''}`}>RoutaX</span>
        </div>
    )
}
