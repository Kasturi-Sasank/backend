import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import FloatingDecor from '../components/FloatingDecor'
import { FAVORITE_PHOTO_NOTE, POLAROIDS } from '../constants/content'

const rotations = [-4, 3, -2, 5, -3, 2]
const tapeColors = ['#ffb3ba', '#bae1ff', '#ffffba', '#baffc9', '#ffdfba', '#e0bbff']
const SONG_PLAYED_EVENT = 'song-player-started'

function FeaturedVideoPolaroid() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    const onEnd = () => setPlaying(false)
    const onOtherPlayed = (e) => {
      if (e.detail.playerId !== 'video-polaroid') {
        v.pause()
        setPlaying(false)
      }
    }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnd)
    window.addEventListener(SONG_PLAYED_EVENT, onOtherPlayed)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnd)
      window.removeEventListener(SONG_PLAYED_EVENT, onOtherPlayed)
    }
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      window.dispatchEvent(new CustomEvent(SONG_PLAYED_EVENT, { detail: { playerId: 'video-polaroid' } }))
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <motion.div
      className="relative mx-auto max-w-[340px] w-full bg-white p-3 pb-14 shadow-2xl ring-2 ring-pink-200"
      style={{
        rotate: '-1.5deg',
        borderRadius: '6px 6px 4px 4px',
      }}
      initial={{ opacity: 0, y: 30, rotate: -6, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      whileHover={{ scale: 1.03, rotate: 0, boxShadow: '0 30px 60px -12px rgba(244, 114, 182, 0.45)' }}
    >
      <div
        className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 opacity-90 shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
        style={{
          background: 'repeating-linear-gradient(45deg, #ffdfba 0 4px, #ffd4a8 4px 8px)',
          transform: 'translateX(-50%) rotate(-3deg)',
        }}
      />
      <span className="absolute -top-2 right-4 text-2xl anim-card-e1">🎀</span>
      <span className="absolute -top-2 left-4 text-xl anim-card-e2">✨</span>

      <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden ring-1 ring-rose-100 bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100">
        <video
          ref={videoRef}
          src="/Radhima.mp4"
          onClick={toggle}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
          preload="metadata"
          poster=""
        />

        <AnimatePresence mode="wait">
          {!playing && (
            <motion.button
              key="play-overlay"
              onClick={toggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(255,182,193,0.25) 0%, rgba(236,72,153,0.15) 45%, rgba(0,0,0,0.15) 100%)',
              }}
            >
              <span className="absolute inset-0 pointer-events-none">
                {[0, 1, 2].map((k) => (
                  <span
                    key={k}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full anim-ripple-pulse"
                    style={{
                      width: 70,
                      height: 70,
                      background:
                        'radial-gradient(circle, rgba(251,113,133,0.55) 0%, transparent 70%)',
                      animationDelay: `${k * 0.35}s`,
                    }}
                  />
                ))}
              </span>

              <motion.span
                className="relative flex h-24 w-24 items-center justify-center rounded-full text-3xl text-white shadow-2xl border-4 border-white"
                style={{
                  background:
                    'linear-gradient(135deg, #fb7185 0%, #ec4899 45%, #d946ef 100%)',
                }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
              >
                <span className="sr-only">play video</span>
                <span className="ml-1.5 text-4xl drop-shadow">▶</span>
                <span className="absolute -top-3 -right-1 text-2xl">💕</span>
              </motion.span>

              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-hand text-lg text-white drop-shadow-md tracking-wide bg-pink-500/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40">
                tap to play, cutie ✨
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {playing && (
          <div
            className="absolute left-0 bottom-0 h-1 w-full bg-white/30"
            style={{ backdropFilter: 'blur(1px)' }}
          >
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, #fb7185 0%, #ec4899 50%, #d946ef 100%)',
                transition: 'width 0.12s ease-out',
              }}
            />
          </div>
        )}

        <div className="absolute bottom-2 left-2 text-lg pointer-events-none drop-shadow anim-card-e1">
          🎬
        </div>
        <div className="absolute bottom-2 right-2 text-lg pointer-events-none drop-shadow anim-card-e2">
          💗
        </div>
      </div>

      <div className="mt-5 font-hand text-center text-2xl text-rose-700 leading-tight">
        a moving memory, just for u 💞
      </div>
      <div className="mt-1 text-center text-xs text-rose-400 font-hand tracking-wide">
        — forever & always 🎞️
      </div>

      <div className="absolute -bottom-2 left-6 text-xl pointer-events-none opacity-60 anim-card-e7">
        💖
      </div>
      <div className="absolute -bottom-2 right-6 text-xl pointer-events-none opacity-60 anim-card-e6">
        🌸
      </div>
    </motion.div>
  )
}

