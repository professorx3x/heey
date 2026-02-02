'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const certifications = [
  {
    title: 'Certified Baddie',
    emoji: '💅',
    color: 'from-pink-500 to-red-500',
  },
  {
    title: 'Professional Overthinker',
    emoji: '🤔',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Laugh Distributor',
    emoji: '😂',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Too Cool for Normal People',
    emoji: '😎',
    color: 'from-blue-500 to-purple-500',
  },
]

export default function CertificationsPage() {
  const router = useRouter()
  const [stamped, setStamped] = useState<Set<number>>(new Set())
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Auto-stamp certifications one by one
    certifications.forEach((_, index) => {
      setTimeout(() => {
        setStamped((prev) => new Set([...prev, index]))
      }, index * 800)
    })
  }, [])

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      // Fake download complete
      alert('✨ Your aura has been downloaded! (Just kidding, but you\'re still iconic) ✨')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 p-8 relative overflow-hidden">
      {/* Sparkle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mb-12 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h1 className="text-5xl md:text-7xl font-playful text-white mb-4 drop-shadow-2xl">
          Official Documents 📜
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-semibold">
          Your certifications are being processed...
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto z-10">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {cert.emoji}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {cert.title}
                </h2>
              </div>

              {/* Stamp effect */}
              <AnimatePresence>
                {stamped.has(index) && (
                  <motion.div
                    className={`absolute top-4 right-4 bg-gradient-to-br ${cert.color} rounded-full w-24 h-24 flex items-center justify-center text-4xl shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: [0, 1.3, 1],
                      rotate: [180, 0],
                    }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    ✅
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkle effect when stamped */}
              {stamped.has(index) && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {stamped.size === certifications.length && (
        <motion.div
          className="text-center mt-12 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleDownload}
            disabled={downloading}
            className="px-8 py-4 bg-white text-purple-600 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {downloading ? (
                <motion.span
                  key="downloading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Downloading... ⏳
                </motion.span>
              ) : (
                <motion.span
                  key="download"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Download My Aura 😌
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={() => router.push('/finale')}
            className="mt-4 px-8 py-4 bg-white/80 text-purple-600 rounded-full text-lg md:text-xl font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Finale 🎉
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
