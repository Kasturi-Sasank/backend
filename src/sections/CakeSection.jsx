import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import FloatingDecor from '../components/FloatingDecor'
import { HER_NAME } from '../constants/content'

function Candle({ cx, candleTop, candleW, candleH, candleColor, candleStroke, out, onBlow, index }) {
  const flameW = candleW * 2.2
  const flameH = candleH * 0.7
  const flameCx = cx
  const flameBottom = candleTop - 2
  const flameTop = flameBottom - flameH

  return (
    <g style={{ cursor: 'pointer' }} onClick={onBlow}>
      <motion.rect
        x={cx - candleW / 2}
        y={candleTop}
        width={candleW}
        height={candleH}
        rx={candleW / 4}
        fill={candleColor}
        stroke={candleStroke}
        strokeWidth="1.2"
        whileTap={{ scaleX: 0.9, y: 2 }}
      />
      <line
        x1={cx}
        y1={candleTop + candleH * 0.15}
        x2={cx}
        y2={candleTop + candleH * 0.85}
        stroke="#ffffff"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {!out && (
        <motion.g onClick={onBlow} style={{ cursor: 'pointer' }}>
          <motion.ellipse
            cx={flameCx}
            cy={(flameTop * 0.65 + flameBottom * 0.35)}
            rx={flameW * 0.5}
            ry={flameH * 0.55}
            fill="#fff5e0"
            stroke="#ffb347"
            strokeWidth="1.5"
            animate={{
              scaleY: [1, 1.08, 1],
              scaleX: [1, 0.92, 1],
            }}
            transition={{ repeat: Infinity, duration: 0.3 + index * 0.04 }}
            style={{ transformOrigin: `${flameCx}px ${flameBottom}px` }}
          />
          <motion.path
            d={`M ${flameCx} ${flameTop}
                C ${flameCx - flameW * 0.4} ${flameTop + flameH * 0.35},
                  ${flameCx - flameW * 0.42} ${flameBottom - flameH * 0.18},
                  ${flameCx} ${flameBottom}
                C ${flameCx + flameW * 0.42} ${flameBottom - flameH * 0.18},
                  ${flameCx + flameW * 0.4} ${flameTop + flameH * 0.35},
                  ${flameCx} ${flameTop} Z`}
            fill="#ff6b35"
            animate={{
              scaleY: [1, 1.15, 1],
              scaleX: [1, 0.9, 1],
              y: [0, -1.5, 0],
            }}
            transition={{ repeat: Infinity, duration: 0.3 + index * 0.04 }}
            style={{ transformOrigin: `${flameCx}px ${flameBottom}px` }}
          />
          <motion.path
            d={`M ${flameCx} ${flameTop + flameH * 0.18}
                C ${flameCx - flameW * 0.22} ${flameTop + flameH * 0.45},
                  ${flameCx - flameW * 0.24} ${flameBottom - flameH * 0.22},
                  ${flameCx} ${flameBottom - flameH * 0.08}
                C ${flameCx + flameW * 0.24} ${flameBottom - flameH * 0.22},
                  ${flameCx + flameW * 0.22} ${flameTop + flameH * 0.45},
                  ${flameCx} ${flameTop + flameH * 0.18} Z`}
            fill="#ffd93d"
            animate={{ scaleY: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 0.28 + index * 0.03 }}
            style={{ transformOrigin: `${flameCx}px ${flameBottom}px` }}
          />
          <motion.path
            d={`M ${flameCx} ${flameTop + flameH * 0.38}
                C ${flameCx - flameW * 0.1} ${flameTop + flameH * 0.55},
                  ${flameCx - flameW * 0.11} ${flameBottom - flameH * 0.25},
                  ${flameCx} ${flameBottom - flameH * 0.18}
                C ${flameCx + flameW * 0.11} ${flameBottom - flameH * 0.25},
                  ${flameCx + flameW * 0.1} ${flameTop + flameH * 0.55},
                  ${flameCx} ${flameTop + flameH * 0.38} Z`}
            fill="#fff9c4"
          />
          <motion.g animate={{ opacity: [0, 0.7, 0] }} transition={{ repeat: Infinity, duration: 1.2 + index * 0.2 }}>
            {[0, 1, 2].map((sp) => (
              <motion.circle
                key={sp}
                cx={flameCx + (sp - 1) * 2}
                cy={flameTop - 2 - sp * 2.5}
                r="1"
                fill="#fff176"
                animate={{ y: [0, -6, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 + sp * 0.2 }}
              />
            ))}
          </motion.g>
        </motion.g>
      )}

      <AnimatePresence>
        {out && (
          <motion.g
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={cx + (i - 2) * 2.5}
                cy={flameBottom - 14 - i * 2}
                r="1.8"
                fill={i % 2 === 0 ? '#e1bee7' : '#bbdefb'}
                animate={{ cy: [flameBottom - 14 - i * 2, flameBottom - 45 - i * 4], opacity: [0.8, 0] }}
                transition={{ duration: 1.2 }}
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <motion.text
                key={`s-${i}`}
                x={cx + (i - 2) * 5}
                y={flameBottom - 20}
                fontSize="8"
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, y: -28, scale: 1.4, rotate: i % 2 ? 18 : -18 }}
                transition={{ duration: 1 }}
              >
                {['✨', '💫', '⭐'][i % 3]}
              </motion.text>
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  )
}

export default function CakeSection() {
  const [blown, setBlown] = useState([false, false, false])
  const allOut = blown.every(Boolean)

  const blow = (i) => {
    setBlown((b) => {
      if (b[i]) return b
      const next = [...b]
      next[i] = true
      return next
    })
  }

  const CX = 200
  const TOP_TIER_Y = 115
  const TOP_TIER_H = 70
  const CANDLE_TOP = TOP_TIER_Y - 38
  const CANDLE_W = 9
  const CANDLE_H = 38
  const CANDLE_GAP = 32

  return (
    <section
      className="relative px-4 py-20 sm:px-8 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 20%, #ffd6e8 0%, transparent 50%), radial-gradient(circle at 80% 30%, #e1bee7 0%, transparent 50%), radial-gradient(circle at 50% 90%, #c8f7dc 0%, transparent 55%), linear-gradient(180deg, #fce4ec 0%, #f3e5f5 40%, #e8f5e9 100%)',
      }}
    >
      <FloatingDecor emojis={['🎂', '🎈', '🎉', '🎊', '✨', '🌟', '💫', '🎀', '🎁', '🧁', '🍰', '🌸', '🦄', '💖', '🌈', '⭐']} />

      <div className="pointer-events-none absolute left-6 top-12 z-0 text-5xl sm:text-6xl opacity-60">
        <motion.span animate={{ rotate: [-10, 8, -10], scale: [1, 1.1, 1], y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
          🎈
        </motion.span>
      </div>
      <div className="pointer-events-none absolute right-8 top-16 z-0 text-5xl sm:text-6xl opacity-60">
        <motion.span animate={{ rotate: [8, -12, 8], scale: [1, 1.15, 1], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 0.6 }}>
          🎁
        </motion.span>
      </div>
      <div className="pointer-events-none absolute bottom-16 left-10 z-0 text-5xl sm:text-6xl opacity-50">
        <motion.span animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 4 }}>
          🧁
        </motion.span>
      </div>
      <div className="pointer-events-none absolute bottom-24 right-12 z-0 text-5xl sm:text-6xl opacity-50">
        <motion.span animate={{ y: [0, -12, 0], rotate: [6, -6, 6] }} transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}>
          🍰
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <SectionEyebrow>no.3 — the cake</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            three flames, one wish
          </h2>
          <p className="font-hand mt-4 text-2xl text-violet-700/80">
            tap each candle to blow it out 💨
          </p>
          <div className="mt-4 flex justify-center gap-3 text-3xl">
            {blown.map((b, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={b ? { scale: 1, opacity: 1, y: [0, -6, 0] } : { scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {b ? '💨' : '🕯️'}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10">
          <motion.div
            animate={allOut ? { y: [0, -6, 0] } : {}}
            transition={allOut ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
          >
            <svg viewBox="0 0 400 320" className="mx-auto w-full max-w-md drop-shadow-2xl">
              <defs>
                <linearGradient id="plate" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8bbd0" />
                </linearGradient>
                <linearGradient id="bottomLayer" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f48fb1" />
                  <stop offset="100%" stopColor="#ec407a" />
                </linearGradient>
                <linearGradient id="topLayer" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8bbd0" />
                  <stop offset="100%" stopColor="#f06292" />
                </linearGradient>
                <linearGradient id="frosting" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fff9c4" />
                  <stop offset="100%" stopColor="#ffe082" />
                </linearGradient>
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#880e4f" floodOpacity="0.2" />
                </filter>
              </defs>

              <ellipse cx={CX} cy="290" rx="150" ry="14" fill="url(#plate)" stroke="#f48fb1" strokeWidth="2" filter="url(#softShadow)" />
              <ellipse cx={CX} cy="286" rx="135" ry="10" fill="#fff" opacity="0.6" />

              <rect x="70" y="185" width="260" height="95" rx="14" fill="url(#bottomLayer)" stroke="#d81b60" strokeWidth="2" />
              <path
                d={`M 70 185
                   Q 85 175, 100 185
                   Q 115 173, 130 185
                   Q 145 175, 160 185
                   Q 175 173, 190 185
                   Q 205 175, 220 185
                   Q 235 173, 250 185
                   Q 265 176, 280 185
                   Q 295 178, 310 185
                   L 310 200
                   Q 295 208, 280 200
                   Q 265 210, 250 200
                   Q 235 209, 220 200
                   Q 205 210, 190 200
                   Q 175 209, 160 200
                   Q 145 210, 130 200
                   Q 115 208, 100 200
                   Q 85 207, 70 200 Z`}
                fill="url(#frosting)"
                stroke="#ffb300"
                strokeWidth="1.5"
              />

              {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
                <circle key={`dot-b-${d}`} cx={95 + d * 31} cy="230" r="4" fill="#fff" opacity="0.7" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <text key={`sprinkle-b-${d}`} x={108 + d * 30} y="258" fontSize="10" fill="#ce93d8">
                  ♥
                </text>
              ))}

              <rect x="120" y={TOP_TIER_Y} width="160" height={TOP_TIER_H} rx="12" fill="url(#topLayer)" stroke="#ec407a" strokeWidth="2" />
              <path
                d={`M 120 ${TOP_TIER_Y}
                   Q 133 ${TOP_TIER_Y - 9}, 146 ${TOP_TIER_Y}
                   Q 159 ${TOP_TIER_Y - 11}, 172 ${TOP_TIER_Y}
                   Q 185 ${TOP_TIER_Y - 9}, 198 ${TOP_TIER_Y}
                   Q 211 ${TOP_TIER_Y - 11}, 224 ${TOP_TIER_Y}
                   Q 237 ${TOP_TIER_Y - 9}, 250 ${TOP_TIER_Y}
                   Q 263 ${TOP_TIER_Y - 10}, 276 ${TOP_TIER_Y}
                   Q 289 ${TOP_TIER_Y - 9}, 298 ${TOP_TIER_Y}
                   L 298 ${TOP_TIER_Y + 14}
                   Q 285 ${TOP_TIER_Y + 22}, 272 ${TOP_TIER_Y + 14}
                   Q 259 ${TOP_TIER_Y + 23}, 246 ${TOP_TIER_Y + 14}
                   Q 233 ${TOP_TIER_Y + 22}, 220 ${TOP_TIER_Y + 14}
                   Q 207 ${TOP_TIER_Y + 23}, 194 ${TOP_TIER_Y + 14}
                   Q 181 ${TOP_TIER_Y + 22}, 168 ${TOP_TIER_Y + 14}
                   Q 155 ${TOP_TIER_Y + 23}, 142 ${TOP_TIER_Y + 14}
                   Q 129 ${TOP_TIER_Y + 20}, 120 ${TOP_TIER_Y + 14} Z`}
                fill="url(#frosting)"
                stroke="#ffb300"
                strokeWidth="1.5"
              />

              {[0, 1, 2, 3, 4, 5].map((d) => (
                <circle key={`dot-t-${d}`} cx={142 + d * 24} cy={TOP_TIER_Y + 44} r="3.2" fill="#fff" opacity="0.7" />
              ))}
              {[0, 1, 2, 3, 4].map((d) => (
                <text key={`sprinkle-t-${d}`} x={154 + d * 24} y={TOP_TIER_Y + 62} fontSize="8.5" fill="#ce93d8">
                  ♥
                </text>
              ))}

              <ellipse cx={CX} cy={TOP_TIER_Y} rx="78" ry="10" fill="#fce4ec" opacity="0.7" />
              <ellipse cx={CX} cy={TOP_TIER_Y - 2} rx="62" ry="6" fill="#fff" opacity="0.5" />

              <Candle
                cx={CX - CANDLE_GAP}
                candleTop={CANDLE_TOP}
                candleW={CANDLE_W}
                candleH={CANDLE_H}
                candleColor="#fff9c4"
                candleStroke="#fbc02d"
                out={blown[0]}
                onBlow={() => blow(0)}
                index={0}
              />
              <Candle
                cx={CX}
                candleTop={CANDLE_TOP}
                candleW={CANDLE_W}
                candleH={CANDLE_H}
                candleColor="#e1bee7"
                candleStroke="#9c27b0"
                out={blown[1]}
                onBlow={() => blow(1)}
                index={1}
              />
              <Candle
                cx={CX + CANDLE_GAP}
                candleTop={CANDLE_TOP}
                candleW={CANDLE_W}
                candleH={CANDLE_H}
                candleColor="#c8e6c9"
                candleStroke="#388e3c"
                out={blown[2]}
                onBlow={() => blow(2)}
                index={2}
              />

              <g>
                {[0, 1, 2].map((c) => (
                  <motion.text
                    key={`cherry-${c}`}
                    x={152 + c * 44}
                    y={TOP_TIER_Y - 1}
                    fontSize="13"
                    textAnchor="middle"
                    animate={{ rotate: [-3, 3, -3], y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2 + c * 0.3 }}
                  >
                    🍒
                  </motion.text>
                ))}
                <motion.text
                  x={132}
                  y={TOP_TIER_Y - 1}
                  fontSize="11"
                  textAnchor="middle"
                  animate={{ rotate: [-3, 3, -3], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6 }}
                >
                  🍓
                </motion.text>
                <motion.text
                  x={268}
                  y={TOP_TIER_Y - 1}
                  fontSize="11"
                  textAnchor="middle"
                  animate={{ rotate: [3, -3, 3], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3 }}
                >
                  🍓
                </motion.text>
              </g>
            </svg>
          </motion.div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {allOut && (
            <motion.div
              key="wish-reveal"
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120, damping: 14 }}
              className="mt-10"
            >
              <div className="pointer-events-none mb-6 flex justify-center gap-2 text-4xl">
                {['🎉', '🎊', '✨', '🌟', '💫', '🎊', '🎉'].map((e, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, rotate: -20 }}
                    animate={{ opacity: 1, y: [0, -20, 0], rotate: [0, 15, -10, 0] }}
                    transition={{ delay: i * 0.08, repeat: Infinity, duration: 2, repeatDelay: 1 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="mx-auto max-w-xl rounded-3xl bg-white/90 px-8 py-10 shadow-2xl border-4 border-rose-200 backdrop-blur-md"
                style={{
                  background:
                    'linear-gradient(135deg, #fff5f8 0%, #f3e5f5 50%, #e8f5e9 100%)',
                }}
                animate={{
                  boxShadow: [
                    '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
                    '0 25px 60px -10px rgba(186, 104, 200, 0.3)',
                    '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 10, delay: 0.2 }}
                  className="mb-4 text-6xl"
                >
                  💖
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display mb-6 text-3xl font-extrabold sm:text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, #ec407a 0%, #ab47bc 50%, #5c6bc0 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  wish made. it&apos;ll come true 🌟
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3 font-hand text-2xl leading-relaxed text-violet-800/90 sm:text-3xl"
                >
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                  >
                    🌷 Happy birthday, Kanna 🌷
                  </motion.p>
                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, type: 'spring' }}
                  >
                    Eppudu happy ga undu chinnu,Nuv chaala manchi danivi potti, neeku anni manche jaruguthayi
                  </motion.p>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1, type: 'spring' }}
                  >
                  Nuvvu em korukunte adi avvali ani aa devudni manaspoorthiga korukuntunna.
                  </motion.p>
                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.3, type: 'spring' }}
                  >
                    Vacchay ra kanna, okka sari chudali ani unde, enni rojulu ayyinde chusi 💗.Em ayina sare, em jarigina sare, nenu unnanu, nenu untanu, kalisi chooskundam🫂
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 }}
                  className="mt-8 flex justify-center gap-3 text-4xl"
                >
                  {['💕', '✨', '🎂', '✨', '💕'].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
                      transition={{ repeat: Infinity, duration: 1.8 + i * 0.15 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
                {[...Array(40)].map((_, i) => (
                  <motion.span
                    key={`conf-${i}`}
                    className="absolute text-2xl sm:text-3xl"
                    initial={{
                      y: '-10vh',
                      opacity: 0,
                    }}
                    animate={{
                      y: '110vh',
                      opacity: [0, 1, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4 + (i % 5),
                      delay: (i * 0.15) % 3,
                      ease: 'linear',
                    }}
                    style={{ left: `${(i * 37) % 95 + 2}%` }}
                  >
                    {['🎉', '✨', '💫', '🌟', '🎊', '💕', '🌸', '🎀'][i % 8]}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
