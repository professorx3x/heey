import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Audio file path
  const musicFile = '/music/tu-itni-khoobsurat-hai.mp3'

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.4 // Set to 40% volume
      audioRef.current.src = musicFile
    }
  }, [])

  // Auto-play after user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        // Auto-start music after first user interaction
        setTimeout(() => {
          if (audioRef.current && !isPlaying) {
            playMusic()
          }
        }, 1000)
      }
    }

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [hasUserInteracted, isPlaying])

  const playMusic = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.log('Audio play failed:', error)
    }
  }

  const pauseMusic = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, type: "spring", stiffness: 200 }}
    >
      <motion.button
        onClick={toggleMusic}
        className="w-14 h-14 bg-white/90 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-white transition-colors border-2 border-pink-200/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? {
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.3)',
            '0 0 30px rgba(236, 72, 153, 0.6)',
            '0 0 20px rgba(236, 72, 153, 0.3)',
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.span>
      </motion.button>

      {/* Subtle indicator when music is ready but not started */}
      {!hasUserInteracted && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded text-center whitespace-nowrap opacity-70"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎵
        </motion.div>
      )}
    </motion.div>
  )
}
