import { ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useEmotion } from '../contexts/EmotionContext'

interface EmotionAwareWrapperProps {
  children: ReactNode
  isEmotional?: boolean
}

export default function EmotionAwareWrapper({ children, isEmotional = false }: EmotionAwareWrapperProps) {
  const { setEmotionalPage } = useEmotion()

  useEffect(() => {
    setEmotionalPage(isEmotional)
    return () => setEmotionalPage(false)
  }, [isEmotional, setEmotionalPage])

  return (
    <motion.div
      className="min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100"
      animate={isEmotional ? {
        filter: 'brightness(0.98) saturate(1.05)',
      } : {}}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 pointer-events-auto w-full h-full">
        {children}
      </div>
    </motion.div>
  )
}
