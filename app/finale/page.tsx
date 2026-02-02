'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
// @ts-ignore
import confetti from 'canvas-confetti'

const messages = [
  'This website exists because',
  'you make life lighter,',
  'days funnier,',
  'and moments better.',
]

export default function FinalePage() {
  const router = useRouter()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showFinalLine, setShowFinalLine] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (currentMessageIndex === messages.length) {
      setTimeout(() => {
        setShowFinalLine(true)
        setConfettiActive(true)
        
        // Confetti explosion
        const duration = 5000
        const end = Date.now() + duration

        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval)
            return
          }

          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0.3 },
            colors: ['#ff6b9d', '#c44569', '#ff8fab', '#ffffff', '#fbbf24'],
          })
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 0.7 },
            colors: ['#ff6b9d', '#c44569', '#ff8fab', '#ffffff', '#fbbf24'],
          })
        }, 100)
      }, 2000)
    }
  }, [currentMessageIndex])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {confettiActive && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.4) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="text-center z-10 max-w-4xl">
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {messages.slice(0, currentMessageIndex).map((message, index) => (
            <motion.p
              key={index}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {message}
            </motion.p>
          ))}

          <AnimatePresence>
            {showFinalLine && (
              <motion.p
                className="text-4xl md:text-6xl lg:text-7xl font-playful text-white drop-shadow-2xl mt-8"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                Stay the Baddie you are, Nimisha. 💖
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {showFinalLine && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-white text-pink-600 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,255,255,0.5)',
                  '0 0 40px rgba(255,255,255,0.8)',
                  '0 0 20px rgba(255,255,255,0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Replay Because I'm Awesome 🔁
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>
    </div>
  )
}
