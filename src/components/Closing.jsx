import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BRAND, FAQ } from '../config'
import { Arrow, HexMark, Reveal, SectionHead, WhatsIcon } from './ui'

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="duvidas" className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Dúvidas" title="Perguntas de quem vai deixar o carro aqui." />
        </div>
        <div className="lg:col-span-8">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05} className="border-b border-steel">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`text-lg font-semibold transition-colors sm:text-xl ${on ? 'text-led' : 'text-chrome'}`}>{f.q}</span>
                    <motion.svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" animate={{ rotate: on ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                      <polygon points="12,1.5 21.5,7 21.5,17 12,22.5 2.5,17 2.5,7" fill={on ? '#8FDBFF' : 'none'} stroke="#8FDBFF" strokeWidth="1.5" />
                      <path d="M12 8v8M8 12h8" stroke={on ? '#090C11' : '#E9EEF5'} strokeWidth="1.8" strokeLinecap="round" />
                    </motion.svg>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-mist">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function LightBar() {
  const n = 15
  return (
    <svg viewBox={`0 0 ${n * 52 + 20} 70`} className="w-full" aria-hidden="true">
      <defs>
        <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#barGlow)" fill="none" strokeWidth="3.5" strokeLinejoin="round">
        {Array.from({ length: n }, (_, i) => {
          const cx = 36 + i * 52
          const cy = i % 2 ? 42 : 28
          const pts = Array.from({ length: 6 }, (_, k) => {
            const a = (Math.PI / 3) * k
            return `${(cx + 22 * Math.cos(a)).toFixed(1)},${(cy + 22 * Math.sin(a)).toFixed(1)}`
          }).join(' ')
          return (
            <motion.polygon
              key={i}
              points={pts}
              stroke="#DDF4FF"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
            />
          )
        })}
      </g>
    </svg>
  )
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-steel bg-bay px-6 py-14 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 opacity-80">
            <LightBar />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(143,219,255,.14),transparent_60%)]" />
          <div className="relative mt-10 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-5">Agenda aberta</p>
              <h2 className="font-display text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-[0.85] tracking-tight">
                Traga o carro
                <br />
                <span className="text-led">para a luz.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">
                A avaliação com medição de verniz é gratuita e leva 40 minutos. Você sai sabendo exatamente o que o seu carro
                precisa.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-led">
                <WhatsIcon />
                Agendar pelo WhatsApp
              </a>
              <a href="#orcamento" className="btn-ghost group">
                Simular orçamento
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-steel pb-10 pt-16" style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom, 0px))' }}>
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <HexMark animated={false} />
            <span className="font-display text-2xl font-extrabold uppercase">{BRAND.name}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-mist">Estúdio de estética automotiva com box fechado, luz de inspeção e laudo em cada entrega.</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Endereço</p>
          <p className="text-sm leading-relaxed text-mist">{BRAND.address}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Horário</p>
          {BRAND.hours.map((h) => (
            <p key={h} className="text-sm leading-relaxed text-mist">
              {h}
            </p>
          ))}
        </div>
        <div>
          <p className="eyebrow mb-3">Contato</p>
          <p className="select-all font-mono text-sm text-chrome">{BRAND.phoneDisplay}</p>
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-mist hover:text-led">
            {BRAND.instagram}
          </a>
        </div>
      </div>
      <div className="shell mt-12">
        <div className="hairline" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
          © {new Date().getFullYear()} {BRAND.full}
        </p>
      </div>
    </footer>
  )
}
