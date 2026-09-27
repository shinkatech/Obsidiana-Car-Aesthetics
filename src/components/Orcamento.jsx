import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { BRAND, CONDITIONS, SERVICES, VEHICLES, brl } from '../config'
import { SectionHead, WhatsIcon } from './ui'

const round10 = (n) => Math.round(n / 10) * 10

function Silhouette({ path, className = '', active }) {
  return (
    <svg viewBox="0 0 120 48" className={className} aria-hidden="true">
      <motion.path
        key={path}
        d={path}
        fill={active ? 'rgba(143,219,255,.14)' : 'transparent'}
        stroke={active ? '#8FDBFF' : '#8D99AC'}
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <circle cx="30" cy="38" r="7" fill="#090C11" stroke={active ? '#E9EEF5' : '#8D99AC'} strokeWidth="1.6" />
      <circle cx="90" cy="38" r="7" fill="#090C11" stroke={active ? '#E9EEF5' : '#8D99AC'} strokeWidth="1.6" />
    </svg>
  )
}

function Meter({ value, max = 9000 }) {
  const segs = 32
  const lit = Math.round(Math.min(value / max, 1) * segs)
  return (
    <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: segs }, (_, i) => {
        const on = i < lit
        const red = i >= segs - 5
        return (
          <span
            key={i}
            className="flex-1 rounded-sm transition-all duration-300"
            style={{
              height: `${30 + (i / segs) * 70}%`,
              background: on ? (red ? '#FF3B4E' : '#8FDBFF') : '#222A36',
              boxShadow: on ? `0 0 8px ${red ? 'rgba(255,59,78,.7)' : 'rgba(143,219,255,.6)'}` : 'none',
              transitionDelay: `${i * 12}ms`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function Orcamento({ cart, onToggle }) {
  const [vehicleId, setVehicleId] = useState('sedan')
  const [cond, setCond] = useState(1)
  const [copied, setCopied] = useState(false)
  const vehicle = VEHICLES.find((v) => v.id === vehicleId)
  const condition = CONDITIONS[cond]

  const lines = useMemo(
    () =>
      SERVICES.filter((s) => cart.has(s.id)).map((s) => {
        const f = vehicle.factor * (s.id === 'polimento' ? condition.factor : 1)
        return { ...s, price: round10(s.from * f), h: s.hours * (s.id === 'polimento' ? condition.factor : 1) }
      }),
    [cart, vehicle, condition],
  )
  const total = lines.reduce((a, l) => a + l.price, 0)
  const top = round10(total * 1.2)
  const days = Math.max(1, Math.ceil(lines.reduce((a, l) => a + l.h, 0) / 8))

  const spring = useSpring(total, { stiffness: 70, damping: 18 })
  useEffect(() => spring.set(total), [total, spring])
  const shown = useTransform(spring, (v) => brl(round10(v)))
  const shownTop = useTransform(spring, (v) => brl(round10(v * 1.2)))

  const message = [
    `Olá! Quero um orçamento na ${BRAND.name}.`,
    `Veículo: ${vehicle.label}`,
    `Pintura: ${condition.label}`,
    `Serviços: ${lines.map((l) => l.name).join(', ') || 'quero ajuda para escolher'}`,
    total ? `Estimativa do site: ${brl(total)} a ${brl(top)}` : '',
  ]
    .filter(Boolean)
    .join('\n')
  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      const el = document.getElementById('orcamento-resumo')
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  }

  return (
    <section id="orcamento" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHead eyebrow="Simulador de orçamento" title="Monte o serviço e veja a faixa de preço.">
          Os valores são uma estimativa. O preço final sai depois da avaliação presencial com medição de verniz.
        </SectionHead>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <fieldset>
              <legend className="eyebrow mb-4">Tipo de veículo</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {VEHICLES.map((v) => {
                  const on = v.id === vehicleId
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleId(v.id)}
                      aria-pressed={on}
                      className={`relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                        on ? 'border-led bg-led/5 shadow-[0_0_0_1px_rgba(143,219,255,.4)]' : 'border-steel hover:border-mist/60'
                      }`}
                    >
                      <Silhouette path={v.path} active={on} className="h-12 w-full" />
                      <span className="mt-2 flex items-center justify-between text-sm font-semibold">
                        {v.label}
                        <span className="font-mono text-[10px] text-mist">×{v.factor.toFixed(2).replace('.', ',')}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-4">Estado da pintura</legend>
              <div className="relative grid gap-2 rounded-2xl border border-steel p-1.5 sm:grid-cols-3">
                {CONDITIONS.map((c) => {
                  const on = c.id === cond
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCond(c.id)}
                      aria-pressed={on}
                      className="relative rounded-xl px-4 py-3 text-left"
                    >
                      {on && (
                        <motion.span
                          layoutId="cond-pill"
                          className="absolute inset-0 rounded-xl bg-bay ring-1 ring-led/50"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={`relative block text-sm font-semibold ${on ? 'text-chrome' : 'text-mist'}`}>{c.label}</span>
                      <span className="relative block text-xs text-mist">{c.hint}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-4">Serviços</legend>
              <div className="flex flex-wrap gap-2.5">
                {SERVICES.map((s) => {
                  const on = cart.has(s.id)
                  return (
                    <motion.button
                      key={s.id}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onToggle(s.id)}
                      aria-pressed={on}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                        on ? 'border-led bg-led text-asphalt' : 'border-steel text-chrome hover:border-led/60'
                      }`}
                    >
                      <span className={`grid h-4 w-4 place-items-center rounded-full border ${on ? 'border-asphalt' : 'border-mist'}`}>
                        {on && (
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                            <path d="M2.5 6.2l2.2 2.2L9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                      {s.name}
                    </motion.button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-steel bg-bay p-6 lg:sticky lg:top-28">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-led/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Seu orçamento</p>
                  <p className="mt-1 font-display text-2xl font-extrabold uppercase">
                    {vehicle.label} · {condition.label}
                  </p>
                </div>
                <Silhouette path={vehicle.path} active className="h-12 w-28 shrink-0" />
              </div>

              <ul id="orcamento-resumo" className="relative mt-5 flex min-h-[120px] flex-col divide-y divide-steel border-y border-steel">
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <motion.li
                      key={l.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <span>{l.name}</span>
                      <span className="font-mono tabular-nums text-mist">{brl(l.price)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
                {lines.length === 0 && <li className="py-6 text-sm text-mist">Escolha pelo menos um serviço ao lado.</li>}
              </ul>

              <div className="relative mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Faixa estimada</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2 font-display text-4xl font-black tabular-nums sm:text-5xl">
                  <motion.span className="text-led">{shown}</motion.span>
                  <span className="text-2xl text-mist">a</span>
                  <motion.span>{shownTop}</motion.span>
                </p>
                <div className="mt-4">
                  <Meter value={total} />
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-mist">
                  Prazo estimado · <span className="text-chrome">{days} {days === 1 ? 'dia' : 'dias'}</span>
                </p>
              </div>

              <div className="relative mt-6 flex flex-col gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-led">
                  <WhatsIcon />
                  Pedir orçamento no WhatsApp
                </a>
                <button type="button" onClick={copy} className="btn-ghost">
                  {copied ? 'Resumo copiado' : 'Copiar resumo'}
                </button>
                <p className="text-center text-sm text-mist">
                  WhatsApp <span className="select-all font-mono text-chrome">{BRAND.phoneDisplay}</span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
