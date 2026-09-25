import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeartCursor from './components/HeartCursor'
import LandingPage from './components/LandingPage'
import MainExperience from './components/MainExperience'
import SurpriseLoading from './components/SurpriseLoading'

export default function App() {
  const [stage, setStage] = useState('landing') // 'landing' | 'loading' | 'main'

  return (
    <>
      <HeartCursor enabled={true} />
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <LandingPage
            key="landing"
            onOpenGift={() => {
              window.scrollTo({ top: 0, behavior: 'instant' })
              setStage('loading')
            }}
          />
        )}
        {stage === 'loading' && (
          <SurpriseLoading
            key="loading"
            onDone={() => {
              window.scrollTo({ top: 0, behavior: 'instant' })
              setStage('main')
            }}
          />
        )}
        {stage === 'main' && <MainExperience key="main" />}
      </AnimatePresence>
    </>
  )
}
