import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const messages = [
  "I'm not here to make big promises.",
  "I just know that",
  "I like being around you.",
  "And if life allows…",
  "I'd want to be with you for a long, long time.",
]

export default function NotPromisesPage() {
  const navigate = useNavigate()
  const [lineProgress, setLineProgress] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Animate line drawing
    const lineTimer = setTimeout(() => {
      setLineProgress(1)
    }, 500)

    // Create stars as line fades
    const starsTimer = setTimeout(() => {
      const newStars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setStars(newStars)
    }, 3000)

    return () => {
      clearTimeout(lineTimer)
      clearTimeout(starsTimer)
    }
  }, [])

  useEffect(() => {
    if (lineProgress >= 1 && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [lineProgress, currentMessageIndex])

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingThoughts />

        {/* Drawing line */}
        <div className="absolute top-1/2 left-0 right-0 h-1">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-pink-400 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              opacity: useTransform(() => lineProgress < 1 ? 1 : 0),
            }}
          />
        </div>

        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1],
              scale: [0, 1, 0.8, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="text-center max-w-4xl z-10">
          <div className="space-y-6 mb-16">
            {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
              <motion.p
                key={index}
                className={`text-2xl md:text-4xl font-light text-white/90 leading-relaxed ${
                  index === messages.length - 1 ? 'text-3xl md:text-5xl font-semibold text-yellow-200' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {message}
              </motion.p>
            ))}
          </div>

          {/* Silent ending - no button, just stars */}
          {currentMessageIndex >= messages.length - 1 && (
            <motion.div
              className="mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.p
                className="text-lg text-white/60 italic"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Just silence + stars ✨
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Optional restart button (very subtle) */}
        {currentMessageIndex >= messages.length - 1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white/10 backdrop-blur-lg text-white/60 rounded-full text-sm font-light hover:text-white/90 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Restart from beginning
            </motion.button>
          </motion.div>
        )}
      </div>
    </EmotionAwareWrapper>
  )
}

