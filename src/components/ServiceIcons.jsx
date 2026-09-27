import { motion } from 'framer-motion'

const LED = '#8FDBFF'
const AMBER = '#FFB23F'
const CHROME = '#E9EEF5'
const loop = (duration, extra = {}) => ({ duration, repeat: Infinity, ease: 'easeInOut', ...extra })

/* Politriz orbital apagando swirls */
function Polish() {
  const swirls = [18, 26, 34, 42]
  return (
    <>
      <defs>
        <clipPath id="polishPanel">
          <rect x="10" y="78" width="100" height="26" rx="4" />
        </clipPath>
      </defs>
      <rect x="10" y="78" width="100" height="26" rx="4" fill="#141B25" stroke="#2B3544" />
      <g clipPath="url(#polishPanel)">
      {swirls.map((r, i) => (
        <motion.circle
          key={r}
          cx="60"
          cy="91"
          r={r}
          fill="none"
          stroke={AMBER}
          strokeWidth="1"
          strokeDasharray="6 10"
          animate={{ opacity: [0.9, 0, 0.9], rotate: [0, 90] }}
          transition={loop(2.4, { delay: i * 0.15 })}
        />
      ))}
      </g>
      <motion.path d="M14 84 L106 84" stroke={LED} strokeWidth="2" strokeLinecap="round" animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }} transition={loop(2.4)} />
      <motion.g animate={{ x: [-22, 22, -22] }} transition={loop(2.4)}>
        <rect x="52" y="22" width="16" height="36" rx="5" fill="#222A36" stroke={CHROME} strokeOpacity=".4" />
        <rect x="36" y="16" width="48" height="12" rx="6" fill="#2B3544" />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
          <ellipse cx="60" cy="66" rx="30" ry="9" fill={LED} opacity=".85" />
          <path d="M34 66 H86 M60 58 V74" stroke="#090C11" strokeWidth="1.5" opacity=".5" />
        </motion.g>
      </motion.g>
    </>
  )
}

/* Gotas perolando sobre a vitrificação */
function Ceramic() {
  const drops = [
    { x: 30, r: 7, d: 0 },
    { x: 54, r: 10, d: 0.5 },
    { x: 80, r: 6, d: 1 },
    { x: 96, r: 8, d: 1.4 },
  ]
  return (
    <>
      <path d="M8 88 Q60 70 112 88 L112 108 L8 108 Z" fill="#141B25" stroke={LED} strokeOpacity=".5" />
      <motion.path d="M20 84 Q60 70 100 84" stroke={LED} strokeWidth="1.5" fill="none" animate={{ opacity: [0.2, 1, 0.2] }} transition={loop(2)} />
      {drops.map((d) => (
        <motion.g key={d.x} animate={{ y: [-50, 0, 0, 30], opacity: [0, 1, 1, 0] }} transition={loop(2.8, { delay: d.d, times: [0, 0.25, 0.75, 1] })}>
          <motion.ellipse
            cx={d.x}
            cy={82 - d.r - Math.abs(60 - d.x) * 0.12}
            rx={d.r}
            ry={d.r}
            fill={LED}
            fillOpacity=".25"
            stroke={LED}
            animate={{ ry: [d.r * 1.3, d.r * 0.8, d.r] }}
            transition={loop(2.8, { delay: d.d, times: [0.2, 0.3, 0.4] })}
          />
          <circle cx={d.x - d.r * 0.35} cy={82 - d.r * 1.35 - Math.abs(60 - d.x) * 0.12} r={d.r * 0.25} fill="#fff" />
        </motion.g>
      ))}
      <motion.path d="M92 26 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={CHROME} animate={{ scale: [0, 1, 0], rotate: [0, 90] }} transition={loop(2.2)} />
    </>
  )
}

/* Película PPF descolando no canto */
function PPF() {
  return (
    <>
      <rect x="18" y="18" width="84" height="84" rx="10" fill="#141B25" stroke="#2B3544" />
      <path d="M18 70 L50 102" stroke={AMBER} strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M40 40 L64 72" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <motion.path
        fill={LED}
        fillOpacity=".18"
        stroke={LED}
        strokeWidth="1.5"
        animate={{
          d: [
            'M18 28 Q18 18 28 18 L92 18 Q102 18 102 28 L102 92 Q102 102 92 102 L28 102 Q18 102 18 92 Z',
            'M18 28 Q18 18 28 18 L92 18 Q102 18 102 28 L102 60 Q86 70 62 102 L28 102 Q18 102 18 92 Z',
            'M18 28 Q18 18 28 18 L92 18 Q102 18 102 28 L102 92 Q102 102 92 102 L28 102 Q18 102 18 92 Z',
          ],
        }}
        transition={loop(3.2)}
      />
      <motion.path
        fill="#DDF4FF"
        fillOpacity=".55"
        animate={{
          d: ['M102 102 L102 102 L102 102 Z', 'M102 60 Q92 84 62 102 L108 112 Z', 'M102 102 L102 102 L102 102 Z'],
        }}
        transition={loop(3.2)}
      />
      <motion.path d="M26 30 L50 30" stroke="#fff" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.2, 0.9, 0.2] }} transition={loop(3.2)} />
    </>
  )
}

