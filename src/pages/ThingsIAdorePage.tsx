import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const adorations = [
  'The way you laugh — unfiltered and real',
  'How you care without making noise',
  'How being yourself is effortless for you',
  'How you make ordinary moments feel lighter',
  'Your ability to find joy in small things',
  'The way you listen — really listen',
  'How you show up, consistently',
  'Your courage to be vulnerable',
  'The way you make people feel seen',
  'How you choose kindness, even when it\'s hard',
]

export default function ThingsIAdorePage() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 py-20 px-4 relative overflow-hidden">
        <FloatingThoughts />
        
        {/* Soft breathing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-pink-200/30 via-purple-200/30 to-pink-200/30"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div ref={containerRef} className="max-w-3xl mx-auto space-y-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-playful text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Things I Adore About You 🌼
            </h1>
            <p className="text-xl text-gray-600 mt-4">Scroll gently...</p>
          </motion.div>

          {adorations.map((item, index) => {
            const ref = useRef(null)
            const itemInView = useInView(ref, { once: true, amount: 0.5 })
            
            return (
              <motion.div
                key={index}
                ref={ref}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-pink-200/50 relative overflow-hidden"
                  whileHover={{
                    boxShadow: '0 20px 40px rgba(255,107,157,0.2)',
                    borderColor: 'rgba(255,107,157,0.5)',
                  }}
                  onClick={() => {
                    // Create floating heart
                    const heart = document.createElement('div')
                    heart.innerHTML = '💖'
                    heart.className = 'fixed text-4xl pointer-events-none z-50'
                    heart.style.left = `${Math.random() * window.innerWidth}px`
                    heart.style.top = `${Math.random() * window.innerHeight}px`
                    document.body.appendChild(heart)
                    
                    setTimeout(() => {
                      heart.style.transition = 'all 2s ease-out'
                      heart.style.transform = 'translateY(-100px) scale(0)'
                      heart.style.opacity = '0'
                      setTimeout(() => heart.remove(), 2000)
                    }, 100)
                  }}
                >
                  <motion.p
                    className="text-2xl md:text-3xl font-semibold text-gray-800"
                    whileHover={{
                      textShadow: '0 0 20px rgba(255,107,157,0.5)',
                    }}
                  >
                    {item}
                  </motion.p>
                </motion.div>
              </motion.div>
            )
          })}

          <motion.div
            className="text-center mt-20 relative z-50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={() => navigate('/journey')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue the Journey 🚶‍♀️
            </motion.button>
          </motion.div>
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}
