import { useState } from 'react'
import { useOrders } from '../context/OrdersContext'
import DepotNavbar from './DepotNavbar'
import BarcodeScanner from './BarcodeScanner'
import { fmtMDL, distToETA, driverInitials, statusLabel } from '../utils/format'
import type { Order } from '../types/orders'

export default function DepotPortalPage() {
  const { orders, updateStatus } = useOrders()
  const [input, setInput]         = useState('')
  const [scanError, setScanError] = useState<string | null>(null)
  const [found, setFound]         = useState<Order | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)

  const activeOrders = orders.filter(o => o.status !== 'delivered')

  const identify = () => {
    setScanError(null)
    const val = input.trim()
    if (!val) return setScanError('Introduceți sau scanați codul de bare al șoferului.')
    const order = orders.find(o => o.barcode === val)
    if (!order) return setScanError('Codul nu corespunde niciunui șofer activ. Verificați și reîncercați.')
    if (order.status === 'delivered') return setScanError(`Comanda ${order.id} a fost deja livrată.`)
    setFound(order)
  }

  const confirmLoading = () => {
    if (!found) return
    updateStatus(found.id, 'transit')
    setConfirmed(true)
  }

  const reset = () => {
    setInput(''); setScanError(null); setFound(null); setConfirmed(false)
  }

  const dest = found?.destinations[0]
  const inputBase = 'w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-wider text-center outline-none transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400'

  const handleCameraScan = (value: string) => {
    setInput(value)
    setScanError(null)
    setCameraOpen(false)
    const order = orders.find(o => o.barcode === value)
    if (!order) return setScanError('Codul nu corespunde niciunui șofer activ. Verificați și reîncercați.')
    if (order.status === 'delivered') return setScanError(`Comanda ${order.id} a fost deja livrată.`)
    setFound(order)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <DepotNavbar />
      {cameraOpen && (
        <BarcodeScanner onScan={handleCameraScan} onClose={() => setCameraOpen(false)} />
      )}

      <div className="max-w-lg mx-auto px-4 py-10 pb-20">

        {!found ? (
          // ── Scan state ─────────────────────────────────────────────
          <div className="animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">Stație Depozit</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                Scanați codul de bare prezentat de șofer pentru a identifica comanda și marfa de încărcat.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 shadow-sm text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-5">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5ZM13.5 14.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                </svg>
              </div>

              <p className="font-display font-bold text-slate-900 dark:text-slate-100 mb-1.5">Scanați codul șoferului</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Lucrătorul de depozit scanează codul de bare pe care șoferul îl prezintă
              </p>

              {/* Input + camera button */}
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    className={`${inputBase} ${scanError ? 'border-red-400 ring-2 ring-red-400/20' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'}`}
                    type="text"
                    value={input}
                    onChange={e => { setInput(e.target.value); setScanError(null) }}
                    onKeyDown={e => e.key === 'Enter' && identify()}
                    placeholder="Scanați sau introduceți codul"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {input && (
                    <button onClick={() => { setInput(''); setScanError(null) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setCameraOpen(true)}
                  title="Scanează cu camera"
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-slate-500 dark:text-slate-400 hover:text-emerald-600"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                </button>
              </div>

              {scanError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl mb-3 text-left">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2} className="flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <p className="text-xs font-medium text-red-700 dark:text-red-400">{scanError}</p>
                </div>
              )}

              <button
                onClick={identify}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-emerald-600/25"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Identifică & Afișează marfa
              </button>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                Sau introduceți manual codul, apoi apăsați Enter
              </p>

              {/* Quick sim */}
              {activeOrders.length > 0 && (
                <>
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs text-slate-400">Simulare — alegeți un șofer</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {activeOrders.map(o => (
                      <button
                        key={o.id}
                        onClick={() => {
                          setInput(o.barcode)
                          setScanError(null)
                          setTimeout(() => { setFound(o); setConfirmed(false) }, 350)
                        }}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors text-left"
                      >
                        <div>
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            🧑‍✈️ {o.driver} · {o.truck}
                          </span>
                          <div className="text-xs text-slate-400 mt-0.5">{o.id}</div>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{o.barcode}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          // ── Dispatch card ──────────────────────────────────────────
          <div className="animate-fade-up">
            <button onClick={reset} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Scanează alt șofer
            </button>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              {/* Green header */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 p-6 text-white">
                <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Marfă de încărcat pentru șofer</div>
                <div className="font-display text-2xl font-extrabold">{found.id}</div>
                <div className="text-sm opacity-85 mt-1">{found.product} · {statusLabel(found.status)}</div>
              </div>

              <div className="p-5 flex flex-col gap-5">
                {/* Driver */}
                <section>
                  <SectionLabel>Șofer identificat</SectionLabel>
                  <div className="flex items-center gap-3 p-3.5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {driverInitials(found.driver)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{found.driver}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{found.truck} · Camion atribuit</div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-2.5 py-1.5 rounded-lg">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      Identificat
                    </div>
                  </div>
                </section>

                {/* Route */}
                <section>
                  <SectionLabel>Traseu</SectionLabel>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-600 my-1" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <div className="text-xs text-slate-400">Ridicare depozit</div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{found.from}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{found.fromAddr}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Destinație livrare</div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{dest?.city}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{dest?.addr}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-display font-bold text-blue-600 dark:text-blue-400">{found.distance} km</div>
                      <div className="text-xs text-slate-400">{distToETA(found.distance)}</div>
                    </div>
                  </div>
                </section>

                {/* Cargo */}
                <section>
                  <SectionLabel>Marfă de încărcat</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { l: 'Produs', v: found.product },
                      { l: 'Tip', v: found.productType },
                      { l: 'Unități', v: `${found.units} buc` },
                      { l: 'Total kg', v: `${found.totalKg} kg`, highlight: true },
                    ].map(c => (
                      <div key={c.l} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                        <div className="text-xs text-slate-400 mb-0.5">{c.l}</div>
                        <div className={`text-sm font-semibold ${c.highlight ? 'text-blue-600 dark:text-blue-400 text-base' : 'text-slate-900 dark:text-slate-100'}`}>{c.v}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact */}
                <section>
                  <SectionLabel>Contact la destinație</SectionLabel>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl p-3.5">
                    <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center flex-shrink-0">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{dest?.contact}</div>
                      <a href={`tel:${dest?.phone?.replace(/\s/g, '')}`} className="text-xs text-blue-600 dark:text-blue-400">{dest?.phone}</a>
                    </div>
                    <a
                      href={`tel:${dest?.phone?.replace(/\s/g, '')}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0 9.108 7.354 16.5 16.5 16.5.372 0 .741-.012 1.104-.036a1.5 1.5 0 0 0 1.395-1.31l.75-5.25a1.5 1.5 0 0 0-1.013-1.624l-3-1.2a1.5 1.5 0 0 0-1.74.461l-1.282 1.709a13.507 13.507 0 0 1-6.097-6.097l1.709-1.282a1.5 1.5 0 0 0 .461-1.74l-1.2-3A1.5 1.5 0 0 0 8.348 3H3.75a1.5 1.5 0 0 0-1.5 1.338Z" />
                      </svg>
                      Sună
                    </a>
                  </div>
                </section>

                {/* Cost */}
                <section>
                  <SectionLabel>Compensație șofer</SectionLabel>
                  <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Total cursă (incl. TVA)</span>
                    <span className="font-display font-bold text-xl text-blue-600 dark:text-blue-400">{fmtMDL(found.cost.total)}</span>
                  </div>
                </section>

                {/* Action */}
                {confirmed ? (
                  <div className="flex items-center gap-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white animate-fade-up">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5} className="flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm">Încărcare confirmată!</p>
                      <p className="text-xs opacity-85 mt-0.5">Comanda marcată „În tranzit". Marfa poate fi încărcată.</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={confirmLoading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-emerald-600/30"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Confirmă încărcarea mărfii
                  </button>
                )}

                <button
                  onClick={reset}
                  className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold rounded-xl hover:border-red-300 dark:hover:border-red-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {confirmed ? 'Scanează alt șofer' : 'Anulează / Scanează alt șofer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">{children}</h3>
}
