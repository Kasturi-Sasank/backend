const DEFAULT_EMOJIS = ['🎈', '✨', '⭐', '🎉', '🌸', '💫', '🦋', '🍰']

export default function FloatingDecor({ emojis = DEFAULT_EMOJIS, className = '' }) {
  const items = emojis.map((emoji, i) => ({
    emoji,
    left: `${8 + ((i * 17) % 84)}%`,
    top: `${5 + ((i * 23) % 88)}%`,
    delay: i * 0.4,
    duration: 3.5 + (i % 3) * 0.8,
  }))

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((item, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-70 sm:text-3xl"
          style={{
            left: item.left,
            top: item.top,
            display: 'inline-block',
            animation: `float-bob ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  )
}
