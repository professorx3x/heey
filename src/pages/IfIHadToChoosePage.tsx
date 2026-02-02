import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const cards = [
  { text: 'Noise', color: 'from-gray-400 to-gray-600' },
  { text: 'Chaos', color: 'from-red-400 to-red-600' },
  { text: 'Temporary people', color: 'from-yellow-400 to-yellow-600' },
  { text: "I'd choose you.", color: 'from-pink-500 to-purple-500', isFinal: true },
]

export default function IfIHadToChoosePage() {
  const navigate = useNavigate()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (currentCardIndex < cards.length - 1) {
      // Quick flips for first cards
      const timer = setTimeout(() => {
        setIsFlipping(true)
        setTimeout(() => {
          setCurrentCardIndex((prev) => prev + 1)
          setIsFlipping(false)
        }, 600)
      }, 1500)
      return () => clearTimeout(timer)
    } else if (currentCardIndex === cards.length - 1 && !showFinalMessage) {
      // Slow flip for final card
      setTimeout(() => {
        setIsFlipping(true)
        setTimeout(() => {
          setShowFinalMessage(true)
          // Cinematic zoom
          setZoomLevel(1.1)
        }, 1200)
      }, 2000)
    }
  }, [currentCardIndex, showFinalMessage])

  const currentCard = cards[currentCardIndex]

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingThoughts />

        <motion.div
          className="w-full max-w-2xl mx-auto"
          animate={{ scale: zoomLevel }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Card */}
          <div className="relative h-96 perspective-1000">
            <motion.div
              className="absolute inset-0 preserve-3d"
              animate={{
                rotateY: isFlipping ? 180 : 0,
              }}
              transition={{
                duration: currentCard.isFinal ? 1.2 : 0.6,
                ease: "easeInOut",
              }}
            >
              {/* Front of card */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${currentCard.color} rounded-3xl shadow-2xl flex items-center justify-center backface-hidden`}
                style={{ transform: 'rotateY(0deg)' }}
              >
                {!isFlipping && (
                  <motion.p
                    className="text-4xl md:text-6xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentCard.text}
                  </motion.p>
                )}
              </motion.div>

              {/* Back of card (blank during flip) */}
              <motion.div
                className="absolute inset-0 bg-gray-200 rounded-3xl backface-hidden"
                style={{ transform: 'rotateY(180deg)' }}
              />
            </motion.div>
          </div>

          {/* Final message below card */}
          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.p
                  className="text-2xl md:text-3xl font-light text-gray-700 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Again.
                </motion.p>
                <motion.p
                  className="text-2xl md:text-3xl font-light text-gray-700 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  And again.
                </motion.p>
                <motion.p
                  className="text-2xl md:text-3xl font-light text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Without hesitation.
                </motion.p>

                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <motion.button
                    onClick={() => navigate('/promises')}
                    className="px-8 py-4 bg-white/80 backdrop-blur-lg text-pink-600 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue ♾️
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <style>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}</style>
      </div>
    </EmotionAwareWrapper>
  )
}
