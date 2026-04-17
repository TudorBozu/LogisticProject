import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import { useTheme } from '../../context/ThemeContext'
import OrdersNavbar from '../../components/ui/OrdersNavbar'
import BarcodeCanvas from '../../components/orders/BarcodeCanvas'
import CustomDropdown from '../../components/orders/CustomDropdown'
import { ALL_CITIES, CITY_COORDS, getDistance } from '../../utils/geo'
import { calcCost, generateOrderId, generateBarcode, DRIVERS, TRUCKS} from '../../utils/format'
import { drawBarcode } from '../../utils/barcode'
import { PATHS, orderRoutePath } from '../../router/paths'
import type { Order, ProductType } from '../../types/orders'

const PRODUCT_TYPES: ProductType[] = [
  'Produse alimentare', 'Materiale de construcție', 'Electronice', 'Textile', 'Produse chimice',
]
const DEPOT_CITIES = Object.keys(CITY_COORDS)

const OCR_SAMPLE = {
  productType: 'Produse alimentare' as ProductType,
  productName: 'Ulei de floarea-soarelui rafinat',
  mass: '0.9', units: '1200',
  depotCity: 'Chișinău', depotAddr: 'str. Industrială 12',
  destCity: 'Bălți', destAddr: 'str. Independenței 45',
  destContact: 'Ion Rusu', destPhone: '+373 78 123 456',
}

interface DestRow { id: number; city: string; addr: string; contact: string; phone: string }
type OcrState = 'idle' | 'loading' | 'done'

