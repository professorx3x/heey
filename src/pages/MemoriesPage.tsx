import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const memories = [
  {
    title: 'The time you laughed at the worst moment',
    emoji: '😂',
    color: 'from-pink-400 to-red-400',
  },
  {
    title: 'That ONE joke that still kills',
    emoji: '💀',
    color: 'from-purple-400 to-pink-400',
  },
  {
    title: 'Your dramatic reactions >>> Netflix',
    emoji: '🎭',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    title: 'When you overthink everything (but it\'s iconic)',
    emoji: '🤔',
    color: 'from-blue-400 to-purple-400',
  },
  {
    title: 'That energy that lights up the room',
    emoji: '✨',
    color: 'from-pink-400 to-yellow-400',
  },
  {
    title: 'Being unapologetically yourself',
    emoji: '👑',
    color: 'from-purple-400 to-pink-400',
  },
]

export default function MemoriesPage() {
  const navigate = useNavigate()
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const handleCardFlip = (index: number) => {
    setFlipped((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-pink-500 p-8 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255,107,157,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(255,107,157,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255,107,157,0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="text-center mb-12 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h1 className="text-5xl md:text-7xl font-playful text-white mb-4 drop-shadow-2xl">
          Core Bestie Moments 🫶
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-semibold">
          Flip the cards to relive the chaos
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto z-10">
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            className="relative h-64 cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => handleCardFlip(index)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateY: flipped.has(index) ? 180 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Front of card */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${memory.color} rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50`}
                style={{ 
                  transform: 'rotateY(0deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <motion.div
                  className="text-6xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {memory.emoji}
                </motion.div>
              </motion.div>

              {/* Back of card */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${memory.color} rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50 p-6`}
                style={{ 
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <motion.p
                  className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {memory.title}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12 relative z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => navigate('/certifications')}
          className="px-8 py-4 bg-white text-purple-600 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Certified 👑
        </motion.button>
      </motion.div>
    </div>
  )
}
