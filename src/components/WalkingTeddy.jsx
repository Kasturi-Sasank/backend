import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function WalkingTeddy({ sad = false, targetRef }) {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth * 0.72 : 300)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.42 : 280)
  const prev = useRef({ x: x.get(), y: y.get() })
  const [walking, setWalking] = useState(false)
  const [facingRight, setFacingRight] = useState(true)
  const walkTimer = useRef(0)
  const walkingRef = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    const loop = (t) => {
      const tx = targetRef.current.x
      const ty = targetRef.current.y
      const cx = x.get()
      const cy = y.get()
      const ease = 0.072
      const nx = cx + (tx - cx) * ease
      const ny = cy + (ty - cy) * ease
      x.set(nx)
      y.set(ny)

      const dx = nx - prev.current.x
      const speed = Math.hypot(dx, ny - prev.current.y)

      if (speed > 0.35) {
        walkTimer.current = t
        if (!walkingRef.current) {
          walkingRef.current = true
          setWalking(true)
        }
        if (Math.abs(dx) > 0.25) setFacingRight(dx > 0)
      } else if (t - walkTimer.current > 150) {
        if (walkingRef.current) {
          walkingRef.current = false
          setWalking(false)
        }
      }

      prev.current = { x: nx, y: ny }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [targetRef, x, y])

  const legSwing = walking ? [0, 14, 0, -14, 0] : [0, 2, 0, -2, 0]
  const armSwing = walking ? [0, -12, 0, 12, 0] : [0, 3, 0, -3, 0]

  return (
    <motion.div
      className="pointer-events-none fixed z-30 drop-shadow-lg"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-100%',
      }}
    >
      <motion.div
        style={{ scaleX: facingRight ? 1 : -1 }}
        animate={{
          y: walking ? [0, -5, 0, -5, 0] : [0, -3, 0],
          rotate: sad ? [0, -6, 6, 0] : walking ? [0, -2, 2, 0] : [0, -3, 3, 0],
        }}
        transition={{
          y: walking
            ? { repeat: Infinity, duration: 0.35, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
          rotate: sad
            ? { duration: 0.45 }
            : { repeat: Infinity, duration: walking ? 0.35 : 2.5 },
        }}
      >
        <svg width="140" height="150" viewBox="0 0 120 130" className="sm:w-[160px]" aria-hidden>
          {/* shadow */}
          <ellipse cx="60" cy="124" rx="34" ry="6" fill="rgba(0,0,0,0.12)" />

          {/* legs */}
          <motion.g
            animate={{ rotate: legSwing }}
            style={{ transformOrigin: '46px 95px', transformBox: 'fill-box' }}
            transition={{ repeat: Infinity, duration: walking ? 0.32 : 2, ease: 'easeInOut' }}
          >
            <rect x="38" y="88" width="16" height="28" rx="8" fill="#c4956a" />
            <ellipse cx="46" cy="118" rx="12" ry="7" fill="#a67c52" />
          </motion.g>
          <motion.g
            animate={{ rotate: legSwing.map((v) => -v) }}
            style={{ transformOrigin: '74px 95px', transformBox: 'fill-box' }}
            transition={{
              repeat: Infinity,
              duration: walking ? 0.32 : 2,
              ease: 'easeInOut',
              delay: walking ? 0.16 : 0,
            }}
          >
            <rect x="66" y="88" width="16" height="28" rx="8" fill="#c4956a" />
            <ellipse cx="74" cy="118" rx="12" ry="7" fill="#a67c52" />
          </motion.g>

          {/* body */}
          <ellipse cx="60" cy="78" rx="38" ry="34" fill="#d4a574" />
          <ellipse cx="60" cy="82" rx="22" ry="18" fill="#e8c9a8" opacity="0.55" />

          {/* arms */}
          <motion.g
            animate={{ rotate: armSwing }}
            style={{ transformOrigin: '22px 72px', transformBox: 'fill-box' }}
            transition={{ repeat: Infinity, duration: walking ? 0.32 : 2.2, ease: 'easeInOut' }}
          >
            <ellipse cx="22" cy="78" rx="11" ry="16" fill="#c4956a" />
          </motion.g>
          <motion.g
            animate={{ rotate: armSwing.map((v) => -v) }}
            style={{ transformOrigin: '98px 72px', transformBox: 'fill-box' }}
            transition={{
              repeat: Infinity,
              duration: walking ? 0.32 : 2.2,
              ease: 'easeInOut',
              delay: walking ? 0.16 : 0,
            }}
          >
            <ellipse cx="98" cy="78" rx="11" ry="16" fill="#c4956a" />
          </motion.g>

          {/* head */}
          <circle cx="60" cy="42" r="32" fill="#d4a574" />
          <circle cx="38" cy="22" r="14" fill="#c4956a" />
          <circle cx="38" cy="22" r="8" fill="#e8b896" />
          <circle cx="82" cy="22" r="14" fill="#c4956a" />
          <circle cx="82" cy="22" r="8" fill="#e8b896" />

          {/* snout */}
          <ellipse cx="60" cy="50" rx="14" ry="11" fill="#e8c9a8" />
          <ellipse cx="60" cy="46" rx="5" ry="4" fill="#5c4033" />
          {sad ? (
            <>
              <path d="M48 38 Q60 32 72 38" stroke="#5c4033" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="48" cy="36" rx="4" ry="5" fill="#87CEEB" opacity="0.8" />
              <ellipse cx="72" cy="36" rx="4" ry="5" fill="#87CEEB" opacity="0.8" />
            </>
          ) : (
            <>
              <circle cx="48" cy="38" r="4" fill="#3d2914" />
              <circle cx="72" cy="38" r="4" fill="#3d2914" />
              <circle cx="49" cy="37" r="1.5" fill="white" />
              <circle cx="73" cy="37" r="1.5" fill="white" />
              <path d="M52 54 Q60 62 68 54" stroke="#5c4033" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* bow tie when happy */}
          {!sad && (
            <g transform="translate(60,68)">
              <path d="M-10,-2 L0,4 L10,-2 L0,0 Z" fill="#ff6b9d" />
              <circle cx="0" cy="1" r="3" fill="#ff4081" />
            </g>
          )}
        </svg>
      </motion.div>
      {!sad && walking && (
        <motion.span
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0.5, 1, 0.5], y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          💨
        </motion.span>
      )}
    </motion.div>
  )
}
