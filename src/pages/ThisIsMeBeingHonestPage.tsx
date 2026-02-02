import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const messages = [
  "I'm not great at dramatic speeches…",
  "But I like you.",
  "Not casually.",
  "Not randomly.", 
  "I like you-you.",
  "And I wanted you to know that."
]

export default function ThisIsMeBeingHonestPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    } else if (currentIndex === messages.length) {
      setTimeout(() => {
        setShowFinal(true)
      }, 1000)
    }
  }, [currentIndex])

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingThoughts />

        {/* Slow floating hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}

        <div className="text-center max-w-4xl z-10">
          <div className="space-y-8 mb-12">
            {messages.slice(0, currentIndex).map((message, index) => (
              <motion.p
                key={index}
                className={`text-3xl md:text-5xl font-light text-gray-800 leading-relaxed ${
                  index === messages.length - 1 ? 'text-4xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {message}
              </motion.p>
            ))}
          </div>

          {showFinal && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => navigate('/easy')}
                className="px-8 py-4 bg-white/80 backdrop-blur-lg text-pink-600 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue 🌸
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}
