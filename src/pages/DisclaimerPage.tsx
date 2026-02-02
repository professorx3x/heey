import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import confetti from 'canvas-confetti'


export default function DisclaimerPage() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const handleCheckboxClick = () => {
    if (!checked) {
      setChecked(true)
      // Confetti explosion
      const duration = 3000
      const end = Date.now() + duration

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval)
          return
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0.3 },
          colors: ['#ff6b9d', '#c44569', '#ff8fab', '#ffffff'],
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 0.7 },
          colors: ['#ff6b9d', '#c44569', '#ff8fab', '#ffffff'],
        })
      }, 100)
    }
  }

  const handleAccept = () => {
    if (checked) {
      navigate('/compliments')
    }
  }

  const warningItems = [
    'Sudden smiling',
    'Loud laughter',
    'Extreme ego boost',
    'Saying "WHO MADE THIS 😭"',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-yellow-500/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative z-10 border-4 border-white/50"
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠️
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-playful text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            WARNING
          </h1>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            This website may cause:
          </p>
          <div className="space-y-3">
            {warningItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-lg md:text-xl text-gray-700"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <span className="text-2xl">✨</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.label
            className="flex items-center gap-4 cursor-pointer group"
            onClick={handleCheckboxClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-lg border-4 flex items-center justify-center ${
                checked
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500'
                  : 'border-pink-400 bg-white'
              }`}
              animate={checked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {checked && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="text-white text-xl font-bold"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
              I acknowledge that I am, indeed, a Baddie.
            </span>
          </motion.label>
        </motion.div>

        <motion.button
          onClick={handleAccept}
          disabled={!checked}
          className={`w-full py-4 rounded-full text-xl md:text-2xl font-bold shadow-lg transition-all duration-300 relative z-50 ${
            checked
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-pink-500/50 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          animate={checked ? {
            boxShadow: '0 10px 40px rgba(255,107,157,0.6)',
          } : {}}
          transition={{ duration: 0.5 }}
        >
          I Accept My Fate 😌
        </motion.button>
      </motion.div>
    </div>
  )
}
