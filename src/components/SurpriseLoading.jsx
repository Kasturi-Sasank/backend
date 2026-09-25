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
        drift: (i % 5) * 14 - 28,
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
          'radial-gradient(ellipse at 30% 20%, #5b1e4b 0%, #471539 20%, #340d2b 45%, #2a0a22 70%, #1f0718 100%)',
      }}
    >
      <style>{`
        @keyframes sl-heart-float {
          0%   { transform: translate(0, 32vh) scale(0.55) rotate(-18deg); opacity: 0; }
          12%  { opacity: 0.9; }
          50%  { transform: translate(-14px, -30vh) scale(1) rotate(20deg); }
          100% { transform: translate(12px, -118vh) scale(1.15) rotate(40deg); opacity: 0; }
        }
        @keyframes sl-sparkle-twinkle {
          0%, 100% { transform: scale(0.55) rotate(-12deg); opacity: 0.4; filter: drop-shadow(0 0 4px rgba(255,200,220,0.4)); }
          50%      { transform: scale(1.5) rotate(18deg); opacity: 1; filter: drop-shadow(0 0 12px rgba(255,180,210,0.85)); }
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
          0%, 100% { transform: scale(1) translateY(0); box-shadow: 0 25px 60px -10px rgba(255, 120, 160, 0.35), 0 0 40px 6px rgba(244, 114, 182, 0.18), inset 0 0 0 1px rgba(255,255,255,0.1); }
          50%      { transform: scale(1.015) translateY(-4px); box-shadow: 0 35px 80px -12px rgba(255, 120, 160, 0.5), 0 0 70px 10px rgba(244, 114, 182, 0.28), inset 0 0 0 1px rgba(255,255,255,0.18); }
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
      `}</style>

      {/* Soft pink halo glow behind center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'clamp(340px, 78vw, 640px)',
          height: 'clamp(340px, 78vw, 640px)',
          background:
            'radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(186, 87, 184, 0.18) 35%, rgba(0,0,0,0) 70%)',
          animation: 'sl-glow-pulse 2.6s ease-in-out infinite',
        }}
      />

      {/* Tiny twinkle sparkles around screen */}
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

      {/* Petals falling up (romantic sakura/heart drift) */}
      {petals.map((p, i) => (
        <span
          key={`pt-${i}`}
          className="pointer-events-none absolute bottom-0 left-0"
          style={{
            left: `${p.left}%`,
            fontSize: `clamp(0.85rem, ${p.size * 1.3}vw, ${1.25 + p.size * 0.3}rem)`,
            animation: `sl-heart-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            filter: 'drop-shadow(0 3px 8px rgba(255, 140, 180, 0.55))',
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Main card cluster */}
      <div
        className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center"
        style={{ animation: 'sl-bounce-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
      >
        {/* Love letter envelope with wax seal + teddy peeking over + heart */}
        <div className="relative mb-7">
          <div
            className="relative overflow-hidden rounded-[22px]"
            style={{
              width: 'clamp(240px, 62vw, 360px)',
              height: 'clamp(155px, 40vw, 230px)',
              background:
                'linear-gradient(160deg, #fff5f0 0%, #ffe4dc 35%, #ffd2cf 68%, #fec0c6 100%)',
              boxShadow:
                '0 32px 70px -14px rgba(236, 72, 153, 0.55), 0 0 60px 10px rgba(244, 114, 182, 0.35), inset 0 0 0 1.5px rgba(255,255,255,0.65)',
              animation: 'sl-envelope-breathe 2.4s ease-in-out infinite',
            }}
          >
            {/* V flap top of envelope */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[55%] [clip-path:polygon(0_0,100%_0,50%_100%)]"
              style={{
                background:
                  'linear-gradient(180deg, #ffd6d1 0%, #ffb8be 55%, #f79aac 100%)',
                boxShadow: 'inset 0 -10px 18px rgba(236, 72, 153, 0.25)',
                animation: 'sl-envelope-flap 2s ease-in-out infinite',
              }}
            />

            {/* Washi tape corners */}
            <span
              className="pointer-events-none absolute -left-3 -top-3 block h-10 w-14 -rotate-[22deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #fecaca 0 6px, #fda4af 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                animation: 'sl-corner-tape 3s ease-in-out 0s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -right-3 -top-3 block h-10 w-14 rotate-[22deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(-45deg, #ddd6fe 0 6px, #c4b5fd 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                animation: 'sl-corner-tape 3.4s ease-in-out 0.6s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -left-3 -bottom-3 block h-10 w-14 rotate-[18deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(45deg, #fde68a 0 6px, #fcd34d 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                animation: 'sl-corner-tape 3.2s ease-in-out 0.3s infinite',
              }}
            />
            <span
              className="pointer-events-none absolute -right-3 -bottom-3 block h-10 w-14 -rotate-[18deg] opacity-90"
              style={{
                background:
                  'repeating-linear-gradient(-45deg, #bbf7d0 0 6px, #86efac 6px 12px)',
                borderRadius: '3px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                animation: 'sl-corner-tape 3.6s ease-in-out 0.9s infinite',
              }}
            />

            {/* Letter peeking out bottom */}
            <div
              className="absolute -bottom-6 left-1/2 w-[72%] -translate-x-1/2 rounded-2xl px-5 py-4"
              style={{
                background:
                  'linear-gradient(180deg, #fffaf3 0%, #fff0e1 100%)',
                boxShadow:
                  '0 16px 30px -8px rgba(196, 30, 90, 0.35), inset 0 0 0 1px rgba(255,255,255,0.8)',
              }}
            >
              <div className="font-hand text-rose-800/80 leading-snug" style={{ fontSize: 'clamp(0.7rem, 2.2vw, 0.9rem)' }}>
                <span className="italic">"my vaishnavi, open when you're ready to feel loved... 💌"</span>
              </div>
            </div>

            {/* Wax seal dead center on flap */}
            <div
              className="pointer-events-none absolute left-1/2"
              style={{
                top: '38%',
                width: 'clamp(56px, 16vw, 88px)',
                height: 'clamp(56px, 16vw, 88px)',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle at 35% 30%, #fb7185 0%, #e11d48 45%, #9f1239 85%)',
                borderRadius: '50%',
                boxShadow:
                  '0 8px 18px rgba(159, 18, 57, 0.55), inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(127, 29, 29, 0.4)',
                animation: 'sl-wax-pulse 1.7s ease-in-out infinite',
                border: '2px solid rgba(255, 220, 230, 0.6)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-black" style={{ fontSize: 'clamp(1.3rem, 4vw, 2.1rem)', textShadow: '0 2px 3px rgba(127,29,29,0.6)' }}>
                ♥
              </div>
            </div>
          </div>

          {/* Teddy peeking from BEHIND top-left of envelope + Heart over top-right */}
          <span
            className="pointer-events-none absolute -left-4 z-20 origin-bottom"
            style={{
              top: 'clamp(-40px, -9vw, -24px)',
              fontSize: 'clamp(3rem, 11vw, 4.5rem)',
              animation: 'sl-teddy-wiggle 1.4s ease-in-out infinite',
              filter: 'drop-shadow(0 10px 20px rgba(236, 72, 153, 0.55))',
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
              filter: 'drop-shadow(0 10px 22px rgba(244, 63, 94, 0.7))',
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
              filter: 'drop-shadow(0 3px 6px rgba(255, 200, 220, 0.7))',
            }}
          >
            ✨
          </span>
        </div>

        {/* Title line 1 - solid cream, clearly visible on dark bg */}
        <p
          className="mb-2 font-hand tracking-wide text-rose-200"
          style={{
            fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
            textShadow:
              '0 0 14px rgba(255, 180, 210, 0.7), 0 2px 6px rgba(0,0,0,0.5)',
            animation: 'sl-text-rise 0.7s ease-out 0.55s both',
            letterSpacing: '0.08em',
          }}
        >
          ~ sealed with a kiss, for you ~
        </p>

        {/* Title line 2 - big bold, SOLID gradient text with thick outline/shadow layer guaranteeing visibility */}
        <div
          className="relative mb-1 flex items-center justify-center gap-x-2"
          style={{ animation: 'sl-text-rise 0.8s ease-out 0.7s both' }}
        >
          <span
            className="text-white font-black tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #ffe4ec 0%, #ffb8cf 40%, #ff8fb4 75%, #ff6fa3 100%)',
              WebkitBackgroundClip: 'text',
              fontSize: 'clamp(2.1rem, 9.5vw, 4.8rem)',
              lineHeight: 1,
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
              textShadow:
                '0 -2px 0 #ffffff80, 0 2px 1px #831843, 0 6px 20px rgba(244, 63, 94, 0.6), 0 0 26px rgba(244, 114, 182, 0.75)',
              filter:
                'drop-shadow(0 1px 0 #4c0519) drop-shadow(0 3px 0 #831843) drop-shadow(0 8px 14px rgba(190, 18, 60, 0.5))',
            }}
          >
            a little surprise
          </span>
          <span
            className="shrink-0"
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 3rem)',
              animation: 'sl-heart-pulse 1.3s ease-in-out 0.9s infinite',
              filter: 'drop-shadow(0 4px 10px rgba(244, 63, 94, 0.7))',
            }}
          >
            💘
          </span>
        </div>

        {/* Title line 3 - handwritten large */}
        <p
          className="mb-5 font-hand"
          style={{
            fontSize: 'clamp(1.7rem, 7.5vw, 3.6rem)',
            color: '#fff1f5',
            lineHeight: 1,
            textShadow:
              '0 3px 0 #831843, 0 10px 24px rgba(244, 63, 94, 0.55), 0 0 22px rgba(244, 114, 182, 0.6)',
            animation: 'sl-text-rise 0.8s ease-out 0.9s both',
            letterSpacing: '0.01em',
          }}
        >
          for my Vaishnavi 💞
        </p>

        {/* Packing subline */}
        <p
          className="mb-7 font-hand text-pink-100"
          style={{
            fontSize: 'clamp(0.9rem, 3vw, 1.18rem)',
            textShadow: '0 2px 8px rgba(236, 72, 153, 0.55)',
            animation: 'sl-text-rise 0.7s ease-out 1.1s both, sl-sub-bounce 1.5s ease-in-out 1.4s infinite',
          }}
        >
          unfolding our memories{dotsText}
        </p>

        {/* Progress bar */}
        <div
          className="relative w-full max-w-md"
          style={{ animation: 'sl-text-rise 0.7s ease-out 1.25s both' }}
        >
          <div
            className="relative h-4 overflow-hidden rounded-full border-2 border-rose-200/80"
            style={{
              background:
                'linear-gradient(180deg, #fff1f2 0%, #ffe4e6 100%)',
              boxShadow:
                '0 12px 30px -8px rgba(244, 63, 94, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)',
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
                  '0 0 22px rgba(251, 113, 133, 0.85), inset 0 0 0 2px rgba(255,255,255,0.55)',
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.15rem)', filter: 'drop-shadow(0 2px 5px rgba(244, 63, 94, 0.7))' }}>💌</span>
              <span
                className="font-hand font-semibold text-rose-100"
                style={{
                  fontSize: 'clamp(0.8rem, 2.6vw, 1rem)',
                  textShadow: '0 2px 6px rgba(236, 72, 153, 0.6)',
                  letterSpacing: '0.03em',
                }}
              >
                with all my love
              </span>
            </div>
            <span
              className="font-display font-black text-white"
              style={{
                fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
                letterSpacing: '0.05em',
                textShadow:
                  '0 2px 0 #831843, 0 0 12px rgba(253, 164, 175, 0.8)',
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {['🌸', '🧸', '💖', '🌹', '💌'].map((e, i) => (
            <span
              key={`deco-${i}`}
              className="inline-block"
              style={{
                fontSize: 'clamp(0.9rem, 3vw, 1.35rem)',
                animation: `sl-sub-bounce 1.25s ease-in-out ${0.1 * i + 0.4}s infinite`,
                filter: 'drop-shadow(0 3px 6px rgba(244, 63, 94, 0.55))',
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom romantic Telugu sign-off */}
      <div className="pointer-events-none absolute bottom-5 left-0 right-0 flex justify-center px-6">
        <p
          className="font-hand text-pink-100"
          style={{
            fontSize: 'clamp(0.85rem, 2.8vw, 1.05rem)',
            textShadow:
              '0 2px 10px rgba(244, 63, 94, 0.75), 0 0 14px rgba(244, 114, 182, 0.55)',
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
