import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  challengesCompleted: number
  levelup: () => void
  startNewChallenge: () => void
  activeChallenge: Challenge
  resetChallenge: () => void
  experienceToNextLevel: number
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelup() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengesIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }
  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelup,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