export default function CreateOrderPage() {
  const { addOrder }     = useOrders()
  const { theme }        = useTheme()
  const dark             = theme === 'dark'
  const navigate         = useNavigate()

  const [ocrState, setOcrState]   = useState<OcrState>('idle')
  const [ocrProg, setOcrProg]     = useState(0)
  const [productType, setProductType] = useState<ProductType>('Produse alimentare')
  const [productName, setProductName] = useState('')
  const [mass, setMass]           = useState('')
  const [units, setUnits]         = useState('')
  const [depotCity, setDepotCity] = useState('Chișinău')
  const [depotAddr, setDepotAddr] = useState('')
  const [dests, setDests]         = useState<DestRow[]>([{ id: 1, city: '', addr: '', contact: '', phone: '' }])
  const [error, setError]         = useState<string | null>(null)
  const [created, setCreated]     = useState<Order | null>(null)

  const totalKg = mass && units ? (parseFloat(mass) * parseInt(units)).toFixed(2) : ''
  const destCities = ALL_CITIES.filter(c => c !== depotCity)

  const triggerOCR = () => {
    if (ocrState !== 'idle') return
    setOcrState('loading')
    setTimeout(() => setOcrProg(85), 100)
    setTimeout(() => {
      setOcrState('done')
      setProductType(OCR_SAMPLE.productType)
      setProductName(OCR_SAMPLE.productName)
      setMass(OCR_SAMPLE.mass)
      setUnits(OCR_SAMPLE.units)
      setDepotCity(OCR_SAMPLE.depotCity)
      setDepotAddr(OCR_SAMPLE.depotAddr)
      setDests([{ id: 1, city: OCR_SAMPLE.destCity, addr: OCR_SAMPLE.destAddr, contact: OCR_SAMPLE.destContact, phone: OCR_SAMPLE.destPhone }])
    }, 2200)
  }

  const addDest = () => setDests(p => [...p, { id: Date.now(), city: '', addr: '', contact: '', phone: '' }])
  const removeDest = (id: number) => setDests(p => p.filter(d => d.id !== id))
  const updateDest = (id: number, field: keyof DestRow, val: string) =>
    setDests(p => p.map(d => d.id === id ? { ...d, [field]: val } : d))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!productName.trim())           return setError('Denumirea produsului este obligatorie')
    if (!mass || parseFloat(mass) <= 0) return setError('Masa netă trebuie să fie > 0')
    if (!units || parseInt(units) <= 0) return setError('Numărul de unități trebuie să fie > 0')
    if (!depotAddr.trim())             return setError('Adresa depozitului este obligatorie')
    for (let i = 0; i < dests.length; i++) {
      if (!dests[i].city)        return setError(`Destinația ${i + 1}: selectați orașul`)
      if (!dests[i].addr.trim()) return setError(`Destinația ${i + 1}: adresa este obligatorie`)
      if (dests[i].city === depotCity) return setError(`Destinația ${i + 1}: același oraș ca depozitul`)
    }

    const id    = generateOrderId()
    const bc    = generateBarcode()
    const dIdx  = Math.floor(Math.random() * DRIVERS.length)
    const dist  = getDistance(depotCity, dests[0].city)
    const kg    = parseFloat(totalKg || '0')

    const order: Order = {
      id, product: productName.trim(), productType,
      units: parseInt(units), massPerUnit: parseFloat(mass), totalKg: kg,
      from: depotCity, fromAddr: depotAddr.trim(),
      destinations: dests.map(d => ({ city: d.city, addr: d.addr, contact: d.contact || '—', phone: d.phone || '—' })),
      status: 'processing', barcode: bc,
      driver: DRIVERS[dIdx], truck: TRUCKS[dIdx],
      distance: dist, cost: calcCost(dist),
      createdAt: new Date().toISOString(),
    }
    addOrder(order)
    setCreated(order)
  }

  const printBarcode = () => {
    if (!created) return
    const dest = created.destinations[0]
    const canvas = document.createElement('canvas')
    canvas.width = 320; canvas.height = 92
    drawBarcode(canvas, created.barcode, dark)
    const img = canvas.toDataURL()
    const w = window.open('', '_blank', 'width=480,height=680')
    if (!w) return
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Cod șofer — ${created.id}</title>
    <style>body{font-family:sans-serif;padding:24px;max-width:380px;margin:0 auto}
    .hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e2e8f0;padding-bottom:10px;margin-bottom:14px}
    .logo{font-size:15px;font-weight:700}.logo b{color:#2563eb}
    .badge{background:#dbeafe;color:#1d4ed8;font-size:10px;font-weight:700;padding:3px 8px;border-radius:99px}
    h2{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#64748b;text-align:center;margin-bottom:8px}
    img{display:block;margin:0 auto;border-radius:6px;border:1px solid #e2e8f0}
    .code{text-align:center;font-family:monospace;font-size:12px;color:#475569;margin:6px 0 14px}
    .sec{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin:12px 0 5px;font-weight:700}
    .row{display:flex;justify-content:space-between;font-size:11px;padding:4px 0;border-bottom:1px solid #f1f5f9}
    .row:last-child{border-bottom:none}.lbl{color:#94a3b8}.val{font-weight:600;color:#0f172a;text-align:right}
    .warn{border:1px dashed #f59e0b;background:#fffbeb;border-radius:8px;padding:9px 11px;font-size:10px;color:#92400e;margin-top:14px}
    @media print{button{display:none}}</style></head><body>
    <div class="hdr"><span class="logo">Routa<b>X</b></span><span class="badge">${created.id}</span></div>
    <h2>Cod de bare al șoferului</h2>
    <img src="${img}" width="320" height="92"/>
    <div class="code">${created.barcode}</div>
    <div class="sec">Marfă</div>
    <div class="row"><span class="lbl">Produs</span><span class="val">${created.product}</span></div>
    <div class="row"><span class="lbl">Unități</span><span class="val">${created.units} buc</span></div>
    <div class="row"><span class="lbl">Total kg</span><span class="val">${created.totalKg} kg</span></div>
    <div class="sec">Traseu</div>
    <div class="row"><span class="lbl">Depozit</span><span class="val">${created.from}, ${created.fromAddr}</span></div>
    <div class="row"><span class="lbl">Destinație</span><span class="val">${dest.city} — ${dest.addr}</span></div>
    <div class="row"><span class="lbl">Contact</span><span class="val">${dest.contact} · ${dest.phone}</span></div>
    <div class="warn">Transmiteți acest cod șoferului. Lucrătorii de depozit îl vor scana la sosire.</div>
    <br/><button onclick="window.print()">Tipărește</button>
    </body></html>`)
    w.document.close()
    setTimeout(() => w.print(), 300)
  }

  const input = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors'

  if (created) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <OrdersNavbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-xl animate-fade-up">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 text-center">Comandă creată!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
            Comanda <strong className="text-blue-600">{created.id}</strong> a fost înregistrată.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-center my-5 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Cod de bare al șoferului</p>
            <BarcodeCanvas value={created.barcode} />
            <p className="text-xs font-mono text-slate-400 mt-2">{created.barcode}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { lbl: 'Produs', val: created.product },
              { lbl: 'Cantitate', val: `${created.units} buc · ${created.totalKg} kg` },
              { lbl: 'Depozit', val: created.from },
              { lbl: 'Destinație', val: created.destinations[0].city },
            ].map(c => (
              <div key={c.lbl} className="bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2.5">
                <div className="text-xs text-slate-400">{c.lbl}</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5 truncate">{c.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex gap-2.5 mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#b45309" strokeWidth={2} className="flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-400">Instrucțiuni operator</p>
              <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">Transmiteți codul șoferului. Lucrătorii de depozit îl vor scana la sosire pentru a identifica marfa.</p>
            </div>
          </div>

          <div className="flex gap-2.5 mb-2.5">
            <button onClick={() => navigate(PATHS.ORDERS)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Comenzile mele
            </button>
            <button onClick={() => navigate(orderRoutePath(created.id))} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow shadow-blue-600/20">
              Vizualizează ruta
            </button>
          </div>
          <button onClick={printBarcode} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors mb-2">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"/></svg>
            Tipărește / Trimite cod șofer
          </button>
          <button onClick={() => { setCreated(null); setOcrState('idle'); setOcrProg(0); setProductName(''); setMass(''); setUnits(''); setDepotAddr(''); setDests([{ id: 1, city: '', addr: '', contact: '', phone: '' }]) }} className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1">
            + Comandă nouă
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <OrdersNavbar />
      <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto px-4 py-7 pb-16">
        <div className="mb-6 animate-fade-up">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">Comandă nouă</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Încărcați chitanța sau completați manual detaliile mărfii și destinației.</p>
        </div>

        {/* 1. OCR upload */}
        <Card className="mb-4 animate-fade-up-1">
          <SectionTitle num={1} title="Încărcați chitanța" optional />
          <div
            onClick={triggerOCR}
            className={`border-2 border-dashed rounded-xl p-7 flex flex-col items-center justify-center text-center cursor-pointer min-h-[130px] transition-colors
              ${ocrState === 'idle' ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700'}`}
          >
            {ocrState === 'idle' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Drag & drop sau <span className="text-blue-600">Browse</span></p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF — max 10MB</p>
                <span className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"/></svg>
                  OCR extrage automat detaliile
                </span>
              </>
            )}
            {ocrState === 'loading' && (
              <>
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                  <svg className="animate-spin-slow" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth={4} opacity={.2} />
                    <path fill="#2563eb" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-blue-600">Procesare OCR…</p>
                <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-[2000ms]" style={{ width: `${ocrProg}%` }} />
                </div>
              </>
            )}
            {ocrState === 'done' && (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-emerald-600">Date extrase cu succes!</p>
                <p className="text-xs text-slate-400 mt-1">Formularul a fost completat automat</p>
              </>
            )}
          </div>
        </Card>

        {/* 2. Marfă */}
        <Card className="mb-4 animate-fade-up-2">
          <SectionTitle num={2} title="Detalii marfă" />
          <div className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tipul produsului <span className="text-blue-600">*</span></label>
                <CustomDropdown options={PRODUCT_TYPES} value={productType} onChange={v => setProductType(v as ProductType)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Denumirea produsului <span className="text-blue-600">*</span></label>
                <input className={input} type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="ex. Ulei de floarea-soarelui" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Masă (kg/buc) <span className="text-blue-600">*</span></label>
                <input className={input} type="number" min="0" step="0.01" value={mass} onChange={e => setMass(e.target.value)} placeholder="0.9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Nr. unități <span className="text-blue-600">*</span></label>
                <input className={input} type="number" min="0" value={units} onChange={e => setUnits(e.target.value)} placeholder="1200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Total kg</label>
                <input className={`${input} bg-slate-50 dark:bg-slate-700/50 cursor-default`} value={totalKg} readOnly placeholder="auto" title="Calculat automat" />
              </div>
            </div>
          </div>
        </Card>

        {/* 3. Depozit */}
        <Card className="mb-4 animate-fade-up-3">
          <SectionTitle num={3} title="Locația depozitului (ridicare)" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Oraș / Localitate <span className="text-blue-600">*</span></label>
              <CustomDropdown options={DEPOT_CITIES} value={depotCity} onChange={setDepotCity} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Adresa depozitului <span className="text-blue-600">*</span></label>
              <input className={input} type="text" value={depotAddr} onChange={e => setDepotAddr(e.target.value)} placeholder="str. Industrială 12" />
            </div>
          </div>
        </Card>

        {/* 4. Destinații */}
        <Card className="mb-4 animate-fade-up-4">
          <SectionTitle num={4} title="Punct(e) de destinație" />
          <div className="flex flex-col gap-3 mb-3">
            {dests.map((dest, i) => (
              <div key={dest.id} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Destinație {i + 1}</span>
                  {dests.length > 1 && (
                    <button type="button" onClick={() => removeDest(dest.id)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
                      Șterge
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Oraș <span className="text-blue-600">*</span></label>
                    <CustomDropdown options={destCities} value={dest.city} onChange={v => updateDest(dest.id, 'city', v)} placeholder="Selectați…" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Adresa <span className="text-blue-600">*</span></label>
                    <input className={input} type="text" value={dest.addr} onChange={e => updateDest(dest.id, 'addr', e.target.value)} placeholder="str. Independenței 45" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Persoana de contact</label>
                    <input className={input} type="text" value={dest.contact} onChange={e => updateDest(dest.id, 'contact', e.target.value)} placeholder="Ion Popescu" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Telefon contact</label>
                    <input className={input} type="tel" value={dest.phone} onChange={e => updateDest(dest.id, 'phone', e.target.value)} placeholder="+373 79 123 456" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addDest} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Adaugă altă destinație
          </button>
        </Card>

        {/* Submit */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl mb-4">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2} className="flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors shadow-lg shadow-blue-600/25">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
          Generează comandă & cod de bare
        </button>
      </form>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

function SectionTitle({ num, title, optional }: { num: number; title: string; optional?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
      <span className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">{title}</span>
      {optional && <span className="text-xs text-slate-400">(opțional)</span>}
    </div>
  )
}
