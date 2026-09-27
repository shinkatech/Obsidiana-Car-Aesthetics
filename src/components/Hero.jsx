import { useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { BRAND, HERO_CAR } from '../config'
import CarPhoto from './CarPhoto'
import { Arrow, CountUp } from './ui'

/* ---------- Teto de LED hexagonal (o "box" de detalhamento) ---------- */
function HexCeiling() {
  const hexes = useMemo(() => {
    const r = 34
    const w = 1.5 * r
    const h = Math.sqrt(3) * r
    const cols = 34
    const rows = 7
    const cx0 = (cols * w) / 2
    const out = []
    for (let c = 0; c < cols; c++) {
      for (let row = 0; row < rows; row++) {
        const cx = c * w
        const cy = row * h + (c % 2 ? h / 2 : 0)
        const pts = Array.from({ length: 6 }, (_, k) => {
          const a = (Math.PI / 3) * k
          return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
        }).join(' ')
        const d = Math.hypot(cx - cx0, cy * 1.6)
        out.push({ pts, d, key: `${c}-${row}` })
      }
    }
    return { out, width: cols * w, height: rows * h }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[1700px] -translate-x-1/2 sm:h-[420px]"
      style={{
        transform: 'translateX(-50%) perspective(700px) rotateX(58deg)',
        transformOrigin: '50% 0%',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, #000 35%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, #000 35%, transparent 90%)',
      }}
    >
      <svg viewBox={`0 -40 ${hexes.width} ${hexes.height + 40}`} className="h-full w-full" preserveAspectRatio="xMidYMin slice">
        <defs>
          <filter id="ledGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#ledGlow)" fill="none" stroke="#DDF4FF" strokeWidth="4.5" strokeLinejoin="round">
          {hexes.out.map((h) => (
            <motion.polygon
              key={h.key}
              points={h.pts}
              initial={{ opacity: 0.04 }}
              animate={{ opacity: [0.04, 1, 0.3, 0.7] }}
              transition={{ duration: 0.9, delay: 0.15 + h.d / 900, times: [0, 0.3, 0.55, 1] }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ---------- Carro esportivo em SVG que se desenha ---------- */
const BODY =
  'M26 200 L24 184 C24 170 34 162 58 158 L150 146 C210 138 262 132 300 128 C340 104 376 82 420 72 C470 64 530 66 566 80 C600 94 628 110 650 118 L748 128 C766 132 776 142 778 160 L780 194 C780 200 776 204 768 204 L676 204 A66 66 0 0 0 544 204 L256 204 A66 66 0 0 0 124 204 L40 204 C32 204 26 202 26 200 Z'
const GLASS = 'M326 126 C356 104 388 88 424 80 C470 72 522 74 556 88 C580 98 600 110 614 118 Z'
const DETAILS = [
  'M318 132 C316 160 318 182 322 202',
  'M484 126 L488 202',
  'M60 172 C250 152 560 148 770 152',
  'M398 146 L424 146',
  'M544 144 L568 144',
  'M26 192 L74 192',
]
const draw = (delay = 0, duration = 1.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.01 } },
})

function Wheel({ cx }) {
  return (
    <g>
      <motion.circle cx={cx} cy={212} r={54} fill="#05070A" stroke="#2B3544" strokeWidth="2" {...draw(0.6, 1.2)} />
      <motion.circle cx={cx} cy={212} r={38} fill="url(#rim)" stroke="#8FDBFF" strokeOpacity=".5" strokeWidth="1.5" {...draw(0.9, 1.2)} />
      {/* pinça de freio */}
      <motion.path
        d={`M${cx - 30} ${212 - 18} A35 35 0 0 1 ${cx - 12} ${212 - 33}`}
        stroke="#FFB23F"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        {...draw(1.6, 0.5)}
      />
      <g style={{ transformOrigin: `${cx}px 212px` }}>
        {[0, 72, 144, 216, 288].map((a) => (
          <motion.line
            key={a}
            x1={cx}
            y1={212}
            x2={cx + 34 * Math.cos((a * Math.PI) / 180)}
            y2={212 + 34 * Math.sin((a * Math.PI) / 180)}
            stroke="#C9D3E0"
            strokeWidth="5"
            strokeLinecap="round"
            {...draw(1.2, 0.8)}
          />
        ))}
      </g>
      <circle cx={cx} cy={212} r={7} fill="#E9EEF5" />
    </g>
  )
}

function Car({ mx }) {
  const hx = useTransform(mx, [0, 1], [80, 720])
  return (
    <svg viewBox="0 20 800 320" className="w-full overflow-visible" role="img" aria-label="Carro esportivo com pintura espelhada sob luz de LED">
      <defs>
        <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A4658" />
          <stop offset=".32" stopColor="#141B25" />
          <stop offset=".62" stopColor="#0A0E14" />
          <stop offset="1" stopColor="#020304" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FDBFF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#1B2533" stopOpacity=".9" />
          <stop offset="1" stopColor="#05070A" />
        </linearGradient>
        <radialGradient id="rim">
          <stop offset="0" stopColor="#2A3342" />
          <stop offset="1" stopColor="#0E131A" />
        </radialGradient>
        <linearGradient id="sweep" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hot">
          <stop offset="0" stopColor="#DDF4FF" stopOpacity=".55" />
          <stop offset="1" stopColor="#DDF4FF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="bodyClip">
          <path d={BODY} />
        </clipPath>
        <linearGradient id="fadeRefl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="reflMask">
          <rect x="0" y="266" width="800" height="120" fill="url(#fadeRefl)" />
        </mask>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* reflexo no piso */}
      <g mask="url(#reflMask)">
        <g transform="translate(0 532) scale(1 -1)">
          <path d={BODY} fill="#1B2533" />
          <circle cx="190" cy="212" r="54" fill="#0E131A" />
          <circle cx="610" cy="212" r="54" fill="#0E131A" />
        </g>
      </g>
      <ellipse cx="400" cy="268" rx="380" ry="10" fill="#000" opacity=".7" />

      {/* pintura */}
      <motion.path d={BODY} fill="url(#paint)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }} />

      <g clipPath="url(#bodyClip)">
        {/* linha de luz do teto refletida no capô e no teto */}
        <motion.path
          d="M40 150 C220 128 420 60 780 118"
          stroke="#DDF4FF"
          strokeWidth="2"
          fill="none"
          opacity=".5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.1, duration: 1.2 }}
        />
        {/* ponto de luz que segue o mouse */}
        <motion.ellipse cx={hx} cy={112} rx="150" ry="40" fill="url(#hot)" />
        {/* varredura de brilho em loop */}
        <motion.rect
          y="40"
          width="140"
          height="200"
          fill="url(#sweep)"
          initial={{ x: -300 }}
          animate={{ x: [-300, 900] }}
          transition={{ delay: 2.6, duration: 1.9, ease: [0.6, 0, 0.2, 1], repeat: Infinity, repeatDelay: 3.2 }}
          style={{ skewX: -22 }}
        />
      </g>

      {/* contornos que se desenham */}
      <motion.path d={BODY} fill="none" stroke="#8FDBFF" strokeWidth="2" strokeLinejoin="round" {...draw(0.2, 2)} />
      <motion.path d={GLASS} fill="url(#glass)" stroke="#8FDBFF" strokeOpacity=".7" strokeWidth="1.5" {...draw(0.8, 1.4)} />
      <motion.path d="M472 76 L478 122" stroke="#090C11" strokeWidth="9" {...draw(1.4, 0.4)} />
      <motion.path d="M330 128 C334 118 348 114 356 118 L352 130 Z" fill="#0A0E14" stroke="#8FDBFF" strokeOpacity=".6" {...draw(1.3, 0.5)} />
      {DETAILS.map((d, i) => (
        <motion.path key={d} d={d} fill="none" stroke="#8FDBFF" strokeOpacity=".45" strokeWidth="1.4" {...draw(1 + i * 0.1, 1)} />
      ))}

      {/* farol e lanterna acendendo */}
      <motion.path
        d="M34 170 L98 158 L108 164 L42 180 Z"
        fill="#DDF4FF"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.2, 1] }}
        transition={{ delay: 2.3, duration: 0.7 }}
      />
      <motion.ellipse
        cx="60"
        cy="170"
        rx="46"
        ry="14"
        fill="#8FDBFF"
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.2, 0.7] }}
        transition={{ delay: 2.3, duration: 0.7 }}
      />
      <motion.path
        d="M742 132 L776 144 L777 156 L738 146 Z"
        fill="#FF3B4E"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.4 }}
      />

      <Wheel cx={190} />
      <Wheel cx={610} />
    </svg>
  )
}

