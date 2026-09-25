import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import FloatingDecor from '../components/FloatingDecor'
import { REASONS_20 } from '../constants/content'

const PALETTE = [
  {
    card: 'linear-gradient(160deg, #ffe4e6 0%, #fecdd3 55%, #fda4af 100%)',
    border: 'border-rose-200',
    ring: 'ring-rose-200/70',
    text: 'text-rose-800',
    body: 'text-rose-900/85',
    back: 'linear-gradient(160deg, #fff1f2 0%, #ffe4e6 55%, #fecdd3 100%)',
    shadow: 'rgba(244, 63, 94, 0.22)',
  },
  {
    card: 'linear-gradient(160deg, #fef3c7 0%, #fde68a 55%, #fcd34d 100%)',
    border: 'border-amber-200',
    ring: 'ring-amber-200/70',
    text: 'text-amber-800',
    body: 'text-amber-900/85',
    back: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 55%, #fde68a 100%)',
    shadow: 'rgba(245, 158, 11, 0.22)',
  },
  {
    card: 'linear-gradient(160deg, #ddd6fe 0%, #c4b5fd 55%, #a78bfa 100%)',
    border: 'border-violet-200',
    ring: 'ring-violet-200/70',
    text: 'text-violet-800',
    body: 'text-violet-900/85',
    back: 'linear-gradient(160deg, #f5f3ff 0%, #ede9fe 55%, #ddd6fe 100%)',
    shadow: 'rgba(139, 92, 246, 0.22)',
  },
  {
    card: 'linear-gradient(160deg, #bae6fd 0%, #7dd3fc 55%, #38bdf8 100%)',
    border: 'border-sky-200',
    ring: 'ring-sky-200/70',
    text: 'text-sky-800',
    body: 'text-sky-900/85',
    back: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 55%, #bae6fd 100%)',
    shadow: 'rgba(14, 165, 233, 0.22)',
  },
  {
    card: 'linear-gradient(160deg, #d9f99d 0%, #bef264 55%, #a3e635 100%)',
    border: 'border-lime-200',
    ring: 'ring-lime-200/70',
    text: 'text-emerald-800',
    body: 'text-emerald-900/85',
    back: 'linear-gradient(160deg, #f7fee7 0%, #ecfccb 55%, #d9f99d 100%)',
    shadow: 'rgba(132, 204, 22, 0.22)',
  },
  {
    card: 'linear-gradient(160deg, #fce7f3 0%, #fbcfe8 55%, #f9a8d4 100%)',
    border: 'border-pink-200',
    ring: 'ring-pink-200/70',
    text: 'text-pink-800',
    body: 'text-pink-900/85',
    back: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 55%, #fbcfe8 100%)',
    shadow: 'rgba(236, 72, 153, 0.22)',
  },
]

const RANDOM_ROT = [
  '-2.2deg', '1.6deg', '-1.2deg', '2.4deg', '-3deg', '1.1deg',
  '2.8deg', '-1.8deg', '0.8deg', '-2.6deg', '1.9deg', '-0.6deg',
  '2.1deg', '-1.4deg', '1.5deg', '-2.8deg', '0.4deg', '2.7deg',
  '-1deg', '1.3deg',
]

