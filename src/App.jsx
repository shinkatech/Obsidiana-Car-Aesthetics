import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services, { Marquee } from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Process from './components/Process'
import Laudo from './components/Laudo'
import Orcamento from './components/Orcamento'
import { Faq, FinalCta, Footer } from './components/Closing'

export default function App() {
  // Serviços escolhidos: compartilhado entre os cards e o simulador
  const [cart, setCart] = useState(() => new Set(['polimento', 'vitrificacao']))
  const toggle = useCallback((id) => {
    setCart((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services cart={cart} onToggle={toggle} />
        <BeforeAfter />
        <Process />
        <Laudo />
        <Orcamento cart={cart} onToggle={toggle} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}
