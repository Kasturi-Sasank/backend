import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HER_NAME } from '../constants/content'

const NO_MESSAGES = [
  'Athena, manasu maarchukova🥺',
  'Na bujji kada yes konnu ra',
]

export default function LandingPage({ onOpenGift }) {
  const [noCount, setNoCount] = useState(0)
  const [sad, setSad] = useState(false)

  const handleNo = () => {
    setSad(true)
    setNoCount((c) => c + 1)
    setTimeout(() => setSad(false), 1800)
  }

  const showNo = noCount < 3
  const yesScale = 1 + noCount * 0.18
  const noScale = Math.max(0.45, 1 - noCount * 0.22)
  const sadMsg = NO_MESSAGES[Math.min(noCount - 1, NO_MESSAGES.length - 1)]

  return (
    <motion.div
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
    >
      <LandingBackground />

      {/* top bunting */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex min-w-0 flex-wrap justify-center gap-0.5 pt-2 sm:gap-1 sm:pt-3 md:gap-2 md:pt-4">
        {['#ff9ebb', '#ffd166', '#c9b1ff', '#95e1d3', '#ffb3c6', '#ffe066', '#b8e0ff'].map(
          (color, i) => (
            <motion.div
              key={i}
              className="h-6 w-5 rounded-b-md shadow-md sm:h-8 sm:w-7 md:h-10 md:w-9"
              style={{ background: color }}
              animate={{ rotate: [ -4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.15, delay: i * 0.08 }}
            />
          ),
        )}
      </div>

      <motion.div
        className="relative z-20 w-full max-w-lg min-w-0 overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 90 }}
      >
        <div
          className="relative overflow-hidden rounded-[28px] border-4 border-white/80 p-4 text-center shadow-2xl sm:p-6 md:p-8"
          style={{
            padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(255,240,250,0.88) 100%)',
            boxShadow: '0 24px 60px rgba(255,105,180,0.25), inset 0 0 0 1px rgba(255,255,255,0.9)',
          }}
        >
          <div className="pointer-events-none absolute -top-8 -right-6 text-4xl opacity-80">🎀</div>
          <div className="pointer-events-none absolute -bottom-6 -left-4 text-3xl opacity-80">💖</div>

          <motion.p
            className="mb-1"
            style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)' }}
            animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            🎁
          </motion.p>

          <p className="font-hand text-rose-400" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>a little surprise for you…</p>

          {/* TODO: her name on landing */}
          <h1 className="font-display mt-2 leading-tight font-extrabold" style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}>
            <span className="gradient-heading">Happy Birthday {HER_NAME}</span>
          </h1>

          <div className="mx-auto mt-3 flex w-fit min-w-0 items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1 overflow-hidden">
            <span className="text-sm">✨</span>
            <p className="font-hand text-rose-600" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}>do you want to open the present?</p>
            <span className="text-sm">✨</span>
          </div>



          <AnimatePresence mode="wait">
            {sad && noCount > 0 && (
              <motion.p
                key={`sad-${noCount}`}
                className="font-hand mt-4 text-rose-500"
                style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                {sadMsg}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 min-w-0">
            <motion.button
              type="button"
              onClick={() => onOpenGift()}
              className="min-h-[44px] rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-400 px-6 py-3 sm:px-10 sm:py-3.5 font-display font-bold text-white shadow-lg shadow-rose-400/40"
              style={{ scale: yesScale, fontSize: 'clamp(1rem, 2.8vw, 1.35rem)' }}
              whileHover={{ scale: yesScale * 1.1, rotate: 2 }}
              whileTap={{ scale: yesScale * 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            >
              yes!! 💕
            </motion.button>

            {showNo && (
              <motion.button
                type="button"
                onClick={handleNo}
                className="min-h-[44px] rounded-full border-2 border-rose-200 bg-white px-4 py-2 sm:px-6 sm:py-2.5 font-display text-rose-400 shadow-md"
                style={{ scale: noScale, fontSize: 'clamp(0.95rem, 2.4vw, 1.1rem)' }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: noScale * 1.05 }}
                whileTap={{ scale: noScale * 0.9 }}
              >
                no
              </motion.button>
            )}
          </div>

          {!showNo && (
            <motion.p
              className="font-hand mt-5 text-rose-500"
              style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Sarle neeku inka vere option ledu le😏
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* grass floor */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-20 sm:h-24 md:h-28"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(144, 198, 149, 0.35) 40%, #7bc47f 100%)',
        }}
      />
      <div className="pointer-events-none absolute bottom-3 left-[8%] z-10 text-xl sm:bottom-4 sm:text-2xl md:bottom-6 md:text-3xl">🌷</div>
      <div className="pointer-events-none absolute bottom-3 right-[10%] z-10 text-xl sm:bottom-4 sm:text-2xl md:bottom-6 md:text-3xl">🌼</div>
    </motion.div>
  )
}

function LandingBackground() {
  const balloons = [
    { left: '6%', color: '#ff6b9d', delay: 0 },
    { left: '88%', color: '#ffd93d', delay: 0.4 },
    { left: '12%', color: '#a78bfa', delay: 0.8 },
    { left: '82%', color: '#6ee7b7', delay: 0.2 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, #ffd6e8 0%, transparent 45%), radial-gradient(circle at 80% 30%, #fff0b3 0%, transparent 40%), radial-gradient(circle at 50% 90%, #c8f7dc 0%, transparent 50%), linear-gradient(160deg, #ffb3d9 0%, #ffe8c8 40%, #fff5ba 100%)',
        }}
      />

      {/* soft clouds */}
      {[
        { top: '12%', left: '5%', w: 120 },
        { top: '18%', left: '70%', w: 100 },
        { top: '8%', left: '40%', w: 90 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/50 blur-sm"
          style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.45 }}
          animate={{ x: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 8 + i * 2, ease: 'easeInOut' }}
        />
      ))}

      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[18%] flex flex-col items-center min-w-0"
          style={{ left: b.left }}
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 + b.delay, delay: b.delay }}
        >
          <div
            className="h-12 w-9 rounded-full shadow-md sm:h-14 sm:w-10 md:h-16 md:w-12"
            style={{ background: `radial-gradient(circle at 30% 30%, white, ${b.color})` }}
          />
          <div className="h-14 w-px bg-rose-300/60 sm:h-16 md:h-20" />
        </motion.div>
      ))}

      {['✨', '🎈', '⭐', '🌸', '💫', '💕', '🦋', '🎉'].map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-lg opacity-70 sm:text-xl md:text-2xl"
          style={{
            left: `${4 + ((i * 13) % 92)}%`,
            top: `${14 + ((i * 19) % 55)}%`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-8, 8, -8],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, delay: i * 0.15 }}
        >
          {e}
        </motion.span>
      ))}

      {/* twinkle dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-white"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 80}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 + (i % 5) * 0.3, delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}
