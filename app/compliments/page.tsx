'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const compliments = [
  'Funny without trying',
  'Illegal levels of charm',
  'Main character energy',
  'Baddie by birth, icon by choice',
  'Your vibe is unmatched',
  'Confidence level: Unmeasurable',
  'The definition of iconic',
  'Too cool for normal people',
  'Laugh distributor certified',
  'Dramatic in the best way',
]

const roasts = [
  'Still can\'t decide what to eat though.',
  'But you still overthink everything 😂',
  'Yet you can\'t pick a Netflix show',
  'But your phone is always on 1%',
]

export default function ComplimentsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Array<{ id: number; text: string; isRoast: boolean }>>([])
  const [clickedItems, setClickedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < compliments.length) {
        setNotifications((prev) => [
          ...prev,
          { id: Date.now() + index, text: compliments[index], isRoast: false },
        ])
        index++
      } else {
        clearInterval(interval)
        // Add a roast after a delay
        setTimeout(() => {
          setNotifications((prev) => [
            ...prev,
            { id: Date.now() + 1000, text: roasts[Math.floor(Math.random() * roasts.length)], isRoast: true },
          ])
        }, 2000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleNotificationClick = (id: number) => {
    setClickedItems((prev) => new Set([...prev, id]))
  }

  const handleContinue = () => {
    router.push('/memories')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #fbbf24 100%)',
            'linear-gradient(135deg, #ec4899 0%, #fbbf24 50%, #a855f7 100%)',
            'linear-gradient(135deg, #fbbf24 0%, #a855f7 50%, #ec4899 100%)',
            'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #fbbf24 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.h1
        className="text-4xl md:text-6xl font-playful text-white mb-8 text-center z-10 drop-shadow-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Why Nimisha is Built Different
      </motion.h1>

      <div className="w-full max-w-2xl space-y-4 z-10">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              className={`p-6 rounded-2xl shadow-2xl cursor-pointer ${
                notification.isRoast
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                  : 'bg-white/95 backdrop-blur-lg text-gray-800'
              }`}
              initial={{ x: -400, opacity: 0, scale: 0.8 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: clickedItems.has(notification.id) ? [0, -5, 5, -5, 0] : 0,
              }}
              exit={{ x: 400, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => handleNotificationClick(notification.id)}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="text-xl md:text-2xl font-bold flex items-center gap-3"
                animate={
                  clickedItems.has(notification.id)
                    ? {
                        filter: [
                          'drop-shadow(0 0 0px rgba(255,107,157,0))',
                          'drop-shadow(0 0 20px rgba(255,107,157,1))',
                          'drop-shadow(0 0 0px rgba(255,107,157,0))',
                        ],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <motion.span
                  animate={clickedItems.has(notification.id) ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {notification.isRoast ? '😏' : '✨'}
                </motion.span>
                <span>{notification.text}</span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {notifications.length >= compliments.length + 1 && (
        <motion.button
          onClick={handleContinue}
          className="mt-8 px-8 py-4 bg-white text-purple-600 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue the Journey 🚀
        </motion.button>
      )}
    </div>
  )
}
