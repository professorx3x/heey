import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const emojis = ['💖', '😎', '🔥', '💅', '😂', '✨', '👑', '💫']

export default function FloatingEmojis() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, index) => {
        const startX = Math.random() * 100
        const startY = Math.random() * 100
        const endX = Math.random() * 100
        const endY = Math.random() * 100
        
        return (
          <motion.div
            key={index}
            className="absolute text-4xl md:text-6xl"
            initial={{
              x: `${startX}%`,
              y: `${startY}%`,
              opacity: 0,
            }}
            animate={{
              y: [`${startY}%`, `${endY}%`],
              x: [`${startX}%`, `${endX}%`],
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        )
      })}
    </div>
  )
}
