import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface Props {
  onScan: (value: string) => void
  onClose: () => void
}

export default function BarcodeScanner({ onScan, onClose }: Props) {
  const containerId = 'qr-reader'
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId)
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 120 } },
        (decoded) => {
          onScan(decoded)
          stop()
        },
        undefined,
      )
      .then(() => setStarted(true))
      .catch(() => setError('Accesul la cameră a fost refuzat sau nu este disponibil.'))

    return () => { stop() }
  }, [])

  const stop = () => {
    scannerRef.current
      ?.stop()
      .then(() => scannerRef.current?.clear())
      .catch(() => {})
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10">
        <span className="text-white text-sm font-semibold">Scanează codul de bare</span>
        <button
          onClick={() => { stop(); onClose() }}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Camera view */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
        <div className="relative w-full max-w-sm">
          <div id={containerId} className="w-full rounded-2xl overflow-hidden" />
          {started && !error && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 h-28 border-2 border-emerald-400 rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
            </div>
          )}
        </div>

        {error ? (
          <div className="flex items-start gap-2 p-3 bg-red-900/40 border border-red-700 rounded-xl max-w-sm w-full">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2} className="flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-xs text-red-300">{error}</p>
          </div>
        ) : (
          <p className="text-xs text-white/50 text-center max-w-xs">
            Poziționați codul de bare al șoferului în dreptul chenarului verde
          </p>
        )}
      </div>
    </div>
  )
}
