import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeartCursor from './components/HeartCursor'
import LandingPage from './components/LandingPage'
import MainExperience from './components/MainExperience'

export default function App() {
  const [giftOpen, setGiftOpen] = useState(false)

  return (
    <>
      <HeartCursor enabled={true} />
      <AnimatePresence mode="wait">
        {!giftOpen ? (
          <LandingPage
            key="landing"
            onOpenGift={() => {
              setGiftOpen(true)
              window.scrollTo({ top: 0, behavior: 'instant' })
            }}
          />
        ) : (
          <MainExperience key="main" />
        )}
      </AnimatePresence>
    </>
  )
}
