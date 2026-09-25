import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import { STICKY_WISHES } from '../constants/content'

const noteColors = [
  '#fff9b1',
  '#ffcce0',
  '#cce5ff',
  '#d4f8d4',
  '#ffe0cc',
  '#e8d4ff',
  '#ffd6e8',
  '#fff5ba',
]

const rotations = [-4, 3, -2, 5, -3, 2, -5, 1]

export default function StickyNotes() {
  return (
    <section className="cork-board relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.5 — pinned with love</SectionEyebrow>
          <h2 className="font-display text-4xl font-extrabold text-white drop-shadow-md sm:text-5xl">
            <span className="gradient-heading">tiny wishes for u</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* TODO: sticky-note wishes — edit STICKY_WISHES in content.js */}
          {STICKY_WISHES.map((wish, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <motion.article
                className="relative mx-auto w-full max-w-[240px] p-5 pt-8 shadow-lg"
                style={{
                  background: noteColors[i % noteColors.length],
                  rotate: `${rotations[i % rotations.length]}deg`,
                }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 16 }}
              >
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl" aria-hidden>
                  📌
                </span>
                <p className="font-hand text-center text-2xl leading-snug text-rose-800">
                  {wish.text} {wish.emoji}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
