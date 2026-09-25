import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import FloatingDecor from '../components/FloatingDecor'
import { LYRIC_TIMELINE } from '../constants/content'

const SONG_PLAYED_EVENT = 'song-player-started'
let songPlayerCounter = 0

function SongPlayer({ src, title, theme, align = 'right', i = 0 }) {
  const audioRef = useRef(null)
  const playerId = useRef(++songPlayerCounter)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

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
      if (e.detail.playerId !== playerId.current) {
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
      window.dispatchEvent(new CustomEvent(SONG_PLAYED_EVENT, { detail: { playerId: playerId.current } }))
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

  const posStyle =
    align === 'right'
      ? { top: -78, right: 0 }
      : { top: -78, left: 0 }

  return (
    <div
      className="absolute z-30"
      style={{
        ...posStyle,
        opacity: 0,
        animation: `player-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 + i * 0.06}s forwards`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-4 text-2xl anim-card-e1"
        style={align === 'right' ? { left: -20 } : { right: -20 }}
      >
        🎼
      </div>
      <div
        className="pointer-events-none absolute -top-3 text-2xl anim-card-e2"
        style={{ ...(align === 'right' ? { right: -16 } : { left: -16 }), animationDelay: '0.5s' }}
      >
        ✨
      </div>

      <div
        onClick={toggle}
        className={`group relative flex cursor-pointer items-center gap-3 rounded-full px-4 py-2.5 shadow-2xl ring-2 backdrop-blur-sm border-2 ${theme.ring} ${theme.border}`}
        style={{
          background: theme.bg,
          transition: 'transform 0.15s ease-out, box-shadow 0.2s ease-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)'
          e.currentTarget.style.boxShadow = `0 20px 40px -12px ${theme.shadow}`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.96)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)'
        }}
      >
        <audio ref={audioRef} src={src} preload="metadata" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white shadow-lg overflow-hidden"
          style={{ background: theme.button }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.span
                key="pause"
                initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="text-base block"
              >
                ❚❚
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ opacity: 0, rotate: 30, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -30, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="ml-0.5 text-base block"
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
                    background: `radial-gradient(circle, ${theme.shadow.includes('255') ? 'rgba(251,113,133,0.5)' : theme.shadow.replace('0.4', '0.5')} 0%, transparent 70%)`,
                    height: 16,
                    width: 16,
                    marginLeft: -8,
                    marginTop: -8,
                    animationDelay: `${k * 0.3}s`,
                  }}
                />
              ))}
            </>
          )}
        </button>

        <div className="flex min-w-[150px] flex-col gap-1 pr-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold tracking-wide ${theme.text}`}>
              🎵 {title}
            </span>
            <span
              className={`text-xs ${theme.sub} ${playing ? 'anim-card-e5' : ''}`}
              style={{ opacity: playing ? undefined : 0.5 }}
            >
              {playing ? '♪ now playing' : 'tap to play'}
            </span>
          </div>
          <div className={`relative h-1.5 w-full overflow-hidden rounded-full ${theme.track}`}>
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                background: theme.prog,
                width: `${progress}%`,
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>
          <div className={`flex items-center justify-between text-[10px] font-medium ${theme.time}`}>
            <span>{fmt(current)}</span>
            {playing ? (
              <div className="flex items-end gap-0.5 h-[14px]">
                {[0, 1, 2, 1, 0].map((h, k) => (
                  <span
                    key={k}
                    className={`w-[3px] rounded-full bg-gradient-to-t ${theme.equalFrom} ${theme.equalTo} anim-bars`}
                    style={{ height: 6 + h * 2, animationDelay: `${k * 0.08}s` }}
                  />
                ))}
              </div>
            ) : (
              <span>♪ ♪</span>
            )}
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes player-in {
          from { opacity: 0; transform: translateY(20px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

export default function LyricsTimeline() {
  return (
    <section
      className="relative px-4 py-20 sm:px-8 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 10% 10%, #e0f2fe 0%, transparent 45%), radial-gradient(circle at 90% 80%, #fce7f3 0%, transparent 50%), linear-gradient(180deg, #fdf2f8 0%, #ede9fe 50%, #eff6ff 100%)',
      }}
    >
      <FloatingDecor emojis={['🎵', '🎶', '🎧', '🎤', '💿', '🎼', '✨', '💕', '🌸', '💫', '🌈', '⭐', '🎸', '🎹']} />

      <div className="pointer-events-none absolute left-8 top-16 z-0 text-5xl sm:text-6xl opacity-50">
        <span className="inline-block anim-corner-a">🎧</span>
      </div>
      <div className="pointer-events-none absolute right-10 top-24 z-0 text-5xl sm:text-6xl opacity-50">
        <span className="inline-block anim-corner-b">🎵</span>
      </div>
      <div className="pointer-events-none absolute bottom-20 left-12 z-0 text-4xl sm:text-5xl opacity-40">
        <span className="inline-block anim-corner-c">🎤</span>
      </div>
      <div className="pointer-events-none absolute bottom-28 right-14 z-0 text-4xl sm:text-5xl opacity-40">
        <span className="inline-block anim-corner-d">🎹</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.4 — our soundtrack</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            songs that remind me of u
          </h2>
          <p
            className="font-hand mt-4 text-xl text-purple-700/80 sm:text-2xl anim-card-e5"
          >
            🎶 every song, a little memory of us 🎶
          </p>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-1.5 -translate-x-1/2 sm:block">
            <div
              className="h-full w-full rounded-full anim-card-e5"
              style={{
                background:
                  'linear-gradient(180deg, #fda4af 0%, #c4b5fd 45%, #93c5fd 100%)',
                boxShadow: '0 0 20px rgba(196, 181, 253, 0.4)',
              }}
            />
          </div>

          <div className="space-y-20 sm:space-y-28">
            {LYRIC_TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              const playerAlign = isLeft ? 'right' : 'left'
              return (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <div className="relative grid items-center gap-8 sm:grid-cols-2 sm:gap-10">
                    <div
                      className={`relative flex ${
                        isLeft ? 'sm:justify-end' : 'sm:justify-start sm:order-2'
                      } justify-center`}
                    >
                      <div className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2">
                        <span
                          className="inline-block text-3xl sm:text-4xl drop-shadow-md anim-card-e1"
                          style={{ animationDuration: `${2.5 + i * 0.3}s` }}
                        >
                          {item.pin}
                        </span>
                      </div>

                      <figure
                        className={`relative w-full max-w-[260px] bg-white p-3 pb-3 shadow-2xl ring-4 ${item.border}`}
                        style={{
                          rotate: isLeft ? `-2deg` : `2deg`,
                          borderRadius: '8px 8px 4px 4px',
                          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)'
                          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(196, 181, 253, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = ''
                          e.currentTarget.style.boxShadow = ''
                        }}
                      >
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-slate-50">
                          <img
                            src={`${item.image}?v=${Date.now()}`}
                            alt={item.songTitle}
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        </div>
                      </figure>
                    </div>

                    <div
                      className={`relative flex ${
                        isLeft ? 'sm:justify-start' : 'sm:justify-end sm:order-1'
                      } justify-center`}
                    >
                      {item.audioSrc && (
                        <SongPlayer
                          src={item.audioSrc}
                          title={item.audioTitle || item.songTitle}
                          theme={item.audioTheme}
                          align={playerAlign}
                          i={i}
                        />
                      )}
                      <article
                        className={`relative w-full max-w-md rounded-3xl bg-gradient-to-br ${item.accent} px-8 py-8 shadow-2xl border-4 ${item.border}`}
                        style={{
                          rotate: isLeft ? `1deg` : `-1.5deg`,
                          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)'
                          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(244, 114, 182, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = ''
                          e.currentTarget.style.boxShadow = ''
                        }}
                      >
                        <div className="pointer-events-none absolute -top-3 left-1/2 flex -translate-x-1/2 gap-2">
                          {['🎵', '🎶'].map((n, k) => (
                            <span
                              key={k}
                              className="inline-block text-2xl drop-shadow anim-card-e1"
                              style={{ animationDuration: `${2 + k * 0.3 + i * 0.1}s` }}
                            >
                              {n}
                            </span>
                          ))}
                        </div>

                        <div className="mb-4 flex items-center justify-center gap-2">
                          <span className="text-2xl">🎧</span>
                          <h3 className="font-display text-xl font-bold text-slate-800 sm:text-2xl">
                            {item.songTitle}
                          </h3>
                          <span className="text-2xl">♪</span>
                        </div>

                        <div className="font-hand whitespace-pre-line text-center text-xl leading-relaxed text-rose-900/85 sm:text-2xl">
                          {item.lyric}
                        </div>

                        <div className="mt-6 flex justify-center gap-1.5 text-lg opacity-60">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <span
                              key={k}
                              className="inline-block anim-card-e8"
                              style={{ animationDelay: `${k * 0.18}s`, animationDuration: '1.6s' }}
                            >
                              ✦
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 sm:block">
                      <div
                        className="h-full w-full rounded-full border-4 border-white anim-ripple-pulse"
                        style={{
                          background:
                            i === 0
                              ? 'linear-gradient(135deg, #fda4af, #fb7185)'
                              : i === 1
                              ? 'linear-gradient(135deg, #c4b5fd, #a78bfa)'
                              : i === 2
                              ? 'linear-gradient(135deg, #fcd34d, #fda4af)'
                              : 'linear-gradient(135deg, #7dd3fc, #a78bfa)',
                          boxShadow: '0 0 18px rgba(244, 114, 182, 0.6)',
                          animationDuration: `${2 + i * 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        <ScrollReveal delay={0.3} className="mt-20 flex justify-center">
          <div
            className="inline-flex items-center gap-3 rounded-full bg-white/80 px-7 py-4 shadow-lg backdrop-blur-sm border-2 border-purple-200 anim-corner-a"
          >
            <span className="text-2xl">💿</span>
            <p className="font-hand text-2xl text-purple-700">
              and this playlist never ends...
            </p>
            <span className="text-2xl">♪</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
