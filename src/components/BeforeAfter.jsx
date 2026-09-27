import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Reveal, SectionHead } from './ui'

function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Reflexo do teto de LED na tampa do porta-malas / capô
function useHexReflection() {
  return useMemo(() => {
    const r = 40
    const w = 1.5 * r
    const h = Math.sqrt(3) * r
    const out = []
    for (let c = 0; c < 18; c++) {
      for (let row = 0; row < 6; row++) {
        const cx = c * w
        const cy = row * h + (c % 2 ? h / 2 : 0)
        out.push(
          Array.from({ length: 6 }, (_, k) => {
            const a = (Math.PI / 3) * k
            return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
          }).join(' '),
        )
      }
    }
    return out
  }, [])
}

function useSwirls() {
  return useMemo(() => {
    const rand = rng(7)
    const rings = []
    for (let rad = 14; rad < 520; rad += 6 + rand() * 6) {
      const dash = `${4 + rand() * 40} ${6 + rand() * 30}`
      rings.push({ rad, dash, o: 0.05 + rand() * 0.16, rot: rand() * 360 })
    }
    const scratches = Array.from({ length: 26 }, () => {
      const x = rand() * 800
      const y = rand() * 450
      const len = 30 + rand() * 140
      const ang = (rand() - 0.5) * 1.2
      return { x1: x, y1: y, x2: x + len * Math.cos(ang), y2: y + len * Math.sin(ang), o: 0.1 + rand() * 0.25 }
    })
    return { rings, scratches }
  }, [])
}

function Scene({ dirty }) {
  const hexes = useHexReflection()
  const { rings, scratches } = useSwirls()
  const id = dirty ? 'd' : 'c'
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={`panel-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dirty ? '#2A2F36' : '#1E2A3A'} />
          <stop offset=".55" stopColor={dirty ? '#16191E' : '#090D13'} />
          <stop offset="1" stopColor={dirty ? '#0F1114' : '#020305'} />
        </linearGradient>
        <radialGradient id={`sheen-${id}`} cx=".52" cy=".32" r=".6">
          <stop offset="0" stopColor="#DDF4FF" stopOpacity={dirty ? 0.18 : 0.12} />
          <stop offset="1" stopColor="#DDF4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="haze" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <rect width="800" height="450" fill={`url(#panel-${id})`} />
      <g
        transform="translate(-40 -20) matrix(1 0 -0.28 0.62 0 0)"
        filter={dirty ? 'url(#haze)' : undefined}
        opacity={dirty ? 0.4 : 0.95}
        fill="none"
        stroke="#DDF4FF"
        strokeWidth={dirty ? 6 : 4}
      >
        {hexes.map((p) => (
          <polygon key={p} points={p} />
        ))}
      </g>
      <rect width="800" height="450" fill={`url(#sheen-${id})`} />
      {/* vinco da lataria */}
      <path d="M0 330 C200 312 600 312 800 330" stroke={dirty ? '#3A3F47' : '#8FDBFF'} strokeOpacity={dirty ? 1 : 0.5} strokeWidth="2" fill="none" />
      <path d="M0 332 C200 314 600 314 800 332 L800 450 L0 450 Z" fill="#000" opacity=".35" />
      {dirty ? (
        <g>
          {rings.map((r, i) => (
            <circle
              key={i}
              cx="430"
              cy="150"
              r={r.rad}
              fill="none"
              stroke="#F4E6CF"
              strokeOpacity={r.o}
              strokeWidth="1.2"
              strokeDasharray={r.dash}
              transform={`rotate(${r.rot} 430 150)`}
            />
          ))}
          {scratches.map((s, i) => (
            <line key={i} {...s} stroke="#fff" strokeOpacity={s.o} strokeWidth="1" strokeLinecap="round" />
          ))}
          <rect width="800" height="450" fill="#FFB23F" opacity=".05" />
        </g>
      ) : (
        <path d="M0 120 C260 70 560 70 800 110" stroke="#fff" strokeOpacity=".25" strokeWidth="14" fill="none" filter="url(#haze)" />
      )}
    </svg>
  )
}

export default function BeforeAfter() {
  const [v, setV] = useState(50)
  const touched = useRef(false)
  const box = useRef(null)
  const inView = useInView(box, { once: true, margin: '-120px' })

  useEffect(() => {
    if (!inView || touched.current) return
    const c = animate(50, [50, 18, 82, 50], {
      duration: 2.6,
      ease: 'easeInOut',
      onUpdate: (x) => !touched.current && setV(x),
    })
    return () => c.stop()
  }, [inView])

  return (
    <section id="antes-depois" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHead eyebrow="Antes e depois" title="Arraste a luz pela pintura.">
          O lado esquerdo é um capô preto com swirls de lavagem. O direito é o mesmo painel depois do polimento em 2
          etapas. Repare como o reflexo do teto fica nítido.
        </SectionHead>

        <Reveal className="mt-12 grid gap-5 lg:grid-cols-12">
          <div
            ref={box}
            className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-steel sm:aspect-[16/9] lg:col-span-9"
          >
            <Scene />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
              <Scene dirty />
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-asphalt/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber backdrop-blur">
              Antes
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-asphalt/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-led backdrop-blur">
              Depois
            </span>

            <input
              id="antes-depois-range"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={v}
              onChange={(e) => {
                touched.current = true
                setV(Number(e.target.value))
              }}
              aria-label="Comparar antes e depois do polimento"
              className="ba-range peer absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
            />
            <div
              className="pointer-events-none absolute inset-y-0 z-0 w-0.5 -translate-x-1/2 bg-chrome shadow-[0_0_24px_4px_rgba(143,219,255,.6)] peer-focus-visible:bg-led"
              style={{ left: `${v}%` }}
            >
              <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-chrome/60 bg-asphalt/70 backdrop-blur">
                <svg viewBox="0 0 48 48" className="h-8 w-8 text-chrome">
                  <polygon points="24,5 40,14 40,34 24,43 8,34 8,14" fill="none" stroke="#8FDBFF" strokeWidth="2" />
                  <path d="M19 18l-6 6 6 6M29 18l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-1">
            <Reading label="Brilho antes" value="62 GU" tone="amber" pct={62} note="Swirls e hologramas" />
            <Reading label="Brilho depois" value="94 GU" tone="led" pct={94} note="Correção em 2 etapas" />
            <div className="col-span-2 rounded-2xl border border-steel p-4 lg:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">Verniz removido</p>
              <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">
                3 <span className="text-lg text-mist">µm</span>
              </p>
              <p className="mt-1 text-sm text-mist">De 118 µm, bem acima do limite seguro de 90 µm.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Reading({ label, value, tone, pct, note }) {
  const color = tone === 'led' ? 'bg-led' : 'bg-amber'
  const text = tone === 'led' ? 'text-led' : 'text-amber'
  return (
    <div className="rounded-2xl border border-steel p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{label}</p>
      <p className={`mt-1 font-display text-3xl font-extrabold tabular-nums ${text}`}>{value}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-steel">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-sm text-mist">{note}</p>
    </div>
  )
}
