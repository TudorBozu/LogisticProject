import { useEffect, useRef } from 'react'
import { drawBarcode } from '../../utils/barcode'
import { useTheme } from '../../context/ThemeContext'

interface Props {
  value: string
  className?: string
}

export default function BarcodeCanvas({ value, className = '' }: Props) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current && value) drawBarcode(ref.current, value, dark)
  }, [value, dark])

  return (
    <canvas
      ref={ref}
      width={320}
      height={92}
      className={`rounded-lg block mx-auto ${className}`}
    />
  )
}
