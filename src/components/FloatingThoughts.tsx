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
      if (Math.random() > 0.7 && activeThoughts.length < 3) {
        const newThought = {
          id: Date.now(),
          text: thoughts[Math.floor(Math.random() * thoughts.length)],
          x: Math.random() * 80 + 10, // 10% to 90%
          y: Math.random() * 60 + 20, // 20% to 80%
        }
        setActiveThoughts((prev) => [...prev, newThought])
        
        // Remove after 4 seconds
        setTimeout(() => {
          setActiveThoughts((prev) => prev.filter((t) => t.id !== newThought.id))
        }, 4000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeThoughts.length])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {activeThoughts.map((thought) => (
          <motion.div
            key={thought.id}
            className="absolute bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-lg"
            style={{
              left: `${thought.x}%`,
              top: `${thought.y}%`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {thought.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
