import { motion, useMotionTemplate, useTransform } from 'framer-motion'

/*
  Foto real do carro no hero, com os mesmos efeitos do carro em SVG:
  - entrada "escaneada" por uma barra de LED
  - contorno de luz fria em volta da lataria (só em PNG sem fundo)
  - faixa de brilho passando APENAS sobre o carro (máscara com a própria foto)
  - ponto de luz que segue o mouse
  - reflexo no piso e sombra
  - flare do farol (posição em % da foto)
*/
export default function CarPhoto({ car, mx }) {
  const { src, alt, transparent = true, flip = false, headlights = [] } = car
  const hx = useTransform(mx, (v) => `${(flip ? 1 - v : v) * 100}%`)
  const hot = useMotionTemplate`radial-gradient(38% 55% at ${hx} 35%, rgba(221,244,255,.45), transparent 70%)`

  const mask = transparent
    ? { maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }
    : {}
  const edgeFade = transparent
    ? {}
    : {
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)',
      }
  const flipStyle = flip ? { transform: 'scaleX(-1)' } : {}

  return (
    <div className="relative select-none" aria-label={alt} role="img">
      <div className="relative" style={flipStyle}>
        {/* reflexo no piso */}
        {transparent && (
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            draggable="false"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="pointer-events-none absolute left-0 top-full w-full"
            style={{
              transform: 'scaleY(-1)',
              marginTop: '-2%',
              maskImage: 'linear-gradient(to top, #000 0%, transparent 22%)',
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 22%)',
            }}
          />
        )}
        <div aria-hidden="true" className="absolute inset-x-[4%] bottom-[1%] h-[8%] rounded-[50%] bg-black/80 blur-xl" />

        {/* entrada escaneada */}
        <motion.div
          className="relative"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: 0.3, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          style={edgeFade}
        >
          <motion.img
            src={src}
            alt=""
            draggable="false"
            className="relative block w-full"
            initial={{ filter: 'brightness(0.2) saturate(0)' }}
            animate={{ filter: 'brightness(1) saturate(1)' }}
            transition={{ delay: 1.2, duration: 1.4 }}
          />
          {/* silhueta em luz fria que se apaga revelando a pintura */}
          {transparent && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ ...mask, background: 'linear-gradient(180deg, rgba(221,244,255,.55), rgba(143,219,255,.25))' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0] }}
              transition={{ delay: 0.3, duration: 2.6, times: [0, 0.55, 1] }}
            />
          )}

          {/* ponto de luz que segue o mouse */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ ...mask, background: hot }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
          />

          {/* faixa de brilho em loop */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
            style={mask}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-y-0 w-[22%]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)', skewX: -22 }}
              initial={{ left: '-40%' }}
              animate={{ left: ['-40%', '130%'] }}
              transition={{ delay: 2.6, duration: 1.9, ease: [0.6, 0, 0.2, 1], repeat: Infinity, repeatDelay: 3.2 }}
            />
          </motion.div>
        </motion.div>

        {/* barra de LED que faz o scan */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-6%] w-[3px] rounded-full bg-led"
          style={{ boxShadow: '0 0 18px 4px rgba(143,219,255,.8), 0 0 60px 12px rgba(143,219,255,.35)' }}
          initial={{ left: '0%', opacity: 1 }}
          animate={{ left: '100%', opacity: [1, 1, 0] }}
          transition={{ delay: 0.3, duration: 1.8, ease: [0.65, 0, 0.35, 1], opacity: { delay: 0.3, duration: 2.1, times: [0, 0.85, 1] } }}
        />

        {/* flare dos faróis */}
        {headlights.map((h, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              background: 'radial-gradient(closest-side, rgba(255,255,255,.9), rgba(143,219,255,.45) 35%, transparent)',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0.2, 0.9, 0.55], scale: [0.4, 1.3, 0.9, 1.05, 1] }}
            transition={{ delay: 2.1 + i * 0.12, duration: 1.1 }}
          />
        ))}
      </div>
    </div>
  )
}
