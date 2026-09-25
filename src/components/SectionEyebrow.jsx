import { motion } from 'framer-motion'

export default function SectionEyebrow({ children }) {
  return (
    <motion.span
      className="mb-3 inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium tracking-wide text-rose-500 shadow-md backdrop-blur-sm sm:text-base"
      whileHover={{ scale: 1.05, rotate: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
    >
      ★ {children} ★
    </motion.span>
  )
}
