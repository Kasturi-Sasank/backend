import { useEffect, useMemo, useState } from 'react'

export default function SurpriseLoading({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState(0)

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        emoji: ['✨', '💖', '🌸', '⭐', '🎀', '💫', '🌼', '🦋'][i % 8],
        left: `${(i * 7.3) % 100}%`,
        top: `${((i * 13.7) + 8) % 92}%`,
        dur: 2 + (i % 5) * 0.6,
        delay: i * 0.18,
        size: 0.9 + (i % 4) * 0.3,
      })),
    [],
  )

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        emoji: ['🌸', '💗', '💞', '🌷', '💕', '💘'][i % 6],
        left: 3 + (i * 8.7) % 94,
        dur: 3.4 + (i % 4) * 0.7,
        delay: i * 0.3,
        size: 0.9 + (i % 3) * 0.35,
      })),
    [],
  )

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return p + Math.max(2, Math.round(5 + Math.random() * 8))
      })
    }, 140)

    const dotsTimer = setInterval(() => {
      setDots((d) => (d + 1) % 4)
    }, 420)

    const doneTimer = setTimeout(() => {
      onDone?.()
    }, 2800)

    return () => {
      clearInterval(progressTimer)
      clearInterval(dotsTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  const dotsText = '.'.repeat(dots) + ' '.repeat(Math.max(0, 3 - dots))

  return (
    <div
      key="surprise-loading"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 20%, #ffd6e8 0%, transparent 45%), radial-gradient(circle at 80% 30%, #fff0b3 0%, transparent 40%), radial-gradient(circle at 50% 90%, #c8f7dc 0%, transparent 50%), linear-gradient(160deg, #ffb3d9 0%, #ffe8c8 40%, #fff5ba 100%)',
      }}
    >
      <style>{`
        @keyframes sl-heart-float {
          0%   { transform: translate(0, 32vh) scale(0.55) rotate(-18deg); opacity: 0; }
          12%  { opacity: 0.85; }
          50%  { transform: translate(-14px, -30vh) scale(1) rotate(20deg); }
          100% { transform: translate(12px, -118vh) scale(1.15) rotate(40deg); opacity: 0; }
        }
        @keyframes sl-sparkle-twinkle {
          0%, 100% { transform: scale(0.55) rotate(-12deg); opacity: 0.45; }
          50%      { transform: scale(1.35) rotate(18deg); opacity: 1; }
        }
        @keyframes sl-bounce-in {
          0%   { transform: translateY(50px) scale(0.72); opacity: 0; }
          60%  { transform: translateY(-16px) scale(1.07); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes sl-teddy-wiggle {
          0%, 100% { transform: rotate(-7deg) translateY(0); }
          50%      { transform: rotate(8deg) translateY(-9px); }
        }
        @keyframes sl-heart-pulse {
          0%, 100% { transform: scale(1) rotate(-3deg); }
          25% { transform: scale(1.12) rotate(3deg); }
          50% { transform: scale(1.06) rotate(-2deg); }
          75% { transform: scale(1.18) rotate(4deg); }
        }
        @keyframes sl-envelope-breathe {
          0%, 100% { transform: scale(1) translateY(0); box-shadow: 0 24px 50px -12px rgba(255, 105, 180, 0.28), inset 0 0 0 1px rgba(255,255,255,0.85); }
          50%      { transform: scale(1.015) translateY(-4px); box-shadow: 0 32px 64px -12px rgba(255, 105, 180, 0.38), inset 0 0 0 1px rgba(255,255,255,0.95); }
        }
        @keyframes sl-wax-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes sl-envelope-flap {
          0%, 100% { transform: perspective(900px) rotateX(0deg); transform-origin: top; }
          50%      { transform: perspective(900px) rotateX(-22deg); transform-origin: top; }
        }
        @keyframes sl-dash-march {
          to { background-position: 56px 0; }
        }
        @keyframes sl-text-rise {
          0% { transform: translateY(22px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes sl-sub-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sl-glow-pulse {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.9); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes sl-corner-tape {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 0.65; }
        }
        @keyframes sl-confetti-pop {
          0% { transform: scale(0.4) rotate(-30deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(20deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes sl-cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @keyframes sl-balloon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes sl-bunting-sway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
      `}</style>

      {/* Soft pastel halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'clamp(340px, 78vw, 640px)',
          height: 'clamp(340px, 78vw, 640px)',
          background:
            'radial-gradient(circle, rgba(255, 182, 193, 0.45) 0%, rgba(255, 240, 186, 0.28) 40%, rgba(255,255,255,0) 70%)',
          animation: 'sl-glow-pulse 2.6s ease-in-out infinite',
        }}
      />

      {/* Soft clouds */}
      {[
        { top: '12%', left: '5%', w: 120, delay: '0s' },
        { top: '18%', left: '70%', w: 100, delay: '1.2s' },
        { top: '8%', left: '40%', w: 90, delay: '0.6s' },
      ].map((c, i) => (
        <div
          key={`cloud-${i}`}
          className="pointer-events-none absolute rounded-full bg-white/50 blur-sm"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.w * 0.45,
            animation: `sl-cloud-drift ${8 + i * 2}s ease-in-out ${c.delay} infinite`,
          }}
        />
      ))}

      {/* top bunting */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex min-w-0 flex-wrap justify-center gap-0.5 pt-2 sm:gap-1 sm:pt-3 md:gap-2 md:pt-4">
        {['#ff9ebb', '#ffd166', '#c9b1ff', '#95e1d3', '#ffb3c6', '#ffe066', '#b8e0ff'].map(
          (color, i) => (
            <div
              key={`bunting-${i}`}
              className="h-6 w-5 rounded-b-md shadow-md sm:h-8 sm:w-7 md:h-10 md:w-9"
              style={{
                background: color,
                animation: `sl-bunting-sway ${2 + i * 0.15}s ease-in-out ${i * 0.08}s infinite`,
              }}
            />
          ),
        )}
      </div>

      {/* balloons */}
      {[
        { left: '6%', color: '#ff6b9d', delay: '0s' },
        { left: '88%', color: '#ffd93d', delay: '0.4s' },
        { left: '12%', color: '#a78bfa', delay: '0.8s' },
        { left: '82%', color: '#6ee7b7', delay: '0.2s' },
      ].map((b, i) => (
        <div
          key={`balloon-${i}`}
          className="pointer-events-none absolute bottom-[18%] z-10 flex flex-col items-center"
          style={{
            left: b.left,
            animation: `sl-balloon-float ${3.5 + i * 0.2}s ease-in-out ${b.delay} infinite`,
          }}
        >
          <div
            className="h-12 w-9 rounded-full shadow-md sm:h-14 sm:w-10 md:h-16 md:w-12"
            style={{ background: `radial-gradient(circle at 30% 30%, white, ${b.color})` }}
          />
          <div className="h-14 w-px bg-rose-300/60 sm:h-16 md:h-20" />
        </div>
      ))}

      {sparkles.map((s, i) => (
        <span
          key={`sp-${i}`}
          className="pointer-events-none absolute"
          style={{
            left: s.left,
            top: s.top,
            fontSize: `clamp(0.75rem, ${s.size * 1.2}vw, ${1 + s.size * 0.25}rem)`,
            animation: `sl-sparkle-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          {s.emoji}
        </span>
      ))}

      {petals.map((p, i) => (
        <span
          key={`pt-${i}`}
          className="pointer-events-none absolute bottom-0 left-0"
          style={{
            left: `${p.left}%`,
            fontSize: `clamp(0.85rem, ${p.size * 1.3}vw, ${1.25 + p.size * 0.3}rem)`,
            animation: `sl-heart-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            filter: 'drop-shadow(0 3px 6px rgba(255, 150, 180, 0.28))',
          }}
        >
          {p.emoji}
        </span>
      ))}

      <div
        className="relative z-20 mx-auto flex max-w-xl flex-col items-center px-6 text-center"
        style={{ animation: 'sl-bounce-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
      >
        <div className="relative mb-7">
          <div
            className="relative overflow-hidden rounded-[22px]"
            style={{
              width: 'clamp(240px, 62vw, 360px)',
              height: 'clamp(155px, 40vw, 230px)',
              background:
                'linear-gradient(160deg, #fff5f0 0%, #ffe4dc 35%, #ffd2cf 68%, #fec0c6 100%)',
              boxShadow:
                '0 24px 50px -12px rgba(255, 105, 180, 0.3), inset 0 0 0 1.5px rgba(255,255,255,0.9)',
              animation: 'sl-envelope-breathe 2.4s ease-in-out infinite',
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[55%] [clip-path:polygon(0_0,100%_0,50%_100%)]"
              style={{
                background:
                  'linear-gradient(180deg, #ffd6d1 0%, #ffb8be 55%, #f79aac 100%)',
                boxShadow: 'inset 0 -10px 18px rgba(236, 72, 153, 0.18)',
                animation: 'sl-envelope-flap 2s ease-in-out infinite',
              }}
            />

            <span
              className="pointer-events-none absolute -left-3 -top-3 block h-10 w-14 -rotate-[22deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #fecaca 0 6px, #fda4af 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(255, 150, 180, 0.25)',
                animation: 'sl-corner-tape 3s ease-in-out 0s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -right-3 -top-3 block h-10 w-14 rotate-[22deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(-45deg, #ddd6fe 0 6px, #c4b5fd 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(196, 181, 253, 0.28)',
                animation: 'sl-corner-tape 3.4s ease-in-out 0.6s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -left-3 -bottom-3 block h-10 w-14 rotate-[18deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #fde68a 0 6px, #fcd34d 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(252, 211, 77, 0.28)',
                animation: 'sl-corner-tape 3.2s ease-in-out 0.3s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -right-3 -bottom-3 block h-10 w-14 -rotate-[18deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(-45deg, #bbf7d0 0 6px, #86efac 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(134, 239, 172, 0.28)',
                animation: 'sl-corner-tape 3.6s ease-in-out 0.9s infinite',
              }}
            />

            <div
              className="absolute -bottom-6 left-1/2 w-[72%] -translate-x-1/2 rounded-2xl px-5 py-4"
              style={{
                background:
                  'linear-gradient(180deg, #fffaf3 0%, #fff0e1 100%)',
                boxShadow:
                  '0 12px 24px -8px rgba(255, 105, 180, 0.25), inset 0 0 0 1px rgba(255,255,255,0.9)',
              }}
            >
              <div className="font-hand leading-snug text-rose-500" style={{ fontSize: 'clamp(0.7rem, 2.2vw, 0.9rem)' }}>
                <span className="italic">"my vaishnavi, open when you're ready to feel loved... 💌"</span>
              </div>
            </div>

            <div
              className="pointer-events-none absolute left-1/2"
              style={{
                top: '38%',
                width: 'clamp(56px, 16vw, 88px)',
                height: 'clamp(56px, 16vw, 88px)',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle at 35% 30%, #fb7185 0%, #e11d48 45%, #be123c 85%)',
                borderRadius: '50%',
                boxShadow:
                  '0 8px 16px rgba(244, 63, 94, 0.28), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -6px 10px rgba(190, 18, 60, 0.25)',
                animation: 'sl-wax-pulse 1.7s ease-in-out infinite',
                border: '2px solid rgba(255, 255, 255, 0.7)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center font-black text-white" style={{ fontSize: 'clamp(1.3rem, 4vw, 2.1rem)', textShadow: '0 2px 3px rgba(159,18,57,0.35)' }}>
                ♥
              </div>
            </div>
          </div>

          <span
            className="pointer-events-none absolute -left-4 z-20 origin-bottom"
            style={{
              top: 'clamp(-40px, -9vw, -24px)',
              fontSize: 'clamp(3rem, 11vw, 4.5rem)',
              animation: 'sl-teddy-wiggle 1.4s ease-in-out infinite',
              filter: 'drop-shadow(0 8px 14px rgba(255, 150, 180, 0.35))',
            }}
          >
            🧸
          </span>
          <span
            className="pointer-events-none absolute -right-4 z-20"
            style={{
              top: 'clamp(-36px, -8vw, -22px)',
              fontSize: 'clamp(2.6rem, 10vw, 4rem)',
              animation: 'sl-heart-pulse 1.25s ease-in-out infinite',
              filter: 'drop-shadow(0 8px 14px rgba(251, 113, 133, 0.35))',
            }}
          >
            💗
          </span>
          <span
            className="pointer-events-none absolute -top-3 left-1/2 z-20"
            style={{
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
              animation: 'sl-confetti-pop 1.2s ease-out 0.5s both, sl-sub-bounce 1.5s ease-in-out 1.5s infinite',
            }}
          >
            ✨
          </span>
        </div>

        <p
          className="mb-2 font-hand tracking-wide text-rose-400"
          style={{
            fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
            animation: 'sl-text-rise 0.7s ease-out 0.55s both',
            letterSpacing: '0.08em',
          }}
        >
          ~ sealed with a kiss, for you ~
        </p>

        <div
          className="relative mb-1 flex items-center justify-center gap-x-2"
          style={{ animation: 'sl-text-rise 0.8s ease-out 0.7s both' }}
        >
          <span
            className="gradient-heading font-display font-extrabold tracking-tight"
            style={{
              fontSize: 'clamp(2.1rem, 9.5vw, 4.8rem)',
              lineHeight: 1,
            }}
          >
            a little surprise
          </span>
          <span
            className="shrink-0"
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 3rem)',
              animation: 'sl-heart-pulse 1.3s ease-in-out 0.9s infinite',
            }}
          >
            💘
          </span>
        </div>

        <p
          className="mb-5 font-hand text-rose-500"
          style={{
            fontSize: 'clamp(1.7rem, 7.5vw, 3.6rem)',
            lineHeight: 1,
            animation: 'sl-text-rise 0.8s ease-out 0.9s both',
            letterSpacing: '0.01em',
          }}
        >
          for my Vaishnavi 💞
        </p>

        <p
          className="mb-7 font-hand text-rose-400"
          style={{
            fontSize: 'clamp(0.9rem, 3vw, 1.18rem)',
            animation: 'sl-text-rise 0.7s ease-out 1.1s both, sl-sub-bounce 1.5s ease-in-out 1.4s infinite',
          }}
        >
          unfolding our memories{dotsText}
        </p>

        <div
          className="relative w-full max-w-md"
          style={{ animation: 'sl-text-rise 0.7s ease-out 1.25s both' }}
        >
          <div
            className="relative h-4 overflow-hidden rounded-full border-2 border-white/80"
            style={{
              background:
                'linear-gradient(180deg, #fff1f2 0%, #ffe4e6 100%)',
              boxShadow:
                '0 10px 24px -8px rgba(255, 105, 180, 0.28), inset 0 2px 4px rgba(255,255,255,0.9)',
            }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  'repeating-linear-gradient(135deg, #fb7185 0 14px, #fda4af 14px 28px, #fbbf24 28px 42px, #c4b5fd 42px 56px)',
                backgroundSize: '224px 100%',
                animation: 'sl-dash-march 0.9s linear infinite',
                boxShadow:
                  'inset 0 0 0 2px rgba(255,255,255,0.45)',
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.15rem)' }}>💌</span>
              <span
                className="font-hand font-semibold text-rose-500"
                style={{
                  fontSize: 'clamp(0.8rem, 2.6vw, 1rem)',
                  letterSpacing: '0.03em',
                }}
              >
                with all my love
              </span>
            </div>
            <span
              className="font-display font-black text-rose-500"
              style={{
                fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
                letterSpacing: '0.05em',
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {['🌸', '🧸', '💖', '🌹', '💌'].map((e, i) => (
            <span
              key={`deco-${i}`}
              className="inline-block"
              style={{
                fontSize: 'clamp(0.9rem, 3vw, 1.35rem)',
                animation: `sl-sub-bounce 1.25s ease-in-out ${0.1 * i + 0.4}s infinite`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* grass floor */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-20 sm:h-24 md:h-28"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(144, 198, 149, 0.35) 40%, #7bc47f 100%)',
        }}
      />
      <div className="pointer-events-none absolute bottom-3 left-[8%] z-10 text-xl sm:bottom-4 sm:text-2xl md:bottom-6 md:text-3xl">🌷</div>
      <div className="pointer-events-none absolute bottom-3 right-[10%] z-10 text-xl sm:bottom-4 sm:text-2xl md:bottom-6 md:text-3xl">🌼</div>

      <div className="pointer-events-none absolute bottom-16 left-0 right-0 z-20 flex justify-center px-6 sm:bottom-20">
        <p
          className="font-hand text-rose-500"
          style={{
            fontSize: 'clamp(0.85rem, 2.8vw, 1.05rem)',
            letterSpacing: '0.02em',
            animation: 'sl-text-rise 0.8s ease-out 1.5s both',
          }}
        >
          ~ nee kosam edaina chesthane, naa manasantha 🤍💗
        </p>
      </div>
    </div>
  )
}
