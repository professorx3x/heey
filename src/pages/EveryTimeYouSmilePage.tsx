import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

export default function EveryTimeYouSmilePage() {
  const navigate = useNavigate()
  const [showSmile, setShowSmile] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [showMessage1, setShowMessage1] = useState(false)
  const [showMessage2, setShowMessage2] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    // Animate smile appearing
    setTimeout(() => setShowSmile(true), 500)
    // Transform to heart
    setTimeout(() => {
      setShowSmile(false)
      setShowHeart(true)
    }, 3000)
    // Show first message
    setTimeout(() => setShowMessage1(true), 4500)
    // Show second message
    setTimeout(() => setShowMessage2(true), 8000)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)

      // Create sparkle
      const newSparkle = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      setSparkles((prev) => [...prev, newSparkle])
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 1000)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create floating hearts
      for (let i = 0; i < 5; i++) {
        const heart = {
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 100,
          y: y + (Math.random() - 0.5) * 100,
        }
        setHearts((prev) => [...prev, heart])
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== heart.id))
        }, 2000)
      }
    }
  }

  const handleHover = () => {
    // Heart pulse effect handled by CSS animation
  }

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <FloatingThoughts />

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none text-2xl"
            style={{ left: sparkle.x, top: sparkle.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 360 }}
            transition={{ duration: 1 }}
          >
            ✨
          </motion.div>
        ))}

        {/* Floating hearts */}
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none text-3xl"
            style={{ left: heart.x, top: heart.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: [1, 0], scale: [1, 0.5], y: -100 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            💖
          </motion.div>
        ))}

        <div className="text-center max-w-4xl z-10">
          {/* Smile to Heart Animation */}
          <div className="mb-16 h-64 flex items-center justify-center">
            <svg width="400" height="200" className="overflow-visible">
              {/* Smile curve */}
              <AnimatePresence>
                {showSmile && (
                  <motion.path
                    d="M 50 100 Q 200 50, 350 100"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Heart outline */}
              <AnimatePresence>
                {showHeart && (
                  <motion.path
                    d="M 200 120 C 200 100, 150 80, 150 100 C 150 80, 100 100, 100 120 C 100 140, 200 180, 200 180 C 200 180, 300 140, 300 120 C 300 100, 250 80, 250 100 C 250 80, 200 100, 200 120 Z"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      filter: ['drop-shadow(0 0 0px #ec4899)', 'drop-shadow(0 0 20px #ec4899)', 'drop-shadow(0 0 0px #ec4899)']
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* Messages */}
          <div className="space-y-6">
            <AnimatePresence>
              {showMessage1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-4"
                >
                  <p className="text-3xl md:text-5xl font-light text-gray-800 leading-relaxed">
                    I don't know if you realize this,
                  </p>
                  <p className="text-3xl md:text-5xl font-light text-gray-800 leading-relaxed">
                    but every time you smile,
                  </p>
                  <p className="text-3xl md:text-5xl font-light text-gray-800 leading-relaxed">
                    things around you feel lighter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showMessage2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  onMouseEnter={handleHover}
                  className="mt-12"
                >
                  <motion.p
                    className="text-4xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    And I really, really like that about you.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {showMessage2 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                onClick={() => navigate('/honest')}
                className="px-8 py-4 bg-white/80 backdrop-blur-lg text-pink-600 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue 💌
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}

