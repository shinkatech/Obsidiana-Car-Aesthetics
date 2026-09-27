import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'

// Sobe o bloco quando entra na tela. O conteúdo nunca fica invisível.
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ y, scale: 0.985 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

// Número que "gira" como um odômetro quando aparece.
export function CountUp({ to, decimals = 0, duration = 1.8, delay = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => c.stop()
  }, [inView, to, duration, delay])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

// Marca: hexágono de LED com uma "gema" de obsidiana facetada.
export function HexMark({ className = 'h-9 w-9', animated = true }) {
  const hex = '24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5'
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9EEF5" />
          <stop offset=".45" stopColor="#8FDBFF" />
          <stop offset="1" stopColor="#1B2533" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={hex}
        fill="none"
        stroke="#8FDBFF"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <path d="M24 12 L33 22 L24 36 L15 22 Z" fill="url(#gem)" />
      <path d="M15 22 L33 22 M24 12 L24 36" stroke="#090C11" strokeWidth=".8" opacity=".6" />
    </svg>
  )
}

export function Arrow({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WhatsIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, children, className = '' }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-led" />
        {eyebrow}
      </p>
      <h2 className="h-section">{title}</h2>
      {children && <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">{children}</p>}
    </Reveal>
  )
}
