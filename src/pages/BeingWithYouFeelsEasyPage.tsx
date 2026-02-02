import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const messages = [
  'With some people,',
  'everything feels forced.',
  'With you…',
  'It feels calm.',
  'Natural.',
  'Easy.',
  'And that\'s rare.',
]

export default function BeingWithYouFeelsEasyPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [dotsConnected, setDotsConnected] = useState(false)

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (currentIndex === messages.length) {
      setTimeout(() => {
        setDotsConnected(true)
        setTimeout(() => {
          setShowFinal(true)
        }, 1000)
      }, 1000)
    }
  }, [currentIndex])

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-pink-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingThoughts />

        {/* Warmth overlay when dots connect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-200/0 via-orange-200/0 to-pink-200/0 pointer-events-none"
          animate={dotsConnected ? {
            background: [
              'linear-gradient(135deg, rgba(254,240,138,0) 0%, rgba(251,146,60,0) 100%)',
              'linear-gradient(135deg, rgba(254,240,138,0.3) 0%, rgba(251,146,60,0.3) 100%)',
            ],
          } : {}}
          transition={{ duration: 2 }}
        />

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Two dots that move together */}
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-xl"
            initial={{ x: -200, y: -100 }}
            animate={dotsConnected ? { x: -20, y: 0 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              boxShadow: dotsConnected 
                ? '0 0 50px rgba(236, 72, 153, 0.8)'
                : '0 0 20px rgba(236, 72, 153, 0.5)',
            }}
          />
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-xl"
            initial={{ x: 200, y: 100 }}
            animate={dotsConnected ? { x: 20, y: 0 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              boxShadow: dotsConnected 
                ? '0 0 50px rgba(168, 85, 247, 0.8)'
                : '0 0 20px rgba(168, 85, 247, 0.5)',
            }}
          />

          {/* Connection line when close */}
          {dotsConnected && (
            <motion.div
              className="absolute w-10 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.6, scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          )}

          {/* Messages */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center max-w-3xl px-4">
            <div className="space-y-6">
              {messages.slice(0, currentIndex).map((message, index) => (
                <motion.p
                  key={index}
                  className="text-2xl md:text-4xl font-light text-gray-800 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {message}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Continue button */}
        {showFinal && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/choose')}
              className="px-8 py-4 bg-white/80 backdrop-blur-lg text-pink-600 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue 💓
            </motion.button>
          </motion.div>
        )}
      </div>
    </EmotionAwareWrapper>
  )
}
