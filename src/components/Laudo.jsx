import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { CountUp, Reveal, SectionHead } from './ui'

const CX = 100
const CY = 100
const R = 78
const START = 150
const SWEEP = 240

const pt = (t, r = R) => {
  const a = ((START + SWEEP * t) * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}
const arc = (t0, t1, r = R) => {
  const [x0, y0] = pt(t0, r)
  const [x1, y1] = pt(t1, r)
  const large = (t1 - t0) * SWEEP > 180 ? 1 : 0
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`
}

function Gauge({ label, min, max, value, unit, warn, note, format }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = (value - min) / (max - min)
  const shown = inView ? t : 0
  const ticks = Array.from({ length: 21 }, (_, i) => i / 20)
  const ease = 'cubic-bezier(.2,.9,.25,1.15)'

  return (
    <div ref={ref} className="group h-full rounded-2xl border border-steel bg-gradient-to-b from-bay to-asphalt p-3.5 sm:rounded-3xl sm:p-5 transition-colors hover:border-led/40">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{label}</p>
      <svg viewBox="0 0 200 158" className="mt-2 w-full" role="img" aria-label={`${label}: ${value} ${unit}`}>
        <path d={arc(0, 1)} fill="none" stroke="#222A36" strokeWidth="10" strokeLinecap="round" />
        {warn && (
          <path d={arc((warn[0] - min) / (max - min), (warn[1] - min) / (max - min), R + 12)} fill="none" stroke="#FFB23F" strokeWidth="3" strokeOpacity=".8" />
        )}
        <path
          d={arc(0, 1)}
          pathLength="1"
          fill="none"
          stroke="#8FDBFF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="1 1"
          style={{ strokeDashoffset: 1 - shown, opacity: shown > 0 ? 1 : 0, transition: `stroke-dashoffset 1.8s ${ease}`, filter: 'drop-shadow(0 0 6px rgba(143,219,255,.7))' }}
        />
        {ticks.map((k) => {
          const major = Math.round(k * 20) % 5 === 0
          const [x0, y0] = pt(k, R - 12)
          const [x1, y1] = pt(k, R - (major ? 22 : 17))
          return <line key={k} x1={x0} y1={y0} x2={x1} y2={y1} stroke={k <= shown ? '#E9EEF5' : '#3A4556'} strokeWidth={major ? 2 : 1} style={{ transition: 'stroke .4s' }} />
        })}
        {[0, 1].map((k) => {
          const [x, y] = pt(k, R - 4)
          return (
            <text key={k} x={x + (k ? -2 : 2)} y={y + 14} textAnchor={k ? 'end' : 'start'} fill="#8D99AC" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              {format ? format(k ? max : min) : k ? max : min}
            </text>
          )
        })}
        <g
          style={{
            transform: `rotate(${SWEEP * shown}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
            transformBox: 'view-box',
            transition: `transform 1.8s ${ease}`,
          }}
        >
          <line x1={CX} y1={CY} x2={pt(0, R - 26)[0]} y2={pt(0, R - 26)[1]} stroke="#FF3B4E" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx={CX} cy={CY} r="7" fill="#090C11" stroke="#E9EEF5" strokeWidth="2" />
      </svg>
      <p className="-mt-5 text-center font-display text-3xl sm:-mt-6 sm:text-4xl font-extrabold tabular-nums">
        {format ? format(value) : <CountUp to={value} duration={1.8} />}
        <span className="ml-1 text-sm text-mist sm:text-lg">{unit}</span>
      </p>
      <p className="mt-3 border-t border-steel pt-3 text-xs leading-relaxed text-mist sm:text-sm">{note}</p>
    </div>
  )
}

export default function Laudo() {
  return (
    <section id="laudo" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="floor-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Laudo de entrega" title="Seu carro sai com os números.">
            Medimos antes e depois com medidor de espessura e glossmeter. Abaixo, um exemplo de laudo de um sedã preto após
            polimento em 2 etapas e vitrificação.
          </SectionHead>
          <Reveal delay={0.1} className="shrink-0 rounded-2xl border border-dashed border-steel px-5 py-4 font-mono text-[11px] uppercase leading-6 tracking-[0.14em] text-mist">
            <span className="text-led">Exemplo</span> · Sedã · Preto sólido
            <br />
            Polimento 2 etapas + vitrificação
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <Reveal>
            <Gauge label="Brilho" min={0} max={100} value={94} unit="GU" note="Carro novo de fábrica costuma medir entre 80 e 90 GU." />
          </Reveal>
          <Reveal delay={0.08}>
            <Gauge label="Ângulo de contato" min={0} max={150} value={112} unit="graus" note="Acima de 90° a água forma gotas e escorre levando a sujeira." />
          </Reveal>
          <Reveal delay={0.16}>
            <Gauge label="Espessura do verniz" min={0} max={200} value={115} unit="µm" warn={[0, 90]} note="Faixa âmbar: abaixo de 90 µm não fazemos correção pesada." />
          </Reveal>
          <Reveal delay={0.24}>
            <Gauge label="Dureza da camada" min={1} max={9} value={9} unit="escala lápis" format={(n) => `${n}H`} note="Dureza de lápis da vitrificação curada, padrão para cerâmicas." />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
