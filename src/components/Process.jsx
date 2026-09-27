import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { STEPS } from '../config'
import { SectionHead } from './ui'

// Carro visto de cima, desce pela linha do processo
function TopCar() {
  return (
    <svg viewBox="0 0 40 72" className="h-14 w-8 drop-shadow-[0_0_14px_rgba(143,219,255,.7)]" aria-hidden="true">
      <rect x="4" y="2" width="32" height="68" rx="13" fill="#E9EEF5" />
      <path d="M9 22 Q20 16 31 22 L29 32 Q20 29 11 32 Z" fill="#090C11" />
      <path d="M11 50 Q20 53 29 50 L30 58 Q20 62 10 58 Z" fill="#090C11" />
      <rect x="7" y="4" width="8" height="3" rx="1.5" fill="#8FDBFF" />
      <rect x="25" y="4" width="8" height="3" rx="1.5" fill="#8FDBFF" />
      <rect x="7" y="66" width="7" height="2.5" rx="1" fill="#FF3B4E" />
      <rect x="26" y="66" width="7" height="2.5" rx="1" fill="#FF3B4E" />
    </svg>
  )
}

export default function Process() {
  const track = useRef(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 70%', 'end 60%'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const top = useTransform(p, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length + 0.15)))
  })

  return (
    <section id="processo" className="relative py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead eyebrow="Processo" title="Cinco etapas, na mesma ordem, em todo carro.">
              Role a página e acompanhe o carro pela linha. Cada etapa só começa quando a anterior foi conferida sob a luz.
            </SectionHead>
            <div className="mt-8 hidden items-center gap-4 lg:flex">
              <span className="font-display text-7xl font-black tabular-nums text-led">{String(active + 1).padStart(2, '0')}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                / 0{STEPS.length}
                <br />
                {STEPS[active].title}
              </span>
            </div>
          </div>
        </div>

        <div ref={track} className="relative lg:col-span-7">
          {/* trilho */}
          <div className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-steel" aria-hidden="true">
            <motion.div className="w-full origin-top bg-led shadow-[0_0_14px_rgba(143,219,255,.8)]" style={{ height: top }} />
            <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
              <TopCar />
            </motion.div>
          </div>

          <ol className="flex flex-col gap-6">
            {STEPS.map((s, i) => {
              const on = i <= active
              return (
                <li key={s.title} className="relative pl-16">
                  <span
                    className={`absolute left-0 top-5 grid h-10 w-10 place-items-center font-mono text-xs transition-all duration-500 ${
                      on ? 'text-asphalt' : 'text-mist'
                    }`}
                  >
                    <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <polygon
                        points="20,2 36,11 36,29 20,38 4,29 4,11"
                        className="transition-all duration-500"
                        fill={on ? '#8FDBFF' : '#10151D'}
                        stroke={on ? '#8FDBFF' : '#222A36'}
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="relative font-semibold">{i + 1}</span>
                  </span>
                  <div
                    className={`rounded-2xl border p-6 transition-all duration-500 ${
                      i === active ? 'border-led/50 bg-bay shadow-[0_20px_60px_-30px_rgba(143,219,255,.6)]' : 'border-steel bg-transparent'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-3xl font-extrabold uppercase">{s.title}</h3>
                      <span className="rounded-full border border-steel px-3 py-1 font-mono text-[11px] tracking-wider text-mist">{s.time}</span>
                    </div>
                    <p className="mt-3 max-w-lg leading-relaxed text-mist">{s.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
