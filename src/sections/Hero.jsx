import { motion } from 'framer-motion'
import FloatingDecor from '../components/FloatingDecor'
import ScrollReveal from '../components/ScrollReveal'
import { BIRTHDAY_DISPLAY, HER_NAME, HERO_SUBTEXT } from '../constants/content'

function AnimatedWord({ word, wordIndex, staggerDelay = 0 }) {
  const letterVariants = ['letter-a', 'letter-b', 'letter-c', 'letter-d']
  return (
    <div className="block -mt-[2px] sm:-mt-1 md:-mt-2 first:mt-0">
      <span className="inline-flex flex-wrap justify-center">
        {word.split('').map((ch, i) => {
          const variant = letterVariants[(wordIndex * 3 + i) % 4]
          return (
            <motion.span
              key={`${word}-${i}`}
              className={`inline-block heading-text-shimmer ${variant}`}
              initial={{ y: 40, opacity: 0, rotate: -12, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              transition={{
                delay: staggerDelay + i * 0.06,
                type: 'spring',
                stiffness: 260,
                damping: 14,
                mass: 0.8,
              }}
              style={{
                fontSize: 'clamp(2.75rem, 9.5vw, 7rem)',
                lineHeight: 0.92,
                background:
                  'linear-gradient(135deg, #ff4d8d 0%, #ff6b9d 15%, #ff8a6b 30%, #ffb347 50%, #ffd93d 70%, #ff9ecb 85%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter:
                  'drop-shadow(0 0 2px rgba(255,107,157,0.6)) drop-shadow(0 4px 10px rgba(255,107,157,0.35)) drop-shadow(0 8px 22px rgba(236,72,153,0.25)) drop-shadow(2px 6px 0 rgba(255,255,255,0.4))',
                letterSpacing: '-0.01em',
                WebkitTextStroke: '0.5px rgba(255,255,255,0.15)',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          )
        })}
      </span>
    </div>
  )
}

function HeroSparkles() {
  const sparkles = [
    { top: '4%', left: '6%', delay: 0, emoji: '✨', cls: 'hidden sm:inline' },
    { top: '8%', right: '10%', delay: 0.3, emoji: '💫', cls: '' },
    { top: '22%', left: '2%', delay: 0.6, emoji: '⭐', cls: 'hidden sm:inline' },
    { top: '18%', right: '4%', delay: 0.9, emoji: '✨', cls: 'hidden md:inline' },
    { top: '46%', left: '-2%', delay: 0.15, emoji: '🌟', cls: '' },
    { top: '50%', right: '-1%', delay: 0.45, emoji: '💫', cls: 'hidden sm:inline' },
    { top: '72%', left: '5%', delay: 0.75, emoji: '⭐', cls: 'hidden sm:inline' },
    { top: '76%', right: '8%', delay: 1.05, emoji: '✨', cls: '' },
    { top: '38%', left: '14%', delay: 1.2, emoji: '·', cls: 'hidden md:inline' },
    { top: '62%', right: '16%', delay: 0.2, emoji: '·', cls: 'hidden md:inline' },
  ]
  return (
    <>
      {sparkles.map((s, i) => (
        <motion.span
          key={`sp-${i}`}
          className={`pointer-events-none absolute sparkle font-bold ${s.cls}`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDelay: `${s.delay}s`,
            fontSize: 'clamp(0.85rem, 2.2vw, 1.5rem)',
            color:
              i % 3 === 0
                ? '#f472b6'
                : i % 3 === 1
                ? '#fbbf24'
                : '#a78bfa',
            textShadow: '0 0 10px currentColor',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: s.delay + 0.3 }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </>
  )
}

function HeroStickers() {
  const stickers = [
    { emoji: '🎀', top: -4, left: 6, className: 'sticker-bounce', delay: 0, cls: '' },
    { emoji: '🎂', top: 0, right: 8, className: 'sticker-spin', delay: 0.2, cls: '' },
    { emoji: '🎉', bottom: 10, left: -4, className: 'sticker-spin', delay: 0.4, cls: 'hidden sm:inline' },
    { emoji: '🎈', bottom: 4, right: 2, className: 'sticker-bounce', delay: 0.6, cls: '' },
    { emoji: '💖', top: 28, left: -8, className: 'sticker-bounce', delay: 0.8, cls: 'hidden sm:inline' },
    { emoji: '🌸', top: 34, right: -6, className: 'sticker-spin', delay: 1.0, cls: '' },
    { emoji: '🦋', bottom: 32, left: 0, className: 'sticker-spin', delay: 0.5, cls: 'hidden md:inline' },
    { emoji: '🌼', bottom: 28, right: -2, className: 'sticker-bounce', delay: 0.9, cls: 'hidden sm:inline' },
    { emoji: '💗', top: 58, left: -10, className: 'sticker-bounce', delay: 0.7, cls: 'hidden md:inline' },
    { emoji: '⭐', top: 62, right: -10, className: 'sticker-spin', delay: 1.1, cls: 'hidden md:inline' },
  ]
  return (
    <>
      {stickers.map((s, i) => (
        <motion.span
          key={`st-${i}`}
          className={`pointer-events-none absolute z-20 ${s.className} ${s.cls}`}
          style={{
            top: s.top !== undefined ? `${s.top}%` : undefined,
            bottom: s.bottom !== undefined ? `${s.bottom}%` : undefined,
            left: s.left !== undefined ? `${s.left}%` : undefined,
            right: s.right !== undefined ? `${s.right}%` : undefined,
            animationDelay: `${s.delay}s`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
            fontSize: 'clamp(1.25rem, 4.5vw, 2.5rem)',
          }}
          initial={{ scale: 0, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: s.delay + 0.4, type: 'spring', stiffness: 220, damping: 12 }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </>
  )
}

function HeroSprinkles() {
  const colors = ['#f472b6', '#fb7185', '#fbbf24', '#a78bfa', '#34d399', '#60a5fa', '#f472b6']
  const sprinkles = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 47) % 100}%`,
    top: `${8 + ((i * 29) % 84)}%`,
    delay: (i % 10) * 0.28,
    color: colors[i % colors.length],
    rotate: (i * 37) % 360,
    w: 3 + (i % 3),
  }))
  return (
    <>
      {sprinkles.map((s, i) => (
        <span
          key={`spr-${i}`}
          className="pointer-events-none absolute sprinkle rounded-full hidden sm:inline-block"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.w}px`,
            height: `${s.w + 4}px`,
            background: s.color,
            animationDelay: `${s.delay}s`,
            transform: `rotate(${s.rotate}deg)`,
            borderRadius: '40%',
            boxShadow: `0 0 6px ${s.color}80`,
          }}
        />
      ))}
    </>
  )
}

export default function Hero() {
  const words = ['Happy', 'Birthday', HER_NAME]
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
      style={{
        padding: 'clamp(2rem, 6vw, 5rem) clamp(0.75rem, 4vw, 2.5rem)',
        background:
          'radial-gradient(circle at 15% 15%, #ffd6e8 0%, transparent 45%), radial-gradient(circle at 85% 25%, #fff0b3 0%, transparent 40%), radial-gradient(circle at 50% 95%, #c8f7dc 0%, transparent 50%), linear-gradient(160deg, #ffb3d9 0%, #ffe8c8 40%, #d4f5e0 100%)',
      }}
    >
      <FloatingDecor emojis={['🎈', '✨', '⭐', '🎉', '🌸', '💕', '🦋', '🎂', '🎀', '🎁', '💫', '🌼']} />

      <ScrollReveal className="relative z-10 w-full max-w-4xl md:max-w-5xl lg:max-w-6xl">
        <motion.div
          className="mb-4 sm:mb-6 text-center"
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span className="relative inline-block">
            <span
              className="inline-block"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)' }}
            >
              🎂
            </span>
            <motion.span
              className="absolute -top-2 -right-3 sm:-right-8 confetti-pop inline-block"
              style={{
                animationDelay: '0.5s',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              🎊
            </motion.span>
            <motion.span
              className="absolute -top-1 -left-3 sm:-left-6 confetti-pop inline-block"
              style={{
                animationDelay: '1.2s',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              🎊
            </motion.span>
          </span>
        </motion.div>

        <div className="mb-3 sm:mb-4 text-center">
          <motion.span
            className="inline-block opacity-80"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          >
            🎀
          </motion.span>
        </div>

        <div className="relative mx-auto w-full max-w-[95%] sm:max-w-4xl md:max-w-5xl">
          <div
            className="pointer-events-none absolute inset-0 halo-glow rounded-[40%]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,182,193,0.55) 0%, rgba(255,218,185,0.35) 35%, rgba(196,181,255,0.2) 60%, transparent 78%)',
              filter: 'blur(clamp(15px, 4vw, 30px))',
              transform: 'scaleY(1.2)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 halo-glow rounded-[45%]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 55%)',
              filter: 'blur(clamp(10px, 3vw, 20px))',
              animationDelay: '0.8s',
            }}
          />

          <HeroSparkles />
          <HeroStickers />
          <HeroSprinkles />

          <h1 className="font-display leading-none font-extrabold tracking-tight relative z-10 px-1 sm:px-2 text-center">
            {words.map((w, wi) => (
              <AnimatedWord key={w} word={w} wordIndex={wi} staggerDelay={0.1 + wi * 0.2} />
            ))}
          </h1>

          <motion.div
            className="mx-auto mt-3 sm:mt-4 flex justify-center gap-1.5 sm:gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
          >
            {['#f472b6', '#fbbf24', '#a78bfa', '#34d399', '#60a5fa', '#f472b6'].map((c, i) => (
              <motion.span
                key={`dot-${i}`}
                className="rounded-full"
                style={{
                  width: 'clamp(6px, 1vw, 10px)',
                  height: 'clamp(6px, 1vw, 10px)',
                  background: c,
                  boxShadow: `0 0 8px ${c}`,
                }}
                animate={{ y: [0, -6, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.4 }}
              />
            ))}
          </motion.div>
        </div>

        <p
          className="font-hand mx-auto mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-rose-800/80 leading-relaxed"
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
          }}
        >
          {HERO_SUBTEXT}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <motion.span
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-white/90 px-4 sm:px-5 py-2.5 sm:py-3 font-bold text-rose-600 shadow-lg border-2 border-rose-100"
            style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)' }}
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            <span>★</span> for u, only <span>★</span>
          </motion.span>

          <motion.span
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 font-bold shadow-lg border-2"
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
              background: 'linear-gradient(135deg, #fff3b0 0%, #ffe082 100%)',
              borderColor: '#ffd54f',
              color: '#b8860b',
            }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            🎂 {BIRTHDAY_DISPLAY}
          </motion.span>

          <motion.span
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 font-bold shadow-lg border-2"
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
              background: 'linear-gradient(135deg, #e8d5ff 0%, #d1b4ff 100%)',
              borderColor: '#c4a0ff',
              color: '#7b5cb8',
            }}
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            💗 priority: u
          </motion.span>
        </div>
      </ScrollReveal>

      <motion.div
        className="absolute z-10 left-1/2 -translate-x-1/2 font-hand text-rose-600/90"
        style={{
          bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        scroll for the good stuff ↓
      </motion.div>

      <div
        className="pointer-events-none absolute z-10 opacity-80"
        style={{
          bottom: 'clamp(0.5rem, 2vw, 1rem)',
          left: '6%',
          fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
        }}
      >
        🌷
      </div>
      <div
        className="pointer-events-none absolute z-10 opacity-80"
        style={{
          bottom: 'clamp(1.25rem, 3vw, 2.5rem)',
          right: '8%',
          fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
        }}
      >
        🌼
      </div>
    </section>
  )
}
