import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function isTouchDevice() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}

export default function HeartCursor({ enabled }) {
  const [bursts, setBursts] = useState([])
  const cursorRef = useRef(null)
  const target = useRef({ x: -200, y: -200 })
  const current = useRef({ x: -200, y: -200 })
  const raf = useRef(0)
  const burstId = useRef(0)
  const hoveredRef = useRef(false)
  const lastRenderRef = useRef(0)

  useEffect(() => {
    if (!enabled || isTouchDevice()) return

    document.body.classList.add('cursor-heart-active')

    const loop = () => {
      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y
      current.current.x += dx * 0.6
      current.current.y += dy * 0.6

      const el = cursorRef.current
      if (el) {
        const x = current.current.x - 12
        const y = current.current.y - 14
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }

      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!hoveredRef.current && cursorRef.current) {
        hoveredRef.current = true
        cursorRef.current.style.opacity = '1'
      }
    }

    const onLeave = () => {
      hoveredRef.current = false
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      hoveredRef.current = true
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
    }

    const onClick = (e) => {
      const now = performance.now()
      if (now - lastRenderRef.current < 220) return
      lastRenderRef.current = now

      const id = ++burstId.current
      const hearts = Array.from({ length: 4 }, (_, i) => ({
        id: `${id}-${i}`,
        angle: (360 / 5) * i + Math.random() * 16,
        dist: 28 + Math.random() * 18,
      }))
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, hearts }])
      setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id))
      }, 650)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onClick)

    return () => {
      document.body.classList.remove('cursor-heart-active')
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onClick)
    }
  }, [enabled])

  if (!enabled || isTouchDevice()) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] text-2xl select-none"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
          opacity: 0,
          transition: 'opacity 120ms ease-out',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            animation: 'cursor-pulse 1.4s ease-in-out infinite',
          }}
        >
          💗
        </span>
      </div>
      <AnimatePresence>
        {bursts.map((burst) =>
          burst.hearts.map((h) => (
            <motion.span
              key={h.id}
              className="pointer-events-none fixed z-[9998] text-sm select-none"
              style={{ left: burst.x, top: burst.y }}
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.2,
                x: Math.cos((h.angle * Math.PI) / 180) * h.dist,
                y: Math.sin((h.angle * Math.PI) / 180) * h.dist,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              💕
            </motion.span>
          )),
        )}
      </AnimatePresence>
    </>
  )
}
