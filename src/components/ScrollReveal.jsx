import { motion } from 'framer-motion'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}
