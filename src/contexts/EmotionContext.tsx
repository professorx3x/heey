import { createContext, useContext, useState, ReactNode } from 'react'

interface EmotionContextType {
  isEmotionalPage: boolean
  setEmotionalPage: (value: boolean) => void
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined)

export function EmotionProvider({ children }: { children: ReactNode }) {
  const [isEmotionalPage, setEmotionalPage] = useState(false)

  return (
    <EmotionContext.Provider value={{ isEmotionalPage, setEmotionalPage }}>
      {children}
    </EmotionContext.Provider>
  )
}

export function useEmotion() {
  const context = useContext(EmotionContext)
  // Return default values if context is not available (for graceful degradation)
  if (!context) {
    return { isEmotionalPage: false, setEmotionalPage: () => {} }
  }
  return context
}
