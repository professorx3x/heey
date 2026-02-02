import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingEmojis from '../components/FloatingEmojis'
import ParticleBackground from '../components/ParticleBackground'
import { HeartbeatText } from '../components/MicroAnimations'

export default function LandingPage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const letters = "HELLO NIMISHA.".split("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { y: -100, opacity: 0, rotate: -180 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const subtextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-pink-600 flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <FloatingEmojis />
      
      <motion.div
        className="text-center z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-playful text-white mb-8 flex flex-wrap justify-center gap-2 md:gap-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {letters.map((letter, index) => {
            const letterContent = letter === ' ' ? '\u00A0' : letter
            const isNimishaStart = index >= 6 && index < 13 // NIMISHA positions
            
            if (isNimishaStart && index === 6) {
              // Wrap NIMISHA in heartbeat
              return (
                <HeartbeatText key={index}>
                  <motion.span
                    variants={letterVariants}
                    whileHover={{
                      scale: 1.3,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                    className="inline-block"
                  >
                    {letters.slice(6, 13).map((l, i) => (
                      <span key={i}>{l === ' ' ? '\u00A0' : l}</span>
                    ))}
                  </motion.span>
                </HeartbeatText>
              )
            }
            if (isNimishaStart && index > 6) return null // Skip other NIMISHA letters
            
            return (
              <motion.span
                key={index}
                variants={letterVariants}
                whileHover={{
                  scale: 1.3,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                className="inline-block"
              >
                {letterContent}
              </motion.span>
            )
          })}
        </motion.h1>

        <motion.p
          variants={subtextVariants}
          className="text-2xl md:text-3xl text-white/90 mb-12 font-semibold"
        >
          Yes, this website is about you.
        </motion.p>

        <motion.button
          onClick={() => navigate('/disclaimer')}
          className="px-8 py-4 bg-white text-pink-600 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 relative overflow-hidden group z-50"
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
            Enter the BaddieVerse 🚀
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Gradient overlay animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-pink-600/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  )
}
