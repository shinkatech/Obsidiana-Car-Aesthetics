import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { SERVICES, brl } from '../config'
import ServiceIcon from './ServiceIcons'
import { Reveal, SectionHead } from './ui'

export function Marquee() {
  const items = ['Polimento técnico', 'Vitrificação 9H', 'PPF autorregenerativo', 'Higienização interna', 'Restauração de faróis', 'Leva e traz', 'Laudo de verniz']
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-steel bg-bay py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-extrabold uppercase tracking-wide text-chrome/80 sm:text-3xl">
            {t}
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-led">
              <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

function TiltCard({ children }) {
  const ref = useRef(null)
  const rx = useSpring(0, { stiffness: 180, damping: 18 })
  const ry = useSpring(0, { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(400px circle at ${gx}% ${gy}%, rgba(221,244,255,.16), transparent 45%)`

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 14)
    rx.set((0.5 - py) * 12)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
    </motion.div>
  )
}

function ServiceCard({ s, inCart, onToggle }) {
  const [flipped, setFlipped] = useState(false)
  const flip = () => setFlipped((f) => !f)

  return (
    <TiltCard>
      <div className="flip-scene h-[440px]">
        <div
          className={`flip-inner relative h-full w-full cursor-pointer ${flipped ? 'is-flipped' : ''}`}
          onClick={flip}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              flip()
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${s.name}: ${flipped ? 'voltar ao resumo' : 'ver o que está incluso'}`}
        >
          {/* FRENTE */}
          <div className="flip-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-steel bg-gradient-to-b from-bay to-asphalt p-6">
            <div className="flex items-start justify-between">
              <span className="rounded-full border border-steel px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{s.tag}</span>
              {inCart && (
                <span className="rounded-full bg-led/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-led">No orçamento</span>
              )}
            </div>
            <div className="relative my-4 grid flex-1 place-items-center">
              <div className="absolute h-32 w-32 rounded-full bg-led/10 blur-2xl transition-all duration-500 group-hover:h-40 group-hover:w-40 group-hover:bg-led/20" />
              <ServiceIcon name={s.icon} className="relative h-32 w-32" />
            </div>
            <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{s.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mist">{s.short}</p>
            <div className="mt-5 flex items-end justify-between border-t border-steel pt-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">A partir de</p>
                <p className="font-display text-2xl font-extrabold tabular-nums text-led">{brl(s.from)}</p>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mist transition-colors group-hover:text-chrome">
                Detalhes
                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10a6 6 0 0 1 10.2-4.2L16 7.5M16 3v4.5h-4.5M16 10a6 6 0 0 1-10.2 4.2L4 12.5M4 17v-4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* VERSO */}
          <div className="flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-led/40 bg-bay p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(circle at 100% 0%, rgba(143,219,255,.25), transparent 55%)' }}
            />
            <p className="eyebrow relative">O que está incluso</p>
            <h3 className="relative mt-2 font-display text-3xl font-extrabold uppercase leading-none">{s.name}</h3>
            <ul className="relative mt-5 flex flex-col gap-3">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-chrome/90">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-led">
                    <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 10l2.3 2.3L13.5 7.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto flex flex-col gap-3 border-t border-steel pt-4">
              <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-mist">
                <span>Tempo de bancada</span>
                <span className="text-chrome">{s.time}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle(s.id)
                }}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                  inCart ? 'border border-led/60 text-led hover:bg-led/10' : 'bg-led text-asphalt hover:brightness-110'
                }`}
              >
                {inCart ? 'Remover do orçamento' : 'Adicionar ao orçamento'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Services({ cart, onToggle }) {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Serviços" title="Cada serviço tem uma ferramenta, um tempo e uma leitura.">
            Clique ou toque em um card para ver o que está incluso. No computador, ele inclina seguindo o mouse. Adicione ao orçamento direto do verso.
          </SectionHead>
          <Reveal delay={0.1} className="font-mono text-xs uppercase tracking-[0.18em] text-mist lg:text-right">
            <span className="text-led">{cart.size}</span> de {SERVICES.length} no seu orçamento
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <ServiceCard s={s} inCart={cart.has(s.id)} onToggle={onToggle} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
