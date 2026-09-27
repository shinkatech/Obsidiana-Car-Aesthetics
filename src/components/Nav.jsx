import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { BRAND } from '../config'
import { Arrow, HexMark } from './ui'

const LINKS = [
  ['Serviços', '#servicos'],
  ['Antes e depois', '#antes-depois'],
  ['Processo', '#processo'],
  ['Laudo', '#laudo'],
  ['Orçamento', '#orcamento'],
  ['Dúvidas', '#duvidas'],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid || open ? 'bg-asphalt/80 backdrop-blur-xl' : 'bg-gradient-to-b from-asphalt/90 via-asphalt/50 to-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <HexMark />
          <span className="leading-none">
            <span className="block font-display text-2xl font-extrabold uppercase tracking-wide">{BRAND.name}</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.32em] text-mist">Detail Studio</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="group relative text-sm text-mist transition-colors hover:text-chrome">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-led transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#orcamento" className="btn-led hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Agendar avaliação
          </a>
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-steel lg:hidden"
          >
            <motion.span className="absolute h-0.5 w-5 bg-chrome" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
            <motion.span className="absolute h-0.5 w-5 bg-chrome" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
          </button>
        </div>
      </nav>

      {/* barra de progresso como faixa de LED */}
      <motion.div
        className="h-[2px] origin-left bg-led"
        style={{ scaleX: progress, boxShadow: '0 0 12px 1px rgba(143,219,255,.8)' }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-[calc(66px+env(safe-area-inset-top,0px))] z-40 overflow-y-auto bg-asphalt lg:hidden"
          >
            <ul className="shell flex flex-col pt-6">
              {LINKS.map(([label, href], i) => (
                <motion.li
                  key={href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                  className="border-b border-steel"
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-4xl font-extrabold uppercase"
                  >
                    {label}
                    <Arrow className="h-5 w-5 text-led" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="shell py-8">
              <a href="#orcamento" onClick={() => setOpen(false)} className="btn-led w-full">
                Agendar avaliação
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
