import { motion } from 'framer-motion'

export default function CornerTeddy({
  position = 'left',
  imageSrc = '/teddy-2.gif',
  alt = 'Mocha bear',
}) {
  const placementClass =
    position === 'right'
      ? 'bottom-4 right-4 sm:bottom-6 sm:right-6'
      : 'bottom-4 left-4 sm:bottom-6 sm:left-6'

  const rotateHint = position === 'right' ? 'scale-x-[-1]' : ''

  return (
    <motion.div
      className={`pointer-events-none fixed z-40 ${placementClass}`}
      animate={{ y: [0, -8, 0] }}
      transition={{
        repeat: Infinity,
        duration: position === 'right' ? 3.3 : 2.8,
        ease: 'easeInOut',
      }}
    >
      <div className="relative">
        <div className="absolute -inset-2 rounded-[28px] bg-white/60 backdrop-blur-md shadow-2xl border border-white/80" />
        <img
          src={`${imageSrc}?v=${Date.now()}`}
          alt={alt}
          className={`relative w-24 h-24 sm:w-28 sm:h-28 object-contain select-none rounded-2xl ${rotateHint}`}
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