function ReasonCard({ reason, i }) {
  const c = PALETTE[i % PALETTE.length]
  const rot = RANDOM_ROT[i % RANDOM_ROT.length]
  const is = String(i + 1).padStart(2, '0')
  const inDelay = (i % 5) * 0.05 + Math.floor(i / 5) * 0.03
  const mainEDelay = (i % 5) * 0.2
  const topEDelay = (i % 4) * 0.15
  const glowDelay = (i % 4) * 0.25
  const hoverDelay = (i % 3) * 0.1
  const heartADelay = (i % 3) * 0.1
  const heartBDelay = (i % 3) * 0.1 + 0.2

  return (
    <div
      className="group relative aspect-square w-full"
      style={{
        perspective: '900px',
        opacity: 0,
        animation: `card-in 0.55s ease-out ${inDelay}s forwards`,
      }}
    >
      <div
        className="flipper relative h-full w-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.6, 0.02, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            className={`relative h-full w-full rounded-3xl border-2 ${c.border} shadow-xl ring-1 ${c.ring}`}
            style={{
              background: c.card,
              rotate: rot,
              boxShadow: `0 14px 32px -12px ${c.shadow}`,
            }}
          >
            <div className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-[11px] font-black text-slate-500 shadow-inner backdrop-blur-sm border border-white/60">
              {is}
            </div>
            <div
              className={`absolute right-4 top-4 text-2xl sm:text-3xl ${i % 2 ? 'anim-card-e2' : 'anim-card-e1'}`}
              style={{ animationDelay: `${topEDelay}s` }}
            >
              {reason.emoji}
            </div>

            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <span
                className={`pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full anim-card-e4`}
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)',
                  animationDelay: `${glowDelay}s`,
                }}
              />
              <div
                className={`mb-3 text-4xl sm:text-5xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.08)] anim-card-e3`}
                style={{ animationDelay: `${mainEDelay}s` }}
              >
                {reason.emoji}
              </div>
              <h3
                className={`font-display text-lg font-extrabold leading-snug sm:text-xl ${c.text}`}
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.55)' }}
              >
                {reason.title}
              </h3>
            </div>

            <div
              className={`pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-500 shadow-sm backdrop-blur-sm border border-white/50 anim-card-e5`}
              style={{ animationDelay: `${hoverDelay}s` }}
            >
              <span className="text-[11px]">✨</span>
              hover me
              <span className="text-[11px]">✨</span>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className={`relative h-full w-full rounded-3xl border-2 ${c.border} shadow-2xl ring-2 ${c.ring}`}
            style={{
              background: c.back,
              boxShadow: `0 26px 50px -16px ${c.shadow}, inset 0 0 0 6px rgba(255,255,255,0.55)`,
            }}
          >
            <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-center gap-0.5 text-[10px] opacity-50 tracking-[0.25em] font-black">
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center gap-0.5 text-[10px] opacity-50 tracking-[0.25em] font-black">
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
            </div>

            <div className="flex h-full flex-col items-center justify-start px-4 pb-5 pt-7 text-center">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="text-xl anim-card-e6"
                  style={{ animationDelay: `${heartADelay}s` }}
                >
                  {reason.emoji}
                </span>
                <span className="text-[10px] font-black tracking-widest text-slate-400">
                  REASON · {is}
                </span>
                <span
                  className="text-xl anim-card-e7"
                  style={{ animationDelay: `${heartBDelay}s` }}
                >
                  {reason.emoji}
                </span>
              </div>
              <h4
                className={`font-display mb-2 text-[15px] font-extrabold sm:text-base ${c.text}`}
              >
                why I love {reason.title}
              </h4>
              <div
                className={`font-hand whitespace-pre-line text-[14px] leading-snug sm:text-[15px] ${c.body}`}
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.45)' }}
              >
                {reason.text}
              </div>
              <div className="mt-auto flex items-center gap-0.5 pt-2 text-sm opacity-65">
                <span
                  className="text-rose-400 anim-card-e8"
                  style={{ animationDelay: `${heartADelay}s` }}
                >
                  ♥
                </span>
                <span className={`font-hand text-[13px] ${c.text} opacity-75`}>
                  forever mine
                </span>
                <span
                  className="text-rose-400 anim-card-e8"
                  style={{ animationDelay: `${heartBDelay}s` }}
                >
                  ♥
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .group:hover .flipper {
          transform: rotateY(180deg) scale(1.06);
          transition: transform 0.75s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 20;
        }
      `}</style>
    </div>
  )
}

export default function TwentyReasons() {
  return (
    <section
      className="relative px-4 py-20 sm:px-8 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 15% 15%, #fce7f3 0%, transparent 45%), radial-gradient(circle at 85% 10%, #ddd6fe 0%, transparent 50%), radial-gradient(circle at 80% 90%, #bae6fd 0%, transparent 45%), linear-gradient(180deg, #fff1f2 0%, #fdf4ff 45%, #f0f9ff 100%)',
      }}
    >
      <FloatingDecor emojis={['💗', '🌸', '💫', '💕', '✨', '💖', '🎀', '🌷', '🦋', '💘', '💌', '🌼', '🌟', '🍓', '💝', '🌈']} />

      <div className="pointer-events-none absolute -left-6 top-20 z-0 text-6xl sm:text-7xl opacity-40">
        <span className="inline-block anim-corner-a">💕</span>
      </div>
      <div className="pointer-events-none absolute -right-4 top-28 z-0 text-5xl sm:text-6xl opacity-40">
        <span className="inline-block anim-corner-b">💗</span>
      </div>
      <div className="pointer-events-none absolute bottom-24 left-10 z-0 text-5xl sm:text-6xl opacity-35">
        <span className="inline-block anim-corner-c">💌</span>
      </div>
      <div className="pointer-events-none absolute bottom-32 right-14 z-0 text-5xl sm:text-6xl opacity-35">
        <span className="inline-block anim-corner-d">💘</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.5 — 20 reasons</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            20 reasons I love u
          </h2>
          <p
            className="font-hand mt-3 text-xl text-pink-600/85 sm:text-2xl anim-card-e5"
            style={{ animationDelay: '0.1s' }}
          >
            ✨ hover (or tap) each card to read ✨
          </p>
          <p className="font-hand mt-2 text-lg text-violet-600/75 sm:text-xl">
            one for every year of your lovely life 💗
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5">
          {REASONS_20.map((r, i) => (
            <ReasonCard key={r.id} reason={r} i={i} />
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-20 flex justify-center">
          <div
            className="relative inline-flex items-center gap-3 rounded-full px-8 py-4 shadow-xl border-2 border-rose-200 anim-corner-a"
            style={{
              background:
                'linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #f5f3ff 100%)',
            }}
          >
            <span className="absolute inset-0 rounded-full anim-ripple-pulse" />
            <span className="text-3xl drop-shadow">💖</span>
            <p className="font-hand text-2xl text-rose-600 sm:text-3xl">
              and the list is still growing, cutie
            </p>
            <span className="text-3xl drop-shadow">💖</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