/* Banco com vapor subindo */
function Interior() {
  return (
    <>
      <path d="M40 30 Q40 22 48 22 L64 22 Q72 22 72 30 L70 70 L42 70 Z" fill="#141B25" stroke={CHROME} strokeOpacity=".5" />
      <path d="M34 72 L82 72 Q90 72 90 80 L90 88 L34 88 Q28 88 28 82 Q28 72 34 72 Z" fill="#141B25" stroke={CHROME} strokeOpacity=".5" />
      <path d="M48 34 L64 34 M48 46 L64 46 M48 58 L64 58" stroke="#2B3544" strokeWidth="2" />
      <path d="M56 88 L56 104 M40 104 L72 104" stroke="#2B3544" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${78 + i * 10} 66 C${72 + i * 10} 56 ${86 + i * 10} 46 ${80 + i * 10} 36 C${74 + i * 10} 26 ${86 + i * 10} 18 ${82 + i * 10} 10`}
          stroke={LED}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0], y: [8, 0, -8] }}
          transition={loop(2.4, { delay: i * 0.45 })}
        />
      ))}
    </>
  )
}

/* Farol amarelado ficando cristalino e acendendo */
function Headlight() {
  return (
    <>
      <defs>
        <linearGradient id="beam" x1="0" x2="1">
          <stop offset="0" stopColor="#DDF4FF" stopOpacity=".7" />
          <stop offset="1" stopColor="#DDF4FF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="lens">
          <path d="M14 44 Q14 30 30 30 L56 34 Q64 36 64 48 L64 72 Q64 84 52 86 L28 88 Q14 88 14 74 Z" />
        </clipPath>
      </defs>
      <motion.path d="M62 40 L118 18 L118 104 L62 80 Z" fill="url(#beam)" animate={{ opacity: [0, 0, 1, 0.3, 1, 1, 0] }} transition={loop(3.4, { times: [0, 0.4, 0.46, 0.5, 0.55, 0.9, 1] })} />
      <path d="M14 44 Q14 30 30 30 L56 34 Q64 36 64 48 L64 72 Q64 84 52 86 L28 88 Q14 88 14 74 Z" fill="#10151D" stroke={CHROME} strokeOpacity=".6" strokeWidth="1.5" />
      <circle cx="38" cy="58" r="14" fill="#1B2533" stroke={LED} strokeOpacity=".7" />
      <motion.circle cx="38" cy="58" r="7" fill="#DDF4FF" animate={{ opacity: [0.2, 0.2, 1, 0.4, 1, 1, 0.2] }} transition={loop(3.4, { times: [0, 0.4, 0.46, 0.5, 0.55, 0.9, 1] })} />
      <g clipPath="url(#lens)">
        <motion.rect y="20" width="60" height="80" fill={AMBER} fillOpacity=".45" animate={{ x: [10, 10, 70, 70, 10] }} transition={loop(3.4, { times: [0, 0.1, 0.38, 0.95, 1] })} />
      </g>
    </>
  )
}

/* Espuma do snow foam com bolhas */
function Wash() {
  const bubbles = [
    [24, 0], [40, 0.4], [58, 0.9], [74, 0.2], [90, 0.7], [50, 1.3], [82, 1.6], [32, 1.8],
  ]
  return (
    <>
      <path d="M8 96 Q60 84 112 96 L112 110 L8 110 Z" fill="#141B25" stroke="#2B3544" />
      <motion.path
        d="M10 94 Q22 80 34 90 Q44 76 58 88 Q70 74 82 88 Q96 78 110 92"
        stroke={CHROME}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        animate={{ y: [0, -3, 0] }}
        transition={loop(1.6)}
      />
      {bubbles.map(([x, d]) => (
        <motion.circle
          key={`${x}-${d}`}
          cx={x}
          cy={84}
          r={4 + (x % 5)}
          fill={LED}
          fillOpacity=".12"
          stroke={LED}
          strokeWidth="1.2"
          animate={{ cy: [86, 20], opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 1.5] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: d, ease: 'easeOut', times: [0, 0.2, 0.85, 1] }}
        />
      ))}
    </>
  )
}

const MAP = { polish: Polish, ceramic: Ceramic, ppf: PPF, interior: Interior, headlight: Headlight, wash: Wash }

export default function ServiceIcon({ name, className = 'h-28 w-28' }) {
  const C = MAP[name]
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" overflow="visible">
      <C />
    </svg>
  )
}
