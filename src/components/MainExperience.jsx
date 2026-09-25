import { motion } from 'framer-motion'
import Hero from '../sections/Hero'
import BentoStats from '../sections/BentoStats'
import PolaroidGallery from '../sections/PolaroidGallery'
import CakeSection from '../sections/CakeSection'
import LyricsTimeline from '../sections/LyricsTimeline'
import TwentyReasons from '../sections/TwentyReasons'
import LetterSection from '../sections/LetterSection'
import CornerTeddy from './CornerTeddy'
import { HER_NAME, BIRTHDAY_DISPLAY, RELATIONSHIP_START } from '../constants/content'
import FloatingDecor from '../components/FloatingDecor'
import ScrollReveal from '../components/ScrollReveal'

function ForeverFooter() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  const start = RELATIONSHIP_START
  const now = new Date()
  let y = now.getFullYear() - start.getFullYear()
  let m = now.getMonth() - start.getMonth()
  let d = now.getDate() - start.getDate()
  if (d < 0) { m -= 1; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
  if (m < 0) { y -= 1; m += 12 }
  const totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24))

  const month = start.toLocaleString('default', { month: 'long' })
  const day = start.getDate()
  const year = start.getFullYear()
  const herInitial = HER_NAME.charAt(0).toUpperCase()

  return (
    <footer className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 10%, #fce7f3 0%, transparent 55%), radial-gradient(circle at 80% 0%, #ddd6fe 0%, transparent 55%), radial-gradient(circle at 50% 100%, #bae6fd 0%, transparent 55%), linear-gradient(180deg, #fff1f2 0%, #fdf4ff 45%, #f0f9ff 100%)',
        }}
      />

      <FloatingDecor emojis={['✨', '💖', '🌸', '💕', '🌷', '💗', '🦋', '🌼', '💫', '💝', '⭐', '🎀', '🌺', '💞', '🧸', '💌']} />

      <div className="pointer-events-none absolute left-6 top-16 text-5xl sm:text-6xl opacity-45 anim-corner-a">
        🌸
      </div>
      <div className="pointer-events-none absolute right-8 top-10 text-5xl sm:text-6xl opacity-45 anim-corner-b">
        💘
      </div>
      <div className="pointer-events-none absolute bottom-32 left-10 text-4xl sm:text-5xl opacity-35 anim-corner-c">
        💌
      </div>
      <div className="pointer-events-none absolute bottom-28 right-10 text-4xl sm:text-5xl opacity-35 anim-corner-d">
        🦋
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <ScrollReveal>
          <p
            className="font-hand text-xl text-violet-500/80 sm:text-2xl"
            style={{ letterSpacing: '0.45em' }}
          >
            ✧ · · · ♡ · · · ✧
          </p>

          <h2 className="font-display mt-6 text-5xl font-extrabold leading-[1.08] sm:text-6xl md:text-7xl">
            <span className="block text-rose-700">Thank u for being</span>
            <span
              className="mt-3 block gradient-heading"
              style={{
                fontSize: 'clamp(3rem, 9vw, 5.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.02,
              }}
            >
              my favorite person
            </span>
            <span className="mt-3 block text-purple-700">in the whole universe.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-rose-300 to-transparent sm:w-72" />
          <p className="font-display mt-8 text-2xl font-black tracking-[0.32em] text-rose-600 sm:text-3xl">
            HAPPY BIRTHDAY BANGARAM
          </p>
          <p className="font-hand mt-3 text-xl text-violet-600/80 sm:text-2xl">
            ✨ {BIRTHDAY_DISPLAY} ✨
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-hand text-lg text-pink-500/95 sm:text-xl">
            <span className="inline-flex items-center gap-1">
              <span className="text-xl anim-card-e8">💗</span>
              ours since
            </span>
            <span className="rounded-full bg-white/70 px-4 py-1 font-bold tracking-wide shadow-sm ring-1 ring-pink-200">
              {month} {day} · {year}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="text-xl anim-card-e8" style={{ animationDelay: '0.2s' }}>💗</span>
            </span>
          </div>

          <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border-2 border-rose-200 bg-white/70 px-5 py-2.5 text-sm font-bold tracking-wide text-rose-600 shadow-md backdrop-blur sm:gap-x-5 sm:text-base">
            <span className="flex items-center gap-1.5">
              <span>💖</span>
              {y} yr
            </span>
            <span className="text-rose-300">·</span>
            <span className="flex items-center gap-1.5">
              <span>🌷</span>
              {m} mo
            </span>
            <span className="text-rose-300">·</span>
            <span className="flex items-center gap-1.5">
              <span>🌼</span>
              {d} day{m === 1 && d === 1 ? '' : 's'}
            </span>
            <span className="text-rose-300">·</span>
            <span className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              <span>💞</span>
              {totalDays.toLocaleString()} little days of us
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14 lg:gap-16">
            <figure
              className="relative mx-auto w-full max-w-[260px] bg-white p-3 pb-10 shadow-2xl ring-2 ring-pink-200"
              style={{
                rotate: '-3deg',
                borderRadius: '6px 6px 4px 4px',
              }}
            >
              <div
                className="absolute -top-2 left-1/2 h-7 w-20 -translate-x-1/2 opacity-95"
                style={{
                  background: 'repeating-linear-gradient(45deg, #ffe4e6 0 5px, #fecdd3 5px 10px)',
                  transform: 'translateX(-50%) rotate(-4deg)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                }}
              />
              <span className="absolute -top-3 right-3 text-2xl anim-card-e1">🎀</span>
              <span className="absolute -top-3 left-3 text-xl anim-card-e2">✨</span>

              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100 ring-1 ring-rose-100">
                <img
                  src="/vaish-1.jpg?v=footer"
                  alt="my favorite"
                  className="h-full w-full object-cover"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.style.background =
                      'radial-gradient(circle at 30% 30%, #fff1f2 0%, #fce7f3 45%, #ddd6fe 100%)'
                    e.currentTarget.parentElement.innerHTML += `
                      <div class="h-full w-full flex flex-col items-center justify-center gap-3">
                        <div class="text-7xl anim-card-e3">💗</div>
                        <div class="font-hand text-2xl text-rose-600">always you</div>
                        <div class="text-5xl anim-card-e1">🌷</div>
                      </div>`
                  }}
                />
              </div>
              <figcaption className="font-hand absolute right-3 bottom-3 left-3 text-center text-2xl text-rose-700 leading-tight">
                my forever favorite 💖
              </figcaption>
            </figure>

            <div className="text-center md:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 text-3xl md:justify-start">
                <span className="anim-card-e6">💌</span>
                <span className="anim-card-e5">to my one and only</span>
                <span className="anim-card-e7">💌</span>
              </div>

              <p className="font-hand text-2xl leading-relaxed text-rose-700/95 sm:text-3xl md:text-[2rem] md:leading-[1.35]">
                I'd choose you, in every life,
                <br className="hidden sm:block" />
                in every moment,
                <br className="hidden sm:block" />
                I love you in every universe,
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent font-black">
                  {' '}always 💞
                </span>
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-xl"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, #fda4af 0%, #ec4899 55%, #7c3aed 100%)',
                    boxShadow:
                      '0 8px 18px rgba(236, 72, 153, 0.35), inset 0 1px 3px rgba(255,255,255,0.7)',
                  }}
                >
                  <span className="font-display text-xl font-black text-white drop-shadow-sm tracking-tight">
                    {herInitial}
                    <span className="mx-0.5 text-base">❤</span>
                    <span className="text-base">♡</span>
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-display text-sm font-bold tracking-wider text-rose-700">
                    sealed with love · forever yours
                  </p>
                  <p className="font-hand text-lg text-violet-600/80">
                    from me, to you, always. 🌸
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.36}>
          <div className="mt-20 flex flex-col items-center gap-5">
            <p className="font-hand text-xl text-pink-600/90 anim-card-e5 sm:text-2xl">
              tap the ♾️ to relive it all again, my love ✨
            </p>

            <div className="relative">
              <span className="pointer-events-none absolute -left-20 -top-10 text-3xl anim-card-e6">
                🦋
              </span>
              <span className="pointer-events-none absolute -right-20 -top-14 text-3xl anim-card-e7">
                🦋
              </span>
              <span className="pointer-events-none absolute -left-12 -bottom-10 text-2xl anim-card-e1">
                🌺
              </span>
              <span className="pointer-events-none absolute -right-10 -bottom-12 text-2xl anim-card-e2">
                🌸
              </span>
              <span className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 text-2xl anim-card-e8">
                💗
              </span>
              <span className="pointer-events-none absolute left-1/2 -bottom-10 -translate-x-1/2 text-2xl anim-card-e8" style={{ animationDelay: '0.3s' }}>
                💞
              </span>

              <motion.button
                onClick={scrollToTop}
                aria-label="back to top"
                className="group relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-rose-200 bg-white/80 shadow-2xl backdrop-blur-md sm:h-44 sm:w-44"
                style={{
                  boxShadow:
                    '0 25px 60px -10px rgba(244, 114, 182, 0.45), 0 0 0 10px rgba(253, 224, 71, 0.25) inset',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  boxShadow: [
                    '0 25px 60px -10px rgba(244, 114, 182, 0.45), 0 0 0 10px rgba(253, 224, 71, 0.25) inset',
                    '0 32px 80px -10px rgba(168, 85, 247, 0.6), 0 0 0 12px rgba(244, 114, 182, 0.35) inset',
                    '0 25px 60px -10px rgba(244, 114, 182, 0.45), 0 0 0 10px rgba(253, 224, 71, 0.25) inset',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              >
                {[0, 1, 2].map((k) => (
                  <span
                    key={k}
                    className="pointer-events-none absolute inset-0 rounded-full anim-ripple-pulse"
                    style={{
                      border: '2px solid rgba(244, 114, 182, 0.55)',
                      animationDelay: `${k * 0.4}s`,
                      animationDuration: '1.8s',
                    }}
                  />
                ))}

                <div className="relative flex flex-col items-center justify-center">
                  <motion.span
                    className="text-6xl drop-shadow-[0_4px_10px_rgba(244,114,182,0.4)] sm:text-7xl"
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  >
                    ♾️
                  </motion.span>
                  <span className="absolute -top-1 -right-0 text-3xl anim-card-e8" style={{ animationDuration: '1.1s' }}>
                    💗
                  </span>
                  <span className="mt-1 font-hand text-sm font-black tracking-[0.28em] text-rose-500 sm:text-base">
                    FOREVER · UP
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.48}>
          <div className="mx-auto mt-24 max-w-2xl">
            <div
              className="relative rounded-[28px] border-2 border-pink-200 bg-white/80 px-8 py-7 shadow-xl backdrop-blur-md"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,241,242,0.9) 0%, rgba(252,231,243,0.9) 50%, rgba(243,232,255,0.9) 100%)',
              }}
            >
              <span className="pointer-events-none absolute -top-5 left-8 font-display text-xl font-black text-pink-500 drop-shadow-[0_2px_0_rgba(255,255,255,0.9)]">
                P.S.
              </span>
              <span className="pointer-events-none absolute -top-4 left-20 text-2xl anim-card-e1">💌</span>
              <p className="font-hand text-[1.4rem] leading-[1.45] text-rose-700/95 sm:text-[1.75rem] sm:leading-[1.55]">
                If you ever forget how I loved you, come back here. scroll slow. tap the polaroids. play our songs.
                <br className="hidden sm:block" />
                everything on this page..... Every pixel, Every song, Every word... It's all just{' '}
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent font-black">
                  proof
                </span>{' '}
                that i love u more than words, more than time, more than anything in the whole world. 💗
              </p>
              <p className="mt-3 font-hand text-right text-2xl text-fuchsia-600 sm:text-3xl">
                — me, forever & always 🫶
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-20 flex flex-col items-center gap-2">
            <p className="font-hand text-3xl text-rose-500 sm:text-4xl">
              made with every little piece of my heart 💘
            </p>
            <p className="font-hand text-xl text-violet-500/80 sm:text-2xl">
              — just for u, Kanna ♡
            </p>
            <div className="mt-4 flex items-center gap-3 text-2xl opacity-85">
              <span className="anim-card-e6">🌷</span>
              <span className="font-display text-sm font-bold tracking-[0.3em] text-pink-500">
                ~ END ~
              </span>
              <span className="anim-card-e7">🌷</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent sm:w-56" />

        <ScrollReveal delay={0.72}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-hand text-base text-pink-500/85 sm:text-lg">
            <span>☕ + 💕</span>
            <span className="text-rose-300">·</span>
            <span>yours, always</span>
            <span className="text-rose-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="anim-card-e8 inline-block" style={{ animationDuration: '1s' }}>🫶</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default function MainExperience() {
  return (
    <motion.main
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <CornerTeddy position="left" imageSrc="/teddy-2.gif" alt="Mocha bear left" />
      <CornerTeddy position="right" imageSrc="/teddy-3.jpg" alt="Mocha bear right" />
      <Hero />
      <BentoStats />
      <PolaroidGallery />
      <CakeSection />
      <LyricsTimeline />
      <TwentyReasons />
      <LetterSection />
      <ForeverFooter />
    </motion.main>
  )
}