/* ---------- Título com letras subindo ---------- */
function Line({ text, delay = 0, className = '' }) {
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}

const READINGS = [
  { label: 'Brilho', to: 94, suffix: ' GU' },
  { label: 'Ângulo de contato', to: 112, suffix: '°' },
  { label: 'Dureza', to: 9, suffix: 'H' },
]

export default function Hero() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.3)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const spot = useMotionTemplate`radial-gradient(520px circle at ${useTransform(sx, (v) => v * 100)}% ${useTransform(sy, (v) => v * 100)}%, rgba(143,219,255,.10), transparent 60%)`

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-24"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
    >
      <HexCeiling />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spot }} />
      <div aria-hidden="true" className="floor-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,#000,transparent)]" />

      <div className="shell relative grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5 lg:pb-10">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-led opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-led" />
            </span>
            Estética automotiva · {BRAND.city}
          </motion.p>

          <h1 className="font-display text-[clamp(3.6rem,13vw,7.6rem)] font-black uppercase leading-[0.84] tracking-tight">
            <Line text="Brilho de" delay={0.3} />
            <Line
              text="espelho."
              delay={0.42}
              className="bg-[linear-gradient(100deg,#6B7A90_0%,#E9EEF5_30%,#8FDBFF_45%,#fff_50%,#6B7A90_70%)] bg-[length:250%_100%] bg-clip-text text-transparent motion-safe:animate-[chrome_5s_ease-in-out_infinite]"
            />
            <Line text="Proteção" delay={0.54} className="text-mist/70" />
            <Line text="que dura." delay={0.66} className="text-mist/70" />
          </h1>

          <motion.p
            className="mt-7 max-w-md text-lg leading-relaxed text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Polimento técnico, vitrificação cerâmica e PPF feitos em box fechado, com medição de verniz antes de tocar na
            pintura e laudo na entrega.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
          >
            <a href="#orcamento" className="btn-led group">
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sweep bg-white/50 blur-md" />
              <span className="relative">Simular orçamento</span>
              <Arrow className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#servicos" className="btn-ghost">
              Ver serviços
            </a>
          </motion.div>
        </div>

        <div className="relative lg:col-span-7 lg:-mr-20 xl:-mr-32">
          {HERO_CAR.src ? <CarPhoto car={HERO_CAR} mx={sx} /> : <Car mx={sx} />}
          <div className={`relative grid grid-cols-3 gap-2 sm:gap-3 lg:ml-10 ${HERO_CAR.src ? 'mt-5' : '-mt-2'}`}>
            {READINGS.map((r, i) => (
              <motion.div
                key={r.label}
                className="rounded-xl border border-steel bg-bay/70 px-3 py-3 backdrop-blur sm:px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 + i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist sm:text-[10px]">{r.label}</p>
                <p className="mt-1 font-display text-3xl font-extrabold tabular-nums text-chrome sm:text-4xl">
                  <CountUp to={r.to} suffix={r.suffix} duration={2} delay={2.4 + i * 0.12} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
