import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import { AWARD_CARDS, BENTO_QUOTE, RELATIONSHIP_START } from '../constants/content'
import { getDaysLoved } from '../utils/daysLoved'

const SONG_PLAYED_EVENT = 'song-player-started'
const OOSUPODHU_ID = 'oosupodhu-bento-stats'

function OosupodhuAudioCard() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const src = new URL('../../oosupodhu.mp3', import.meta.url).href

  const stopSelf = () => {
    const audio = audioRef.current
    if (audio && !audio.paused) {
      audio.pause()
      setPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrent(audio.currentTime)
      setDuration(audio.duration || 0)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
      setCurrent(0)
    }
    const onLoaded = () => setDuration(audio.duration || 0)
    const onOtherPlayed = (e) => {
      if (e.detail.playerId !== OOSUPODHU_ID) {
        stopSelf()
      }
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('loadedmetadata', onLoaded)
    window.addEventListener(SONG_PLAYED_EVENT, onOtherPlayed)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener(SONG_PLAYED_EVENT, onOtherPlayed)
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent(SONG_PLAYED_EVENT, { detail: { playerId: OOSUPODHU_ID } }))
      audio.play().catch(() => {})
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const fmt = (s) => {
    if (!isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full">
      {/* floating stickers */}
      <div className="pointer-events-none absolute -top-8 -left-5 z-10 text-4xl sm:text-5xl rotate-[-12deg] anim-corner-a">🥺</div>
      <div className="pointer-events-none absolute -top-7 -right-4 z-10 text-4xl sm:text-5xl rotate-[14deg] anim-corner-b">💧</div>
      <div className="pointer-events-none absolute -bottom-7 left-3 z-10 text-4xl rotate-[-9deg] opacity-85 anim-corner-c">⏳</div>
      <div className="pointer-events-none absolute -bottom-8 right-6 z-10 text-5xl rotate-[8deg] anim-corner-d">🌷</div>
      <div className="pointer-events-none absolute top-5 left-4 z-10 text-2xl opacity-75 anim-card-e1">✨</div>
      <div className="pointer-events-none absolute top-8 right-5 z-10 text-2xl opacity-75 anim-card-e2">💫</div>

      {/* washi tape strips */}
      <div
        className="pointer-events-none absolute -top-4 left-12 z-10 h-6 w-28 rotate-[-6deg] rounded-sm"
        style={{ background: 'repeating-linear-gradient(45deg, #fde68a 0 10px, #fcd34d 10px 20px)' }}
      />
      <div
        className="pointer-events-none absolute -top-3 right-12 z-10 h-6 w-28 rotate-[7deg] rounded-sm"
        style={{ background: 'repeating-linear-gradient(-45deg, #fecaca 0 10px, #fca5a5 10px 20px)' }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[28px] border-4 border-white/80 p-5 sm:p-7 shadow-2xl"
        style={{
          background:
            'radial-gradient(circle at 12% 14%, rgba(255,236,139,0.75) 0%, transparent 55%), radial-gradient(circle at 88% 86%, rgba(255,182,193,0.75) 0%, transparent 55%), linear-gradient(145deg, #fff9c4 0%, #ffe0b2 50%, #f8bbd0 100%)',
          boxShadow:
            '0 26px 60px rgba(255,152,0,0.22), 0 12px 30px rgba(244,114,182,0.28), inset 0 0 0 1px rgba(255,255,255,0.9)',
        }}
        initial={{ y: 22, opacity: 0, rotate: -0.8 }}
        whileInView={{ y: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
      >
        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.8) 0%, transparent 60%)',
          }}
        />

        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
          {/* left: artwork */}
          <div className="relative mx-auto sm:mx-0">
            <div
              className={`relative w-28 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 p-1.5 shadow-2xl ${playing ? 'anim-spin-slow' : ''}`}
              style={{ boxShadow: '0 14px 36px rgba(251,146,60,0.38)' }}
            >
              <div
                className="relative aspect-square w-full overflow-hidden rounded-xl"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, #fef3c7 0%, #fcd34d 40%, #fb7185 100%)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-5xl drop-shadow-[0_6px_8px_rgba(244,63,94,0.45)]"
                    animate={playing ? { y: [0, -6, 0], rotate: [-3, 3, -3] } : {}}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  >
                    💔
                  </motion.span>
                </div>
                <div className="absolute inset-x-0 bottom-2 mx-auto flex w-fit items-end gap-0.5 h-5">
                  {playing &&
                    [0, 1, 2, 3, 2, 1, 0, 1, 2, 3].map((h, k) => (
                      <span
                        key={k}
                        className="w-[3.5px] rounded-full bg-white/92 anim-bars shadow"
                        style={{ height: 9 + h * 3, animationDelay: `${k * 0.09}s` }}
                      />
                    ))}
                </div>
              </div>
            </div>
            <span className="pointer-events-none absolute -left-3 -top-2 text-xl anim-card-e1">💘</span>
            <span className="pointer-events-none absolute -right-2 -bottom-3 text-xl anim-card-e2">🎼</span>
          </div>

          {/* right: info + controls */}
          <div className="relative z-10 flex-1 w-full">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-rose-500/80 sm:text-[11px]">
                  ·  A SAD LITTLE LOVE LETTER  ·
                </p>
                <h3 className="font-display mt-0.5 text-[22px] leading-tight font-extrabold sm:text-2xl">
                  <span className="gradient-heading">Oosupodhu</span> 🎧
                </h3>
                <p className="font-hand mt-0.5 text-[17px] leading-snug text-rose-600 sm:text-lg">
                  miss chesthunna… i&rsquo;m still waiting 🥺
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold tracking-wide text-rose-600 shadow-inner backdrop-blur border border-white">
                <span>🌙</span>
                missing you
                <span>💧</span>
              </span>
            </div>

            <div className="mt-3 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-inner backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggle}
                  className="group relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white shadow-xl overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, #fbbf24 0%, #fb923c 40%, #f472b6 100%)',
                    boxShadow: playing
                      ? '0 10px 26px rgba(251,146,60,0.5)'
                      : '0 8px 20px rgba(251,146,60,0.45)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                >
                  <AnimatePresence mode="wait">
                    {playing ? (
                      <motion.span
                        key="pause"
                        initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                        className="text-lg block"
                      >
                        ❚❚
                      </motion.span>
                    ) : (
                      <motion.span
                        key="play"
                        initial={{ opacity: 0, rotate: 30, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -30, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                        className="ml-0.5 text-lg block"
                      >
                        ▶
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {playing && (
                    <>
                      {[0, 1, 2].map((k) => (
                        <span
                          key={k}
                          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full anim-ripple-pulse"
                          style={{
                            background:
                              'radial-gradient(circle, rgba(251,146,60,0.55) 0%, transparent 70%)',
                            height: 20,
                            width: 20,
                            marginLeft: -10,
                            marginTop: -10,
                            animationDelay: `${k * 0.35}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </button>

                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 shadow-inner">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, #f59e0b 0%, #fb923c 40%, #ec4899 100%)',
                        width: `${progress}%`,
                        transition: 'width 0.15s ease-out',
                        boxShadow: '0 0 12px rgba(251,146,60,0.65)',
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow-md ring-2 ring-amber-300"
                      style={{ left: `calc(${progress}% - 7px)` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-rose-600/85">
                    <span>{fmt(current)}</span>
                    <span className="font-hand text-[15px] text-fuchsia-600">
                      {playing ? '♪ Naanundi naa praname Ilaa jaruthundhe… ♪' : 'tap play when u miss me too 💕'}
                    </span>
                    <span>{fmt(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* mood row */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { e: '🥺', t: 'sad' },
                  { e: '🌧️', t: 'rainy' },
                  { e: '💗', t: 'love' },
                  { e: '⏳', t: 'waiting' },
                  { e: '🌙', t: 'nights' },
                ].map(({ e, t }) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 rounded-full bg-white/65 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur border border-white"
                  >
                    <span className="text-sm">{e}</span>
                    {t}
                  </span>
                ))}
              </div>
              <p className="font-hand text-[17px] text-rose-600/90">
                ~ enni yrs ayina wait chesthane 💌
              </p>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />
      </motion.div>
    </div>
  )
}

function formatSinceLabel(date = RELATIONSHIP_START) {
  const d = new Date(date)
  const month = d.toLocaleString('default', { month: 'short' })
  const day = d.getDate()
  const year = d.getFullYear()
  return `${month} ${day}, ${year}`
}

export default function BentoStats() {
  const days = getDaysLoved()
  const sinceLabel = formatSinceLabel()

  return (
    <section
      className="relative px-4 py-20 sm:px-8"
      style={{
        background: 'linear-gradient(180deg, #fff59d 0%, #ffccbc 50%, #f8bbd0 100%)',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.1 — us, in numbers</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            little facts, big love
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <ScrollReveal className="col-span-2 row-span-2 sm:col-span-2">
            <div
              className="relative flex h-full min-h-[220px] flex-col justify-end rounded-3xl p-0 shadow-xl overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: 'url(/vaish-1.jpg)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
              <div className="relative p-6">
                <p className="font-hand text-xl text-white/95 drop-shadow-md">memory slot #1</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05} className="col-span-2 sm:col-span-2">
            <motion.div
              className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-3xl bg-white/85 p-6 text-center shadow-xl"
              whileHover={{ scale: 1.02, rotate: 0.5 }}
            >
              <p className="font-hand text-lg text-rose-500">days I&apos;ve loved you</p>
              <p className="font-display gradient-heading mt-1 text-5xl font-extrabold sm:text-6xl">
                {days}
              </p>
              <p className="mt-1 text-xs text-rose-400">
                since {sinceLabel} 💕
              </p>
            </motion.div>
          </ScrollReveal>

          {AWARD_CARDS.map((card, i) => {
            if (i === 0) {
              return (
                <ScrollReveal key={card.title} delay={0.08 + i * 0.05}>
                  <motion.div
                    className="relative h-full min-h-[140px] overflow-hidden rounded-2xl bg-cover bg-center shadow-lg border border-white/70"
                    style={{ backgroundImage: 'url(/vaish-9.jpg)' }}
                    whileHover={{ scale: 1.06, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </motion.div>
                </ScrollReveal>
              )
            }
            return (
              <ScrollReveal key={card.title} delay={0.08 + i * 0.05}>
                <motion.div
                  className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-5 shadow-lg backdrop-blur-sm border border-white/70"
                  whileHover={{ scale: 1.06, rotate: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                >
                  <span className="text-4xl leading-none">{card.emoji}</span>
                  <p className="font-hand text-center text-base sm:text-lg leading-snug text-rose-700 mt-1">
                    {card.title}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}

          <ScrollReveal delay={0.2} className="col-span-2">
            <div
              className="rounded-3xl border-2 border-dashed border-rose-300/80 bg-white/60 p-6 shadow-lg"
            >
              <p className="font-hand text-center text-2xl text-rose-700 sm:text-3xl">
                &ldquo;{BENTO_QUOTE}&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.26} className="col-span-2">
            <OosupodhuAudioCard />
          </ScrollReveal>

          {[2, 3].map((n) => (
            <ScrollReveal key={n} delay={0.1 * n}>
              <div
                className="relative flex min-h-[140px] items-end rounded-2xl p-0 shadow-lg overflow-hidden bg-cover bg-center"
                style={
                  n === 2
                    ? { backgroundImage: 'url(/teddy-1.jpg)' }
                    : { backgroundImage: 'url(/vaish-8.png)' }
                }
              >
                {n === 3 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
