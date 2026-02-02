import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const messages = [
  'If the world ever feels loud,',
  'overwhelming, or unfair —',
  'I hope you remember',
  'you\'re never alone.',
]

const finalMessages = [
  'I genuinely like you.',
  'For who you are.',
  'For who you\'re becoming.',
]

export default function SafePlacePage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 2500)
      return () => clearTimeout(timer)
    } else if (currentIndex === messages.length) {
      setTimeout(() => {
        setShowFinal(true)
      }, 2000)
    }
  }, [currentIndex])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1000)
  }

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden"
        onClick={handleClick}
      >
        <FloatingThoughts />

        {/* Warm color overlay that intensifies */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 via-orange-200/0 to-pink-200/0"
          animate={showFinal ? {
            background: [
              'linear-gradient(135deg, rgba(255,237,213,0) 0%, rgba(255,182,193,0) 100%)',
              'linear-gradient(135deg, rgba(255,237,213,0.3) 0%, rgba(255,182,193,0.3) 100%)',
            ],
          } : {}}
          transition={{ duration: 2 }}
        />

        {/* Ripples */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-pink-300 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}

        <div className="text-center max-w-4xl z-10">
          {/* First set of messages */}
          <div className="space-y-6 mb-12">
            {messages.slice(0, currentIndex).map((message, index) => (
              <motion.p
                key={index}
                className="text-3xl md:text-5xl font-light text-gray-800 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {message}
              </motion.p>
            ))}
          </div>

          {/* Final messages */}
          <AnimatePresence>
            {showFinal && (
              <motion.div
                className="space-y-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {finalMessages.map((message, index) => (
                  <motion.p
                    key={index}
                    className="text-2xl md:text-4xl font-medium text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.8 }}
                  >
                    {message}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {showFinal && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                onClick={() => navigate('/forever')}
                className="px-8 py-4 bg-white/80 backdrop-blur-lg text-purple-600 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Forever Energy ♾️
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}
