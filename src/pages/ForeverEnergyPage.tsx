import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const messages = [
  'Some people come and go.',
  'Some stay for a chapter.',
  'And some…',
  '…feel like home.',
]

const finalMessage = 'I\'d choose to be around you — always.'

export default function ForeverEnergyPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (currentIndex === messages.length) {
      setTimeout(() => {
        setShowFinal(true)
      }, 2000)
    }
  }, [currentIndex])

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingThoughts />

        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Brighter star */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(255,255,0,0.8)]"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="text-center max-w-4xl z-10">
          <div className="space-y-8 mb-12">
            {messages.slice(0, currentIndex).map((message, index) => (
              <motion.p
                key={index}
                className="text-3xl md:text-5xl font-light text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {message}
              </motion.p>
            ))}
          </div>

          <AnimatePresence>
            {showFinal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.p
                  className="text-4xl md:text-6xl font-semibold text-yellow-200 mb-16 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {finalMessage}
                </motion.p>

            <div className="flex flex-col gap-4 items-center">
              <motion.button
                onClick={() => navigate('/smile')}
                className="px-10 py-5 bg-white/20 backdrop-blur-lg text-white rounded-full text-xl md:text-2xl font-bold border-2 border-white/50 hover:bg-white/30 transition-all shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Continue the Journey 💖
              </motion.button>
              <motion.button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white/60 rounded-full text-lg font-light hover:text-white/90 hover:bg-white/20 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Restart from Beginning
              </motion.button>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}
