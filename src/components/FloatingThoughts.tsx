import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const thoughts = [
  'You matter.',
  'This is your safe space.',
  'Someone really likes you, huh 😌',
  'You\'re doing great.',
  'Take your time.',
  'You\'re appreciated.',
  'This moment is yours.',
  'You deserve good things.',
]

export default function FloatingThoughts() {
  const [activeThoughts, setActiveThoughts] = useState<Array<{ id: number; text: string; x: number; y: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85 && activeThoughts.length < 2) { // Reduced frequency and max count
        const newThought = {
          id: Date.now(),
          text: thoughts[Math.floor(Math.random() * thoughts.length)],
          x: Math.random() * 70 + 15, // 15% to 85% (more centered)
          y: Math.random() * 40 + 30, // 30% to 70% (more centered)
        }
        setActiveThoughts((prev) => [...prev, newThought])
        
        // Remove after 3 seconds (shorter duration)
        setTimeout(() => {
          setActiveThoughts((prev) => prev.filter((t) => t.id !== newThought.id))
        }, 3000)
      }
    }, 8000) // Increased interval to 8 seconds

    return () => clearInterval(interval)
  }, [activeThoughts.length])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden"> {/* Reduced z-index */}
      <AnimatePresence>
        {activeThoughts.map((thought) => (
          <motion.div
            key={thought.id}
            className="absolute bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-light text-gray-600 shadow-sm opacity-60" // Much smaller and more subtle
            style={{
              left: `${thought.x}%`,
              top: `${thought.y}%`,
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 0.6, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {thought.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
