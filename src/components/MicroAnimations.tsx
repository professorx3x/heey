import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Heartbeat animation for "Nimisha" text
export function HeartbeatText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={className}
      whileHover={{
        scale: [1, 1.1, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(236, 72, 153, 0))',
          'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))',
          'drop-shadow(0 0 0px rgba(236, 72, 153, 0))',
        ],
        transition: { duration: 0.6, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.span>
  )
}

// Sparkle animation for "Baddie" text
export function SparkleText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const sparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        }
        setSparkles((prev) => [...prev, sparkle])
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
        }, 1000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute pointer-events-none text-lg"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            ✨
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  )
}