export default function PolaroidGallery() {
  return (
    <section className="notebook-lines relative px-4 py-20 sm:px-8 overflow-hidden">
      <FloatingDecor emojis={['📸', '💕', '🌸', '✨', '💌', '🌷', '🎞️', '💫', '🎀', '🌟', '🦋', '💗', '🧸', '🌼', '💝', '🌈']} />

      <div className="pointer-events-none absolute left-4 top-8 z-0 text-5xl sm:text-6xl opacity-40">
        <motion.span animate={{ rotate: [-8, 6, -8], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
          📮
        </motion.span>
      </div>
      <div className="pointer-events-none absolute right-6 top-16 z-0 text-5xl sm:text-6xl opacity-40">
        <motion.span animate={{ rotate: [10, -6, 10], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, delay: 0.5 }}>
          🎞️
        </motion.span>
      </div>
      <div className="pointer-events-none absolute bottom-12 left-8 z-0 text-4xl sm:text-5xl opacity-35">
        <motion.span animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
          🌷
        </motion.span>
      </div>
      <div className="pointer-events-none absolute bottom-20 right-10 z-0 text-4xl sm:text-5xl opacity-35">
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }}>
          🌼
        </motion.span>
      </div>
      <div className="pointer-events-none absolute left-1/4 top-1/3 z-0 text-3xl opacity-20">
        <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }} transition={{ repeat: Infinity, duration: 3 }}>
          ✦
        </motion.span>
      </div>
      <div className="pointer-events-none absolute right-1/3 bottom-1/3 z-0 text-3xl opacity-20">
        <motion.span animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}>
          ✦
        </motion.span>
      </div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={`heart-${i}`}
            className="absolute text-xl opacity-20"
            style={{
              left: `${(i * 53) % 95 + 2}%`,
              top: `${(i * 37) % 92 + 4}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.35, 0.1],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + (i % 4),
              delay: (i * 0.2) % 2,
              ease: 'easeInOut',
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💗' : '💖'}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.2 — receipts of us</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            The Moments That Became Memories
          </h2>
          <motion.p
            className="font-hand mt-4 text-xl text-rose-600/80 sm:text-2xl"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ✨ little pieces of forever ✨
          </motion.p>
        </ScrollReveal>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {POLAROIDS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.06}>
              <motion.figure
                className="relative mx-auto w-full max-w-[260px] bg-white p-3 pb-10 shadow-xl"
                style={{ rotate: `${rotations[i % rotations.length]}deg` }}
                whileHover={{ scale: 1.06, rotate: 0, boxShadow: '0 25px 50px -12px rgba(244, 114, 182, 0.35)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <div
                  className="absolute -top-2 left-1/2 h-6 w-16 -translate-x-1/2 opacity-90"
                  style={{
                    background: tapeColors[i % tapeColors.length],
                    transform: `translateX(-50%) rotate(${i % 2 ? 8 : -6}deg)`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  }}
                />
                <div className="aspect-[4/5] w-full rounded-sm overflow-hidden bg-rose-50 ring-1 ring-rose-100">
                  {p.image ? (
                    <img
                      src={`${p.image}?v=${Date.now()}`}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(${135 + i * 20}deg, 
                          hsl(${330 + i * 15}, 80%, 85%) 0%, 
                          hsl(${280 + i * 10}, 70%, 88%) 100%)`,
                      }}
                    />
                  )}
                </div>
                <figcaption className="font-hand absolute right-3 bottom-3 left-3 text-center text-xl text-rose-700">
                  {p.caption}
                </figcaption>
              </motion.figure>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.18} className="relative mt-24">
          <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 text-5xl opacity-50 sm:text-6xl anim-corner-a">
            💌
          </div>
          <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 text-5xl opacity-50 sm:text-6xl anim-corner-b">
            💞
          </div>
          <div className="mb-4 flex justify-center gap-1.5 text-2xl opacity-80">
            {['🎬', '✨', '💕', '✨', '🎬'].map((e, i) => (
              <span key={i} className="anim-card-e8" style={{ animationDelay: `${i * 0.15}s` }}>
                {e}
              </span>
            ))}
          </div>
          <FeaturedVideoPolaroid />
          <p className="font-hand mt-6 text-center text-xl text-violet-600/85 sm:text-2xl">
            🎥 Kanna, I Love you💗💘 🎥
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="relative mt-20 flex justify-center">
          <motion.div
            className="relative inline-flex items-center gap-3 rounded-full bg-rose-100/80 px-6 py-3 shadow-md backdrop-blur-sm border-2 border-rose-200"
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-2xl">💌</span>
            <p className="font-hand text-2xl text-rose-600">
              {FAVORITE_PHOTO_NOTE}
            </p>
            <span className="text-2xl">💌</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
