import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import EmotionAwareWrapper from '../components/EmotionAwareWrapper'
import FloatingThoughts from '../components/FloatingThoughts'

const milestones = [
  { text: 'Laughing at nothing', emoji: '😂' },
  { text: 'Supporting each other on bad days', emoji: '🤗' },
  { text: 'Growing, learning, becoming better', emoji: '🌱' },
  { text: 'Still choosing kindness', emoji: '💖' },
  { text: 'Walking together, no rush.', emoji: '🚶‍♀️' },
]

export default function JourneyPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <EmotionAwareWrapper isEmotional={true}>
      <div 
        ref={containerRef}
        className="min-h-[300vh] bg-gradient-to-b from-orange-200 via-pink-300 to-purple-400 relative overflow-hidden"
      >
        <FloatingThoughts />
        
        {/* Sunset gradient background */}
        <div className="fixed inset-0 bg-gradient-to-b from-orange-300/50 via-pink-400/50 to-purple-500/50" />

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-auto px-8">
            {/* Path line */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              <motion.path
                d="M 100 50 Q 300 200, 500 350 T 900 650"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="4"
                strokeDasharray="1000"
                style={{
                  strokeDashoffset: useTransform(pathLength, (v) => 1000 - (v * 10)),
                }}
              />
            </svg>

            {/* Milestones */}
            {milestones.map((milestone, index) => {
              const x = 100 + (index * 200)
              const y = 50 + (index * 150)
              const milestoneProgress = useTransform(
                scrollYProgress,
                [index * 0.2, (index + 1) * 0.2],
                [0, 1]
              )

              const opacity = useTransform(milestoneProgress, [0, 0.5, 1], [0, 1, 1])
              const scale = useTransform(milestoneProgress, [0, 0.5, 1], [0, 1, 1])

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${(x / 1200) * 100}%`,
                    top: `${(y / 800) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity,
                    scale,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-lg rounded-full w-24 h-24 flex items-center justify-center text-4xl shadow-xl border-4 border-white"
                    whileHover={{ scale: 1.2 }}
                  >
                    {milestone.emoji}
                  </motion.div>
                  <motion.p
                    className="mt-4 text-center text-white font-semibold text-lg max-w-[200px] drop-shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    style={{
                      opacity: useTransform(milestoneProgress, [0.5, 1], [0, 1]) as any,
                    }}
                  >
                    {milestone.text}
                  </motion.p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Continue button appears at the end */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={() => navigate('/safe-place')}
            className="px-8 py-4 bg-white/90 backdrop-blur-lg text-purple-600 rounded-full text-xl font-bold shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Your Safe Place 🫶
          </motion.button>
        </div>
      </div>
    </EmotionAwareWrapper>
  )
}
